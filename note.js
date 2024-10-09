const express = require('express')
const router = express.Router();
const connection = require('./dbConnection');

// API Create note

router.post('/create-note', (req, res) => {
    const { content, module_id} = req.body;

    connection.query("INSERT INTO notes (content, module_id, created_at) VALUE (?, ?, NOW())",[content, module_id], (err, result) => {
        if(err) {
            console.error('Database insert error:', err);
            return res.status(500).json({message: "Failed to insert notes"});
        }
        res.status(201).json({message: 'Note Insert Successfully'});
    });

    
});


// API Select Note
router.get('/select-note', (req, res) => {
    connection.query("SELECT notes.id, notes.content, notes.created_at, notes.updated_at, modules.module_name FROM `notes` JOIN modules ON  notes.module_id = modules.id ORDER BY notes.id DESC LIMIT 5", (err, result) => {
        if (err) {
            console.log('Database query error:', err);
            return res.status(500).json({message: 'Database query error'});
        }
        if (result.length === 0) {
            return res.status(404).json({message: 'Note Not Found'});
        }
        res.status(200).json(result);
    });
});


// API Select Note By ID
router.get("/note/:id", (req, res) => {
    const { id } = req.params;

    connection.query("SELECT notes.id, notes.content, notes.created_at, notes.updated_at, modules.module_name FROM `notes` JOIN modules ON  notes.module_id = modules.id WHERE notes.id = ? ", [id], (err, result) => {
        if (err) {
            console.error('Database selecting error', err);
            return res.status(500).json({message: "Failed to select note"});
        }
        if (result.length === 0) {
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json(result[0]);
    });
});

// API Update Note
router.put('/update-note/:id', (req, res) => {
    const { id } = req.params;
    const { content, module_id } = req.body;

    connection.query(
        "UPDATE notes SET content = ?, module_id = ?, updated_at = NOW() WHERE id = ?",
        [content, module_id, id],
        (err, result) => {
            if (err) {
                console.error('Database update error', err);
                return res.status(500).json({message: 'Failed to update note'});
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({message: "Note not found"});
            }
            res.status(200).json({message: 'Note Update successfully'});
        }
    );
});


// API Delete Module
router.delete('/delete-note/:id', (req, res) => {
    const note_ID = req.params.id;
    
    const query = "DELETE FROM notes WHERE id = ?";
    connection.query(query, [note_ID], (err, result) => {
        if (err) {
            console.error('Database delete error:', err);
            return res.status(500).json({message: "Database delete error"});
        }
        if (result.affectedRows === 0){
            return res.status(404).json({message: 'Note not found'});
        }
        res.status(200).json({message: 'Note delete successfully'});
    });
});
// API Search Module
router.get('/search-note', (req, res) => {
    const { content } = req.query;

    let query = "SELECT notes.id, notes.content, notes.created_at, notes.updated_at, modules.module_name FROM `notes` JOIN modules ON  notes.module_id = modules.id WHERE 1=1";
    let params = [];

    if (content) {
        query += ' AND content = ?';
        params.push(content);
    }
    
    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Database search error', err);
            return res.status(500).json({ message: "Failed to search" });
        }
        res.status(200).json(results);
    });
});

// API Search Note By Module
router.get('/search-note-by-module', (req, res) => {
    const { module_id } = req.query;

    let query = "SELECT notes.id, notes.content, notes.created_at, notes.updated_at, modules.module_name FROM `notes` JOIN modules ON  notes.module_id = modules.id WHERE 1=1";
    let params = [];

    if (module_id) {
        query += ' AND module_id = ?';
        params.push(module_id);
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