import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readTime = Math.ceil(words / wordsPerMinute);
  return `${readTime} min read`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function getAssetPath(path: string): string {
  // Check if we're in GitHub Pages environment
  const isGitHubPages = process.env.NODE_ENV === 'production' && 
    (typeof window !== 'undefined' ? 
      window.location.hostname === 'harsh-padhya.github.io' : 
      process.env.GITHUB_PAGES === 'true');
  
  const basePath = isGitHubPages ? '/personal-portfolio-v1' : '';
  
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${basePath}${normalizedPath}`;
}
