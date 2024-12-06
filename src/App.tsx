import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { BookForm } from './components/BookForm';
import { ISBNSearch } from './components/ISBNSearch';
import { BookDetail } from './pages/BookDetail';
import { Search, Library, BarChart2 } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-cream-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex items-center px-2 py-2 text-brown-800">
                  <Library className="w-6 h-6 mr-2" />
                  <span className="font-semibold">BookTracker</span>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  to="/search"
                  className="p-2 text-brown-600 hover:text-brown-800"
                >
                  <Search className="w-5 h-5" />
                </Link>
                <Link
                  to="/stats"
                  className="p-2 text-brown-600 hover:text-brown-800"
                >
                  <BarChart2 className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<BookForm />} />
            <Route path="/search" element={<ISBNSearch />} />
            <Route path="/book/:id" element={<BookDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;