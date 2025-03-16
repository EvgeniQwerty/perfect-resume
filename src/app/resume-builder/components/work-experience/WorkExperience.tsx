'use client';

import { useState, useEffect } from "react";
import { FieldArray } from "formik";
import { FaPlus } from "react-icons/fa";
import { ResumeData } from "../../types";
import ExperienceItem from "./ExperienceItem";
import DraggableItem from "../dnd/DraggableItem";
import { useLanguage } from "../../../contexts/LanguageContext";

interface WorkExperienceProps {
  values: ResumeData;
  setFieldValue: (field: string, value: any) => void;
}

const WorkExperience = ({ values, setFieldValue }: WorkExperienceProps) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{t('workExperience.title')}</h2>
      <FieldArray name="workExperience">
        {({ remove, push }) => (
          <div className="space-y-6">
            {values.workExperience.map((experience, index) => (
              <DraggableItem
                key={index}
                id={index}
                index={index}
                itemType="WORK_EXPERIENCE_ITEM"
                moveItem={(dragIndex, hoverIndex) => {
                  const newWorkExperience = [...values.workExperience];
                  const dragItem = newWorkExperience[dragIndex];
                  newWorkExperience.splice(dragIndex, 1);
                  newWorkExperience.splice(hoverIndex, 0, dragItem);
                  setFieldValue('workExperience', newWorkExperience);
                }}
              >
                <ExperienceItem
                  index={index}
                  isCurrentJob={experience.isCurrentJob || false}
                  responsibilities={experience.responsibilities}
                  onRemove={() => remove(index)}
                  setFieldValue={setFieldValue}
                />
              </DraggableItem>
            ))}
            <button
              type="button"
              onClick={() => push({ 
                companyName: "", 
                location: "", 
                jobTitle: "", 
                startDate: "", 
                endDate: "", 
                isCurrentJob: false, 
                responsibilities: [""] 
              })}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <FaPlus className="h-4 w-4 mr-2" /> {t('workExperience.addExperience')}
            </button>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default WorkExperience;