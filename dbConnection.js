;
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

console.log('Database:', process.env.DB_DATABASE);
connection.connect((err) => {
    if (err) {
        console.error("Error connecting to mysql", err);
        return;
    }
    console.log("Connection to Mysql has been successfully");
});

module.exports = connection;