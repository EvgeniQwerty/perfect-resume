'use client';

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitch: React.FC = () => {
  const { currentLanguage, setLanguage } = useLanguage();

  return (
    <div className="flex space-x-1 rounded-md bg-gray-100 p-1">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${currentLanguage === 'en' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-700 hover:bg-gray-200'}`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('ru')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${currentLanguage === 'ru' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-700 hover:bg-gray-200'}`}
        aria-label="Switch to Russian"
      >
        RU
      </button>
    </div>
  );
};

export default LanguageSwitch;