import React from 'react';
import { CONTACT_PHONE } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t, navLinks } = useLanguage();

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
    <footer className="bg-[#4A3F35] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Column 1: Logo & Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Messu Bouw</h3>
            <p className="text-gray-300">
              {t('footer_description')}
            </p>
            <div className="space-y-2 text-gray-300">
              <p>{t('footer_address_label')}: {t('footer_address_value')}</p>
              <p>{t('footer_phone_label')}: <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} className="hover:text-[#C6A969]">{CONTACT_PHONE}</a></p>
              <p>Email: <a href="mailto:info@messubouw.nl" className="hover:text-[#C6A969]">info@messubouw.nl</a></p>
              <p>KVK: 12345678 | BTW: NL123456789B01</p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer_quicklinks')}</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} onClick={handleSmoothScroll} className="text-gray-300 hover:text-[#C6A969] transition-colors cursor-pointer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
      <div className="bg-gray-900 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
          &copy; {currentYear} Messu Bouw. {t('footer_rights')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;