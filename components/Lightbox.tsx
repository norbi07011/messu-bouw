import React, { useEffect } from 'react';
import type { GalleryImage } from '../types';
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from './icons/CoreIcons';

interface LightboxProps {
  image: GalleryImage;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ image, onClose, onNext, onPrev }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 z-[100] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <img src={image.src} alt={image.alt} className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />

        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 sm:top-2 sm:right-2 bg-white text-gray-800 rounded-full p-2 hover:bg-gray-200 transition-colors"
          aria-label="Close"
        >
          <XIcon className="h-6 w-6" />
        </button>

        <button
          onClick={onPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white text-gray-800 rounded-full p-2 hover:bg-gray-200 transition-colors hidden sm:block"
          aria-label="Previous image"
        >
          <ChevronLeftIcon className="h-8 w-8" />
        </button>

        <button
          onClick={onNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white text-gray-800 rounded-full p-2 hover:bg-gray-200 transition-colors hidden sm:block"
          aria-label="Next image"
        >
          <ChevronRightIcon className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
};

export default Lightbox;