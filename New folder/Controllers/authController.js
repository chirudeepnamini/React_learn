const mongoose = require("mongoose");
const userModel = require("../Models/userModel");
var cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const error_handler = (err) => {
  console.log("in error handler");
  const error_obj_thrown = { email: "", password: "" };
  console.log(err);
  console.log(Object.keys(err));
  if (err.code === 11000) {
    console.log("alerady exists");
    error_obj_thrown.email = "email already exists";
  }
  if (err._message.includes("Users validation failed")) {
    console.log("validationf alied");
    console.log(err);
    console.log("validationf alied");
    console.log(err.errors);
    Object.values(err.errors).forEach((errobj) => {
      error_obj_thrown[errobj.path] = errobj.message;
    });
  }

  return error_obj_thrown;
};
const jwthandler = (id) => {
  return jwt.sign({ id }, "secret hash key", { expiresIn: 3 * 24 * 60 * 60 });
};
module.exports.login_get = (req, res) => {
  res.render("login");
};
module.exports.login_post = (req, res) => {
  console.log(req.body);
  res.status(201).send("got user in login");
};
module.exports.signup_get = (req, res) => {
  res.render("signup");
};
module.exports.signup_post = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const userdoc = new userModel({ email, password });
  userdoc
    .save()
    .then((inserted_doc) => {
      const token = jwthandler(inserted_doc._id);
      res.cookie("token_cookie", token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 10000,
      });
      res.status(201).json({ user: inserted_doc._id });
    })
    .catch((err) => {
      console.log(err.message);
      const error_obj_thrown = error_handler(err);
      res.status(401).json({ error: error_obj_thrown });
    });
};
