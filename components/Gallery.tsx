import React, { useState, useCallback } from 'react';
import { GALLERY_IMAGES } from '../constants';
import Lightbox from './Lightbox';
import { useLanguage } from '../contexts/LanguageContext';

const Gallery: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const { t } = useLanguage();

  const openLightbox = useCallback((index: number) => {
    setCurrentImage(index);
    setIsLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  const showNextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % GALLERY_IMAGES.length);
  }, []);

  const showPrevImage = useCallback(() => {
    setCurrentImage((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  }, []);

  return (
    <section id="galerij" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4A3F35]">{t('gallery_title')}</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {t('gallery_subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {GALLERY_IMAGES.map((image, index) => (
            <div key={image.id} className="group relative overflow-hidden rounded-lg cursor-pointer" onClick={() => openLightbox(index)}>
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover aspect-square transform group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg font-bold">{t('gallery_view')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isLightboxOpen && (
        <Lightbox
          image={GALLERY_IMAGES[currentImage]}
          onClose={closeLightbox}
          onNext={showNextImage}
          onPrev={showPrevImage}
        />
      )}
    </section>
  );
};

export default Gallery;