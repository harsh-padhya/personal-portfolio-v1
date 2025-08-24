// Client-side utilities for admin interface
import { BlogPost, BlogListItem, BlogCategory } from '@/types/blog';

// API Functions for client-side admin components
export async function getAllBlogPostsClient(): Promise<BlogListItem[]> {
  try {
    const response = await fetch('/api/admin/blogs');
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
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
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function saveBlogPostClient(post: BlogPost): Promise<void> {
  const isNew = !post.id || post.id === '';
  const method = isNew ? 'POST' : 'PUT';
  
  try {
    const response = await fetch('/api/admin/blogs', {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to save post');
    }
  } catch (error) {
    console.error('Error saving blog post:', error);
    throw error;
  }
}

export async function deleteBlogPostClient(id: string, category: string, subcategory: string): Promise<void> {
  try {
    const response = await fetch(`/api/admin/blogs?id=${id}&category=${category}&subcategory=${subcategory}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete post');
    }
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
}

export async function getCategoriesClient(): Promise<BlogCategory[]> {
  try {
    // For now, return default categories since we don't have categories API yet
    const defaultCategories: BlogCategory[] = [
      {
        id: 'web-development',
        name: 'Web Development',
        description: 'Frontend, backend, and full-stack development topics',
        subcategories: [
          { id: 'frontend', name: 'Frontend', description: 'React, Vue, Angular, CSS, HTML' },
          { id: 'backend', name: 'Backend', description: 'Node.js, Python, databases, APIs' },
          { id: 'fullstack', name: 'Full Stack', description: 'End-to-end development projects' }
        ]
      },
      {
        id: 'devops',
        name: 'DevOps',
        description: 'Deployment, automation, and infrastructure topics',
        subcategories: [
          { id: 'deployment', name: 'Deployment', description: 'CI/CD, hosting, containerization' },
          { id: 'monitoring', name: 'Monitoring', description: 'Logging, metrics, observability' },
          { id: 'automation', name: 'Automation', description: 'Scripts, workflows, tools' }
        ]
      },
      {
        id: 'career',
        name: 'Career',
        description: 'Professional development and career advice',
        subcategories: [
          { id: 'growth', name: 'Growth', description: 'Career progression, leadership' },
          { id: 'skills', name: 'Skills', description: 'Learning, certifications, technologies' },
          { id: 'interviews', name: 'Interviews', description: 'Interview prep, tips, experiences' }
        ]
      }
    ];
    
    return defaultCategories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}
