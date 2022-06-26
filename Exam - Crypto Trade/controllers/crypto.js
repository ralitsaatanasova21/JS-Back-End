const router = require("express").Router();
const { isUser, isOwner } = require("../middleware/guards");
const preload = require("../middleware/preload");
const { createCrypto, editCrypto, deleteById, bye } = require("../services/crypto");
const { mapErrors } = require("../util/mappers");

router.get("/create", isUser(), (req, res) => {
  res.render("create", { title: "Create Crypto Offer", data: {} });
});

router.post("/create", isUser(), async (req, res) => {
  const crypto = {
    name: req.body.name,
    image: req.body.image,
    price: Number(req.body.price),
    description: req.body.description,
    paymentMethod: req.body.paymentMethod,
    buyCrypto: req.body.buyCrypto,
    owner: req.session.user._id,
  };

  console.log(crypto);
  
  try {
    await createCrypto(crypto);
    res.redirect("/catalog");
  } catch (err) {
    console.error(err);
    const errors = mapErrors(err);
    res.render("create", { title: "Create Crypto Offer", errors, crypto });
  }
});

router.get("/edit/:id", preload(), isOwner(), async (req, res) => {
  res.render("edit", { title: "Edit Offer" });
});

router.post("/edit/:id", preload(), isOwner(), async (req, res) => {
  const id = req.params.id;

  const crypto = {
    name: req.body.name,
    image: req.body.image,
    price: Number(req.body.price),
    description: req.body.description,
    paymentMethod: req.body.paymentMethod,
  };


  try {
    await editCrypto(id, crypto);
    res.redirect("/catalog/" + id);
  } catch (err) {
    console.error(err);
    const errors = mapErrors(err);
    crypto._id = id;
    res.render("/catalog/" + id, { title: "Edit Offer", crypto, errors });
  }
});

router.get("/delete/:id", preload(), isOwner(), async (req, res) => {
  const id = req.params.id;
  await deleteById(id);
  res.redirect("/catalog");
});


router.get("/bye/:id", isUser(), async (req, res) => {
  const id = req.params.id;
  console.log(res.locals.user);

  try {
    await bye(id, res.locals.user);
    res.redirect("/catalog/" + id);
  } catch (err) {
    console.error(err);
  } finally {
    res.redirect("/catalog/" + id);
  }
});

module.exports = router;
