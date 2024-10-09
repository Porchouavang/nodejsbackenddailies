const express = require('express')
const router = express.Router();
const connection = require('./dbConnection');

// API Create Income
router.post('/create-income', (req, res) => {
    const { income, income_reason, status} = req.body;

    connection.query("INSERT INTO payments (income, income_reason, status, created_at) VALUE (?, ?, ?, NOW())",[income, income_reason, status], (err, result) => {
        if(err) {
            console.error('Database insert error:', err);
            return res.status(500).json({message: "Failed to insert income"});
        }
        res.status(201).json({message: 'Income Insert Successfully'});
    });
    
});

router.get('/select-income', (req, res) => {
    connection.query("SELECT id, income, income_reason, status, created_at, updated_at FROM `payments` WHERE expense IS NULL ORDER BY id DESC LIMIT 5", (err, result) => {
        if (err) {
            console.log('Database query error:', err);
            return res.status(500).json({message: 'Database query error'});
        }
        if (result.length === 0) {
            return res.status(404).json({message: 'Income Not Found'});
        }
        res.status(200).json(result);
    });
});


router.get('/select-all-income', (req, res) => {
    connection.query("SELECT id, income, income_reason, status, created_at, updated_at FROM `payments` WHERE expense IS NULL ORDER BY id DESC", (err, result) => {
        if (err) {
            console.log('Database query error:', err);
            return res.status(500).json({message: 'Database query error'});
        }
        if (result.length === 0) {
            return res.status(404).json({message: 'Income Not Found'});
        }
        res.status(200).json(result);
    });
});

// API Select Note By ID
router.get("/income/:id", (req, res) => {
    const { id } = req.params;

    connection.query("SELECT id, income, income_reason, status, created_at, updated_at FROM `payments` WHERE expense  ORDER BY id DESC AND id = ? ", [id], (err, result) => {
        if (err) {
            console.error('Database selecting error', err);
            return res.status(500).json({message: "Failed to select income"});
        }
        if (result.length === 0) {
            return res.status(404).json({message: "Income not found"});
        }
        res.status(200).json(result[0]);
    });
});


// API Update Income
router.put('/update-income/:id', (req, res) => {
    const { id } = req.params;
    const { income, income_reason, status} = req.body;

    connection.query(
        "UPDATE payments SET income = ?, income_reason = ?, status = ?, updated_at = NOW() WHERE id = ?",
        [income, income_reason, status, id],
        (err, result) => {
            if (err) {
                console.error('Database update error', err);
                return res.status(500).json({message: 'Failed to update income'});
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({message: "income not found"});
            }
            res.status(200).json({message: 'Income Update successfully'});
        }
    );
});

// API Delete Income
router.delete('/delete-income/:id', (req, res) => {
    const Income_ID = req.params.id;
    
    const query = "DELETE FROM payments WHERE id = ?";
    connection.query(query, [Income_ID], (err, result) => {
        if (err) {
            console.error('Database delete error:', err);
            return res.status(500).json({message: "Database delete error"});
        }
        if (result.affectedRows === 0){
            return res.status(404).json({message: 'Income not found'});
        }
        res.status(200).json({message: 'Income delete successfully'});
    });
});



// API Search income
router.get('/search-income', (req, res) => {
    const { income, income_reason, status } = req.query;

    let query = "SELECT id, income, income_reason, status, created_at, updated_at FROM `payments` WHERE expense IS NULL AND 1=1";
    let params = [];

    if (income) {
        query += ' AND income = ?';
        params.push(income);
    }
    
    if (income_reason) {
        query += ' AND income_reason = ?';
        params.push(income_reason);
    }
    
    if (status) {
        query += ' AND status = ?';
        params.push(status);
    }
    
    console.log('Query:', query);
    console.log('Parameters:', params);

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Database search error', err);
            return res.status(500).json({ message: "Failed to search" });
        }
        res.status(200).json(results);
    });
});


// API Create Expense
router.post('/create-expense', (req, res) => {
    const { expense, expense_reason, status} = req.body;

    connection.query("INSERT INTO payments (expense, expense_reason, status, created_at) VALUE (?, ?, ?, NOW())",[expense, expense_reason, status], (err, result) => {
        if(err) {
            console.error('Database insert error:', err);
            return res.status(500).json({message: "Failed to insert expense"});
        }
        res.status(201).json({message: 'Expense Insert Successfully'});
    });
    
});

router.get('/select-expense', (req, res) => {
    connection.query("SELECT id, expense, expense_reason, status, created_at, updated_at FROM `payments` WHERE income IS NULL LIMIT 5", (err, result) => {
        if (err) {
            console.log('Database query error:', err);
            return res.status(500).json({message: 'Database query error'});
        }
        if (result.length === 0) {
            return res.status(404).json({message: 'Expense Not Found'});
        }
        res.status(200).json(result);
    });
});

router.get('/select-all-expense', (req, res) => {
    connection.query("SELECT id, expense, expense_reason, status, created_at, updated_at FROM `payments` WHERE income IS NULL ORDER BY id DESC", (err, result) => {
        if (err) {
            console.log('Database query error:', err);
            return res.status(500).json({message: 'Database query error'});
        }
        if (result.length === 0) {
            return res.status(404).json({message: 'Expense Not Found'});
        }
        res.status(200).json(result);
    });
});

