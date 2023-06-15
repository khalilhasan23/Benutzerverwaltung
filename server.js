const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// Verbindung zur MySQL-Datenbank herstellen
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kalil123456789*',
    database: 'newpro'
});

// Express-App erstellen
const app = express();

// Middleware für den JSON-Body-Parser
app.use(bodyParser.json());

// POST /users -> einen Nutzer anlegen
app.post('/users', (req, res) => {
    const { id, firstName, lastName, birthDate } = req.body;

    // Validierung der Eingabedaten
    if (!id || !firstName || !lastName || !birthDate) {
        return res.json({ error: 'Nutzerdaten unvollständig' });
    }

    // Prüfen, ob Nutzer bereits existiert
    connection.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Fehler beim Abfragen des Nutzers:', err);
            return res.json({ error: 'Interner Serverfehler' });
        }

        if (results.length > 0) {
            return res.json({ error: 'Nutzer mit dieser ID existiert bereits' });
        }

        // Nutzer in die Datenbank einfügen
        const newUser = { id, firstName, lastName, birthDate };
        connection.query('INSERT INTO users SET ?', newUser, (err, result) => {
            if (err) {
                console.error('Fehler beim Anlegen des Nutzers:', err);
                return res.json({ error: 'Interner Serverfehler' });
            }


            return res.json(newUser);
        });
    });
});

// GET /users -> alle Nutzer abfragen
app.get('/users', (req, res) => {
    connection.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Fehler beim Abfragen der Nutzer:', err);
            return res.json({ error: 'Interner Serverfehler' });
        }
        return res.json(results);
    });
});

// PUT /users/:id -> einen Nutzer aktualisieren
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { firstName, lastName, birthDate } = req.body;

    connection.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) {
            console.error('Fehler beim Abfragen des Nutzers:', err);
            return res.json({ error: 'Interner Serverfehler' });
        }

        if (results.length === 0) {
            return res.json({ error: 'Nutzer nicht gefunden' });
        }

        const user = results[0];

        // Aktualisierte Nutzerdaten speichern
        const updatedUser = { id: user.id, firstName, lastName, birthDate };
        connection.query('UPDATE users SET ? WHERE id = ?', [updatedUser, userId], (err) => {
            if (err) {
                console.error('Fehler beim Aktualisieren des Nutzers:', err);
                return res.json({ error: 'Interner Serverfehler' });
            }
            return res.json(updatedUser);
        });
    });
});

// DELETE /users/:id -> einen Nutzer löschen
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;

    connection.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) {
            console.error('Fehler beim Abfragen des Nutzers:', err);
            return res.json({ error: 'Interner Serverfehler' });
        }

        if (results.length === 0) {
            return res.json({ error: 'Nutzer nicht gefunden' });
        }

        const user = results[0];

        connection.query('DELETE FROM users WHERE id = ?', [userId], (err) => {
            if (err) {
                console.error('Fehler beim Löschen des Nutzers:', err);
                return res.json({ error: 'Interner Serverfehler' });
            }
            return res.json(user);
        });
    });
});

// GET /users/statistics -> Die Statistiken abfragen
app.get('/users/statistics', (req, res) => {
    connection.query('SELECT COUNT(*) AS userCount FROM users', (err, results) => {
        if (err) {
            console.error('Fehler beim Abfragen der Statistiken:', err);
            return res.json({ error: 'Interner Serverfehler' });
        }


        const userCount = results[0].userCount;


        connection.query('SELECT birthDate, COUNT(*) AS count FROM users GROUP BY birthDate', (err, results) => {
            if (err) {
                console.error('Fehler beim Abfragen der Statistiken:', err);
                return res.json({ error: 'Interner Serverfehler' });
            }

            const birthDateStats = {};

            for (let i = 0; i < results.length; i++) {
                const row = results[i];
                birthDateStats[row.birthDate] = row.count;
            }  

            return res.json({ userCount, birthDateStats });
        });
    });
});

// Server starten
app.listen(3000, () => {
    console.log('Server gestartet auf http://localhost:3000');
});
