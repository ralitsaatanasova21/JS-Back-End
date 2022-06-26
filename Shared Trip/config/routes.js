const homeController = require("../controllers/home");
const authController = require("../controllers/auth");
const tripController = require("../controllers/trip");

module.exports = (app) => {
  app.use(homeController);
  app.use(authController);
  app.use(tripController);

  app.get("*", (req, res) => {
    res.render("404", { title: "Page Not Found" });
  });
};
