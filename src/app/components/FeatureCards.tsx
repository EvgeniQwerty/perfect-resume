import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";

interface FeatureCardsProps {}

export default function FeatureCards({}: FeatureCardsProps) {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: "/file.svg",
      titleKey: "feature.easyToUse.title",
      descriptionKey: "feature.easyToUse.description"
    },
    {
      icon: "/globe.svg",
      titleKey: "feature.atsFriendly.title",
      descriptionKey: "feature.atsFriendly.description"
    },
    {
      icon: "/window.svg",
      titleKey: "feature.aiPowered.title",
      descriptionKey: "feature.aiPowered.description"
    }
  ];

  return (
    <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-xl">
      {features.map((feature, index) => (
        <div key={index} className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Image src={feature.icon} alt={t(feature.titleKey)} width={24} height={24} className="text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">{t(feature.titleKey)}</h3>
          <p className="text-gray-600">{t(feature.descriptionKey)}</p>
        </div>
      ))}
    </div>
  );
}