/* Q4(a) Create tables and relationship */

CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE posts (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title VARCHAR(200) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


/* Q4(b) Insert 3 users and 5 posts */

INSERT INTO users (id, name, email) VALUES
(1, 'Tahmeed', 'tahmeed@example.com'),
(2, 'Appicoder', 'appicoder@example.com'),
(3, 'Appicoder Intern', 'appicoderintern@example.com');

INSERT INTO posts (id, user_id, title) VALUES
(1, 1, 'My First Post'),
(2, 1, 'Learning Backend'),
(3, 2, 'My First Blog'),
(4, 2, 'Learning SQL'),
(5, 3, 'Hello World');


/* Q4(c) JOIN */

SELECT users.name, users.email, posts.title
FROM users
JOIN posts ON users.id = posts.user_id;


/* Q4(d) Get all posts for user_id = 1 */

SELECT *
FROM posts
WHERE user_id = 1;


/* Q4(e) Prevent duplicate emails */

-- The UNIQUE constraint on users.email prevents duplicate user emails.