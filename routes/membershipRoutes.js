const express = require("express");
const router = express.Router();
const {
  renderMembershipPage,
  handleMembership,
} = require("../controllers/membershipController");

// Middleware to ensure the user is authenticated
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
};

// GET membership page
router.get("/membership", ensureAuthenticated, renderMembershipPage);

// POST membership form
router.post("/membership", ensureAuthenticated, handleMembership);

module.exports = router;
