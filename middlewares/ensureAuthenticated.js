// middlewares/ensureAuthenticated.js
const ensureAuthenticated = (req, res, next) => {
  console.log("User is authenticated:", req.isAuthenticated()); // Add this line
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

module.exports = ensureAuthenticated;
