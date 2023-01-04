const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

const User = require("../../schemas/UserSchema");
const Post = require("../../schemas/PostSchema");


app.use(bodyParser.urlencoded({ extended: false }));


router.post("/", (req, res, next) => {
    if(!req.body.content){
        console.log("Content param not sent with request");
        return res.status(400);
    }

    var postData = {
        content: req.body.content,
        postedBy : req.session.user
    }

    Post.create(postData)
    .then(newPost => {   
     res.status(201).send(newPost);
    })
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })

});

module.exports = router;