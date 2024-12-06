import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Book, BookNote } from '../types/book';
import * as api from '../services/api';

interface BookStore {
  books: Book[];
  notes: BookNote[];
  addBook: (book: Omit<Book, 'id'>) => Promise<void>;
  updateBook: (id: string, updates: Partial<Book>) => Promise<void>;
  addNote: (note: Omit<BookNote, 'id' | 'createdAt' | 'version'>) => Promise<void>;
  updateNote: (id: string, content: string) => void;
  fetchBooks: () => Promise<void>;
  fetchNotes: (bookId: string) => Promise<void>;
}

export const useBookStore = create<BookStore>()(
  persist(
    (set) => ({
      books: [],
      notes: [],
      addBook: async (book) => {
        const newBook = await api.addBook(book);
        set((state) => ({
          books: [newBook, ...state.books],
        }));
      },
      updateBook: async (id, updates) => {
        const updatedBook = await api.updateBook(id, updates);
        set((state) => ({
          books: state.books.map((book) =>
            book.id === id ? updatedBook : book
          ),
        }));
      },
      addNote: async (note) => {
        const newNote = await api.addBookNote(note.bookId, note);
        set((state) => ({
          notes: [newNote, ...state.notes],
        }));
      },
      updateNote: (id, content) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? {
                  ...note,
                  content,
                  version: note.version + 1,
                }
              : note
          ),
        })),
      fetchBooks: async () => {
        const books = await api.getAllBooks();
        set({ books });
      },
      fetchNotes: async (bookId) => {
        const notes = await api.getBookNotes(bookId);
        set((state) => ({
          notes: [...state.notes.filter(n => n.bookId !== bookId), ...notes]
        }));
      },
    }),
    {
      name: 'book-store',
    }
  )
);