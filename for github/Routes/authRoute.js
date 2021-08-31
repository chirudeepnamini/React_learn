const express = require("express");
const User = require("../Models/userModel");
const router = express.Router();
const bcrypt = require("bcrypt");
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10); //generate salt
    req.body.password = await bcrypt.hash(req.body.password, salt); //hash the password
    const userdoc = await new User({
      //create new user document
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const inserted_doc = await userdoc.save(); //save it
    res.status(200).json(inserted_doc);
  } catch (err) {
    // catch errors
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
});
router.post("/login", async (req, res) => {
  try {
    const user_doc = await User.findOne({ email: req.body.email });
    !user_doc && res.status(404).json({ error: "user not found" });
    console.log("user", user_doc);
    console.log(req.body.password, user_doc.password);
    const validPassword = await bcrypt.compare(
      req.body.password,
      user_doc.password
    );
    !validPassword && res.status(404).json({ error: "invalid password" });
    res.status(200).json(user_doc);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
