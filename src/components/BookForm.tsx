import React from 'react';
import { useBookStore } from '../store/bookStore';
import { useNavigate } from 'react-router-dom';

export function BookForm() {
  const addBook = useBookStore((state) => state.addBook);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      await addBook({
        title: formData.get('title') as string,
        author: formData.get('author') as string,
        isbn: formData.get('isbn') as string,
        status: 'to-read',
        currentPage: 0,
        totalPages: Number(formData.get('totalPages')),
        genre: formData.get('genre') as string,
      });

      navigate('/');
    } catch (error) {
      console.error('Error adding book:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Add New Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">
            Author
          </label>
          <input
            type="text"
            name="author"
            id="author"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="isbn" className="block text-sm font-medium text-gray-700">
            ISBN
          </label>
          <input
            type="text"
            name="isbn"
            id="isbn"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="totalPages" className="block text-sm font-medium text-gray-700">
            Total Pages
          </label>
          <input
            type="number"
            name="totalPages"
            id="totalPages"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
            Genre
          </label>
          <input
            type="text"
            name="genre"
            id="genre"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}