import { FieldArray } from "formik";
import { FaPlus, FaMagic } from "react-icons/fa";
import { ResumeData } from "../../types";
import SkillItem from "./SkillItem";
import { useState } from "react";
import DraggableItem from "../dnd/DraggableItem";
import { useLanguage } from "../../../contexts/LanguageContext";
import { toast } from "react-hot-toast";

interface SkillsProps {
  values: ResumeData;
  setFieldValue?: (field: string, value: any) => void;
}

const Skills = ({ values, setFieldValue }: SkillsProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { t, currentLanguage } = useLanguage();
  
  const generateSkills = async () => {
    if (!values.workExperience || values.workExperience.length === 0 || !setFieldValue) {
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/generate-skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          workExperience: values.workExperience,
          language: currentLanguage
        }),
      });
      
      const data = await response.json();
      
      if (data.skills) {
        // Split the skills by comma and trim whitespace
        const skillsArray = data.skills.split(',').map((skill: string) => skill.trim()).filter(Boolean);
        
        // Replace the current skills with the generated ones
        setFieldValue('skills', skillsArray);
        
        // Save to localStorage after updating skills
        const savedData = localStorage.getItem('resumeData');
        if (savedData) {
          try {
            const parsedData = JSON.parse(savedData);
            // Update the skills
            parsedData.skills = skillsArray;
            localStorage.setItem('resumeData', JSON.stringify(parsedData));
          } catch (error) {
            console.error('Error updating localStorage with generated skills:', error);
          }
        }
        
        // Show success toast notification
        toast.success("Skills generated successfully!");
      }
    } catch (error) {
      console.error('Error generating skills:', error);
      toast.error("Failed to generate skills. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{t('skills.title')}</h2>
      <FieldArray name="skills">
        {({ remove, push }) => (
          <div className="space-y-4">
            {values.skills.map((skill, index) => (
              <DraggableItem
                key={index}
                id={index}
                index={index}
                itemType="SKILL_ITEM"
                moveItem={(dragIndex, hoverIndex) => {
                  const newSkills = [...values.skills];
                  const dragItem = newSkills[dragIndex];
                  newSkills.splice(dragIndex, 1);
                  newSkills.splice(hoverIndex, 0, dragItem);
                  setFieldValue && setFieldValue('skills', newSkills);
                }}
              >
                <SkillItem
                  index={index}
                  onRemove={() => remove(index)}
                  showRemoveButton={index > 0}
                />
              </DraggableItem>
            ))}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => push("")}
                className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <FaPlus className="h-4 w-4 mr-2" /> {t('skills.addSkill')}
              </button>
              
              {setFieldValue && (
                <button
                  type="button"
                  onClick={generateSkills}
                  disabled={isGenerating}
                  className={`mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${isGenerating ? 'bg-gray-400 text-white cursor-not-allowed' : 'text-white bg-purple-600 hover:bg-purple-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200`}
                >
                  <FaMagic className="h-4 w-4 mr-2" /> 
                  {isGenerating ? t('skills.generating') : t('skills.generateSkills')}
                </button>
              )}
            </div>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default Skills;