// routes/messageRoutes.js
const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const {
  renderNewMessagePage,
  handleNewMessage,
  displayMessages,
  handleDeleteMessage,
} = require("../controllers/messageController");

// GET new message page
router.get("/messages/new", ensureAuthenticated, renderNewMessagePage);

// POST new message form
router.post("/messages/new", ensureAuthenticated, handleNewMessage);

// GET home page (to display messages)
router.get("/messages", displayMessages);

// DELETE message
router.post("/messages/:id/delete", ensureAuthenticated, handleDeleteMessage);

module.exports = router;
