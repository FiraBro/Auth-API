const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide us your name"],
  },
  password: {
    type: String,
    required: [true, "please fill in the fields"],
    min: 3,
    max: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "please confirm your password"],
  },
  email: {
    type: String,
    required: [true, "please fill in the fields"],
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
