const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.send("hello peter");
});
router.put("/:id", (req, res) => {
  console.log(req.body.userId);
});
module.exports = router;
