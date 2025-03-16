'use client';

import { useLanguage } from "../../contexts/LanguageContext";

const DonationButtons = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Russian donation button - CloudTips */}
      <a 
        href="https://pay.cloudtips.ru/p/0535c138" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 shadow-md transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
      >
        {t('donation.button')} ✨
      </a>
      
      {/* Worldwide donation button - DonationAlerts */}
      <a 
        href="https://www.donationalerts.com/r/evgeniqwerty" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 shadow-md transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
      >
        {t('donation.button')} 🌎
      </a>
    </div>
  );
};

export default DonationButtons;