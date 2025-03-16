import { Field, ErrorMessage } from "formik";
import { useLanguage } from "../../../contexts/LanguageContext";

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  optional?: boolean;
  disabled?: boolean;
  className?: string;
}

const FormField = ({
  name,
  label,
  type = "text",
  placeholder = "",
  optional = false,
  disabled = false,
  className = "",
}: FormFieldProps) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}{!optional && <span className="text-red-500 ml-1">*</span>}
      </label>
      <Field
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className="mt-1 block w-full px-3 py-2 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 outline-none transition-colors duration-200 sm:text-sm bg-gray-50"
      />
      <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
    </div>
  );
};

export default FormField;