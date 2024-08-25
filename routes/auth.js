const express = require("express");
const router = express.Router();
const {
  renderSignUpPage,
  handleSignUp,
} = require("../controllers/authControllers");

//get sign-up form
router.get("/signup", renderSignUpPage);

//post sign up form
router.post("/signup", handleSignUp);

module.exports = router;
