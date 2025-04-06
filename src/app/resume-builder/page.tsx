"use client";

import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DateFormatSelector from "./components/DateFormatSelector";
import { useLanguage } from "../contexts/LanguageContext";

// Import components
import PersonalInfo from "./components/PersonalInfo";
import WorkExperience from "./components/work-experience/WorkExperience";
import Education from "./components/Education";
import Skills from "./components/skills/Skills";
import Preview from "./components/Preview";
import ResumePDF from "./components/ResumePDF";

// Import types
import { ResumeData, initialValues } from "./types";

// Validation schema
const validationSchema = Yup.object({
  personalInfo: Yup.object({
    fullName: Yup.string().required("Required"),
    location: Yup.string(),
    email: Yup.string().email("Invalid email format").required("Required"),
    linkedin: Yup.string().url("Invalid URL"),
    telegram: Yup.string(),
    phone: Yup.string(),
  }),
  workExperience: Yup.array().of(
    Yup.object({
      companyName: Yup.string().required("Required"),
      location: Yup.string(),
      jobTitle: Yup.string().required("Required"),
      startDate: Yup.string().required("Required"),
      endDate: Yup.string().when("isCurrentJob", {
        is: true,
        then: (schema) => schema.notRequired(),
        otherwise: (schema) => schema.required("Required")
      }),
      isCurrentJob: Yup.boolean(),
      responsibilities: Yup.array().of(Yup.string()),
    })
  ),
  education: Yup.array().of(
    Yup.object({
      universityName: Yup.string().required("Required"),
      location: Yup.string().required("Required"),
      degree: Yup.string().required("Required"),
      gpa: Yup.string(),
      graduationDate: Yup.string().required("Required"),
    })
  ),
  skills: Yup.array().of(Yup.string()),
});

