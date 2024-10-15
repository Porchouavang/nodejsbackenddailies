// const express = require('express')
// const router = express.Router();
// const connection = require('./dbConnection');

// // API Create Module
// router.post('/create-school-table', (req, res) => {
//     const { first_time, second_time, third_time, fourth_time, days, since_date, until_date} = req.body;

//     connection.query("INSERT INTO school_tables (first_time, second_time, third_time, fourth_time, days, since_date, until_date, created_at) VALUE (?, ?, ?, ?, ?, ?, ?, NOW())",[first_time, second_time, third_time, fourth_time, days, since_date, until_date], (err, result) => {
//         if(err) {
//             console.error('Database insert error:', err);
//             return res.status(500).json({message: "Failed to insert module"});
//         }
//         res.status(201).json({message: 'Module Insert Successfully'});
//     });

    
// });

// // API Select Module
// router.get('/select-school-table', (req, res) => {
//     connection.query("SELECT * FROM school_tables ORDER BY id DESC", (err, result) => {
//         if (err) {
//             console.log('Database query error:', err);
//             return res.status(500).json({message: 'Database query error'});
//         }
//         if (result.length === 0) {
//             return res.status(404).json({message: 'School Tables Not Found'});
//         }
//         res.status(200).json(result);
//     });
// });

// // API SELECT module BY id
// router.get("/school-table/:id", (req, res) => {
//     const { id } = req.params;

//     connection.query("SELECT * FROM school_tables WHERE id = ? ", [id], (err, result) => {
//         if (err) {
//             console.error('Database selecting error', err);
//             return res.status(500).json({message: "Failed to select school-table"});
//         }
//         if (result.length === 0) {
//             return res.status(404).json({message: "School table not found"});
//         }
//         res.status(200).json(result[0]);
//     });
// });

// // API Update Module
// router.put('/update-school-table/:id', (req, res) => {
//     const { id } = req.params;
//     const { first_time, second_time, third_time, fourth_time, days, since_date, until_date } = req.body;

//     connection.query(
//         "UPDATE school_tables SET first_time = ?, second_time = ?, third_time = ?, fourth_time = ?, days = ?, since_date = ?, until_date = ?, updated_at = NOW() WHERE id = ?",
//         [first_time, second_time, third_time, fourth_time, days, since_date, until_date, id],
//         (err, result) => {
//             if (err) {
//                 console.error('Database update error', err);
//                 return res.status(500).json({message: 'Failed to update module'});
//             }
//             if (result.affectedRows === 0) {
//                 return res.status(404).json({message: "Module not found"});
//             }
//             res.status(200).json({message: 'Module Update successfully'});
//         }
//     );
// });


// // API Delete Module
// router.delete('/delete-school-table/:id', (req, res) => {
//     const Table_ID = req.params.id;
    
//     const query = "DELETE FROM school_tables WHERE id = ?";
//     connection.query(query, [Table_ID], (err, result) => {
//         if (err) {
//             console.error('Database delete error:', err);
//             return res.status(500).json({message: "Database delete error"});
//         }
//         if (result.affectedRows === 0){
//             return res.status(404).json({message: 'School Table not found'});
//         }
//         res.status(200).json({message: 'School Table delete successfully'});
//     });
// });

// // API Search Module
// router.get('/search-school-table', (req, res) => {
//     const { first_time, second_time, third_time, fourth_time, days, since_date, until_date } = req.query;

//     let query = "SELECT * FROM school_tables WHERE 1=1";
//     let params = [];

//     if (first_time) {
//         query += ' AND first_time = ?';
//         params.push(first_time);
//     }
//     if (second_time) {
//         query += ' AND second_time = ?';
//         params.push(second_time);
//     }
//     if (third_time) {
//         query += ' AND third_time = ?';
//         params.push(third_time);
//     }
//     if (fourth_time) {
//         query += ' AND fourth_time = ?';
//         params.push(fourth_time);
//     }
//     if (days) {
//         query += ' AND days = ?';
//         params.push(days);
//     }
//     if (since_date) {
//         query += ' AND since_date = ?';
//         params.push(since_date);
//     }
//     if (until_date) {
//         query += ' AND until_date = ?';
//         params.push(until_date);
//     }
    
//     connection.query(query, params, (err, results) => {
//         if (err) {
//             console.error('Database search error', err);
//             return res.status(500).json({ message: "Failed to search" });
//         }
//         res.status(200).json(results);
//     });
// });

// module.exports = router;