import { BlogPage } from '@/components/blog/blog-page';
import { getAllBlogPosts } from '@/lib/blog-utils';
import { readFileSync } from 'fs';
import { join } from 'path';
import { BlogCategory } from '@/types/blog';
import { Profile } from '@/types/profile';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// Load categories data
function getCategoriesData(): BlogCategory[] {
  const filePath = join(process.cwd(), 'src/data/blogs/categories.json');
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

// Load profile data for dynamic metadata
function getProfileData(): Profile {
  const filePath = join(process.cwd(), 'src/data/profile.json');
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export async function generateMetadata() {
  const profile = getProfileData();
  
  return {
    title: `Blog | ${profile.personal.name} - ${profile.personal.title}`,
    description: 'Web development insights, tutorials, and career advice from a senior full-stack developer.',
  };
}

export default async function Blog() {
  const posts = await getAllBlogPosts();
  const categories = getCategoriesData();

  return <BlogPage posts={posts} categories={categories} />;
}
