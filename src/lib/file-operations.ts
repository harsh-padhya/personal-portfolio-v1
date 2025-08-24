import fs from 'fs/promises';
import path from 'path';
import type { BlogPost, BlogCategory } from '@/types/blog';
import type { Profile, Experience, SkillCategory } from '@/types/profile';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const BLOGS_DIR = path.join(DATA_DIR, 'blogs');

export async function ensureDirectoryExists(dirPath: string): Promise<void> {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    console.error('Error creating directory:', error);
  }
}

export async function saveBlogPost(post: BlogPost): Promise<boolean> {
  try {
    const categoryPath = path.join(BLOGS_DIR, post.category);
    const subcategoryPath = path.join(categoryPath, post.subcategory);
    
    await ensureDirectoryExists(subcategoryPath);
    
    const filePath = path.join(subcategoryPath, `${post.id}.json`);
    await fs.writeFile(filePath, JSON.stringify(post, null, 2));
    
    return true;
  } catch (error) {
    console.error('Error saving blog post:', error);
    return false;
  }
}

export async function deleteBlogPost(category: string, subcategory: string, slug: string): Promise<boolean> {
  try {
    const filePath = path.join(BLOGS_DIR, category, subcategory, `${slug}.json`);
    await fs.unlink(filePath);
    return true;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }
}

export async function saveCategories(categories: BlogCategory[]): Promise<boolean> {
  try {
    const categoriesPath = path.join(BLOGS_DIR, 'categories.json');
    await fs.writeFile(categoriesPath, JSON.stringify(categories, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving categories:', error);
    return false;
  }
}

export async function loadProfile(): Promise<Profile | null> {
  try {
    const profilePath = path.join(DATA_DIR, 'profile.json');
    const fileContent = await fs.readFile(profilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error loading profile:', error);
    return null;
  }
}

export async function saveProfile(profile: Profile): Promise<boolean> {
  try {
    const profilePath = path.join(DATA_DIR, 'profile.json');
    await fs.writeFile(profilePath, JSON.stringify(profile, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving profile:', error);
    return false;
  }
}

export async function loadExperience(): Promise<Experience[]> {
  try {
    const experiencePath = path.join(DATA_DIR, 'experience.json');
    const fileContent = await fs.readFile(experiencePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error loading experience:', error);
    return [];
  }
}

export async function saveExperience(experience: Experience[]): Promise<boolean> {
  try {
    const experiencePath = path.join(DATA_DIR, 'experience.json');
    await fs.writeFile(experiencePath, JSON.stringify(experience, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving experience:', error);
    return false;
  }
}

export async function loadSkills(): Promise<SkillCategory[]> {
  try {
    const skillsPath = path.join(DATA_DIR, 'skills.json');
    const fileContent = await fs.readFile(skillsPath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error loading skills:', error);
    return [];
  }
}

export async function saveSkills(skills: SkillCategory[]): Promise<boolean> {
  try {
    const skillsPath = path.join(DATA_DIR, 'skills.json');
    await fs.writeFile(skillsPath, JSON.stringify(skills, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving skills:', error);
    return false;
  }
}
