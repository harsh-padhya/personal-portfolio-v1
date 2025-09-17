// Static data utilities for production environment
import type { BlogPost, BlogCategory, BlogListItem } from '@/types/blog';
import type { Experience, Profile } from '@/types/profile';

// Environment detection
export const isDev = process.env.NODE_ENV === 'development';
export const isClient = typeof window !== 'undefined';

// Static data fetchers for production
export async function getStaticBlogPosts(): Promise<BlogListItem[]> {
  try {
    // In production, this would be pre-built static data
    if (!isDev && isClient) {
      // Fetch from static JSON files in public directory during build
      const response = await fetch('/data/blogs-index.json');
      if (response.ok) {
        return await response.json();
      }
    }
    
    // For development, we'll return empty array to avoid server-side imports
    console.warn('Static blog posts not available in this context');
    return [];
  } catch (error) {
    console.error('Error fetching static blog posts:', error);
    return [];
  }
}

export async function getStaticBlogPost(category: string, subcategory: string, slug: string): Promise<BlogPost | null> {
  try {
    if (!isDev && isClient) {
      // In production, fetch from static JSON files
      const response = await fetch(`/data/blogs/${category}/${subcategory}/${slug}.json`);
      if (response.ok) {
        return await response.json();
      }
      return null;
    }
    
    // For development, we'll return null to avoid server-side imports
    console.warn('Static blog post not available in this context');
    return null;
  } catch (error) {
    console.error('Error fetching static blog post:', error);
    return null;
  }
}

export async function getStaticCategories(): Promise<BlogCategory[]> {
  try {
    if (!isDev && isClient) {
      const response = await fetch('/data/blogs/categories.json');
      if (response.ok) {
        return await response.json();
      }
    }
    
    // For development, we'll return empty array to avoid server-side imports
    console.warn('Static categories not available in this context');
    return [];
  } catch (error) {
    console.error('Error fetching static categories:', error);
    return [];
  }
}

export async function getStaticExperience(): Promise<any[]> {
  try {
    if (!isDev && isClient) {
      const response = await fetch('/data/experience.json');
      if (response.ok) {
        return await response.json();
      }
    }
    
    // Fallback for build time
    const experienceData = await import('@/data/experience.json');
    return experienceData.default as any[];
  } catch (error) {
    console.error('Error fetching static experience:', error);
    return [];
  }
}

export async function getStaticSkills() {
  try {
    if (!isDev && isClient) {
      const response = await fetch('/data/skills.json');
      if (response.ok) {
        return await response.json();
      }
    }
    
    // Fallback for build time
    const skillsData = await import('@/data/skills.json');
    return skillsData.default;
  } catch (error) {
    console.error('Error fetching static skills:', error);
    return [];
  }
}

export async function getStaticProfile(): Promise<Profile> {
  try {
    if (!isDev && isClient) {
      const response = await fetch('/data/profile.json');
      if (response.ok) {
        return await response.json();
      }
    }
    
    // Fallback for build time
    const profileData = await import('@/data/profile.json');
    return profileData.default as Profile;
  } catch (error) {
    console.error('Error fetching static profile:', error);
    // Return a fallback profile
    return {
      personal: {
        name: 'Developer',
        title: 'Software Engineer',
        email: 'developer@example.com',
        location: 'Remote',
        bio: 'Passionate developer',
        avatar: '/images/avatar.jpg',
        resume: '/documents/harsh-padhya-resume.pdf'
      },
      social: {
        github: '',
        linkedin: '',
        twitter: '',
        website: ''
      },
      hero: {
        tagline: 'Building scalable solutions, one component at a time',
        description: 'Creating amazing digital experiences',
        cta: "Let's Connect"
      }
    };
  }
}

