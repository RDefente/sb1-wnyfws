import React, { useEffect } from 'react';
import { useBookStore } from '../store/bookStore';
import { BookProgress } from '../components/BookProgress';
import { StarRating } from '../components/StarRating';
import { Plus, BookOpen, BookMarked, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BookCarousel } from '../components/BookCarousel';

export function Dashboard() {
  const { books, fetchBooks } = useBookStore();

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const readingBooks = books.filter((book) => book.status === 'reading').slice(0, 5);
  const toReadBooks = books.filter((book) => book.status === 'to-read').slice(0, 5);
  const finishedBooks = books.filter((book) => book.status === 'finished').slice(0, 5);

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        <BookCarousel title={
          <div className="flex items-center gap-2 text-brown-700">
            <BookOpen className="w-5 h-5" />
            <span>Currently Reading</span>
          </div>
        }>
          {readingBooks.map((book) => (
            <div key={book.id} className="flex-none w-72">
              <BookProgress
                title={book.title}
                currentPage={book.currentPage}
                totalPages={book.totalPages}
              />
            </div>
          ))}
        </BookCarousel>

        <BookCarousel title={
          <div className="flex items-center gap-2 text-brown-700">
            <BookMarked className="w-5 h-5" />
            <span>To Read</span>
          </div>
        }>
          {toReadBooks.map((book) => (
            <Link
              key={book.id}
              to={`/book/${book.id}`}
              className="flex-none w-72 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium text-brown-800">{book.title}</h3>
              <p className="text-sm text-brown-600">{book.author}</p>
            </Link>
          ))}
        </BookCarousel>

        <BookCarousel title={
          <div className="flex items-center gap-2 text-brown-700">
            <CheckCircle className="w-5 h-5" />
            <span>Recently Finished</span>
          </div>
        }>
          {finishedBooks.map((book) => (
            <Link
              key={book.id}
              to={`/book/${book.id}`}
              className="flex-none w-72 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium text-brown-800">{book.title}</h3>
              <p className="text-sm text-brown-600">{book.author}</p>
              {book.rating && (
                <div className="mt-2">
                  <StarRating rating={book.rating} readonly />
                </div>
              )}
            </Link>
          ))}
        </BookCarousel>
      </div>

      <Link
        to="/add"
        className="fixed bottom-8 right-8 bg-brown-600 text-cream-50 p-4 rounded-full shadow-lg hover:bg-brown-700 transition-colors"
      >
        <Plus className="w-6 h-6" />
      </Link>
    </div>
  );
}