-- Insert test users
INSERT INTO users (first_name, last_name, email, password, membership_status, admin)
VALUES 
('John', 'Doe', 'john@example.com', 'hashed_password_1', FALSE, FALSE),
('Jane', 'Smith', 'jane@example.com', 'hashed_password_2', TRUE, TRUE);

-- Insert test messages
INSERT INTO messages (user_id, title, text)
VALUES 
(1, 'Welcome to the Club', 'This is the first message in the club.'),
(2, 'Admin Message', 'This message was posted by an admin.');
