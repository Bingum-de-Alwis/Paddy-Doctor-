import React, { createContext, useState, useEffect, useContext } from 'react';
import i18n from 'i18next';

type Language = 'en' | 'si' | 'ta';

type LanguageContextType = {
  currentLanguage: Language;
  changeLanguage: (language: Language) => void;
  isRTL: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  
  // RTL is needed for Tamil
  const isRTL = currentLanguage === 'ta';

  // Initialize language from localStorage or browser settings
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language | null;
    
    if (savedLanguage && ['en', 'si', 'ta'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage);
    } else {
      // Default to English
      setCurrentLanguage('en');
      i18n.changeLanguage('en');
    }
  }, []);

  // Update RTL class on the document when language changes
  useEffect(() => {
    if (isRTL) {
      document.documentElement.classList.add('rtl');
    } else {
      document.documentElement.classList.remove('rtl');
    }
  }, [isRTL]);

  const changeLanguage = (language: Language) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
    localStorage.setItem('language', language);
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        changeLanguage,
        isRTL
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};