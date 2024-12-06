import React from 'react';
import { BookOpen } from 'lucide-react';

interface BookProgressProps {
  currentPage: number;
  totalPages: number;
  title: string;
}

export function BookProgress({ currentPage, totalPages, title }: BookProgressProps) {
  const progress = (currentPage / totalPages) * 100;

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center gap-3 mb-2">
        <BookOpen className="w-5 h-5 text-blue-600" />
        <h3 className="font-medium text-gray-900">{title}</h3>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-gray-600 mt-1">
        {currentPage} of {totalPages} pages ({Math.round(progress)}%)
      </p>
    </div>
  );
}