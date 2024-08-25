const { render } = require("ejs");
const pool = require("../db/pool");

//Render the membership page
const renderMembershipPage = (req, res) => {
  res.render("membership", { errorMessage: null });
};

//handle the membership form submission
const handleMembership = async (req, res) => {
  const { passcode } = req.body;
  const secretPasscode = process.env.SECRET_PASSCODE;

  if (passcode === secretPasscode) {
    try {
      const userId = req.user.id;
      await pool.query(
        "UPDATE users SET membership_status = TRUE WHERE id = $1",
        [userId]
      );
      res.redirect("/profile"); //redirect to user profile
    } catch (error) {
      console.error("Error updating membership status:", error);
      res.render("membership", {
        errorMessage: "An error occured, Please try again",
      });
    }
  } else {
    res.render("membership", {
      errorMessage: "Incorrect passcode. Please try again",
    });
  }
};

module.exports = { renderMembershipPage, handleMembership };
