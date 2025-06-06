import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en';
import siTranslation from './locales/si';
import taTranslation from './locales/ta';

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  .init({
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    
    resources: {
      en: {
        translation: enTranslation
      },
      si: {
        translation: siTranslation
      },
      ta: {
        translation: taTranslation
      }
    }
  });

export default i18n;