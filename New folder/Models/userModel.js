const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "enter a email"],
    unique: true,
    validate: [validator.isEmail, "enter a valid email id"],
  },
  password: {
    type: String,
    required: [true, "enter a password"],
    minlength: [6, "password must have atleast six characters"],
  },
});
userSchema.post("save", function (doc, next) {
  console.log("added document", doc);
  next();
});
userSchema.pre("save", async function (next) {
  console.log("in pre method", this);
  const salt = await bcrypt.genSalt();
  console.log(salt);
  // this.email = await bcrypt.hash(this.email, salt);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
module.exports = mongoose.model("Users", userSchema);
