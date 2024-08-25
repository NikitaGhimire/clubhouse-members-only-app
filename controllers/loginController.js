// controllers/loginController.js
const passport = require("passport");

// Render login page
const renderLoginPage = (req, res) => {
  res.render("login", { title: "Login", errorMessage: null });
};

// Handle login form submission
const handleLogin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.render("login", { errorMessage: info.message });
    req.logIn(user, (err) => {
      if (err) return next(err);
      console.log("User logged in:", user);
      res.redirect("/messages"); // Redirect to a protected route after login
    });
  })(req, res, next);
};

// Handle logout
const handleLogout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Error during logout:", err);
      return next(err); // Call next to handle the error appropriately
    }
    res.redirect("/"); // Redirect to home or login page after logout
  });
};

module.exports = { renderLoginPage, handleLogin, handleLogout };
