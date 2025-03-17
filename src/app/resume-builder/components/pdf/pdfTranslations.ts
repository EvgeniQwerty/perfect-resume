// PDF-specific translations to ensure proper rendering of text in PDFs

type TranslationKey = 
  | 'personalInfo.title'
  | 'workExperience.title'
  | 'workExperience.currentJob'
  | 'education.title'
  | 'education.gpa'
  | 'skills.title';

type TranslationsType = {
  [key in 'en' | 'ru']: {
    [key in TranslationKey]: string;
  };
};

// Direct translations for PDF rendering
export const pdfTranslations: TranslationsType = {
  en: {
    'personalInfo.title': 'Personal Information',
    'workExperience.title': 'Work Experience',
    'workExperience.currentJob': 'Present',
    'education.title': 'Education',
    'education.gpa': 'GPA',
    'skills.title': 'Skills'
  },
  ru: {
    'personalInfo.title': 'Личная информация',
    'workExperience.title': 'Опыт работы',
    'workExperience.currentJob': 'по н.в.',
    'education.title': 'Образование',
    'education.gpa': 'Средний балл',
    'skills.title': 'Навыки'
  }
};

// Simple translation function for PDF components
export const getPdfTranslation = (key: TranslationKey, language: 'en' | 'ru'): string => {
  return pdfTranslations[language][key] || key;
};

// Helper to get current language from localStorage
export const getCurrentLanguage = (): 'en' | 'ru' => {
  if (typeof window !== 'undefined') {
    const savedLanguage = localStorage.getItem('language') as 'en' | 'ru';
    return savedLanguage || 'en';
  }
  return 'en';
};