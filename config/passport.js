const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { getUserByEmail, getUserById } = require("../db/queries");
const bcrypt = require("bcrypt");

//configure passport-local startegy
passport.use(
  new LocalStrategy(async (email, password, done) => {
    try {
      const user = await getUserByEmail(email);
      if (!user) {
        return done(null, false, { message: "No user with that email." });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

//serialise user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
