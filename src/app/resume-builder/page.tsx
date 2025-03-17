"use client";

import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Import components
import Preview from "./components/Preview";
import FormSection from "./components/FormSection";
import Stepper from "./components/Stepper";
import NavigationButtons from "./components/NavigationButtons";

// Import contexts
import { useLanguage } from "../contexts/LanguageContext";

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
  const { t } = useLanguage();

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
      <div className="min-h-screen bg-gray-50 pt-14">
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Stepper */}
            <Stepper 
              steps={steps} 
              activeStep={activeStep} 
              setActiveStep={setActiveStep} 
              resumeData={resumeData} 
            />

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
                        <FormSection 
                          activeStep={activeStep} 
                          values={values} 
                          setFieldValue={setFieldValue}
                          dateFormat={dateFormat}
                          setDateFormat={setDateFormat}
                        />

                        <NavigationButtons 
                          activeStep={activeStep} 
                          steps={steps} 
                          handleBack={handleBack} 
                          handleNext={handleNext}
                          values={values}
                          setFieldValue={setFieldValue}
                        />
                      </Form>
                    );
                  }}
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