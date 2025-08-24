// Client-side utilities for admin interface
import type { BlogPost, BlogCategory, BlogListItem } from '@/types/blog';

// Blog CRUD operations
export async function getAllBlogPostsClient(): Promise<BlogListItem[]> {
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

// Categories
export async function getCategoriesClient(): Promise<BlogCategory[]> {
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

// Experience CRUD operations
export async function getAllExperienceClient() {
  try {
    const response = await fetch('/api/admin/experience');
    if (!response.ok) {
      throw new Error('Failed to fetch experience data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching experience:', error);
    return [];
  }
}

export async function saveExperienceClient(experienceData: any): Promise<boolean> {
  try {
    const response = await fetch('/api/admin/experience', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(experienceData)
    });

    return response.ok;
  } catch (error) {
    console.error('Error saving experience:', error);
    return false;
  }
}

// Skills CRUD operations
export async function getAllSkillsClient() {
  try {
    const response = await fetch('/api/admin/skills');
    if (!response.ok) {
      throw new Error('Failed to fetch skills data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
}

export async function saveSkillsClient(skillsData: any): Promise<boolean> {
  try {
    const response = await fetch('/api/admin/skills', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(skillsData)
    });

    return response.ok;
  } catch (error) {
    console.error('Error saving skills:', error);
    return false;
  }
}
