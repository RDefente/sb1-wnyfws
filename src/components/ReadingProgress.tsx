import React from 'react';
import { useBookStore } from '../store/bookStore';
import type { Book } from '../types/book';

interface ReadingProgressProps {
  book: Book;
}

export function ReadingProgress({ book }: ReadingProgressProps) {
  const updateBook = useBookStore((state) => state.updateBook);
  const progress = (book.currentPage / book.totalPages) * 100;

  const handleProgressUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPage = parseInt(e.target.value, 10);
    updateBook(book.id, { 
      currentPage: newPage,
      status: newPage === book.totalPages ? 'finished' : 'reading',
      dateFinished: newPage === book.totalPages ? new Date().toISOString() : undefined
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>Page {book.currentPage} of {book.totalPages}</span>
        <span>{Math.round(progress)}% complete</span>
      </div>
      <input
        type="range"
        min="0"
        max={book.totalPages}
        value={book.currentPage}
        onChange={handleProgressUpdate}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <input
        type="number"
        min="0"
        max={book.totalPages}
        value={book.currentPage}
        onChange={handleProgressUpdate}
        className="w-24 px-2 py-1 text-sm border border-gray-300 rounded-md"
      />
    </div>
  );
}