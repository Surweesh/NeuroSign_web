const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');

// Initialize Express
const app = express();
const PORT = 10004;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// PostgreSQL connection pool
const pool = new Pool({
    user: '',          // Replace with your PostgreSQL username
    host: 'localhost',
    database: 'NeuroSign', // Replace with your database name
    password: '',   // Replace with your PostgreSQL password
    port: 5432,                     // Default PostgreSQL port
});

// Serve login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'registration.html'));
});

// Login route
app.post('/sign', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);

        if (result.rows.length > 0) {
            res.status(200).send('Login successful!');
        } else {
            res.status(401).send('Invalid username or password.');
        }
    } catch (error) {
        console.error('Error executing query', error.stack);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
