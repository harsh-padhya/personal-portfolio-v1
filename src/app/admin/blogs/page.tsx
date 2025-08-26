'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Star,
  Calendar,
  Tag,
  Clock,
  FileText
} from 'lucide-react';
import { TerminalCard } from '@/components/ui/terminal-card';
import { TerminalButton } from '@/components/ui/terminal-button';
import { BlogListItem } from '@/types/blog';
import { getAllBlogPostsClient, deleteBlogPostClient } from '@/lib/static-data-utils';

type SortOption = 'date' | 'title' | 'category';
type FilterOption = 'all' | 'published' | 'draft' | 'featured';

export default function BlogsAdminPage() {
  const [posts, setPosts] = useState<BlogListItem[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');

  const handleDeletePost = async (post: BlogListItem) => {
    if (confirm(`Are you sure you want to delete "${post.title}"? This action cannot be undone.`)) {
      try {
        await deleteBlogPostClient(post.id, post.category, post.subcategory);
        // Reload posts after deletion
        const updatedPosts = await getAllBlogPostsClient();
        setPosts(updatedPosts);
        setFilteredPosts(updatedPosts);
        alert('Post deleted successfully!');
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Error deleting post. Please try again.');
      }
    }
  };

  useEffect(() => {
    async function loadPosts() {
      try {
        const allPosts = await getAllBlogPostsClient();
        setPosts(allPosts);
        setFilteredPosts(allPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  useEffect(() => {
    let result = [...posts];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply status filter
    if (filterBy !== 'all') {
      if (filterBy === 'featured') {
        result = result.filter(post => post.featured);
      } else {
        result = result.filter(post => post.status === filterBy);
      }
    }

    // Apply sorting
    switch (sortBy) {
      case 'date':
        result.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
        break;
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'category':
        result.sort((a, b) => a.category.localeCompare(b.category));
        break;
    }

    setFilteredPosts(result);
  }, [posts, searchQuery, sortBy, filterBy]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-500';
      case 'intermediate': return 'text-yellow-500';
      case 'advanced': return 'text-red-500';
      default: return 'text-terminal-muted';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'text-green-500';
      case 'draft': return 'text-yellow-500';
      default: return 'text-terminal-muted';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-terminal-accent font-mono">Blog Posts</h1>
        </div>
        <TerminalCard className="animate-pulse">
          <div className="h-64 bg-terminal-muted/20 rounded"></div>
        </TerminalCard>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-terminal-accent font-mono">Blog Posts</h1>
          <p className="text-terminal-muted mt-1">Manage your blog content and publications.</p>
        </div>
        <Link href="/admin/blogs/new">
          <TerminalButton>
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </TerminalButton>
        </Link>
      </div>

      {/* Filters and Search */}
      <TerminalCard>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-terminal-muted" />
            <input
              type="text"
              placeholder="Search posts..."
              className="w-full pl-10 pr-4 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground placeholder-terminal-muted focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sort */}
          <select
            className="px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
            <option value="category">Sort by Category</option>
          </select>

          {/* Filter */}
          <select
            className="px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value as FilterOption)}
          >
            <option value="all">All Posts</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
            <option value="featured">Featured</option>
          </select>

          {/* Stats */}
          <div className="text-right">
            <p className="text-sm text-terminal-muted font-mono">
              {filteredPosts.length} of {posts.length} posts
            </p>
          </div>
        </div>
      </TerminalCard>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <TerminalCard>
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-terminal-muted mx-auto mb-4" />
              <h3 className="text-lg font-medium text-terminal-foreground mb-2">No posts found</h3>
              <p className="text-terminal-muted mb-4">
                {searchQuery || filterBy !== 'all' 
                  ? 'Try adjusting your search or filters.'
                  : 'Get started by creating your first blog post.'
                }
              </p>
              {!searchQuery && filterBy === 'all' && (
                <Link href="/admin/blogs/new">
                  <TerminalButton>
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Post
                  </TerminalButton>
                </Link>
              )}
            </div>
          </TerminalCard>
        ) : (
          filteredPosts.map((post) => (
            <TerminalCard key={post.id} className="hover:border-terminal-accent/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-terminal-foreground truncate">
                      {post.title}
                    </h3>
                    {post.featured && (
                      <Star className="h-4 w-4 text-terminal-accent fill-current flex-shrink-0" />
                    )}
                    <span className={`text-xs font-mono px-2 py-1 rounded ${getStatusColor(post.status)}`}>
                      {post.status}
                    </span>
                  </div>

                  <p className="text-terminal-muted text-sm mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-terminal-muted font-mono">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Tag className="h-3 w-3" />
                      <span className="capitalize">{post.category.replace('-', ' ')}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <span className={`font-medium ${getDifficultyColor(post.difficulty)}`}>
                        {post.difficulty}
                      </span>
                    </div>

                    {post.tags.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <span>Tags:</span>
                        <span className="text-terminal-accent">
                          {post.tags.slice(0, 3).join(', ')}
                          {post.tags.length > 3 && ` +${post.tags.length - 3}`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <Link href={`/blog/${post.category}/${post.subcategory}/${post.id}`} target="_blank">
                    <TerminalButton variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </TerminalButton>
                  </Link>
                  
                  <Link href={`/admin/blogs/edit/${post.id}`}>
                    <TerminalButton variant="secondary" size="sm">
                      <Edit className="h-4 w-4" />
                    </TerminalButton>
                  </Link>
                  
                  <TerminalButton 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeletePost(post)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </TerminalButton>
                </div>
              </div>
            </TerminalCard>
          ))
        )}
      </div>

      {/* Summary */}
      {filteredPosts.length > 0 && (
        <TerminalCard>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-terminal-accent font-mono">
                {filteredPosts.filter(p => p.status === 'published').length}
              </p>
              <p className="text-terminal-muted text-sm">Published</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-terminal-accent font-mono">
                {filteredPosts.filter(p => p.status === 'draft').length}
              </p>
              <p className="text-terminal-muted text-sm">Drafts</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-terminal-accent font-mono">
                {filteredPosts.filter(p => p.featured).length}
              </p>
              <p className="text-terminal-muted text-sm">Featured</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-terminal-accent font-mono">
                {new Set(filteredPosts.map(p => p.category)).size}
              </p>
              <p className="text-terminal-muted text-sm">Categories</p>
            </div>
          </div>
        </TerminalCard>
      )}
    </div>
  );
}
