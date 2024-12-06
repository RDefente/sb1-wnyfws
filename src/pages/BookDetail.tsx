import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookStore } from '../store/bookStore';
import { BookNotes } from '../components/BookNotes';
import { ReadingProgress } from '../components/ReadingProgress';
import { StarRating } from '../components/StarRating';
import { Book, BookOpen, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

export function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { books, updateBook } = useBookStore();
  const book = books.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <p>Book not found</p>
      </div>
    );
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateBook(book.id, {
      status: e.target.value as any,
      dateStarted: e.target.value === 'reading' ? new Date().toISOString() : book.dateStarted,
      dateFinished: e.target.value === 'finished' ? new Date().toISOString() : book.dateFinished
    });
  };

  const handleRatingChange = (rating: number) => {
    updateBook(book.id, { rating });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
            <p className="text-lg text-gray-600 mb-4">by {book.author}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Book className="w-4 h-4" />
                <span>{book.genre || 'No genre'}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>{book.totalPages} pages</span>
              </div>
            </div>
          </div>
          
          <select
            value={book.status}
            onChange={handleStatusChange}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
          >
            <option value="to-read">To Read</option>
            <option value="reading">Reading</option>
            <option value="finished">Finished</option>
            <option value="dropped">Dropped</option>
          </select>
        </div>

        {(book.status === 'reading' || book.status === 'finished') && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Reading Progress</h2>
            <ReadingProgress book={book} />
          </div>
        )}

        {(book.status === 'finished' || book.status === 'dropped') && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Rating</h2>
            <StarRating rating={book.rating || 0} onRate={handleRatingChange} />
          </div>
        )}

        {book.dateStarted && (
          <p className="text-sm text-gray-500">
            Started: {format(new Date(book.dateStarted), 'MMMM d, yyyy')}
          </p>
        )}
        {book.dateFinished && (
          <p className="text-sm text-gray-500">
            Finished: {format(new Date(book.dateFinished), 'MMMM d, yyyy')}
          </p>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Notes</h2>
        <BookNotes bookId={book.id} />
      </div>
    </div>
  );
}