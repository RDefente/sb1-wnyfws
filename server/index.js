import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { query } from '../scripts/db.js';

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Get all books
app.get('/api/books', async (req, res) => {
  try {
    const result = await query('SELECT * FROM books ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add a new book
app.post('/api/books', async (req, res) => {
  const { title, author, isbn, status, currentPage, totalPages, genre } = req.body;
  try {
    const result = await query(
      `INSERT INTO books (title, author, isbn, status, current_page, total_pages, genre)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [title, author, isbn, status, currentPage, totalPages, genre]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update a book
app.put('/api/books/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  const setClause = Object.keys(updates)
    .map((key, index) => `${snakeCase(key)} = $${index + 2}`)
    .join(', ');
  
  try {
    const result = await query(
      `UPDATE books SET ${setClause} WHERE id = $1 RETURNING *`,
      [id, ...Object.values(updates)]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get notes for a book
app.get('/api/books/:id/notes', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query(
      'SELECT * FROM notes WHERE book_id = $1 ORDER BY created_at DESC',
      [id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add a note to a book
app.post('/api/books/:id/notes', async (req, res) => {
  const { id } = req.params;
  const { content, page } = req.body;
  try {
    const result = await query(
      'INSERT INTO notes (book_id, content, page) VALUES ($1, $2, $3) RETURNING *',
      [id, content, page]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: error.message });
  }
});

function snakeCase(str) {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});