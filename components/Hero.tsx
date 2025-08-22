import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    if (!targetId || !targetId.startsWith('#')) return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        const headerOffset = 80; // h-20 = 5rem = 80px
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        if (history.pushState) {
            history.pushState(null, null, targetId);
        } else {
            window.location.hash = targetId;
        }
    }
  };

  return (
  <section id="home" className="relative bg-cover bg-center min-h-screen flex items-center justify-center" style={{ backgroundImage: "url('/images/okładka strony.jpg')" }}>
      <div className="absolute inset-0 bg-[#4A3F35] opacity-60"></div>
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 animate-fade-in-down">
          {t('hero_title')}
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-200 animate-fade-in-up">
          {t('hero_subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#afspraak"
            onClick={handleSmoothScroll}
            className="w-full sm:w-auto bg-[#C6A969] text-[#4A3F35] font-bold py-3 px-8 rounded-full text-lg hover:bg-[#B3985E] transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer"
          >
            {t('hero_cta1')}
          </a>
          <a
            href="#galerij"
            onClick={handleSmoothScroll}
            className="w-full sm:w-auto bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-white hover:text-[#4A3F35] transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            {t('hero_cta2')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;