import FormField from "../common/FormField";
import DateFields from "./DateFields";
import Responsibilities from "./Responsibilities";
import { FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useFormikContext } from "formik";
import "../../components/animations.css";
import { useLanguage } from "../../../contexts/LanguageContext";

interface ExperienceItemProps {
  index: number;
  isCurrentJob: boolean;
  responsibilities: string[];
  onRemove: () => void;
  setFieldValue: (field: string, value: any) => void;
}

const ExperienceItem = ({ 
  index, 
  isCurrentJob, 
  responsibilities, 
  onRemove, 
  setFieldValue 
}: ExperienceItemProps) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const { values } = useFormikContext<any>();
  const { t } = useLanguage();
  
  // Get the job title from the form values
  useEffect(() => {
    if (values.workExperience && values.workExperience[index]) {
      setJobTitle(values.workExperience[index].jobTitle);
    }
  }, [values.workExperience, index]);
  
  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove();
    }, 300); // Match the animation duration
  };
  return (
    <div className={`p-4 border border-gray-200 rounded-md space-y-4 ${isRemoving ? 'animate-fade-out' : 'animate-slide-down'}`}>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{t('workExperience.title')} {index + 1}</h3>
        {index > 0 && (
          <button
            type="button"
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
            aria-label="Remove experience"
            title="Remove experience"
          >
            <FaTrash className="h-4 w-4" />
          </button>
        )}
      </div>
      <FormField
        name={`workExperience.${index}.companyName`}
        label={t('workExperience.companyName')}
      />
      <FormField
        name={`workExperience.${index}.location`}
        label={t('workExperience.location')}
        optional
      />
      <FormField
        name={`workExperience.${index}.jobTitle`}
        label={t('workExperience.jobTitle')}
      />
      
      <DateFields 
        index={index} 
        isCurrentJob={isCurrentJob} 
        setFieldValue={setFieldValue} 
      />
      
      <Responsibilities 
        index={index} 
        responsibilities={responsibilities} 
        setFieldValue={setFieldValue}
        jobTitle={jobTitle}
      />
    </div>
  );
};

export default ExperienceItem;