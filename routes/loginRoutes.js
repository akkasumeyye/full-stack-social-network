const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = 'thisshouldbeasecret';

const User = require("../schemas/UserSchema");

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
  res.status(200).render("login");
});

router.post("/", async (req, res, next) => {


  if (req.body.logUsername && req.body.logPassword) {
    var user = await User.findOne({
      $or: [{ username: req.body.logUsername }, { email: req.body.logUsername }],
    })
  }
  
  if(user && bcrypt.compareSync(req.body.logPassword, user.password)) {
    const token = jwt.sign({ id: user._id }, secret, {
      expiresIn: 86400
    })
  res.cookie("token", token, { httpOnly: true });
  // console.log(token)
  req.session.user = user;
  return res.redirect("/");
}

});

module.exports = router;
