import axios from 'axios';
import type { Book, BookNote } from '../types/book';

const api = axios.create({
  baseURL: 'http://localhost:3001/api'
});

export async function getAllBooks(): Promise<Book[]> {
  try {
    const { data } = await api.get('/books');
    return data.map(transformBook);
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
}

export async function addBook(book: Omit<Book, 'id'>): Promise<Book> {
  const { data } = await api.post('/books', book);
  return transformBook(data);
}

export async function updateBook(id: string, updates: Partial<Book>): Promise<Book> {
  const { data } = await api.put(`/books/${id}`, updates);
  return transformBook(data);
}

export async function getBookNotes(bookId: string): Promise<BookNote[]> {
  try {
    const { data } = await api.get(`/books/${bookId}/notes`);
    return data.map(transformNote);
  } catch (error) {
    console.error('Error fetching notes:', error);
    return [];
  }
}

export async function addBookNote(
  bookId: string,
  note: Omit<BookNote, 'id' | 'createdAt' | 'version'>
): Promise<BookNote> {
  const { data } = await api.post(`/books/${bookId}/notes`, note);
  return transformNote(data);
}

function transformBook(dbBook: any): Book {
  return {
    id: dbBook.id,
    title: dbBook.title,
    author: dbBook.author,
    isbn: dbBook.isbn,
    status: dbBook.status,
    currentPage: dbBook.current_page,
    totalPages: dbBook.total_pages,
    rating: dbBook.rating,
    genre: dbBook.genre,
    dateStarted: dbBook.date_started,
    dateFinished: dbBook.date_finished
  };
}

function transformNote(dbNote: any): BookNote {
  return {
    id: dbNote.id,
    bookId: dbNote.book_id,
    content: dbNote.content,
    page: dbNote.page,
    version: dbNote.version,
    createdAt: dbNote.created_at
  };
}