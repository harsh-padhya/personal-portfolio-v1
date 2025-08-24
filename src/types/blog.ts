export interface BlogPost {
  id: string;                      // Unique identifier (slug)
  title: string;                   // Post title
  category: string;                // Main category ID
  subcategory: string;             // Subcategory ID
  tags: string[];                  // Array of tags
  publishDate: string;             // ISO date string
  lastModified: string;            // ISO date string
  readTime: string;                // Estimated read time
  excerpt: string;                 // Brief description (150 chars)
  content: string;                 // Markdown content
  featured: boolean;               // Featured post flag
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  status: 'draft' | 'published';   // Publication status
  author: string;                  // Author name
  seoTitle?: string;               // Optional SEO title
  seoDescription?: string;         // Optional SEO description
}

export interface BlogCategory {
  id: string;                      // Unique category identifier
  name: string;                    // Display name
  description: string;             // Category description
  icon?: string;                   // Optional icon name
  subcategories: BlogSubcategory[];
}

export interface BlogSubcategory {
  id: string;                      // Unique subcategory identifier
  name: string;                    // Display name
  description: string;             // Subcategory description
  icon?: string;                   // Optional icon name
}

export interface BlogListItem {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  tags: string[];
  publishDate: string;
  readTime: string;
  excerpt: string;
  featured: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  status: 'draft' | 'published';
  author: string;
}
