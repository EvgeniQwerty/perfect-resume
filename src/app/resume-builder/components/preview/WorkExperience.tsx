import { ResumeData } from "../../types";
import { useLanguage } from "../../../contexts/LanguageContext";

interface WorkExperienceProps {
  data: ResumeData['workExperience'];
  dateFormat?: string;
}

const WorkExperience = ({ data, dateFormat = "YYYY-MM-DD" }: WorkExperienceProps) => {
  const { t } = useLanguage();
  
  // Helper function to format dates based on the selected format
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    
    const [year, month, day] = dateString.split("-");
    
    // Get current language from context
    const { currentLanguage } = useLanguage();
    const language = currentLanguage || 'en'; // Fallback to English if undefined
    
    // Month names for localization
    const monthNamesShort = {
      en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      ru: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"]
    };
    
    const monthNamesFull = {
      en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      ru: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
    };
    
    // Ensure month is a valid number between 1-12
    const monthIndex = Math.max(0, Math.min(11, parseInt(month) - 1));
    
    switch (dateFormat) {
      case "MM/DD/YYYY":
        return `${month}/${day}/${year}`;
      case "DD/MM/YYYY":
        return `${day}/${month}/${year}`;
      case "DD.MM.YYYY":
        return `${day}.${month}.${year}`;
      case "MMM DD, YYYY":
        return `${monthNamesShort[language][monthIndex]} ${day}, ${year}`;
      case "MMMM YYYY":
        return `${monthNamesFull[language][monthIndex]} ${year}`;
      default: // YYYY-MM-DD
        return dateString;
    }
  };
  
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold uppercase mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>{t('workExperience.title')}</h2>
      {data.map((job, index) => (
        <div key={index} className="mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px' }}>
          <div className="flex justify-between">
            <span className="font-bold">{job.companyName}</span>
            {job.location && <span>{job.location}</span>}
          </div>
          <div className="flex justify-between">
            <span className="italic">{job.jobTitle}</span>
            <span>
              {formatDate(job.startDate)} - {job.isCurrentJob ? t('workExperience.currentJob') : formatDate(job.endDate)}
            </span>
          </div>
          <ul className="list-disc pl-5 mt-1">
            {job.responsibilities.map((resp, idx) => (
              <li key={idx}>{resp}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default WorkExperience;