import { ResumeData } from "../../types";
import { useLanguage } from "../../../contexts/LanguageContext";

interface EducationProps {
  data: ResumeData['education'];
  dateFormat?: string;
}

const Education = ({ data, dateFormat = "YYYY-MM-DD" }: EducationProps) => {
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
      <h2 className="text-lg font-bold uppercase mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>{t('education.title')}</h2>
      {data.map((edu, index) => (
        <div key={index} className="mb-3" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px' }}>
          <div className="flex justify-between">
            <span className="font-bold">{edu.universityName}</span>
            <span>{edu.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="italic">{edu.degree}{edu.gpa ? `, ${t('education.gpa')}: ${edu.gpa}` : ""}</span>
            <span>{formatDate(edu.graduationDate)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Education;