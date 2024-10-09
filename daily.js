const express = require('express')
const router = express.Router();
const connection = require('./dbConnection');


// API Create Module
router.post('/create-daily', (req, res) => {
    const { five_six, six_seven, seven_eight, eight_nine, nine_ten, ten_eleven, eleven_twelve, twelve_thirteen, thirteen_fourteen, fourteen_fifteen, fifteen_sixteen, sixteen_seventeen, seventeen_eighteen, eighteen_nineteen, nineteen_twenty, twenty_twentyone, twentyone_twentytwo, twentytwo_twentythree, twentythree_five, days} = req.body;
    connection.query("INSERT INTO dailies (five_six, six_seven, seven_eight, eight_nine, nine_ten, ten_eleven, eleven_twelve, twelve_thirteen, thirteen_fourteen, fourteen_fifteen, fifteen_sixteen, sixteen_seventeen, seventeen_eighteen, eighteen_nineteen, nineteen_twenty, twenty_twentyone, twentyone_twentytwo, twentytwo_twentythree, twentythree_five, days, created_at) VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())",[five_six, six_seven, seven_eight, eight_nine, nine_ten, ten_eleven, eleven_twelve, twelve_thirteen, thirteen_fourteen, fourteen_fifteen, fifteen_sixteen, sixteen_seventeen, seventeen_eighteen, eighteen_nineteen, nineteen_twenty, twenty_twentyone, twentyone_twentytwo, twentytwo_twentythree, twentythree_five, days], (err, result) => {
        if(err) {
            console.error('Database insert error:', err);
            return res.status(500).json({message: "Failed to insert Dailies"});
        }
        res.status(201).json({message: 'Dailies Insert Successfully'});
        // console.log(connection);
    });

    
});

// API Select Module
router.get('/select-daily', (req, res) => {
    connection.query("SELECT * FROM dailies WHERE is_delete = 0 ORDER BY DL_ID DESC", (err, result) => {
        if (err) {
            console.log('Database query error:', err);
            return res.status(500).json({message: 'Database query error'});
        }
        if (result.length === 0) {
            return res.status(404).json({message: 'School Tables Not Found'});
        }
        res.status(200).json(result);
    });
});

// API SELECT module BY id
router.get("/daily/:DL_ID", (req, res) => {
    const { DL_ID } = req.params;

    connection.query("SELECT * FROM dailies WHERE DL_ID = ? ", [DL_ID], (err, result) => {
        if (err) {
            console.error('Database selecting error', err);
            return res.status(500).json({message: "Failed to select daily"});
        }
        if (result.length === 0) {
            return res.status(404).json({message: "Daily not found"});
        }
        res.status(200).json(result[0]);
    });
});

// API Update Module
router.put('/update-daily/:DL_ID', (req, res) => {
    const { DL_ID } = req.params;
    const { five_six, six_seven, seven_eight, eight_nine, nine_ten, ten_eleven, eleven_twelve, twelve_thirteen, thirteen_fourteen, fourteen_fifteen, fifteen_sixteen, sixteen_seventeen, seventeen_eighteen, eighteen_nineteen, nineteen_twenty, twenty_twentyone, twentyone_twentytwo, twentytwo_twentythree, twentythree_five, days } = req.body;

    connection.query(
        "UPDATE dailies SET five_six = ?, six_seven = ?, seven_eight = ?, eight_nine = ?, nine_ten = ?, ten_eleven = ?, eleven_twelve = ?, twelve_thirteen = ?, thirteen_fourteen = ?, fourteen_fifteen = ?, fifteen_sixteen = ?, sixteen_seventeen = ?, seventeen_eighteen = ?, eighteen_nineteen = ?, nineteen_twenty = ?, twenty_twentyone = ?, twentyone_twentytwo = ?, twentytwo_twentythree = ?, twentythree_five = ?, days = ?, updated_at = NOW() WHERE DL_ID = ?",
        [five_six, six_seven, seven_eight, eight_nine, nine_ten, ten_eleven, eleven_twelve, twelve_thirteen, thirteen_fourteen, fourteen_fifteen, fifteen_sixteen, sixteen_seventeen, seventeen_eighteen, eighteen_nineteen, nineteen_twenty, twenty_twentyone, twentyone_twentytwo, twentytwo_twentythree, twentythree_five, days, DL_ID],
        (err, result) => {
            if (err) {
                console.error('Database update error', err);
                return res.status(500).json({message: 'Failed to update daily'});
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({message: "daily not found"});
            }
            res.status(200).json({message: 'daily Update successfully'});
        }
    );
});


// API Delete Module
router.put('/delete-daily/:DL_ID', (req, res) => {
    const DL_ID = req.params.DL_ID;
    
    const query = "UPDATE dailies SET is_delete = 1 WHERE DL_ID = ?";
    connection.query(query, [DL_ID], (err, result) => {
        if (err) {
            console.error('Database delete error:', err);
            return res.status(500).json({message: "Database delete error"});
        }
        if (result.affectedRows === 0){
            return res.status(404).json({message: 'Daily not found'});
        }
        res.status(200).json({message: 'Daily delete successfully'});
    });
});

// API Search Module
router.get('/search-daily', (req, res) => {
    const { eight_nine, thirteen_fourteen, days, created_at } = req.query;

    let query = "SELECT * FROM dailies WHERE 1=1 AND is_delete = 0";
    let params = [];

    if (eight_nine) {
        query += ' AND eight_nine = ?';
        params.push(eight_nine);
    }
    
    if (thirteen_fourteen) {
        query += ' AND thirteen_fourteen = ?';
        params.push(thirteen_fourteen);
    }
    if (days) {
        query += ' AND days = ?';
        params.push(days);
    }
    if (created_at) {
        query += ' AND created_at = ?';
        params.push(created_at);
    }
    
    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Database search error', err);
            return res.status(500).json({ message: "Failed to search" });
        }
        res.status(200).json(results);
    });
});

router.get('/count-days', (req, res) => {
    const query = "SELECT COUNT(DL_ID) as count_days FROM dailies WHERE is_delete = 0";
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({message: 'Failed to sum income'});
        }
        res.json({ count_days: results[0].count_days });
    })
})

module.exports = router;