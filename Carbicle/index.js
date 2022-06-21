const express = require("express");
const hbs = require("express-handlebars");
const session = require("express-session");

const initDb = require("./models");

const carService = require("./services/cars");
const accessoryService = require("./services/accessory");
const authService = require("./services/auth");

const { home } = require("./controllers/home");
const { about } = require("./controllers/about");
const create = require("./controllers/create");
const { details } = require("./controllers/details");
const edit = require("./controllers/edit");
const deleteCar = require("./controllers/delete");
const accessory = require("./controllers/accessory");
const attach = require("./controllers/attach");
const authController = require("./controllers/auth");

const { notFound } = require("./controllers/notFound");
const { isLoggedIn } = require("./services/util");

start();

async function start() {
  await initDb();

  const app = express();

  app.engine(
    "hbs",
    hbs.create({
      extname: ".hbs",
    }).engine
  );

  app.set("view engine", "hbs");

  app.use(
    session({
      secret: "my secret",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: "auto" },
    })
  );
  app.use(express.urlencoded({ extended: true }));
  app.use("/static", express.static("static"));
  app.use(carService());
  app.use(accessoryService());
  app.use(authService());

  app.get("/", home);
  app.get("/about", about);
  app.get("/details/:id", details);
  app
    .route("/create")
    .get(isLoggedIn(), create.get)
    .post(isLoggedIn(), create.post);
  app
    .route("/delete/:id")
    .get(isLoggedIn(), deleteCar.get)
    .post(isLoggedIn(), deleteCar.post);
  app
    .route("/edit/:id")
    .get(isLoggedIn(), edit.get)
    .post(isLoggedIn(), edit.post);
  app
    .route("/accessory")
    .get(isLoggedIn(), accessory.get)
    .post(isLoggedIn(), accessory.post);
  app
    .route("/attach/:id")
    .get(isLoggedIn(), attach.get)
    .post(isLoggedIn(), attach.post);

  app.use(authController);

  app.all("*", notFound);

  app.listen(3000, () => console.log("ready"));
}
