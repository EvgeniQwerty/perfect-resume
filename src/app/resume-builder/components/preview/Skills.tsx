import { ResumeData } from "../../types";
import { useLanguage } from "../../../contexts/LanguageContext";

interface SkillsProps {
  data: ResumeData['skills'];
}

const Skills = ({ data }: SkillsProps) => {
  const { t } = useLanguage();
  
  return (
    <div>
      <h2 className="text-lg font-bold uppercase mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>{t('skills.title')}</h2>
      <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', lineHeight: '1.15' }}>{data.join(", ")}</p>
    </div>
  );
};

export default Skills;