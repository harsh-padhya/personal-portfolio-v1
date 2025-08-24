'use client';

import { useState, useMemo } from 'react';
import { Search, BookOpen, TrendingUp } from 'lucide-react';
import { TerminalCard } from '@/components/ui';
import { BlogCard } from '@/components/blog/blog-card';
import { CategoryFilter } from '@/components/blog/category-filter';
import { BlogListItem, BlogCategory } from '@/types/blog';

interface BlogPageProps {
  posts: BlogListItem[];
  categories: BlogCategory[];
}

export function BlogPage({ posts, categories }: BlogPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | undefined>();

  // Filter posts based on search and category selection
  const filteredPosts = useMemo(() => {
    let filtered = posts.filter(post => post.status === 'published');

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Subcategory filter
    if (selectedSubcategory) {
      filtered = filtered.filter(post => post.subcategory === selectedSubcategory);
    }

    // Sort by publish date (newest first)
    return filtered.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  }, [posts, searchTerm, selectedCategory, selectedSubcategory]);

  const featuredPosts = filteredPosts.filter(post => post.featured).slice(0, 2);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-terminal-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-terminal-foreground mb-4">
            <span className="text-terminal-accent font-mono">$</span> cat blog/
          </h1>
          <p className="text-terminal-muted font-mono max-w-2xl mx-auto">
            {'>'} Exploring web development, DevOps, and career insights
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <TerminalCard variant="glass" className="text-center">
            <div className="space-y-2">
              <BookOpen className="h-8 w-8 text-terminal-accent mx-auto" />
              <div className="text-2xl font-bold text-terminal-accent font-mono">
                {posts.filter(p => p.status === 'published').length}
              </div>
              <div className="text-terminal-foreground">Published Posts</div>
            </div>
          </TerminalCard>
          
          <TerminalCard variant="glass" className="text-center">
            <div className="space-y-2">
              <TrendingUp className="h-8 w-8 text-terminal-accent mx-auto" />
              <div className="text-2xl font-bold text-terminal-accent font-mono">
                {categories.length}
              </div>
              <div className="text-terminal-foreground">Categories</div>
            </div>
          </TerminalCard>
          
          <TerminalCard variant="glass" className="text-center">
            <div className="space-y-2">
              <Search className="h-8 w-8 text-terminal-accent mx-auto" />
              <div className="text-2xl font-bold text-terminal-accent font-mono">
                {filteredPosts.length}
              </div>
              <div className="text-terminal-foreground">
                {searchTerm || selectedCategory ? 'Filtered' : 'Total'} Results
              </div>
            </div>
          </TerminalCard>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <TerminalCard title="search.sh" variant="glass">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-terminal-muted" />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-terminal-surface border border-terminal-border rounded pl-10 pr-4 py-2 text-terminal-foreground font-mono focus:border-terminal-accent focus:outline-none transition-colors"
                  />
                </div>
                {searchTerm && (
                  <div className="text-xs text-terminal-muted font-mono">
                    {filteredPosts.length} results for "{searchTerm}"
                  </div>
                )}
              </div>
            </TerminalCard>

            {/* Category Filter */}
            <TerminalCard title="categories.json" variant="glass">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                selectedSubcategory={selectedSubcategory}
                onCategoryChange={setSelectedCategory}
                onSubcategoryChange={setSelectedSubcategory}
              />
            </TerminalCard>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-terminal-foreground mb-6 font-mono">
                  <span className="text-terminal-accent">#</span> Featured Posts
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {featuredPosts.map((post) => (
                    <BlogCard key={post.id} post={post} featured />
                  ))}
                </div>
              </div>
            )}

            {/* All Posts */}
            <div>
              <h2 className="text-2xl font-bold text-terminal-foreground mb-6 font-mono">
                <span className="text-terminal-accent">#</span> All Posts
                {(selectedCategory || selectedSubcategory) && (
                  <span className="text-terminal-muted text-lg ml-2">
                    ({filteredPosts.length} posts)
                  </span>
                )}
              </h2>
              
              {filteredPosts.length === 0 ? (
                <TerminalCard variant="glass" className="text-center py-12">
                  <div className="space-y-4">
                    <Search className="h-12 w-12 text-terminal-muted mx-auto" />
                    <div className="text-terminal-foreground">
                      No posts found matching your criteria
                    </div>
                    <div className="text-terminal-muted text-sm">
                      Try adjusting your search or filter settings
                    </div>
                  </div>
                </TerminalCard>
              ) : (
                <div className="space-y-6">
                  {regularPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
