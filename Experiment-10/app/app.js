const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 5000;

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'rootpass',
    database: process.env.DB_NAME || 'labdb'
};

app.get('/', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.query('SELECT NOW() AS currentTime');
        await connection.end();

        res.send(`Successfully connected to MySQL! Database time: ${rows[0].currentTime}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Could not connect to MySQL database.');
    }
});

app.listen(PORT, () => {
    console.log(`Web server running on port ${PORT}`);
});