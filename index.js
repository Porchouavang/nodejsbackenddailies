const express = require('express')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const redisClient = require('redis').createClient();
const port = 3000
const app = express();

const connection = require('./dbConnection');
const userRouter = require('./user.js');
const moduleRouter = require('./module');
const noteRouter = require('./note');
const paymentRouter = require('./payment');
const planRouter = require('./plan');
const school_tableRouter = require('./school_table');
const dailyRouter = require('./daily');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', userRouter);
app.use('/api', moduleRouter);
app.use('/api', noteRouter);
app.use('/api', paymentRouter);
app.use('/api', planRouter);
app.use('/api', school_tableRouter);
app.use('/api', dailyRouter);


// API Register
app.post('/register', async (req, res) => {
    const { username, email, password, phone } = req.body;

    connection.query('SELECT * FROM users WHERE phone = ?', [phone], async (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(404).json({ message: 'Database query error' });
        }
        if (result.length > 0) return res.status(400).json({ message: 'User already exists' });

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            connection.query('INSERT INTO users (username, email, password, phone) VALUES (?, ?, ?, ?)', [username, email, hashedPassword, phone], (err, result) => {
                if (err) {
                    console.error('Database insert error:', err);
                    return res.status(404).json({ message: 'Failed to register user' });
                }
                res.status(201).json({ message: 'User registered successfully' });
            });
        } catch (error) {
            console.error('Password hashing error:', error);
            res.status(404).json({ message: 'Internal server error' });
        }
    });
});

// API Login
app.post('/login', (req, res) => {
    const {phone, password} = req.body;

    connection.query('SELECT * FROM users WHERE phone = ?', [phone], async (err, result) => {
        if (err) throw err;
        if (result.length === 0) return res.status(400).json({message: "Invalid"});

        const user = result[0];

        const IsMatch = await bcrypt.compare(password, user.password);
        if(!IsMatch) return res.status(400).json({message: 'Invalid'});

        const token = jwt.sign({id: user.id}, process.env.SECRET_JWT, {expiresIn: '2h'});
        res.json({
            message: "Login successfully",
            token: token
        });
    });
});

app.post('/logout', (req, res) => {
    const token = req.headers['authorization'].split('')[1];

    const decoded = jwt.decode(token);
    const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);

    redisClient.setEx(token, expiresIn, 'blacklisted', (err) => {
        if (err) return res.status(500).json({message: "Logout failed"});
        res.json({message: "Logout Success"});
    });
});

console.log("Nodemon to work");
console.log("Hello Nodemon Tester");
app.listen(port, ()=>{
    console.log('Server is running on port 3000');
});