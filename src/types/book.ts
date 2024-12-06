export type BookStatus = 'reading' | 'to-read' | 'finished' | 'dropped';

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  status: BookStatus;
  currentPage: number;
  totalPages: number;
  rating?: number;
  genre?: string;
  dateStarted?: string;
  dateFinished?: string;
}

export interface BookNote {
  id: string;
  bookId: string;
  content: string;
  page?: number;
  createdAt: string;
  version: number;
}