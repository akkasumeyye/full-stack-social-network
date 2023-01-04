const mongoose = require("mongoose");


const Schema = mongoose.Schema;


const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
 
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: "images/profilePic.png",
  },
  // role: {
  //   type: String,
  //   required: true,
  //   enum: ["user", "admin"],
  // },
}, {timestamps: true});

var User = mongoose.model("User", UserSchema);

module.exports = User;

