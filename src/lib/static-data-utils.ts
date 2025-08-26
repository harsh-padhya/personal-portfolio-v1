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
        resume: '/documents/resume.pdf'
      },
      social: {
        github: '',
        linkedin: '',
        twitter: '',
        website: ''
      },
      hero: {
        tagline: 'Building the web',
        description: 'Creating amazing digital experiences',
        cta: "Let's Connect"
      }
    };
  }
}

// Admin utilities that only work in development
export async function getAllBlogPostsClient(): Promise<BlogListItem[]> {
  if (!isDev) {
    console.warn('Admin functionality is only available in development mode');
    return [];
  }
  
  try {
    const response = await fetch('/api/admin/blogs');
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    return await response.json();
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
    const response = await fetch(`/api/admin/blogs?id=${id}`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
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
    const method = post.id ? 'PUT' : 'POST';
    const response = await fetch('/api/admin/blogs', {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post)
    });

    return response.ok;
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
    const response = await fetch(`/api/admin/blogs?id=${id}&category=${category}&subcategory=${subcategory}`, {
      method: 'DELETE'
    });

    return response.ok;
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
    // For now, return default categories since we haven't implemented categories API yet
    const defaultCategories: BlogCategory[] = [
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
          { id: 'kubernetes', name: 'Kubernetes', description: 'Container orchestration' }
        ]
      },
      {
        id: 'career',
        name: 'Career',
        description: 'Career development and advice',
        subcategories: [
          { id: 'interviews', name: 'Interviews', description: 'Technical interview preparation' }
        ]
      }
    ];
    
    return defaultCategories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}
