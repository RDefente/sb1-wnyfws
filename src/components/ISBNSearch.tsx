import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Loader2 } from 'lucide-react';
import { searchByISBN } from '../services/openLibrary';
import { useBookStore } from '../store/bookStore';

export function ISBNSearch() {
  const [isbn, setIsbn] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const addBook = useBookStore((state) => state.addBook);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const bookData = await searchByISBN(isbn.replace(/-/g, ''));
      
      if (!bookData) {
        setError('Book not found. Please check the ISBN and try again.');
        return;
      }

      const newBook = {
        title: bookData.title,
        author: bookData.authors?.[0]?.name || 'Unknown Author',
        isbn: isbn,
        status: 'to-read' as const,
        currentPage: 0,
        totalPages: bookData.number_of_pages || 0,
        genre: bookData.subjects?.[0] || undefined,
      };

      addBook(newBook);
      navigate('/');
    } catch (err) {
      setError('An error occurred while searching. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Search by ISBN</h1>
      
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            placeholder="Enter ISBN (e.g., 978-0-7475-3269-9)"
            className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            pattern="^(?:\d{10}|\d{13}|(?:\d{3}-\d-\d{3}-\d{5}-\d))$"
            title="Please enter a valid 10 or 13 digit ISBN"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-600 hover:text-gray-900"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">How to find ISBN?</h2>
        <p className="text-gray-600">
          The ISBN (International Standard Book Number) can usually be found:
        </p>
        <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
          <li>On the back cover of the book, near the barcode</li>
          <li>On the copyright page (one of the first pages)</li>
          <li>On most online bookstore listings</li>
        </ul>
      </div>
    </div>
  );
}