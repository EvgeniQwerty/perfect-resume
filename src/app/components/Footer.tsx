import { useLanguage } from "../contexts/LanguageContext";

interface FooterProps {}

export default function Footer({}: FooterProps) {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-600">{t('footer.copyright')}</p>
      </div>
    </footer>
  );
}