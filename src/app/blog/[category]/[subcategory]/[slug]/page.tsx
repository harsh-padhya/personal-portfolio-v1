import { notFound } from 'next/navigation';
import { BlogPostPage } from '@/components/blog/blog-post-page';
import { getBlogPost, getAllBlogPosts, getBlogPostsByCategory } from '@/lib/blog-utils';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Profile } from '@/types/profile';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// Load profile data for dynamic metadata
function getProfileData(): Profile {
  const filePath = join(process.cwd(), 'src/data/profile.json');
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

interface BlogPostProps {
  params: Promise<{
    category: string;
    subcategory: string;
    slug: string;
  }>;
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { category, subcategory, slug } = await params;
  
  try {
    const post = await getBlogPost(category, subcategory, slug);
    
    if (!post) {
      notFound();
    }

    // Get related posts from the same category
    const categoryPosts = await getBlogPostsByCategory(category);
    const relatedPosts = categoryPosts
      .filter(p => p.id !== slug && p.status === 'published')
      .slice(0, 3);

    return <BlogPostPage post={post} relatedPosts={relatedPosts} />;
  } catch (error) {
    console.error('Error loading blog post:', error);
    notFound();
  }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  try {
    const posts = await getAllBlogPosts();
    
    return posts
      .filter(post => post.status === 'published')
      .map((post) => ({
        category: post.category,
        subcategory: post.subcategory,
        slug: post.id,
      }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: BlogPostProps) {
  const { category, subcategory, slug } = await params;
  const profile = getProfileData();
  
  try {
    const post = await getBlogPost(category, subcategory, slug);
    
    if (!post) {
      return {
        title: `Post Not Found - ${profile.personal.name}`,
        description: 'The requested blog post could not be found.',
      };
    }

    return {
      title: post.seoTitle || `${post.title} | ${profile.personal.name} - ${profile.personal.title}`,
      description: post.seoDescription || post.excerpt,
      keywords: post.tags.join(', '),
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.publishDate,
        modifiedTime: post.lastModified,
        authors: [post.author],
        tags: post.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
      },
    };
  } catch (error) {
    return {
      title: `Blog Post | ${profile.personal.name} - ${profile.personal.title}`,
      description: 'Web development insights and tutorials.',
    };
  }
}
