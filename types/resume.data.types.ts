// src/types/resume.data.types.ts

export interface EducationItem {
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ProjectItem {
  title: string;
  link: string;
  description: string;
}

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  summary: string;

  skills: string[];
  languages: string[];

  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];

  // Note: Add a placeholder for userId if you intend to link the resume to a logged-in user
  // This will be crucial for the API handler.
  // userId: string; 
}

// You might also need the User type definition if it's used elsewhere,
// but for the sake of resume logic, only ResumeData is strictly needed here.
// export interface User { ... }
// export type UserType = "USER" | "COMPANY";