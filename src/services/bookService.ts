import { query } from '../db';
import type { Book, BookNote } from '../types/book';

export async function getAllBooks(): Promise<Book[]> {
  const result = await query('SELECT * FROM books ORDER BY created_at DESC');
  return result.rows.map(row => ({
    id: row.id,
    title: row.title,
    author: row.author,
    isbn: row.isbn,
    status: row.status,
    currentPage: row.current_page,
    totalPages: row.total_pages,
    rating: row.rating,
    genre: row.genre,
    dateStarted: row.date_started?.toISOString(),
    dateFinished: row.date_finished?.toISOString()
  }));
}

export async function addBook(book: Omit<Book, 'id'>): Promise<Book> {
  const result = await query(
    `INSERT INTO books (
      title, author, isbn, status, current_page, total_pages, genre
    ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [book.title, book.author, book.isbn, book.status, book.currentPage, book.totalPages, book.genre]
  );
  return result.rows[0];
}

export async function updateBook(id: string, updates: Partial<Book>): Promise<Book> {
  const setClause = Object.entries(updates)
    .map(([key, _], index) => `${snakeCaseKey(key)} = $${index + 2}`)
    .join(', ');
  
  const result = await query(
    `UPDATE books SET ${setClause} WHERE id = $1 RETURNING *`,
    [id, ...Object.values(updates)]
  );
  return result.rows[0];
}

export async function getBookNotes(bookId: string): Promise<BookNote[]> {
  const result = await query(
    'SELECT * FROM notes WHERE book_id = $1 ORDER BY created_at DESC',
    [bookId]
  );
  return result.rows.map(row => ({
    id: row.id,
    bookId: row.book_id,
    content: row.content,
    page: row.page,
    version: row.version,
    createdAt: row.created_at.toISOString()
  }));
}

export async function addBookNote(note: Omit<BookNote, 'id' | 'createdAt' | 'version'>): Promise<BookNote> {
  const result = await query(
    'INSERT INTO notes (book_id, content, page) VALUES ($1, $2, $3) RETURNING *',
    [note.bookId, note.content, note.page]
  );
  return result.rows[0];
}

function snakeCaseKey(key: string): string {
  return key.replace(/([A-Z])/g, '_$1').toLowerCase();
}