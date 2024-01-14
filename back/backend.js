const express = require('express')
const { Pool } = require('pg')
const multer = require('multer');
const cors = require('cors')
const path = require('path');

const app = express()
const port = 3001

app.use(cors())

const pool = new Pool({
    user: 'dubciuc',
    host: 'localhost',
    database: 'postgres',
    password: 'dubciuc',
    port: 5430
})

app.use(express.json())

const storage = multer.memoryStorage(); // Use memory storage for simplicity; adjust as needed
const upload = multer({ storage });

app.post('/submit-form', async (req, res) => {
    try {
        const userData = req.body;


        const existingUser = await pool.query('SELECT * FROM log WHERE email = $1 AND password = $2', [userData.email, userData.password]);

        if (existingUser.rows.length > 0) {
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ success: false, message: 'Error during login' });
    }
});

app.post('/api/upload', async (req, res) => {
    try {
        const { fName, lName, age, email } = req.body;
        const query = 'INSERT INTO info ("fName", "lName", "age", "email") VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [fName, lName, age, email];
        const result = await pool.query(query, values);
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Eroare internă.');
    }
});


app.get('/date', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM info');
        res.json(result.rows);
    } catch (error) {
        console.error('Eroare la interogare:', error);
        res.status(500).send('Eroare la interogare');
    }
});


app.get('/utilizator-fName/:fName', async (req, res) => {
    const username = req.params.fName;
    try {
        const result = await pool.query('SELECT * FROM info WHERE "fName" = $1', [username]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Eroare la interogare:', error);
        res.status(500).send('Eroare la interogare');
    }
});


app.put('/update-email/:fName', async (req, res) => {
    const username = req.params.fName;
    const { newEmail } = req.body;
    try {
        const result = await pool.query('UPDATE info SET email = $1 WHERE "fName" = $2 RETURNING *', [newEmail, username]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Eroare la actualizarea emailului utilizatorului:', error);
        res.status(500).send('Eroare la actualizarea emailului utilizatorului');
    }
});


app.delete('/delete-user/:fName', async (req, res) => {
    const username = req.params.fName;
    try {
        const result = await pool.query('DELETE FROM info WHERE "fName" = $1 RETURNING *', [username]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Eroare la ștergerea utilizatorului după nume:', error);
        res.status(500).send('Eroare la ștergerea utilizatorului după nume');
    }
});


app.listen(port, () => {
    console.log(`Serverul rulează la adresa http://localhost:${port}`);
});