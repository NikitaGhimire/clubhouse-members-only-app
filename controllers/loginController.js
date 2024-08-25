// controllers/loginController.js
const passport = require("passport");

// Render login page
const renderLoginPage = (req, res) => {
  res.render("login", { errorMessage: null });
};

// Handle login form submission
const handleLogin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.render("login", { errorMessage: info.message });
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.redirect("/profile"); // Redirect to a protected route after login
    });
  })(req, res, next);
};

// Handle logout
const handleLogout = (req, res) => {
  req.logout();
  res.redirect("/");
};

module.exports = { renderLoginPage, handleLogin, handleLogout };
