const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

const db = new sqlite3.Database(":memory:");

const sql = fs.readFileSync("../Q4.sql", "utf8");

db.exec(sql, (err) => {
    if (err) {
        console.error("Error:", err.message);
        return;
    }

    console.log("Q4 SQL executed successfully!\n");

    // Q4(c) JOIN
    db.all(
        `SELECT users.name, users.email, posts.title
         FROM users
         JOIN posts ON users.id = posts.user_id;`,
        (err, rows) => {
            if (err) {
                console.error("JOIN Error:", err.message);
                return;
            }

            console.log("Q4(c) - JOIN:");
            console.table(rows);

            // Q4(d) Posts belonging to user_id = 1
            db.all(
                `SELECT *
                 FROM posts
                 WHERE user_id = 1;`,
                (err, rows) => {
                    if (err) {
                        console.error("Q4(d) Error:", err.message);
                        return;
                    }

                    console.log("\nQ4(d) - Posts for user_id = 1:");
                    console.table(rows);

                    db.close();
                }
            );
        }
    );
});