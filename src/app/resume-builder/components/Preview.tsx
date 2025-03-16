import { ResumeData } from "../types";
import Header from "./preview/Header";
import WorkExperience from "./preview/WorkExperience";
import Education from "./preview/Education";
import Skills from "./preview/Skills";
import { useLanguage } from "../../contexts/LanguageContext";

interface PreviewProps {
  resumeData: ResumeData;
  dateFormat?: string;
}

const Preview = ({ resumeData, dateFormat = "YYYY-MM-DD" }: PreviewProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="w-full bg-white shadow rounded-lg p-6 h-[800px] overflow-auto">
      <h2 className="text-xl font-semibold mb-4">{t('preview.livePreview') || "Live Preview"}</h2>
      <div className="border border-gray-300 p-6 rounded bg-white">
        {/* Header - Centered */}
        <Header data={resumeData.personalInfo} />

        {/* Work Experience - Apply the selected date format */}
        <WorkExperience data={resumeData.workExperience} dateFormat={dateFormat} />

        {/* Education - Always use YYYY-MM-DD format */}
        <Education data={resumeData.education} dateFormat="YYYY-MM-DD" />

        {/* Skills */}
        <Skills data={resumeData.skills} />
      </div>
    </div>
  );
};

export default Preview;