import { Field, FieldArray } from "formik";
import { FaPlus, FaTrash, FaMagic } from "react-icons/fa";
import "../../components/animations.css";
import DraggableItem from "../dnd/DraggableItem";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useLanguage } from "../../../contexts/LanguageContext";

interface ResponsibilitiesProps {
  index: number;
  responsibilities: string[];
  setFieldValue?: (field: string, value: any) => void;
  jobTitle?: string;
}

const Responsibilities = ({ index, responsibilities, setFieldValue, jobTitle }: ResponsibilitiesProps) => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const { t, currentLanguage } = useLanguage();
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{t('workExperience.responsibilities')}</label>
      <FieldArray name={`workExperience.${index}.responsibilities`}>
        {({ remove, push }) => (
          <div className="space-y-2">
            {responsibilities.map((_, respIndex) => (
              <DraggableItem
                key={respIndex}
                id={respIndex}
                index={respIndex}
                itemType={`RESPONSIBILITY_ITEM_${index}`}
                moveItem={(dragIndex, hoverIndex) => {
                  if (!setFieldValue) return;
                  
                  const newResponsibilities = [...responsibilities];
                  const dragItem = newResponsibilities[dragIndex];
                  newResponsibilities.splice(dragIndex, 1);
                  newResponsibilities.splice(hoverIndex, 0, dragItem);
                  
                  // Update the field value with the new order using the passed setFieldValue
                  setFieldValue(`workExperience.${index}.responsibilities`, newResponsibilities);
                }}
              >
                <div className="flex items-center gap-2 animate-fade-in w-full">
                  <Field name={`workExperience.${index}.responsibilities.${respIndex}`}>
                    {({ field }: any) => (
                      <input
                        type="text"
                        {...field}
                        className="flex-1 px-3 py-2 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 outline-none transition-colors duration-200 sm:text-sm bg-gray-50 w-full"
                        placeholder="Describe your responsibilities and achievements..."
                      />
                    )}
                  </Field>
                  {respIndex > 0 && (
                    <button
                      type="button"
                      onClick={() => remove(respIndex)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
                      aria-label="Remove responsibility"
                      title="Remove responsibility"
                    >
                      <FaTrash className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </DraggableItem>
            ))}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => push("")}
                className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <FaPlus className="h-3 w-3 mr-1" /> {t('workExperience.addResponsibility')}
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (!setFieldValue || !jobTitle) {
                    toast.error("Job title is required to enhance responsibilities");
                    return;
                  }
                  
                  setIsEnhancing(true);
                  try {
                    // Store current responsibilities to prevent data loss
                    const currentResponsibilities = [...responsibilities];
                    
                    // Filter out empty responsibilities before sending to API
                    const filteredResponsibilities = currentResponsibilities.filter(r => r.trim() !== '');
                    
                    const response = await fetch('/api/enhance-responsibilities', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        responsibilities: filteredResponsibilities,
                        jobTitle,
                        language: currentLanguage
                      }),
                    });
                    
                    const data = await response.json();
                    
                    if (data.error) {
                      throw new Error(data.error);
                    }
                    
                    // Verify that we received enhanced responsibilities before updating
                    if (data.enhancedResponsibilities && Array.isArray(data.enhancedResponsibilities)) {
                      // Filter out any empty strings from the enhanced responsibilities
                      const nonEmptyResponsibilities = data.enhancedResponsibilities.filter(
                        (resp: string) => resp && resp.trim() !== ''
                      );
                      
                      // Only update if we have non-empty responsibilities
                      if (nonEmptyResponsibilities.length > 0) {
                        // Update the responsibilities with the enhanced ones
                        setFieldValue(`workExperience.${index}.responsibilities`, nonEmptyResponsibilities);
                        
                        // Save to localStorage after updating responsibilities
                        const savedData = localStorage.getItem('resumeData');
                        if (savedData) {
                          try {
                            const parsedData = JSON.parse(savedData);
                            // Update the specific job's responsibilities
                            if (parsedData.workExperience && parsedData.workExperience[index]) {
                              parsedData.workExperience[index].responsibilities = nonEmptyResponsibilities;
                              localStorage.setItem('resumeData', JSON.stringify(parsedData));
                            }
                          } catch (error) {
                            console.error('Error updating localStorage with enhanced responsibilities:', error);
                          }
                        }
                        
                        toast.success("Responsibilities enhanced successfully!");
                      } else {
                        // If all enhanced responsibilities were empty, keep the original ones
                        setFieldValue(`workExperience.${index}.responsibilities`, currentResponsibilities);
                        toast.error("Failed to generate meaningful responsibilities. Your original content has been preserved.");
                      }
                    } else {
                      // If no enhanced responsibilities were returned, keep the original ones
                      setFieldValue(`workExperience.${index}.responsibilities`, currentResponsibilities);
                      toast.error("Failed to enhance responsibilities. Your original content has been preserved.");
                    }
                  } catch (error) {
                    console.error("Error enhancing responsibilities:", error);
                    toast.error("Failed to enhance responsibilities. Please try again.");
                  } finally {
                    setIsEnhancing(false);
                  }
                }}
                disabled={isEnhancing}
                className={`mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md ${isEnhancing ? 'bg-gray-400 text-white cursor-not-allowed' : 'text-purple-700 bg-purple-100 hover:bg-purple-200'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200`}
                title="Improves your responsibilities by making them more achievement-oriented and adds additional relevant responsibilities if you have fewer than 5."
              >
                <FaMagic className="h-3 w-3 mr-1" /> {isEnhancing ? t('workExperience.enhancing') : t('workExperience.enhanceWithAI')}
              </button>
            </div>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default Responsibilities;