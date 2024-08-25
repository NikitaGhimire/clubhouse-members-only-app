const express = require("express");
const router = express.Router();
const {
  renderLoginPage,
  handleLogin,
  handleLogout,
} = require("../controllers/loginController");

// GET login page
router.get("/login", renderLoginPage);

// POST login form
router.post("/login", handleLogin);

// GET logout
router.get("/logout", handleLogout);

module.exports = router;
