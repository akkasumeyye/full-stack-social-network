const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const User = require("../schemas/UserSchema");

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
  res.status(200).render("register");
});

router.post("/", async (req, res, next) => {
  var firstName = req.body.firstName.trim();
  var lastName = req.body.lastName.trim();
  var username = req.body.username.trim();
  var email = req.body.email.trim();
  var password = req.body.password;

  var payload = req.body;

  if (firstName && lastName && email && username && password) {
    var user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    }).catch((err) => {
      console.log(err);
      payload.errorMessage = "Something went wrong.";
      res.status(200).render("register", payload);
    });

    if (user == null) {
      //No user found

      var data = req.body;
      data.password = await bcrypt.hash(password, 10);

      User.create(data)
      .then((user) => {
        req.session.user = user;
        return res.redirect("/");
      });
    } else {
      //User found
      if (email.toLowerCase() === user.email.toLowerCase()) {
        payload.errorMessage = "Email already exists.";
      } else {
        payload.errorMessage = "Username already exists.";
      }
      res.status(200).render("register", payload);
    }
  } else {
    payload.errorMessage = "Make sure all fields has a valid value.";
    res.status(200).render("register", payload);
  }
});

module.exports = router;
