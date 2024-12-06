import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BookCarouselProps {
  title: string;
  children: React.ReactNode;
}

export function BookCarousel({ title, children }: BookCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' });

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative">
      <h2 className="text-xl font-semibold text-brown-900 mb-4">{title}</h2>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {children}
        </div>
      </div>
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-cream-100 p-2 rounded-full shadow-md hover:bg-cream-200 transition-colors"
        onClick={scrollPrev}
      >
        <ChevronLeft className="w-5 h-5 text-brown-700" />
      </button>
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-cream-100 p-2 rounded-full shadow-md hover:bg-cream-200 transition-colors"
        onClick={scrollNext}
      >
        <ChevronRight className="w-5 h-5 text-brown-700" />
      </button>
    </div>
  );
}