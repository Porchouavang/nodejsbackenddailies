const express = require('express')
const router = express.Router();
const connection = require('./dbConnection');
const bcrypt = require('bcryptjs');

// API Create Admin

router.post('/create-admin', (req, res) => {
    const { username, email, password, phone} = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    connection.query("INSERT INTO users (username, email, password, phone, created_at) VALUE (?, ?, ?, ?, NOW())",[username, email, hashedPassword, phone], (err, result) => {
        if(err) {
            console.error('Database insert error:', err);
            return res.status(500).json({message: "Failed to insert admin"});
        }
        res.status(201).json({message: 'Admin Insert Successfully'});
    });

    
});

// API Select Admin
router.get('/select-admin', (req, res) => {
    connection.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.log('Database query error:', err);
            return res.status(500).json({message: 'Database query error'});
        }
        if (result.length === 0) {
            return res.status(404).json({message: 'User Not Found'});
        }
        res.status(200).json(result);
    });
});

// API SELECT Admin BY id
router.get("/admin/:id", (req, res) => {
    const { id } = req.params;

    connection.query("SELECT * FROM users WHERE id = ? ", [id], (err, result) => {
        if (err) {
            console.error('Database selecting error', err);
            return res.status(500).json({message: "Failed to select admin"});
        }
        if (result.length === 0) {
            return res.status(404).json({message: "Admin not found"});
        }
        res.status(200).json(result[0]);
    });
});

// API Update Admin
router.put('/update-admin/:id', (req, res) => {
    const { id } = req.params;
    const { username, email, password, phone } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    connection.query(
        "UPDATE users SET username = ?, email = ?, password = ?, phone = ?, updated_at = NOW() WHERE id = ?",
        [username, email, hashedPassword, phone, id],
        (err, result) => {
            if (err) {
                console.error('Database update error', err);
                return res.status(500).json({message: 'Failed to update admin'});
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({message: "Admin not found"});
            }
            res.status(200).json({message: 'Admin Update successfully'});
        }
    );
});
// API Search Admin
router.get('/search-admin', (req, res) => {
    const { username, email, phone } = req.query;

    let query = "SELECT * FROM users WHERE 1=1";
    let params = [];

    if (username) {
        query += ' AND username = ?';
        params.push(username);
    }
    if (email) {
        query += ' AND email = ?';
        params.push(email);
    }
    if (phone) {
        query += ' AND phone = ?';
        params.push(phone);
    }

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Database search error', err);
            return res.status(500).json({ message: "Failed to search" });
        }
        res.status(200).json(results);
    });
});

// API Delete Admin
router.delete('/delete-admin/:id', (req, res) => {
    const adminID = req.params.id;

    const query = "DELETE FROM users WHERE id = ?";
    connection.query(query, [adminID], (err, result) => {
        if (err) {
            console.error('Database delete error:', err);
            return res.status(500).json({message: "Database delete error"});
        }
        if (result.affectedRows === 0){
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json({message: 'Admin delete successfully'});
    });
});

module.exports = router;