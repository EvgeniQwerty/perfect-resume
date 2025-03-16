'use client';

import { useLanguage } from "../../contexts/LanguageContext";

interface NavigationButtonsProps {
  activeStep: number;
  steps: string[];
  handleBack: () => void;
  handleNext: () => void;
  values?: any;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
}

const NavigationButtons = ({ 
  activeStep, 
  steps, 
  handleBack, 
  handleNext,
  values,
  setFieldValue
}: NavigationButtonsProps) => {
  const { t } = useLanguage();

  const validateCurrentStep = () => {
    if (!values) return false;
    
    let hasErrors = false;
    
    if (activeStep === 0) {
      // Personal Info validation
      hasErrors = !values.personalInfo.fullName || !values.personalInfo.email;
    } else if (activeStep === 1) {
      // Work Experience validation
      hasErrors = values.workExperience.some((job: any) => {
        const hasEndDateError = !job.isCurrentJob && !job.endDate;
        return !job.companyName || !job.jobTitle || !job.startDate || hasEndDateError;
      });
    } else if (activeStep === 2) {
      // Education validation
      hasErrors = values.education.some((edu: any) => {
        return !edu.universityName || !edu.location || !edu.degree || !edu.graduationDate;
      });
    }
    
    return hasErrors;
  };

  const touchFieldsInCurrentStep = () => {
    if (!setFieldValue || !values) return;
    
    if (activeStep === 0) {
      // Touch personal info fields
      setFieldValue('personalInfo.fullName', values.personalInfo.fullName, true);
      setFieldValue('personalInfo.email', values.personalInfo.email, true);
    } else if (activeStep === 1) {
      // Touch work experience fields
      values.workExperience.forEach((_: any, idx: number) => {
        setFieldValue(`workExperience.${idx}.companyName`, values.workExperience[idx].companyName, true);
        setFieldValue(`workExperience.${idx}.jobTitle`, values.workExperience[idx].jobTitle, true);
        setFieldValue(`workExperience.${idx}.startDate`, values.workExperience[idx].startDate, true);
        if (!values.workExperience[idx].isCurrentJob) {
          setFieldValue(`workExperience.${idx}.endDate`, values.workExperience[idx].endDate, true);
        }
      });
    } else if (activeStep === 2) {
      // Touch education fields
      values.education.forEach((_: any, idx: number) => {
        setFieldValue(`education.${idx}.universityName`, values.education[idx].universityName, true);
        setFieldValue(`education.${idx}.location`, values.education[idx].location, true);
        setFieldValue(`education.${idx}.degree`, values.education[idx].degree, true);
        setFieldValue(`education.${idx}.graduationDate`, values.education[idx].graduationDate, true);
      });
    }
  };

  const handleNextClick = () => {
    // Check if the current step has validation errors
    const hasErrors = validateCurrentStep();
    
    if (hasErrors) {
      // Touch all fields in the current step to show validation errors
      touchFieldsInCurrentStep();
      
      // Alert the user
      alert(t('validation.fillRequired'));
      return;
    }
    
    // If no errors, proceed
    handleNext();
  };

  return (
    <div className="flex justify-between mt-8">
      <button
        type="button"
        onClick={handleBack}
        disabled={activeStep === 0}
        className={`px-4 py-2 text-sm font-medium rounded-md ${activeStep === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
      >
        {t('buttons.back')}
      </button>
      {activeStep === steps.length - 1 ? (
        <div /> // Empty div for spacing
      ) : (
        <button
          type="button"
          onClick={handleNextClick}
          className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {t('buttons.next')}
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;