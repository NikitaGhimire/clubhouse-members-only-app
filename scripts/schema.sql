--Drop table if they exist
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS users;

--Create the users table
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    membership_status BOOLEAN DEFAULT FALSE,
    admin BOOLEAN DEFAULT FALSE
);

--Create the messages table
CREATE TABLE messages(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    text TEXT NOT NULL
);