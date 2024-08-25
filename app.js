const express = require("express");
const session = require("express-session");

const passport = require("passport");
const initializePassport = require("./config/passport");
const authRoutes = require("./routes/auth");
const loginRoutes = require("./routes/loginRoutes");
const membershipRoutes = require("./routes/membershipRoutes");
const profileRoutes = require("./routes/profileRoutes");
require("dotenv").config();

const app = express();
initializePassport(passport);

// Set up middleware
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultSecretKey",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Set up view engine
app.set("view engine", "ejs");

// Routes
app.use("/", authRoutes);
app.use("/", loginRoutes);
app.use("/", membershipRoutes); // membership routes
app.use("/", profileRoutes); //profile routes

// Define a basic route
app.get("/", (req, res) => {
  res.send("Welcome to Nikita's Secret Clubhouse!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
