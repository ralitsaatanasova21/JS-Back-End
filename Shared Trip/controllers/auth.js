const { isUser, isGuest } = require("../middleware/guards");
const { register, login } = require("../services/user");
const { mapErrors } = require("../util/mappers");

const router = require("express").Router();

router.get("/register", isGuest(), (req, res) => {
  res.render("register", { title: "Register Page" });
});

//TODO check form, method, field names
router.post("/register", isGuest(), async (req, res) => {
  try {
    if (req.body.password.trim().length< 4) {
      throw new Error("Password must be at least 4 characters long");
    }
    if (req.body.password != req.body.repass) {
      throw new Error("Password don't match");
    }

    const user = await register(req.body.email, req.body.password, req.body.gender);

    req.session.user = user;
    res.redirect("/"); //TODO check redirect requirements
  } catch (err) {
    console.error(err);
    //TODO send error message
    const errors = mapErrors(err);
    const isMale=req.body.gender=='male';
    const data = {email: req.body.email, isMale};
    res.render("register", {title: "Register Page", data, errors});
  }
});

router.get("/login", isGuest(), (req, res) => {
  res.render("login", { title: "Login Page" });
});

//TODO check form, method, field names
router.post("/login", isGuest(), async (req, res) => {
  try {
    const user = await login(req.body.email, req.body.password);

    req.session.user = user;
    res.redirect("/"); //TODO check redirect requirements
  } catch (err) {
    console.error(err);
    const errors = mapErrors(err);
    res.render("login", {title: "Login Page", data: { email: req.body.email }, errors});
  }
});

router.get("/logout", isUser(), (req, res) => {
  delete req.session.user;
  res.redirect("/"); //TODO check redirect requirements
});

module.exports = router;
