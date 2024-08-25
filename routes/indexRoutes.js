const express = require("express");
const router = express.Router();

// Render the homepage
router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
