import { Field } from "formik";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { useLanguage } from "../../../contexts/LanguageContext";
import "../../components/animations.css";

interface SkillItemProps {
  index: number;
  onRemove: () => void;
  showRemoveButton: boolean;
}

const SkillItem = ({ index, onRemove, showRemoveButton }: SkillItemProps) => {
  const [isRemoving, setIsRemoving] = useState(false);
  
  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove();
    }, 300); // Match the animation duration
  };
  return (
    <div className={`flex items-center gap-2 ${isRemoving ? 'animate-fade-out' : 'animate-fade-in'}`}>
      <Field
        name={`skills.${index}`}
        className="flex-1 px-3 py-2 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 outline-none transition-colors duration-200 sm:text-sm bg-gray-50"
      />
      {showRemoveButton && (
        <button
          type="button"
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
          aria-label="Remove skill"
          title="Remove skill"
        >
          <FaTrash className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default SkillItem;