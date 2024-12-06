import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onRate?: (rating: number) => void;
  readonly?: boolean;
}

export function StarRating({ rating, onRate, readonly = false }: StarRatingProps) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          onClick={() => onRate?.(i + 1)}
          disabled={readonly}
          className="text-2xl focus:outline-none disabled:cursor-default"
          type="button"
        >
          <Star
            className={`w-6 h-6 ${
              rating > i
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
}