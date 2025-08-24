import { BlogPage } from '@/components/blog/blog-page';
import { getAllBlogPosts } from '@/lib/blog-utils';
import { readFileSync } from 'fs';
import { join } from 'path';
import { BlogCategory } from '@/types/blog';

// Load categories data
function getCategoriesData(): BlogCategory[] {
  const filePath = join(process.cwd(), 'src/data/blogs/categories.json');
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function Blog() {
  const posts = await getAllBlogPosts();
  const categories = getCategoriesData();

  return <BlogPage posts={posts} categories={categories} />;
}

export const metadata = {
  title: 'Blog | Alex Johnson - Full-Stack Developer',
  description: 'Web development insights, tutorials, and career advice from a senior full-stack developer.',
};
