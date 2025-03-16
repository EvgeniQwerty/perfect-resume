import { Field, FieldArray, ErrorMessage } from "formik";
import FormField from "./common/FormField";
import { ResumeData } from "../types";

interface WorkExperienceProps {
  values: ResumeData;
  setFieldValue: (field: string, value: any) => void;
}

const WorkExperience = ({ values, setFieldValue }: WorkExperienceProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Work Experience</h2>
      <FieldArray name="workExperience">
        {({ remove, push }) => (
          <div className="space-y-6">
            {values.workExperience.map((_, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-md space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Experience {index + 1}</h3>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <FormField
                  name={`workExperience.${index}.companyName`}
                  label="Company Name"
                />
                <FormField
                  name={`workExperience.${index}.location`}
                  label="Location"
                  optional
                />
                <FormField
                  name={`workExperience.${index}.jobTitle`}
                  label="Job Title"
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`workExperience.${index}.startDate`} className="block text-sm font-medium text-gray-700">
                      Start Date
                    </label>
                    <Field
                      type="date"
                      name={`workExperience.${index}.startDate`}
                      className="mt-1 block w-full px-3 py-2 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 outline-none transition-colors duration-200 sm:text-sm bg-gray-50"
                    />
                    <ErrorMessage name={`workExperience.${index}.startDate`} component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                  <div>
                    <label htmlFor={`workExperience.${index}.endDate`} className="block text-sm font-medium text-gray-700">
                      End Date
                    </label>
                    <Field
                      type="date"
                      name={`workExperience.${index}.endDate`}
                      className="mt-1 block w-full px-3 py-2 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 outline-none transition-colors duration-200 sm:text-sm bg-gray-50"
                      disabled={values.workExperience[index].isCurrentJob}
                    />
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
                    <span className="ml-2 text-sm text-gray-700">I currently work here</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Responsibilities</label>
                  <FieldArray name={`workExperience.${index}.responsibilities`}>
                    {({ remove: removeResp, push: pushResp }) => (
                      <div className="space-y-2">
                        {values.workExperience[index].responsibilities.map((_, respIndex) => (
                          <div key={respIndex} className="flex items-center gap-2">
                            <Field
                              name={`workExperience.${index}.responsibilities.${respIndex}`}
                              className="flex-1 px-3 py-2 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 outline-none transition-colors duration-200 sm:text-sm bg-gray-50"
                            />
                            {respIndex > 0 && (
                              <button
                                type="button"
                                onClick={() => removeResp(respIndex)}
                                className="text-red-500 hover:text-red-700"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => pushResp("")}
                          className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Add Responsibility
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => push({ companyName: "", location: "", jobTitle: "", startDate: "", endDate: "", isCurrentJob: false, responsibilities: [""] })}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Work Experience
            </button>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default WorkExperience;