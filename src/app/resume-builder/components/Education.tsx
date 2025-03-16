import { FieldArray } from "formik";
import { FaPlus, FaTrash } from "react-icons/fa";
import { ResumeData } from "../types";
import EducationItem from "./education/EducationItem";
import DraggableItem from "./dnd/DraggableItem";
import { useLanguage } from "../../contexts/LanguageContext";

interface EducationProps {
  values: ResumeData;
}

const Education = ({ values }: EducationProps) => {
  const { t } = useLanguage();
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{t('education.title')}</h2>
      <FieldArray name="education">
        {({ remove, push }) => (
          <div className="space-y-6">
            {values.education.map((_, index) => (
              <DraggableItem
                key={index}
                id={index}
                index={index}
                itemType="EDUCATION_ITEM"
                moveItem={(dragIndex, hoverIndex) => {
                  const newEducation = [...values.education];
                  const dragItem = newEducation[dragIndex];
                  newEducation.splice(dragIndex, 1);
                  newEducation.splice(hoverIndex, 0, dragItem);
                  values.education = newEducation;
                }}
              >
                <EducationItem 
                  key={index} 
                  index={index} 
                  onRemove={() => remove(index)} 
                  showRemoveButton={index > 0} 
                />
              </DraggableItem>
            ))}
            <button
              type="button"
              onClick={() => push({ universityName: "", location: "", degree: "", gpa: "", graduationDate: "" })}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <FaPlus className="h-4 w-4 mr-2" /> {t('education.addEducation')}
            </button>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default Education;