export default function ResumeBuilder() {
  const [activeStep, setActiveStep] = useState(0);
  const [resumeData, setResumeData] = useState<ResumeData>(initialValues);
  const [dateFormat, setDateFormat] = useState<string>("YYYY-MM-DD");
  const { t, currentLanguage } = useLanguage();

  const steps = [
    t('personalInfo.title') || "Personal Information",
    t('workExperience.title') || "Work Experience",
    t('education.title') || "Education",
    t('skills.title') || "Skills",
    t('preview.title') || "Preview & Download",
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (values: ResumeData, { setSubmitting }: any) => {
    setResumeData(values);
    if (activeStep < steps.length - 1) {
      handleNext();
    }
    setSubmitting(false);
  };
  
  // This function handles the Next button click for the first step
  const handleFirstStepNext = (values: ResumeData, formikHelpers: any) => {
    // Update the resume data with current values
    setResumeData(values);
    // Save to localStorage
    localStorage.setItem('resumeData', JSON.stringify(values));
    // Move to the next step
    handleNext();
    formikHelpers.setSubmitting(false);
  };

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setResumeData(parsedData);
      } catch (error) {
        console.error('Error parsing saved resume data:', error);
      }
    }
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-white resume-builder-content">
        <main className="max-w-7xl mx-auto py-4 sm:px-6 lg:px-8">
        <div className="px-4 py-4 sm:px-0">
          {/* Stepper */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${index === activeStep ? "bg-blue-600 text-white" : index < activeStep ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"} ${index > activeStep && index !== activeStep + 1 ? "cursor-not-allowed" : "cursor-pointer"} transition-colors duration-200 ${index <= activeStep || index === activeStep + 1 ? "hover:bg-blue-500 hover:text-white" : ""}`}
                    onClick={() => {
                      // Allow navigation to previous steps, current step, or next step if current step is valid
                      if (index <= activeStep) {
                        setActiveStep(index);
                      } else if (index === activeStep + 1) {
                        // Check if the current step has validation errors
                        let hasErrors = false;
                        
                        // We can't access errors here, so we'll use a different approach
                        // to validate the current step
                        if (activeStep === 0) {
                          // Personal Info validation
                          hasErrors = !resumeData.personalInfo.fullName || !resumeData.personalInfo.email;
                        } else if (activeStep === 1) {
                          // Work Experience validation
                          hasErrors = resumeData.workExperience.some((job) => {
                            const hasEndDateError = !job.isCurrentJob && !job.endDate;
                            return !job.companyName || !job.jobTitle || !job.startDate || hasEndDateError;
                          });
                        } else if (activeStep === 2) {
                          // Education validation
                          hasErrors = resumeData.education.some((edu) => {
                            return !edu.universityName || !edu.location || !edu.degree || !edu.graduationDate;
                          });
                        }
                        // Skills section doesn't have required fields
                        
                        if (hasErrors) {
                          alert(t('validation.fillRequired'));
                          return;
                        }
                        
                        // If no errors, proceed to next step
                        localStorage.setItem('resumeData', JSON.stringify(resumeData));
                        setActiveStep(index);
                      }
                    }}
                  >
                    {index < activeStep ? "✓" : index + 1}
                  </div>
                  <div 
                    className={`text-xs mt-2 hidden sm:block ${index <= activeStep + 1 ? "cursor-pointer" : "cursor-not-allowed text-gray-400"}`} 
                    onClick={() => {
                      // Allow navigation to completed steps or next available step
                      if (index <= activeStep) {
                        setActiveStep(index);
                      } else if (index === activeStep + 1) {
                        // Check if the current step has validation errors
                        let hasErrors = false;
                        
                        // We can't access errors here, so we'll use a different approach
                        // to validate the current step
                        if (activeStep === 0) {
                          // Personal Info validation
                          hasErrors = !resumeData.personalInfo.fullName || !resumeData.personalInfo.email;
                        } else if (activeStep === 1) {
                          // Work Experience validation
                          hasErrors = resumeData.workExperience.some((job) => {
                            const hasEndDateError = !job.isCurrentJob && !job.endDate;
                            return !job.companyName || !job.jobTitle || !job.startDate || hasEndDateError;
                          });
                        } else if (activeStep === 2) {
                          // Education validation
                          hasErrors = resumeData.education.some((edu) => {
                            return !edu.universityName || !edu.location || !edu.degree || !edu.graduationDate;
                          });
                        }
                        
                        if (hasErrors) {
                          alert(t('validation.fillRequired'));
                          return;
                        }
                        
                        // If no errors, proceed to next step
                        localStorage.setItem('resumeData', JSON.stringify(resumeData));
                        setActiveStep(index);
                      }
                    }}
                  >
                    {step}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 w-full ${index < activeStep ? "bg-blue-600" : "bg-gray-200"} ${index === steps.length - 1 ? "hidden" : ""}`}
                ></div>
              ))}
            </div>
          </div>

          {/* Form and Preview */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Form Section */}
            <div className="w-full lg:w-1/2 bg-white shadow rounded-lg p-6">
              <Formik
                initialValues={resumeData}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
              >
                {({ values, errors, touched, setFieldValue }) => {
                  // Update resumeData in real-time as values change
                  useEffect(() => {
                    setResumeData(values);
                  }, [values]);
                  
                  return (
                  <Form className="space-y-6">
                    {activeStep === 0 && (
                      <PersonalInfo />
                    )}

                    {activeStep === 1 && (
                      <WorkExperience values={values} setFieldValue={setFieldValue} />
                    )}

                    {activeStep === 2 && (
                      <Education values={values} />
                    )}

                    {activeStep === 3 && (
                      <Skills values={values} setFieldValue={setFieldValue} />
                    )}

                    {activeStep === 4 && (
                      <div className="space-y-6">
                        <h2 className="text-xl font-semibold">{t('preview.title')}</h2>
                        <p className="text-gray-600">{t('preview.ready')}</p>
                        
                        <DateFormatSelector 
                          selectedFormat={dateFormat}
                          onChange={(format) => setDateFormat(format)}
                        />
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                          <PDFDownloadLink
                            document={<ResumePDF data={values} dateFormat={dateFormat} />}
                            fileName="resume.pdf"
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            {t('preview.downloadPDF')}
                          </PDFDownloadLink>
                          
                          {/* Donation button - only shown for Russian users */}
                          {currentLanguage === 'ru' && (
                            <a 
                              href="https://pay.cloudtips.ru/p/0535c138" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 shadow-md transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
                            >
                              {t('donation.button')} ✨
                            </a>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between mt-8">
                      <button
                        type="button"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                        className={`px-4 py-2 text-sm font-medium rounded-md ${activeStep === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                      >
                        {t('buttons.back')}
                      </button>
                      {activeStep === steps.length - 1 ? (
                        <div /> // Empty div for spacing
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            // Check if the current step has validation errors
                            let hasErrors = false;
                            
                            // We can't access errors here directly, so we'll use the resumeData
                            // to validate the current step
                            if (activeStep === 0) {
                              // Personal Info validation
                              hasErrors = !values.personalInfo.fullName || !values.personalInfo.email;
                            } else if (activeStep === 1) {
                              // Work Experience validation
                              hasErrors = values.workExperience.some((job) => {
                                const hasEndDateError = !job.isCurrentJob && !job.endDate;
                                return !job.companyName || !job.jobTitle || !job.startDate || hasEndDateError;
                              });
                            } else if (activeStep === 2) {
                              // Education validation
                              hasErrors = values.education.some((edu) => {
                                return !edu.universityName || !edu.location || !edu.degree || !edu.graduationDate;
                              });
                            }
                            // Skills section doesn't have required fields
                            
                            if (hasErrors) {
                              // Touch all fields in the current step to show validation errors
                              if (activeStep === 0) {
                                // Touch personal info fields
                                setFieldValue('personalInfo.fullName', values.personalInfo.fullName, true);
                                setFieldValue('personalInfo.email', values.personalInfo.email, true);
                              } else if (activeStep === 1) {
                                // Touch work experience fields
                                values.workExperience.forEach((_, idx) => {
                                  setFieldValue(`workExperience.${idx}.companyName`, values.workExperience[idx].companyName, true);
                                  setFieldValue(`workExperience.${idx}.jobTitle`, values.workExperience[idx].jobTitle, true);
                                  setFieldValue(`workExperience.${idx}.startDate`, values.workExperience[idx].startDate, true);
                                  if (!values.workExperience[idx].isCurrentJob) {
                                    setFieldValue(`workExperience.${idx}.endDate`, values.workExperience[idx].endDate, true);
                                  }
                                });
                              } else if (activeStep === 2) {
                                // Touch education fields
                                values.education.forEach((_, idx) => {
                                  setFieldValue(`education.${idx}.universityName`, values.education[idx].universityName, true);
                                  setFieldValue(`education.${idx}.location`, values.education[idx].location, true);
                                  setFieldValue(`education.${idx}.degree`, values.education[idx].degree, true);
                                  setFieldValue(`education.${idx}.graduationDate`, values.education[idx].graduationDate, true);
                                });
                              }
                              
                              // Alert the user
                              alert(t('validation.fillRequired'));
                              return;
                            }
                            
                            // If no errors, proceed
                            // Update the resume data with current values
                            setResumeData(values);
                            // Save to localStorage
                            localStorage.setItem('resumeData', JSON.stringify(values));
                            // Move to the next step
                            handleNext();
                          }}
                          className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          {t('buttons.next')}
                        </button>
                      )}
                    </div>
                  </Form>
                )}}
              </Formik>
            </div>

            {/* Preview Section */}
            <Preview resumeData={resumeData} dateFormat={dateFormat} />
          </div>
        </div>
      </main>
      </div>
    </DndProvider>
  );
}