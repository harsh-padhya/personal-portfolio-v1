// Profile and Personal Information Types (matching the existing JSON structure)
export interface Profile {
  personal: {
    name: string;
    title: string;
    email: string;
    location: string;
    bio: string;
    avatar: string;
    resume: string;
  };
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    website: string;
  };
  hero: {
    tagline: string;
    description: string;
    cta: string;
  };
}

// Keep ProfileData as an alias for backward compatibility
export type ProfileData = Profile;

// Experience Types
export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  duration: string;
  description: string;
  technologies: string[];
  type: 'work' | 'education' | 'certification' | 'volunteer';
  featured: boolean;
  location: string;
  website?: string;
  logo?: string;
  achievements?: string[];
  gpa?: string; // For education
  institution?: string; // For certifications
  credentialId?: string; // For certifications
}

// Skills Types
export interface Skill {
  name: string;
  level: number; // 1-5 scale
  years: number;
  description: string;
  category: string;
  certified?: boolean;
  certificationUrl?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
}

// Site Settings Types
export interface SiteSettings {
  general: {
    siteName: string;
    siteUrl: string;
    description: string;
    keywords: string[];
    author: string;
    language: string;
    timezone: string;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    darkMode: boolean;
    terminalTheme: boolean;
  };
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    twitterHandle: string;
    ogImage: string;
    favicon: string;
  };
  analytics: {
    googleAnalyticsId?: string;
    googleTagManagerId?: string;
    enabled: boolean;
  };
  features: {
    blog: boolean;
    portfolio: boolean;
    contact: boolean;
    newsletter: boolean;
    comments: boolean;
  };
  contact: {
    email: string;
    phone?: string;
    address?: string;
    contactFormEndpoint?: string;
  };
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
}

// Admin Interface Types
export interface AdminStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalViews: number;
  monthlyViews: number;
  totalExperience: number;
  totalSkills: number;
  lastUpdated: string;
}

export interface ContentStats {
  posts: {
    total: number;
    published: number;
    drafts: number;
    featured: number;
  };
  experience: {
    total: number;
    work: number;
    education: number;
    certifications: number;
  };
  skills: {
    total: number;
    categories: number;
    averageLevel: number;
  };
}
