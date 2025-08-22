import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Process from './components/Process';
import Booking from './components/Booking';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="bg-white text-gray-800">
        <Header />
        <main>
          <Hero />
          <Services />
          <Gallery />
          <Process />
          <Booking />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;