// API Select Note By ID
router.get("/expense/:id", (req, res) => {
    const { id } = req.params;

    connection.query("SELECT id, expense, expense_reason, status, created_at, updated_at FROM `payments` WHERE income IS NULL AND id = ? ", [id], (err, result) => {
        if (err) {
            console.error('Database selecting error', err);
            return res.status(500).json({message: "Failed to select expense"});
        }
        if (result.length === 0) {
            return res.status(404).json({message: "Expense not found"});
        }
        res.status(200).json(result[0]);
    });
});


// API Update Expense
router.put('/update-expense/:id', (req, res) => {
    const { id } = req.params;
    const { expense, expense_reason, status} = req.body;

    connection.query(
        "UPDATE payment SET expense = ?, expense_reason = ?, status = ?, updated_at = NOW() WHERE id = ?",
        [expense, expense_reason, status, id],
        (err, result) => {
            if (err) {
                console.error('Database update error', err);
                return res.status(500).json({message: 'Failed to update expense'});
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({message: "expense not found"});
            }
            res.status(200).json({message: 'Expense Update successfully'});
        }
    );
});

// API Delete Expense
router.delete('/delete-expense/:id', (req, res) => {
    const Expense_ID = req.params.id;
    
    const query = "DELETE FROM payments WHERE id = ?";
    connection.query(query, [Expense_ID], (err, result) => {
        if (err) {
            console.error('Database delete error:', err);
            return res.status(500).json({message: "Database delete error"});
        }
        if (result.affectedRows === 0){
            return res.status(404).json({message: 'Expense not found'});
        }
        res.status(200).json({message: 'Expense delete successfully'});
    });
});

// API Search expense
router.get('/search-expense', (req, res) => {
    const { expense, expense_reason, status } = req.query;

    let query = "SELECT id, expense, expense_reason, status, created_at, updated_at FROM `payments` WHERE income IS NULL AND 1=1";
    let params = [];

    if (expense) {
        query += ' AND expense = ?';
        params.push(expense);
    }
    
    if (expense_reason) {
        query += ' AND expense_reason = ?';
        params.push(expense_reason);
    }
    
    if (status) {
        query += ' AND status = ?';
        params.push(status);
    }
    
    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Database search error', err);
            return res.status(500).json({ message: "Failed to search" });
        }
        res.status(200).json(results);
    });
});

router.get('/sum-all-income', (req, res) => {
    const query = "SELECT SUM(income) as sum_income FROM payments WHERE income IS NOT NULL";
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({message: 'Failed to sum income'});
        }
        res.json({ sum_income: results[0].sum_income });
    })
})

router.get('/sum-income-today', (req, res) => {
    const query = "SELECT SUM(income) as sum_income_today FROM payments WHERE DATE(STR_TO_DATE(created_at,'%Y-%m-%d %H:%i:%s')) = CURRENT_DATE()";
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({message: 'Failed to sum income'});
        }
        res.json({ sum_income_today: results[0].sum_income_today });
    })
})

router.get('/sum-all-expense', (req, res) => {
    const query = "SELECT SUM(expense) as sum_expense FROM payments WHERE expense IS NOT NULL";
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({message: 'Failed to sum expense'});
        }
        res.json({ sum_expense: results[0].sum_expense });
    })
})

router.get('/sum-expense-today', (req, res) => {
    const query = "SELECT SUM(expense) as sum_expense_today FROM payments WHERE DATE(STR_TO_DATE(created_at,'%Y-%m-%d %H:%i:%s')) = CURRENT_DATE()";
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({message: 'Failed to sum expense'});
        }
        res.json({ sum_expense_today: results[0].sum_expense_today });
    })
})
router.get('/sum-income-this-month', (req, res) => {
    const query = "SELECT SUM(income) as sum_income_this_month FROM payments WHERE MONTH(STR_TO_DATE(created_at,'%Y-%m-%d %H:%i:%s')) = MONTH(CURRENT_DATE()) AND YEAR(STR_TO_DATE(created_at,'%Y-%m-%d %H:%i:%s')) = YEAR(CURRENT_DATE())";
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({message: 'Failed to sum income'});
        }
        res.json({ sum_income_this_month: results[0].sum_income_this_month });
    })
})

router.get('/sum-expense-this-month', (req, res) => {
    const query = "SELECT SUM(expense) as sum_expense_this_month FROM payments WHERE MONTH(STR_TO_DATE(created_at,'%Y-%m-%d %H:%i:%s')) = MONTH(CURRENT_DATE()) AND YEAR(STR_TO_DATE(created_at,'%Y-%m-%d %H:%i:%s')) = YEAR(CURRENT_DATE())";
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({message: 'Failed to sum expense'});
        }
        res.json({ sum_expense_this_month: results[0].sum_expense_this_month });
    })
})

router.get('/sum-all-remainings', (req, res) => {
    const query = "SELECT SUM(income)-SUM(expense) as sum_remainings FROM payments";
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({message: 'Failed to sum remainings'});
        }
        res.json({ sum_remainings: results[0].sum_remainings });
    })
})


module.exports = router;
