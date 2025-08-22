import React, { createContext, useState, useContext, useMemo, useEffect, ReactNode } from 'react';
import { translations } from '../translations';
import type { NavLink, Service, ProcessStep } from '../types';
import { WrenchScrewdriverIcon, HomeModernIcon, ShieldCheckIcon } from '../components/icons/FeatureIcons';

type Language = 'nl' | 'pl';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  navLinks: NavLink[];
  services: Service[];
  processSteps: ProcessStep[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('nl');

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const navLinks = useMemo<NavLink[]>(() => [
    { href: '#diensten', label: t('nav_diensten') },
    { href: '#galerij', label: t('nav_galerij') },
    { href: '#werkwijze', label: t('nav_werkwijze') },
    { href: '#afspraak', label: t('nav_afspraak') },
  ], [language]);

  const services = useMemo<Service[]>(() => [
    {
      icon: WrenchScrewdriverIcon,
      title: t('service_1_title'),
      description: t('service_1_desc'),
    },
    {
      icon: HomeModernIcon,
      title: t('service_2_title'),
      description: t('service_2_desc'),
    },
    {
      icon: ShieldCheckIcon,
      title: t('service_3_title'),
      description: t('service_3_desc'),
    },
  ], [language]);

  const processSteps = useMemo<ProcessStep[]>(() => [
    {
      step: 1,
      title: t('process_step1_title'),
      description: t('process_step1_desc'),
    },
    {
      step: 2,
      title: t('process_step2_title'),
      description: t('process_step2_desc'),
    },
    {
      step: 3,
      title: t('process_step3_title'),
      description: t('process_step3_desc'),
    },
  ], [language]);

  const value = {
    language,
    setLanguage,
    t,
    navLinks,
    services,
    processSteps,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};