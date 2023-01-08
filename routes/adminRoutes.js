const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

const User = require("../schemas/UserSchema");
const Post = require("../schemas/PostSchema");

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));


router.get("/", (req,res,next) => {
  Post.find({}, function (err, posts) {
    if (err) next(err);
    res.locals.savedPosts = posts;
    // console.log(posts);
    next();
  });

  User.find({}, function (err, users) {
    if (err) next(err);
    console.log(users);
    res.locals.savedUsers = users;
    next();
  });

    res.render("admin", {users: res.locals.savedUsers , posts: res.locals.savedPosts});
});


   

router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    console.log(req.body);
  } catch (error) {
    console.log(error);
  }

    try {
      const newPost = new Post(req.body);
      await newPost.save();
      console.log(req.body);
    } catch (error) {
      console.log(error);
    }
})

module.exports = router;