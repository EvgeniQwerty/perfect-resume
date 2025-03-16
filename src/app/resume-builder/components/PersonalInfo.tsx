import { ResumeData } from "../types";
import FormField from "./common/FormField";
import "./animations.css";
import { useLanguage } from "../../contexts/LanguageContext";

interface PersonalInfoProps {
  values: ResumeData;
}

const PersonalInfo = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-4 animate-slide-down">
      <h2 className="text-xl font-semibold">{t('personalInfo.title')}</h2>
      <FormField
        name="personalInfo.fullName"
        label={t('personalInfo.fullName')}
      />
      <FormField
        name="personalInfo.location"
        label={t('personalInfo.location')}
        optional
      />
      <FormField
        name="personalInfo.email"
        label={t('personalInfo.email')}
        type="email"
      />
      <FormField
        name="personalInfo.linkedin"
        label={t('personalInfo.linkedin')}
        optional
      />
      <FormField
        name="personalInfo.telegram"
        label={t('personalInfo.telegram')}
        optional
      />
      <FormField
        name="personalInfo.phone"
        label={t('personalInfo.phone')}
        optional
      />
    </div>
  );
};

export default PersonalInfo;