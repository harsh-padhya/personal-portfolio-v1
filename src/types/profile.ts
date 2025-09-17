export interface Profile {
  personal: {
    name: string;
    title: string;
    email: string;
    location: string;
    bio: string;
    avatar: string;                // Path to avatar image
    resume: string;                // Path to PDF resume
  };
  social: {
    github: string;
    linkedin: string;
    twitter?: string;
    website?: string;
  };
  hero: {
    tagline: string;
    description: string;
    cta: string;                   // Call to action text
  };
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;               // ISO date string
  endDate?: string;                // Optional for current position
  duration: string;                // Human readable duration
  description: string;             // Markdown supported
  technologies: string[];          // Array of tech stack
  type: 'work' | 'education' | 'project';
  featured: boolean;
  location?: string;
  website?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: 1 | 2 | 3 | 4 | 5;        // Proficiency level
  years: number;                   // Years of experience
  description?: string;
  category: string;
}
