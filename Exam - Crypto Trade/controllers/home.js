const preload = require("../middleware/preload");
const { getAllCryptos } = require("../services/crypto");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("home", { title: "Home page" });
});

router.get("/catalog", async (req, res) => {
  const cryptos = await getAllCryptos();
  res.render("catalog", { title: "All Crypto", cryptos });
});

router.get("/catalog/:id", preload(true), (req, res) => {
  const crypto = res.locals.crypto;

  if (req.session.user) {
    crypto.hasUser = true;
    crypto.isOwner = req.session.user._id == crypto.owner._id;

  }
  res.render("details", { title: "Crypto Details", data:{} });
});

router.get("/search", async (req, res) => {
  res.render("search", { title: "Search", data: {} });
});

module.exports = router;
