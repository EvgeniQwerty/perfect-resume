'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface DateFormatSelectorProps {
  selectedFormat: string;
  onChange: (format: string) => void;
}

const dateFormats = [
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (2023-01-31)' },
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (01/31/2023)' },
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (31/01/2023)' },
  { value: 'DD.MM.YYYY', label: 'DD.MM.YYYY (31.01.2023)' },
  { value: 'MMM DD, YYYY', label: 'MMM DD, YYYY (Jan 31, 2023)' },
  { value: 'MMMM YYYY', label: 'MMMM YYYY (January 2023)' },
];

const DateFormatSelector: React.FC<DateFormatSelectorProps> = ({ selectedFormat, onChange }) => {
  // Safe access to context
  let t: (key: string) => string;
  try {
    const context = useLanguage();
    t = context.t;
  } catch (error) {
    // Fallback function if context is not available
    t = (key: string) => {
      if (key === 'dateFormat.label') return 'Date Format';
      return key;
    };
  }
  
  return (
    <div className="mb-4">
      <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700 mb-1">
        {t('dateFormat.label')}
      </label>
      <select
        id="dateFormat"
        value={selectedFormat}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        {dateFormats.map((format) => (
          <option key={format.value} value={format.value}>
            {format.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DateFormatSelector;