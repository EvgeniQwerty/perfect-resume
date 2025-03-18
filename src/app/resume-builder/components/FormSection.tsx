'use client';

import { ResumeData } from "../types";
import PersonalInfo from "./PersonalInfo";
import WorkExperience from "./work-experience/WorkExperience";
import Education from "./Education";
import Skills from "./skills/Skills";
import DateFormatSelector from "./DateFormatSelector";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "./ResumePDF";
import DonationButtons from "./DonationButtons";
import { useLanguage } from "../../contexts/LanguageContext";

interface FormSectionProps {
  activeStep: number;
  values: ResumeData;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  dateFormat: string;
  setDateFormat: (format: string) => void;
}

const FormSection = ({ 
  activeStep, 
  values, 
  setFieldValue,
  dateFormat,
  setDateFormat
}: FormSectionProps) => {
  const { t, currentLanguage } = useLanguage();

  return (
    <div className="space-y-6">
      {activeStep === 0 && (
        <PersonalInfo />
      )}

      {activeStep === 1 && (
        <WorkExperience values={values} setFieldValue={setFieldValue} />
      )}

      {activeStep === 2 && (
        <Education values={values} />
      )}

      {activeStep === 3 && (
        <Skills values={values} setFieldValue={setFieldValue} />
      )}

      {activeStep === 4 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">{t('preview.title')}</h2>
          <p className="text-gray-600">{t('preview.ready')}</p>
          
          <DateFormatSelector 
            selectedFormat={dateFormat}
            onChange={(format) => setDateFormat(format)}
          />
          
          {/* Donation buttons in a separate container - positioned above PDF download button */}
          <div className="mb-4">
            <DonationButtons />
          </div>
          
          {/* PDF download button - positioned below donation buttons */}
            <PDFDownloadLink
              document={<ResumePDF data={values} dateFormat={dateFormat} />}
              fileName="resume.pdf"
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {t('preview.downloadPDF')}
            </PDFDownloadLink>
        </div>
      )}
    </div>
  );
};

export default FormSection;