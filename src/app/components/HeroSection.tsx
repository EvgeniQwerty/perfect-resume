import Link from "next/link";
import FeatureCards from "./FeatureCards";
import { useLanguage } from "../contexts/LanguageContext";

interface HeroSectionProps {}

export default function HeroSection({}: HeroSectionProps) {
  const { t } = useLanguage();
  
  return (
    <div className="w-full lg:w-1/2 pr-0 lg:pr-12 mb-12 lg:mb-0 text-left">
      <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
        {t('hero.title')}
        <span className="block text-blue-600 mt-2">{t('hero.subtitle')}</span>
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-xl">
        {t('hero.description')}
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/resume-builder" className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium inline-block">
          {t('hero.cta')}
        </Link>
      </div>
      
      <FeatureCards />
    </div>
  );
}