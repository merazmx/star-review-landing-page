
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Conectar a SQLite
const db = new sqlite3.Database('database.sqlite', (err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Inicializar la base de datos
function initializeDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS feedback (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      rating INTEGER NOT NULL,
      name TEXT,
      email TEXT,
      feedback TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      banner_url TEXT,
      feedback_text JSON
    )
  `);
}

app.use(express.json());
app.use(express.static(path.join(__dirname, '../')));

// Rutas API
app.post('/api/feedback', (req, res) => {
  const { rating, name, email, feedback } = req.body;
  db.run(
    'INSERT INTO feedback (rating, name, email, feedback) VALUES (?, ?, ?, ?)',
    [rating, name, email, feedback],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Feedback saved successfully' });
    }
  );
});

app.get('/api/settings', (req, res) => {
  db.get('SELECT * FROM settings WHERE id = 1', (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row || {});
  });
});

app.post('/api/settings', (req, res) => {
  const { banner_url, feedback_text } = req.body;
  db.run(
    'INSERT OR REPLACE INTO settings (id, banner_url, feedback_text) VALUES (1, ?, ?)',
    [banner_url, JSON.stringify(feedback_text)],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Settings updated successfully' });
    }
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
