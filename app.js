const express = require("express");
const session = require("express-session");
const passport = require("passport");

const app = express();

// Set up middleware
app.use(express.urlencoded({ extended: false }));
app.use(
  session({ secret: "yourSecretKey", resave: false, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Set up view engine
app.set("view engine", "ejs");

// Define a basic route
app.get("/", (req, res) => {
  res.send("Welcome to Nikita's Secret Clubhouse!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
