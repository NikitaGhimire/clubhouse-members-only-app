const bcrypt = require("bcrypt");
const { createUser, getUserByEmail } = require("../db/queries");

//render signup page
const renderSignUpPage = (req, res) => {
  res.render("signup", { errorMessage: null });
};

//handle sign-up form submission
const handleSignUp = async (req, res) => {
  const { first_name, last_name, email, password, confirmPassword, admin } =
    req.body;

  //Validate form data
  if (!first_name || !last_name || !email || !password || !confirmPassword) {
    return res.render("signup", { errorMessage: "All fields are required." });
  }
  if (password !== confirmPassword) {
    return res.render("signup", { errorMessage: "Passwords do not match." });
  }

  //check if user already exists
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return res.render("signup", {
      errorMessage: "Email is already registered. Login",
    });
  }

  //hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  //create new user
  try {
    await createUser(
      first_name,
      last_name,
      email,
      hashedPassword,
      admin === "on"
    ); // Admin field is a boolean
    //redirect to login page
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.render("signup", { errorMessage: "Error creating user." });
  }
};

module.exports = { renderSignUpPage, handleSignUp };
