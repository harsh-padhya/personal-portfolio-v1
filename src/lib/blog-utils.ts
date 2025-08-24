import fs from 'fs/promises';
import path from 'path';
import type { BlogPost, BlogCategory, BlogListItem } from '@/types/blog';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const BLOGS_DIR = path.join(DATA_DIR, 'blogs');

export async function getAllBlogPosts(): Promise<BlogListItem[]> {
  try {
    const posts: BlogListItem[] = [];
    const categories = await getAllCategories();
    
    for (const category of categories) {
      for (const subcategory of category.subcategories) {
        const subcategoryPath = path.join(BLOGS_DIR, category.id, subcategory.id);
        
        try {
          const files = await fs.readdir(subcategoryPath);
          const jsonFiles = files.filter(file => file.endsWith('.json'));
          
          for (const file of jsonFiles) {
            const filePath = path.join(subcategoryPath, file);
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const post: BlogPost = JSON.parse(fileContent);
            
            // Convert to BlogListItem (excluding content)
            const { content, ...listItem } = post;
            posts.push(listItem as BlogListItem);
          }
        } catch (error) {
          // Directory might not exist, continue
          continue;
        }
      }
    }
    
    return posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  } catch (error) {
    console.error('Error getting all blog posts:', error);
    return [];
  }
}

export async function getBlogPost(category: string, subcategory: string, slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(BLOGS_DIR, category, subcategory, `${slug}.json`);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error getting blog post:', error);
    return null;
  }
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    const allPosts = await getAllBlogPosts();
    const postItem = allPosts.find(p => p.id === id);
    
    if (!postItem) {
      return null;
    }

    // Load the full post with content
    return await getBlogPost(postItem.category, postItem.subcategory, postItem.id);
  } catch (error) {
    console.error('Error getting blog post by ID:', error);
    return null;
  }
}

export async function getAllCategories(): Promise<BlogCategory[]> {
  try {
    const categoriesPath = path.join(BLOGS_DIR, 'categories.json');
    const fileContent = await fs.readFile(categoriesPath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error getting categories:', error);
    return [];
  }
}

export async function getBlogPostsByCategory(categoryId: string, subcategoryId?: string): Promise<BlogListItem[]> {
  const allPosts = await getAllBlogPosts();
  
  if (subcategoryId) {
    return allPosts.filter(post => 
      post.category === categoryId && post.subcategory === subcategoryId
    );
  }
  
  return allPosts.filter(post => post.category === categoryId);
}

export async function getFeaturedPosts(limit: number = 3): Promise<BlogListItem[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts
    .filter(post => post.featured && post.status === 'published')
    .slice(0, limit);
}

export async function getRecentPosts(limit: number = 5): Promise<BlogListItem[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts
    .filter(post => post.status === 'published')
    .slice(0, limit);
}

export function generateBlogPostPath(category: string, subcategory: string, slug: string): string {
  return `/blog/${category}/${subcategory}/${slug}`;
}

export function getReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

// Admin functions for managing blog posts
export async function saveBlogPost(post: BlogPost): Promise<void> {
  try {
    const filePath = path.join(BLOGS_DIR, post.category, post.subcategory, `${post.id}.json`);
    
    // Ensure directory exists
    const dirPath = path.dirname(filePath);
    await fs.mkdir(dirPath, { recursive: true });
    
    // Update lastModified
    const updatedPost = {
      ...post,
      lastModified: new Date().toISOString()
    };
    
    await fs.writeFile(filePath, JSON.stringify(updatedPost, null, 2));
  } catch (error) {
    console.error('Error saving blog post:', error);
    throw error;
  }
}

export async function deleteBlogPost(category: string, subcategory: string, slug: string): Promise<void> {
  try {
    const filePath = path.join(BLOGS_DIR, category, subcategory, `${slug}.json`);
    await fs.unlink(filePath);
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
}

export async function saveCategories(categories: BlogCategory[]): Promise<void> {
  try {
    const categoriesPath = path.join(BLOGS_DIR, 'categories.json');
    await fs.writeFile(categoriesPath, JSON.stringify(categories, null, 2));
  } catch (error) {
    console.error('Error saving categories:', error);
    throw error;
  }
}
