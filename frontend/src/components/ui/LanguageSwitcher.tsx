import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslation } from 'react-i18next';
import { GlobeIcon } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const { t } = useTranslation();
  
  // Language options
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'si', name: 'සිංහල' },
    { code: 'ta', name: 'தமிழ்' }
  ] as const;

  return (
    <div className="relative inline-block text-left">
      <div className="group">
        <button className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 focus:outline-none">
          <GlobeIcon className="h-4 w-4 text-gray-600" />
          <span className="hidden sm:inline-block">{languages.find(l => l.code === currentLanguage)?.name || 'Language'}</span>
        </button>
        
        <div className="absolute right-0 mt-1 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 hidden group-hover:block">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {languages.map((language) => (
              <button
                key={language.code}
                className={`block px-4 py-2 text-sm w-full text-left ${
                  currentLanguage === language.code
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => changeLanguage(language.code)}
                role="menuitem"
              >
                {language.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;