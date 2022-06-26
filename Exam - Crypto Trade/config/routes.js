const homeController = require("../controllers/home");
const authController = require("../controllers/auth");
const cryptoController = require("../controllers/crypto");

module.exports = (app) => {
  app.use(homeController);
  app.use(authController);
  app.use(cryptoController);

  app.get("*", (req, res) => {
    res.render("404", { title: "Page Not Found" });
  });
};
