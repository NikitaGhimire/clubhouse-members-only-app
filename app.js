const express = require("express");
const session = require("express-session");
const methodOverride = require("method-override");

const passport = require("passport");
const initializePassport = require("./config/passport");
const authRoutes = require("./routes/auth");
const loginRoutes = require("./routes/loginRoutes");
const membershipRoutes = require("./routes/membershipRoutes");
const profileRoutes = require("./routes/profileRoutes");
const messageRoutes = require("./routes/messageRoutes");
const indexRoutes = require("./routes/indexRoutes");
require("dotenv").config();

const app = express();
initializePassport(passport);

// Set up middleware
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "1234",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

// Set up view engine
app.set("view engine", "ejs");

// Routes
app.use("/", indexRoutes);
app.use("/", authRoutes);
app.use("/", loginRoutes);
app.use("/", membershipRoutes); // membership routes
app.use("/", profileRoutes); //profile routes
app.use("/", messageRoutes);

// Define a basic route
app.get("/", (req, res) => {
  res.send("Welcome to Nikita's Secret Clubhouse!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message); // Log the error message
  res.status(500).send(`Something went wrong! Error: ${err.message}`);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
