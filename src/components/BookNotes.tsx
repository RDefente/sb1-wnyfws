import React, { useState } from 'react';
import { format } from 'date-fns';
import { useBookStore } from '../store/bookStore';
import type { BookNote } from '../types/book';
import { Clock, Edit2 } from 'lucide-react';

interface BookNotesProps {
  bookId: string;
}

export function BookNotes({ bookId }: BookNotesProps) {
  const [newNote, setNewNote] = useState('');
  const [currentPage, setCurrentPage] = useState<string>('');
  const { notes, addNote } = useBookStore();
  
  const bookNotes = notes
    .filter((note) => note.bookId === bookId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    addNote({
      bookId,
      content: newNote,
      page: currentPage ? parseInt(currentPage, 10) : undefined,
    });

    setNewNote('');
    setCurrentPage('');
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-700">
            Add a new note
          </label>
          <textarea
            id="note"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={4}
            required
          />
        </div>
        <div>
          <label htmlFor="page" className="block text-sm font-medium text-gray-700">
            Page number (optional)
          </label>
          <input
            type="number"
            id="page"
            value={currentPage}
            onChange={(e) => setCurrentPage(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="1"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Note
        </button>
      </form>

      <div className="space-y-4">
        {bookNotes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}

function NoteCard({ note }: { note: BookNote }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-2">
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{format(new Date(note.createdAt), 'MMM d, yyyy HH:mm')}</span>
        </div>
        <div className="flex items-center gap-2">
          <Edit2 className="w-4 h-4" />
          <span>Version {note.version}</span>
          {note.page && <span>• Page {note.page}</span>}
        </div>
      </div>
      <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
    </div>
  );
}