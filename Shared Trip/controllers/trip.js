const router = require("express").Router();
const { isUser, isOwner } = require("../middleware/guards");
const preload = require("../middleware/preload");
const {
  createTrip,
  editTrip,
  deleteById,
  joinTrip,
} = require("../services/trip");
const { mapErrors } = require("../util/mappers");

router.get("/create", isUser(), (req, res) => {
  res.render("create", { title: "Create Trip Offer", data: {} });
});

router.post("/create", isUser(), async (req, res) => {
  const trip = {
    startPath: req.body.startPath,
    endPath: req.body.endPath,
    date: req.body.date,
    time: req.body.time,
    carImg: req.body.carImg,
    carBrand: req.body.carBrand,
    seats: Number(req.body.seats),
    price: Number(req.body.price),
    description: req.body.description,
    owner: req.session.user._id,
  };

  try {
    await createTrip(trip);
    res.redirect("/trips");
  } catch (err) {
    console.error(err);
    const errors = mapErrors(err);
    res.render("create", { title: "Create Trip Offer", errors, trip });
  }
});

router.get("/edit/:id", preload(), isOwner(), async (req, res) => {
  // const id = req.params.id;
  // const post = postViewModel(await getPostById(id));

  //   if (req.session.user._id != post.author._id) {
  //     return res.redirect("/login");
  //   }

  res.render("edit", { title: "Edit Offer" });
});

router.post("/edit/:id", preload(), isOwner(), async (req, res) => {
  const id = req.params.id;

  const trip = {
    startPath: req.body.startPath,
    endPath: req.body.endPath,
    date: req.body.date,
    time: req.body.time,
    carImg: req.body.carImg,
    carBrand: req.body.carBrand,
    seats: Number(req.body.seats),
    price: Number(req.body.price),
    description: req.body.description,
  };

  try {
    await editTrip(id, trip);
    res.redirect("/trips/" + id);
  } catch (err) {
    console.error(err);
    const errors = mapErrors(err);
    trip._id = id;
    res.render("edit", { title: "Edit Offer", trip, errors });
  }
});

router.get("/delete/:id", preload(), isOwner(), async (req, res) => {
  const id = req.params.id;
  //   const existing = postViewModel(await getPostById(id));

  //   if (req.session.user._id != existing.author._id) {
  //     return res.redirect("/login");
  //   }

  // try {
  await deleteById(id);
  res.redirect("/trips");
  // } catch (err) {
  //   console.error(err);
  //   const errors = mapErrors(err);
  //   res.render("/trips", { title: existing.title, errors });
  // }
});

router.get("/join/:id", isUser(), async (req, res) => {
  const id = req.params.id;

  try {
    await joinTrip(id, req.session.user._id);
  } catch (err) {
    console.error(err);
  } finally {
    res.redirect("/trips/" + id);
  }
});

router.get("/vote/:id/:type", isUser(), async (req, res) => {
  const id = req.params.id;
  const value = req.params.type == "upvote" ? 1 : -1;

  try {
    await vote(id, req.session.user._id, value);
    res.redirect("/catalog/" + id);
  } catch (err) {
    console.error(err);
    const errors = mapErrors(err);
    res.render("/details", { title: "Post details", errors });
  }
});

// router.get("/profile", isUser(), async (req, res) => {
//   const posts = (await getPostsByAuthor(req.session.user._id)).map(postViewModel);
//   res.render("profile", { title: "My Posts", posts });
// });

module.exports = router;
