import { Field, ErrorMessage } from "formik";
import { useState } from "react";
import { useLanguage } from "../../../contexts/LanguageContext";

interface DateFieldsProps {
  index: number;
  isCurrentJob: boolean;
  setFieldValue: (field: string, value: any) => void;
}

const DateFields = ({ index, isCurrentJob, setFieldValue }: DateFieldsProps) => {
  // Initialize state to track if we need to update the end date when start date changes
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const { t } = useLanguage();

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor={`workExperience.${index}.startDate`} className="block text-sm font-medium text-gray-700">
            {t('workExperience.startDate')}<span className="text-red-500 ml-1">*</span>
          </label>
          <Field name={`workExperience.${index}.startDate`}>
            {({ field, form }: any) => (
              <input
                type="date"
                id={`workExperience.${index}.startDate`}
                {...field}
                className="mt-1 block w-full px-3 py-2 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 outline-none transition-colors duration-200 sm:text-sm bg-gray-50"
                onChange={(e) => {
                  const newDate = e.target.value;
                  setStartDate(newDate);
                  setFieldValue(`workExperience.${index}.startDate`, newDate);
                }}
              />
            )}
          </Field>
          <ErrorMessage name={`workExperience.${index}.startDate`} component="div" className="text-red-500 text-xs mt-1" />
        </div>
        <div>
          <label htmlFor={`workExperience.${index}.endDate`} className="block text-sm font-medium text-gray-700">
            {t('workExperience.endDate')}{!isCurrentJob && <span className="text-red-500 ml-1">*</span>}
          </label>
          <Field name={`workExperience.${index}.endDate`}>
            {({ field, form }: any) => (
              <input
                type="date"
                id={`workExperience.${index}.endDate`}
                {...field}
                className="mt-1 block w-full px-3 py-2 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 outline-none transition-colors duration-200 sm:text-sm bg-gray-50"
                onChange={(e) => {
                  const newDate = e.target.value;
                  setEndDate(newDate);
                  setFieldValue(`workExperience.${index}.endDate`, newDate);
                }}
                disabled={isCurrentJob}
                min={startDate} // Can't select end date before start date
              />
            )}
          </Field>
          <ErrorMessage name={`workExperience.${index}.endDate`} component="div" className="text-red-500 text-xs mt-1" />
        </div>
      </div>
      <div className="mt-2">
        <label className="flex items-center">
          <Field
            type="checkbox"
            name={`workExperience.${index}.isCurrentJob`}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFieldValue(`workExperience.${index}.isCurrentJob`, e.target.checked);
              if (e.target.checked) {
                setFieldValue(`workExperience.${index}.endDate`, "");
              }
            }}
          />
          <span className="ml-2 text-sm text-gray-700">{t('workExperience.currentJob')}</span>
        </label>
      </div>
    </>
  );
};

export default DateFields;