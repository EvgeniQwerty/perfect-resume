'use client';

import { useLanguage } from "../../contexts/LanguageContext";
import { ResumeData } from "../types";

interface StepperProps {
  steps: string[];
  activeStep: number;
  setActiveStep: (step: number) => void;
  resumeData: ResumeData;
}

const Stepper = ({ steps, activeStep, setActiveStep, resumeData }: StepperProps) => {
  const { t } = useLanguage();

  const validateStep = (currentStep: number, targetStep: number) => {
    // Only validate when trying to go forward
    if (targetStep <= currentStep) return true;
    
    // Only allow going one step forward
    if (targetStep > currentStep + 1) return false;
    
    let hasErrors = false;
    
    if (currentStep === 0) {
      // Personal Info validation
      hasErrors = !resumeData.personalInfo.fullName || !resumeData.personalInfo.email;
    } else if (currentStep === 1) {
      // Work Experience validation
      hasErrors = resumeData.workExperience.some((job) => {
        const hasEndDateError = !job.isCurrentJob && !job.endDate;
        return !job.companyName || !job.jobTitle || !job.startDate || hasEndDateError;
      });
    } else if (currentStep === 2) {
      // Education validation
      hasErrors = resumeData.education.some((edu) => {
        return !edu.universityName || !edu.location || !edu.degree || !edu.graduationDate;
      });
    }
    
    if (hasErrors) {
      alert(t('validation.fillRequired'));
      return false;
    }
    
    return true;
  };

  const handleStepClick = (index: number) => {
    if (validateStep(activeStep, index)) {
      localStorage.setItem('resumeData', JSON.stringify(resumeData));
      setActiveStep(index);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${index === activeStep ? "bg-blue-600 text-white" : index < activeStep ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"} ${index > activeStep && index !== activeStep + 1 ? "cursor-not-allowed" : "cursor-pointer"} transition-colors duration-200 ${index <= activeStep || index === activeStep + 1 ? "hover:bg-blue-500 hover:text-white" : ""}`}
              onClick={() => handleStepClick(index)}
            >
              {index < activeStep ? "✓" : index + 1}
            </div>
            <div 
              className={`text-xs mt-2 ${index <= activeStep + 1 ? "cursor-pointer" : "cursor-not-allowed text-gray-400"} hidden sm:block`} 
              onClick={() => handleStepClick(index)}
            >
              {step}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`h-1 w-full ${index < activeStep ? "bg-blue-600" : "bg-gray-200"} ${index === steps.length - 1 ? "hidden" : ""}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;