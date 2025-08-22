import React, { useState, useEffect } from 'react';
import { CONTACT_PHONE } from '../constants';
import { PhoneIcon, MenuIcon, XIcon } from './icons/CoreIcons';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, navLinks } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');

    if (targetId === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (window.history.pushState) {
            window.history.pushState("", document.title, window.location.pathname + window.location.search);
        } else {
            window.location.hash = "";
        }
        return;
    }

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#" onClick={handleSmoothScroll} className="text-2xl font-bold text-[#4A3F35] cursor-pointer">
              Messu Bouw
            </a>
          </div>

          <nav className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleSmoothScroll}
                className="text-gray-600 hover:text-[#4A3F35] transition-colors duration-300 font-medium cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} className="flex items-center justify-center bg-[#C6A969] text-[#4A3F35] font-bold py-2 px-5 rounded-full hover:bg-[#B3985E] transition-colors duration-300 shadow">
              <PhoneIcon className="h-5 w-5 mr-2" />
              {t('bel_nu')}
            </a>
          </div>

          <div className="md:hidden flex items-center">
             <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#4A3F35] focus:outline-none ml-2"
              aria-label="Open menu"
            >
              {isMenuOpen ? <XIcon className="h-7 w-7" /> : <MenuIcon className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  handleSmoothScroll(e);
                  setIsMenuOpen(false);
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#4A3F35] hover:bg-gray-50 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
             <div className="pt-4 px-3">
                 <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} className="flex items-center justify-center w-full bg-[#C6A969] text-[#4A3F35] font-bold py-3 px-5 rounded-full hover:bg-[#B3985E] transition-colors duration-300 shadow">
                  <PhoneIcon className="h-5 w-5 mr-2" />
                  {t('bel_nu')}
                </a>
             </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;