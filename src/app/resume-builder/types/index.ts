// Define the resume data structure
export interface ResumeData {
  personalInfo: {
    fullName: string;
    location?: string;
    email: string;
    linkedin?: string;
    telegram?: string;
    phone?: string;
  };
  workExperience: Array<{
    companyName: string;
    location?: string;
    jobTitle: string;
    startDate: string;
    endDate: string;
    isCurrentJob?: boolean;
    responsibilities: string[];
  }>;
  education: Array<{
    universityName: string;
    location: string;
    degree: string;
    gpa: string;
    graduationDate: string;
  }>;
  skills: string[];
}

// Initial values for the form
export const initialValues: ResumeData = {
  personalInfo: {
    fullName: "",
    location: "",
    email: "",
    linkedin: "",
    telegram: "",
    phone: "",
  },
  workExperience: [
    {
      companyName: "",
      location: "",
      jobTitle: "",
      startDate: "",
      endDate: "",
      isCurrentJob: false,
      responsibilities: [""],
    },
  ],
  education: [
    {
      universityName: "",
      location: "",
      degree: "",
      gpa: "",
      graduationDate: "",
    },
  ],
  skills: [""],
};