const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

const User = require("../schemas/UserSchema");

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));


router.get("/", (req, res) => {
  User.find()
    .then((results) =>  {
    //   console.log(results);
      res.render("admin", { users: results })
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
});

router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    console.log(req.body);
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;