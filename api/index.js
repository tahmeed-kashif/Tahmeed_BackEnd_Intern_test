const express = require("express");
const bcrypt = require("bcrypt");
const db = require("./database");

const app = express();

app.use(express.json());

const PORT = 3000;


// Create a user
app.post("/api/users", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Name, email and password are required"
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO users (name, email, password)
            VALUES (?, ?, ?)
        `;

        db.run(sql, [name, email, hashedPassword], function (err) {
            if (err) {
                if (err.message.includes("UNIQUE")) {
                    return res.status(409).json({
                        message: "Email already exists"
                    });
                }

                return res.status(500).json({
                    message: "Failed to create user"
                });
            }

            res.status(201).json({
                id: this.lastID,
                name,
                email
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong"
        });
    }
});


// Get all users
app.get("/api/users", (req, res) => {
    const sql = "SELECT id, name, email FROM users";

    db.all(sql, [], (err, users) => {
        if (err) {
            return res.status(500).json({
                message: "Failed to retrieve users"
            });
        }

        res.status(200).json(users);
    });
});


// Get a single user
app.get("/api/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            message: "Invalid user ID"
        });
    }

    const sql = "SELECT id, name, email FROM users WHERE id = ?";

    db.get(sql, [id], (err, user) => {
        if (err) {
            return res.status(500).json({
                message: "Failed to retrieve user"
            });
        }

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);
    });
});


// Update a user
app.put("/api/users/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, password } = req.body;

    if (isNaN(id)) {
        return res.status(400).json({
            message: "Invalid user ID"
        });
    }

    if (!name && !email && !password) {
        return res.status(400).json({
            message: "At least one field is required"
        });
    }

    try {
        const fields = [];
        const values = [];

        if (name) {
            fields.push("name = ?");
            values.push(name);
        }

        if (email) {
            fields.push("email = ?");
            values.push(email);
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            fields.push("password = ?");
            values.push(hashedPassword);
        }

        values.push(id);

        const sql = `
            UPDATE users
            SET ${fields.join(", ")}
            WHERE id = ?
        `;

        db.run(sql, values, function (err) {
            if (err) {
                if (err.message.includes("UNIQUE")) {
                    return res.status(409).json({
                        message: "Email already exists"
                    });
                }

                return res.status(500).json({
                    message: "Failed to update user"
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            res.status(200).json({
                message: "User updated successfully"
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong"
        });
    }
});


// Delete a user
app.delete("/api/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            message: "Invalid user ID"
        });
    }

    const sql = "DELETE FROM users WHERE id = ?";

    db.run(sql, [id], function (err) {
        if (err) {
            return res.status(500).json({
                message: "Failed to delete user"
            });
        }

        if (this.changes === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User deleted successfully"
        });
    });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});