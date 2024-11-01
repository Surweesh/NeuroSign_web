const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const PORT = 3005;

// Load environment variables
require('dotenv').config();

// PostgreSQL connection setup
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Middleware to parse URL-encoded data from forms
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public','homepage.html')));

// Route to handle form submissions (database operations)
app.post('/submit', async (req, res) => {
  const { name, email } = req.body;

  try {
    const insertUserQuery = `
      INSERT INTO users (name, email)
      VALUES ($1, $2) RETURNING *
    `;
    const result = await pool.query(insertUserQuery, [name, email]);
    console.log("User inserted:", result.rows[0]);
    res.redirect('/users'); // Redirect to users page after insertion
  } catch (err) {
    console.error("Error inserting user:", err.stack);
    res.status(500).send("Error inserting user into database.");
  }
});

// Route to display all users from the database
app.get('/users', async (req, res) => {
  try {
    const fetchUsersQuery = 'SELECT * FROM users';
    const result = await pool.query(fetchUsersQuery);
    res.send(`
      <h1>All Users</h1>
      <ul>
        ${result.rows.map(user => `<li>${user.name} - ${user.email}</li>`).join('')}
      </ul>
      <a href="/">Back to Home</a>
    `);
  } catch (err) {
    console.error("Error fetching users:", err.stack);
    res.status(500).send("Error fetching users.");
  }
});

// Initialize database table if needed
async function initializeDatabase() {
  try {
    const client = await pool.connect();
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50),
        email VARCHAR(50) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await client.query(createTableQuery);
    console.log("Table 'users' is ready in the database.");
    client.release();
  } catch (err) {
    console.error("Database initialization error:", err.stack);
  }
}

// Start the server after initializing the database
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
