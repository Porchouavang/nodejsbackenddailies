const express = require('express')
const router = express.Router();
const connection = require('./dbConnection');

// API Create Module
router.post('/create-module', (req, res) => {
    const { module_name} = req.body;

    connection.query("INSERT INTO modules (module_name, created_at) VALUE (?, NOW())",[module_name], (err, result) => {
        if(err) {
            console.error('Database insert error:', err);
            return res.status(500).json({message: "Failed to insert module"});
        }
        res.status(201).json({message: 'Module Insert Successfully'});
    });

    
});

// API Select Module
router.get('/select-module', (req, res) => {
    connection.query("SELECT * FROM modules ORDER BY id DESC", (err, result) => {
        if (err) {
            console.log('Database query error:', err);
            return res.status(500).json({message: 'Database query error'});
        }
        if (result.length === 0) {
            return res.status(404).json({message: 'Module Not Found'});
        }
        res.status(200).json(result);
    });
});

// API SELECT module BY id
router.get("/module/:id", (req, res) => {
    const { id } = req.params;

    connection.query("SELECT * FROM modules WHERE id = ? ", [id], (err, result) => {
        if (err) {
            console.error('Database selecting error', err);
            return res.status(500).json({message: "Failed to select module"});
        }
        if (result.length === 0) {
            return res.status(404).json({message: "Module not found"});
        }
        res.status(200).json(result[0]);
    });
});

// API Update Module
router.put('/update-module/:id', (req, res) => {
    const { id } = req.params;
    const { module_name } = req.body;

    connection.query(
        "UPDATE modules SET module_name = ?, updated_at = NOW() WHERE id = ?",
        [module_name, id],
        (err, result) => {
            if (err) {
                console.error('Database update error', err);
                return res.status(500).json({message: 'Failed to update module'});
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({message: "Module not found"});
            }
            res.status(200).json({message: 'Module Update successfully'});
        }
    );
});


// API Delete Module
router.delete('/delete-module/:id', (req, res) => {
    const module_ID = req.params.id;
    
    const query = "DELETE FROM modules WHERE id = ?";
    connection.query(query, [module_ID], (err, result) => {
        if (err) {
            console.error('Database delete error:', err);
            return res.status(500).json({message: "Database delete error"});
        }
        if (result.affectedRows === 0){
            return res.status(404).json({message: 'Module not found'});
        }
        res.status(200).json({message: 'Module delete successfully'});
    });
});

// API Search Module
router.get('/search-module', (req, res) => {
    const { module_name } = req.query;

    let query = "SELECT * FROM modules WHERE 1=1";
    let params = [];

    if (module_name) {
        query += ' AND module_name = ?';
        params.push(module_name);
    }
    
    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Database search error', err);
            return res.status(500).json({ message: "Failed to search" });
        }
        res.status(200).json(results);
    });
});

module.exports = router;