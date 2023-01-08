const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

const User = require("../schemas/UserSchema");
const Post = require("../schemas/PostSchema");

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));


router.get("/", async (req,res,next) => {
  try {
    let posts = await Post.find();
    let users = await User.find();

    res.render("admin",{posts,users});
  } catch (error) {
    
  }
})
   

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