// Admin utilities that work in development
export async function getAllBlogPostsClient(): Promise<BlogListItem[]> {
  if (!isDev) {
    console.warn('Admin functionality is only available in development mode');
    return [];
  }
  
  try {
    // In development, fetch from the static data directory served by Next.js
    if (isClient) {
      const response = await fetch('/data/blogs-index.json');
      if (response.ok) {
        return await response.json();
      }
    }
    
    // For development server-side, return empty array to avoid fs imports
    console.warn('Blog posts will be loaded from static files');
    return [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPostByIdClient(id: string): Promise<BlogPost | null> {
  if (!isDev) {
    console.warn('Admin functionality is only available in development mode');
    return null;
  }
  
  try {
    // First get all posts to find the one we need
    const allPosts = await getAllBlogPostsClient();
    const postItem = allPosts.find(p => p.id === id);
    
    if (!postItem) {
      return null;
    }

    // Then fetch the full post with content
    if (isClient) {
      const response = await fetch(`/data/blogs/${postItem.category}/${postItem.subcategory}/${postItem.id}.json`);
      if (response.ok) {
        return await response.json();
      }
    }
    
    // For development server-side, return null to avoid fs imports
    console.warn('Blog post will be loaded from static files');
    return null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function saveBlogPostClient(post: BlogPost): Promise<boolean> {
  if (!isDev) {
    console.warn('Admin functionality is only available in development mode');
    return false;
  }
  
  try {
    // For development, we'll simulate saving by logging
    // In a real implementation, this would save to the file system via an API
    console.log('Saving blog post (dev mode - simulation only):', post);
    
    // You could implement actual file writing here using a custom API route
    // or by using the file-operations utility if it exists
    
    alert('Blog post saved successfully! (Development mode - changes are not persisted)');
    return true;
  } catch (error) {
    console.error('Error saving blog post:', error);
    return false;
  }
}

export async function deleteBlogPostClient(id: string, category: string, subcategory: string): Promise<boolean> {
  if (!isDev) {
    console.warn('Admin functionality is only available in development mode');
    return false;
  }
  
  try {
    // For development, we'll simulate deletion by logging
    console.log('Deleting blog post (dev mode - simulation only):', { id, category, subcategory });
    
    alert('Blog post deleted successfully! (Development mode - changes are not persisted)');
    return true;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }
}

export async function getCategoriesClient(): Promise<BlogCategory[]> {
  if (!isDev) {
    console.warn('Admin functionality is only available in development mode');
    return [];
  }
  
  try {
    // In development, fetch from the static data
    if (isClient) {
      const response = await fetch('/data/blogs/categories.json');
      if (response.ok) {
        return await response.json();
      }
    }
    
    // For development server-side, return default categories to avoid fs imports
    console.warn('Categories will be loaded from static files');
    
    // Return default categories as fallback
    return [
      {
        id: 'web-development',
        name: 'Web Development',
        description: 'Frontend and backend web development topics',
        subcategories: [
          { id: 'react', name: 'React', description: 'React.js tutorials and tips' },
          { id: 'nodejs', name: 'Node.js', description: 'Backend development with Node.js' },
          { id: 'typescript', name: 'TypeScript', description: 'TypeScript development' }
        ]
      },
      {
        id: 'devops',
        name: 'DevOps',
        description: 'DevOps practices and tools',
        subcategories: [
          { id: 'docker', name: 'Docker', description: 'Containerization with Docker' },
          { id: 'cicd', name: 'CI/CD', description: 'Continuous integration and deployment' }
        ]
      },
      {
        id: 'career',
        name: 'Career',
        description: 'Career development and advice',
        subcategories: [
          { id: 'growth', name: 'Growth', description: 'Career growth and development' },
          { id: 'tips', name: 'Tips', description: 'Career tips and advice' }
        ]
      }
    ];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Experience admin utilities
export async function getAllExperienceClient() {
  if (!isDev) {
    console.warn('Admin functionality is only available in development mode');
    return [];
  }
  
  try {
    // In development, fetch from the static data
    if (isClient) {
      const response = await fetch('/data/experience.json');
      if (response.ok) {
        return await response.json();
      }
    }
    
    // Fallback to direct import
    try {
      const experienceData = await import('@/data/experience.json');
      return experienceData.default;
    } catch (error) {
      console.error('Error importing experience data:', error);
      return [];
    }
  } catch (error) {
    console.error('Error fetching experience:', error);
    return [];
  }
}

export async function saveExperienceClient(experienceData: any): Promise<boolean> {
  if (!isDev) {
    console.warn('Admin functionality is only available in development mode');
    return false;
  }
  
  try {
    // For development, we'll simulate saving by logging
    console.log('Saving experience data (dev mode - simulation only):', experienceData);
    
    alert('Experience data saved successfully! (Development mode - changes are not persisted)');
    return true;
  } catch (error) {
    console.error('Error saving experience:', error);
    return false;
  }
}

// Skills admin utilities
export async function getAllSkillsClient() {
  if (!isDev) {
    console.warn('Admin functionality is only available in development mode');
    return [];
  }
  
  try {
    // In development, fetch from the static data
    if (isClient) {
      const response = await fetch('/data/skills.json');
      if (response.ok) {
        return await response.json();
      }
    }
    
    // Fallback to direct import
    try {
      const skillsData = await import('@/data/skills.json');
      return skillsData.default;
    } catch (error) {
      console.error('Error importing skills data:', error);
      return [];
    }
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
}

export async function saveSkillsClient(skillsData: any): Promise<boolean> {
  if (!isDev) {
    console.warn('Admin functionality is only available in development mode');
    return false;
  }
  
  try {
    // For development, we'll simulate saving by logging
    console.log('Saving skills data (dev mode - simulation only):', skillsData);
    
    alert('Skills data saved successfully! (Development mode - changes are not persisted)');
    return true;
  } catch (error) {
    console.error('Error saving skills:', error);
    return false;
  }
}

// Profile admin utilities
export async function getProfileClient(): Promise<Profile | null> {
  if (!isDev) {
    console.warn('Admin functionality is only available in development mode');
    return null;
  }
  
  try {
    // In development, fetch from the static data
    if (isClient) {
      const response = await fetch('/data/profile.json');
      if (response.ok) {
        return await response.json();
      }
    }
    
    // Fallback to direct import
    try {
      const profileData = await import('@/data/profile.json');
      return profileData.default as Profile;
    } catch (error) {
      console.error('Error importing profile data:', error);
      return null;
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}

export async function saveProfileClient(profileData: Profile): Promise<boolean> {
  if (!isDev) {
    console.warn('Admin functionality is only available in development mode');
    return false;
  }
  
  try {
    // For development, we'll simulate saving by logging
    console.log('Saving profile data (dev mode - simulation only):', profileData);
    
    alert('Profile data saved successfully! (Development mode - changes are not persisted)');
    return true;
  } catch (error) {
    console.error('Error saving profile:', error);
    return false;
  }
}
