'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

type Language = 'en' | 'ru';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.builder': 'Resume Builder',
    'hero.title': 'Create Your Perfect Resume',
    'hero.subtitle': 'In Minutes',
    'hero.cta': 'Create Resume',
    'hero.description': 'Stand out from the competition with our Harvard-style resume builder. Clean, professional formatting with AI-powered suggestions to help you create the perfect resume.',
    'features.title': 'Features',
    'feature.easyToUse.title': 'Easy to Use',
    'feature.easyToUse.description': 'No design skills needed',
    'feature.atsFriendly.title': 'ATS-Friendly',
    'feature.atsFriendly.description': 'Pass resume scanners',
    'feature.aiPowered.title': 'Powered by AI',
    'feature.aiPowered.description': 'Smart suggestions & formatting',
    'footer.copyright': '© {year} Perfect Resume. All rights reserved.',
    'dateFormat.label': 'Date Format',
    'personalInfo.title': 'Personal Information',
    'personalInfo.fullName': 'Full Name',
    'personalInfo.location': 'Location',
    'personalInfo.email': 'Email',
    'personalInfo.linkedin': 'LinkedIn URL',
    'personalInfo.telegram': 'Telegram',
    'personalInfo.phone': 'Phone Number',
    'workExperience.title': 'Work Experience',
    'workExperience.startDate': 'Start Date',
    'workExperience.endDate': 'End Date',
    'workExperience.currentJob': 'I currently work here',
    'workExperience.companyName': 'Company Name',
    'workExperience.jobTitle': 'Job Title',
    'workExperience.location': 'Location',
    'workExperience.responsibilities': 'Responsibilities',
    'workExperience.addResponsibility': 'Add Responsibility',
    'workExperience.addExperience': 'Add Work Experience',
    'workExperience.enhanceWithAI': 'Enhance with AI',
    'workExperience.enhancing': 'Enhancing...',
    'education.title': 'Education',
    'education.universityName': 'University/School Name',
    'education.location': 'Location',
    'education.degree': 'Degree',
    'education.gpa': 'GPA',
    'education.graduationYear': 'Graduation Year',
    'education.addEducation': 'Add Education',
    'skills.title': 'Skills',
    'skills.addSkill': 'Add Skill',
    'skills.generateSkills': 'Generate Skills with AI',
    'skills.generating': 'Generating...',
    'preview.title': 'Preview & Download',
    'preview.ready': 'Your resume is ready! You can download it in PDF format.',
    'preview.downloadPDF': 'Download PDF',
    'preview.preparingPDF': 'Preparing PDF...',
    'preview.livePreview': 'Live Preview',
    'buttons.back': 'Back',
    'buttons.next': 'Next',
    'validation.required': 'Required',
    'validation.fillRequired': 'Please fill in all required fields before proceeding.',
    'common.optional': '(Optional)',
    'donation.button': 'Make a donation',
    'donation.button.ru': 'Make a donation (RU)'
  },
  ru: {
    'nav.home': 'Главная',
    'nav.builder': 'Конструктор резюме',
    'hero.title': 'Создайте идеальное резюме',
    'hero.subtitle': 'за пару минут',
    'hero.cta': 'Создать резюме',
    'hero.description': 'Выделитесь среди конкурентов с помощью нашего конструктора резюме в гарвардском стиле. Чистое, профессиональное форматирование с рекомендациями на базе ИИ для создания идеального резюме.',
    'features.title': 'Возможности',
    'feature.easyToUse.title': 'Легко использовать',
    'feature.easyToUse.description': 'Не требуются навыки дизайна',
    'feature.atsFriendly.title': 'ATS-friendly',
    'feature.atsFriendly.description': 'Проходит сканеры резюме',
    'feature.aiPowered.title': 'Работает на ИИ',
    'feature.aiPowered.description': 'Умные предложения и форматирование',
    'footer.copyright': '© {year} Perfect Resume. Все права защищены.',
    'dateFormat.label': 'Формат даты',
    'personalInfo.title': 'Личная информация',
    'personalInfo.fullName': 'Полное имя',
    'personalInfo.location': 'Местоположение',
    'personalInfo.email': 'Электронная почта',
    'personalInfo.linkedin': 'LinkedIn URL',
    'personalInfo.telegram': 'Телеграм',
    'personalInfo.phone': 'Номер телефона',
    'workExperience.title': 'Опыт работы',
    'workExperience.startDate': 'Дата начала',
    'workExperience.endDate': 'Дата окончания',
    'workExperience.currentJob': 'по н.в.',
    'workExperience.companyName': 'Название компании',
    'workExperience.jobTitle': 'Должность',
    'workExperience.location': 'Местоположение',
    'workExperience.responsibilities': 'Обязанности',
    'workExperience.addResponsibility': 'Добавить обязанность',
    'workExperience.addExperience': 'Добавить опыт работы',
    'workExperience.enhanceWithAI': 'Улучшить с помощью ИИ',
    'workExperience.enhancing': 'Улучшение...',
    'education.title': 'Образование',
    'education.universityName': 'Название университета/школы',
    'education.location': 'Местоположение',
    'education.degree': 'Степень',
    'education.gpa': 'Средний балл',
    'education.graduationYear': 'Год выпуска',
    'education.addEducation': 'Добавить образование',
    'skills.title': 'Навыки',
    'skills.addSkill': 'Добавить навык',
    'skills.generateSkills': 'Сгенерировать навыки с ИИ',
    'skills.generating': 'Генерация...',
    'preview.title': 'Предпросмотр и скачивание',
    'preview.ready': 'Ваше резюме готово! Вы можете скачать его в формате PDF.',
    'preview.downloadPDF': 'Скачать PDF',
    'preview.preparingPDF': 'Подготовка PDF...',
    'buttons.back': 'Назад',
    'buttons.next': 'Далее',
    'validation.required': 'Обязательно',
    'validation.fillRequired': 'Пожалуйста, заполните все обязательные поля перед продолжением.',
    'common.optional': '(необязательно)',
    'preview.livePreview': 'Предпросмотр',
    'donation.button': 'Поддержать проект',
    'donation.button.ru': 'Поддержать проект (RU)'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      return savedLanguage || 'en';
    }
    return 'en';
  });

  const setLanguage = useCallback((lang: Language) => {
    setCurrentLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  }, []);

  const t = useCallback((key: string) => {
    const translation = (translations[currentLanguage] as { [key: string]: string })[key];
    if (key === 'footer.copyright' && translation) {
      return translation.replace('{year}', new Date().getFullYear().toString());
    }
    return translation || key;
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}