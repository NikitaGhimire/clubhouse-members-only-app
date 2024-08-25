const pool = require("./pool");

//get all users
const getAllUsers = async () => {
  const res = await pool.query("SELECT * FROM users");
  return res.rows;
};

//get a user by email
const getUserByEmail = async (email) => {
  const res = await pool.query("SELECT * FROM users WHERE email =$1", [email]);
  return res.rows[0];
};

// Create a new user
const createUser = async (
  first_name,
  last_name,
  email,
  hashedPassword,
  admin
) => {
  try {
    await pool.query(
      "INSERT INTO users (first_name, last_name, email, password, admin) VALUES ($1, $2, $3, $4, $5)",
      [first_name, last_name, email, hashedPassword, admin]
    );
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

//get all messages
const getAllMessages = async () => {
  const res = await pool.query("SELECT * FROM messages");
  return res.rows;
};

//create a new message
const createMessage = async (user_id, title, text) => {
  const res = await pool.query(
    "INSERT INTO messages (user_id, title, text) VALUES ($1, $2, $3) RETURNING *",
    [user_id, title, text]
  );
  return res.rows[0];
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  createUser,
  getAllMessages,
  createMessage,
};
