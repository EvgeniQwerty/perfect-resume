import { Field, ErrorMessage } from "formik";
import FormField from "../common/FormField";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import "../../components/animations.css";
import { useLanguage } from "../../../contexts/LanguageContext";

interface EducationItemProps {
  index: number;
  onRemove: () => void;
  showRemoveButton: boolean;
}

const EducationItem = ({ index, onRemove, showRemoveButton }: EducationItemProps) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const { t } = useLanguage();
  
  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove();
    }, 300); // Match the animation duration
  };
  return (
    <div className={`p-4 border border-gray-200 rounded-md space-y-4 ${isRemoving ? 'animate-fade-out' : 'animate-slide-down'}`}>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{t('education.title')} {index + 1}</h3>
        {showRemoveButton && (
          <button
            type="button"
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
            aria-label="Remove education"
            title="Remove education"
          >
            <FaTrash className="h-4 w-4" />
          </button>
        )}
      </div>
      <FormField
        name={`education.${index}.universityName`}
        label={t('education.universityName')}
      />
      <FormField
        name={`education.${index}.location`}
        label={t('education.location')}
      />
      <FormField
        name={`education.${index}.degree`}
        label={t('education.degree')}
      />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor={`education.${index}.gpa`} className="block text-sm font-medium text-gray-700">
            {t('education.gpa')}
          </label>
          <Field
            name={`education.${index}.gpa`}
            className="mt-1 block w-full px-3 py-2 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 outline-none transition-colors duration-200 sm:text-sm bg-gray-50"
          />
        </div>
        <div>
          <label htmlFor={`education.${index}.graduationDate`} className="block text-sm font-medium text-gray-700">
            {t('education.graduationYear')}<span className="text-red-500 ml-1">*</span>
          </label>
          <Field name={`education.${index}.graduationDate`}>
            {({ field, form }: any) => (
              <select
                {...field}
                className="mt-1 block w-full px-3 py-2 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 outline-none transition-colors duration-200 sm:text-sm bg-gray-50"
                onChange={(e) => form.setFieldValue(`education.${index}.graduationDate`, e.target.value)}
              >
                <option value="">Select Year</option>
                {Array.from({ length: new Date().getFullYear() - 1950 + 1 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                ))}
              </select>
            )}
          </Field>
          <ErrorMessage name={`education.${index}.graduationDate`} component="div" className="text-red-500 text-xs mt-1" />
        </div>
      </div>
    </div>
  );
};

export default EducationItem;