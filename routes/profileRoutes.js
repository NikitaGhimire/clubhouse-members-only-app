const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

router.get("/profile", ensureAuthenticated, (req, res) => {
  res.render("profile", { user: req.user });
});

module.exports = router;
