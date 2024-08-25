// controllers/messageController.js
const pool = require("../db/pool"); // Adjust the path as needed

// Render new message page
const renderNewMessagePage = (req, res) => {
  res.render("new-message", { errorMessage: null });
};

// Handle new message submission
const handleNewMessage = async (req, res) => {
  const { title, text } = req.body;
  const userId = req.user.id;

  try {
    await pool.query(
      "INSERT INTO messages (user_id, title, text) VALUES ($1, $2, $3)",
      [userId, title, text]
    );
    res.redirect("/messages");
  } catch (err) {
    console.error("Error creating message:", err);
    res.render("new-message", {
      errorMessage: "An error occurred. Please try again.",
    });
  }
};

// Display messages on home page
const displayMessages = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT m.id, m.title, m.text, m.timestamp, u.first_name, u.last_name
         FROM messages m
         JOIN users u ON m.user_id = u.id
         ORDER BY m.timestamp DESC`
    );
    const messages = result.rows;
    res.render("home", { messages, user: req.user });
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).send("An error occurred.");
  }
};
// Handle message deletion
const handleDeleteMessage = async (req, res) => {
  const messageId = req.params.id;
  // Log user information to debug
  console.log("User:", req.user); // Check if `req.user.admin` is set correctly

  if (!req.user.admin) {
    return res.status(403).send("Access denied.");
  }

  console.log(`Deleting message with ID: ${messageId}`); // Add this line

  try {
    await pool.query("DELETE FROM messages WHERE id = $1", [messageId]);
    res.redirect("/messages");
  } catch (err) {
    console.error("Error deleting message:", err);
    res.status(500).send("An error occurred.");
  }
};

module.exports = {
  renderNewMessagePage,
  handleNewMessage,
  displayMessages,
  handleDeleteMessage,
};
