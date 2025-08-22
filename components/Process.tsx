import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Process: React.FC = () => {
  const { t, processSteps } = useLanguage();
  return (
    <section id="werkwijze" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4A3F35]">{t('process_title')}</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {t('process_subtitle')}
          </p>
        </div>
        <div className="relative">
          <div className="absolute left-1/2 top-10 bottom-10 w-0.5 bg-gray-200 hidden md:block" aria-hidden="true"></div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            {processSteps.map((step, index) => (
              <div key={step.step} className="flex-1 max-w-sm text-center bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="mx-auto mb-4 flex items-center justify-center h-16 w-16 rounded-full bg-[#C6A969] text-[#4A3F35] text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-[#4A3F35] mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;