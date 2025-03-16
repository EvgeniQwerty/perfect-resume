import { Field, ErrorMessage } from "formik";

interface GraduationYearSelectProps {
  index: number;
}

const GraduationYearSelect = ({ index }: GraduationYearSelectProps) => {
  return (
    <div>
      <label htmlFor={`education.${index}.graduationDate`} className="block text-sm font-medium text-gray-700">
        Graduation Year
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
  );
};

export default GraduationYearSelect;