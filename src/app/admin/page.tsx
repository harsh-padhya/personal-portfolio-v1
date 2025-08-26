'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  FolderOpen, 
  Eye, 
  Plus,
  TrendingUp,
  Calendar,
  Edit,
  Star
} from 'lucide-react';
import { TerminalCard } from '@/components/ui/terminal-card';
import { TerminalButton } from '@/components/ui/terminal-button';
import { BlogListItem } from '@/types/blog';
import { getAllBlogPostsClient } from '@/lib/static-data-utils';

interface DashboardStats {
  totalPosts: number;
  totalCategories: number;
  recentPosts: BlogListItem[];
  popularCategories: { category: string; count: number }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    totalCategories: 0,
    recentPosts: [],
    popularCategories: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const allPosts = await getAllBlogPostsClient();
        
        // Calculate categories
        const categoryCount = new Map<string, number>();
        allPosts.forEach((post: BlogListItem) => {
          const count = categoryCount.get(post.category) || 0;
          categoryCount.set(post.category, count + 1);
        });

        // Get recent posts (last 5)
        const recentPosts = allPosts
          .sort((a: BlogListItem, b: BlogListItem) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
          .slice(0, 5);

        // Get popular categories
        const popularCategories = Array.from(categoryCount.entries())
          .map(([category, count]) => ({ category, count }))
          .sort((a, b) => b.count - a.count);

        setStats({
          totalPosts: allPosts.length,
          totalCategories: categoryCount.size,
          recentPosts,
          popularCategories
        });
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-terminal-accent font-mono">Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <TerminalCard key={i} className="animate-pulse">
              <div className="h-16 bg-terminal-muted/20 rounded"></div>
            </TerminalCard>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-terminal-accent font-mono">Dashboard</h1>
          <p className="text-terminal-muted mt-1">Welcome back! Here's what's happening with your portfolio.</p>
        </div>
        <div className="flex space-x-4">
          <Link href="/admin/blogs/new">
            <TerminalButton>
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </TerminalButton>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <TerminalCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-terminal-muted text-sm font-mono">Total Posts</p>
              <p className="text-2xl font-bold text-terminal-accent font-mono">{stats.totalPosts}</p>
            </div>
            <FileText className="h-8 w-8 text-terminal-accent/60" />
          </div>
        </TerminalCard>

        <TerminalCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-terminal-muted text-sm font-mono">Categories</p>
              <p className="text-2xl font-bold text-terminal-accent font-mono">{stats.totalCategories}</p>
            </div>
            <FolderOpen className="h-8 w-8 text-terminal-accent/60" />
          </div>
        </TerminalCard>

        <TerminalCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-terminal-muted text-sm font-mono">This Month</p>
              <p className="text-2xl font-bold text-terminal-accent font-mono">
                {stats.recentPosts.filter(post => {
                  const postDate = new Date(post.publishDate);
                  const now = new Date();
                  return postDate.getMonth() === now.getMonth() && postDate.getFullYear() === now.getFullYear();
                }).length}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-terminal-accent/60" />
          </div>
        </TerminalCard>

        <TerminalCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-terminal-muted text-sm font-mono">Featured</p>
              <p className="text-2xl font-bold text-terminal-accent font-mono">
                {stats.recentPosts.filter(post => post.featured).length}
              </p>
            </div>
            <Star className="h-8 w-8 text-terminal-accent/60" />
          </div>
        </TerminalCard>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <TerminalCard>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-terminal-accent font-mono">Recent Posts</h2>
            <Link href="/admin/blogs">
              <TerminalButton variant="secondary" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </TerminalButton>
            </Link>
          </div>
          
          <div className="space-y-3">
            {stats.recentPosts.length === 0 ? (
              <p className="text-terminal-muted text-sm">No posts yet. Create your first post!</p>
            ) : (
              stats.recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-3 bg-terminal-background rounded border border-terminal-border">
                  <div className="flex-1">
                    <h3 className="font-medium text-terminal-foreground text-sm">{post.title}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-terminal-muted font-mono">{post.category}</span>
                      <span className="text-xs text-terminal-muted font-mono">
                        {new Date(post.publishDate).toLocaleDateString()}
                      </span>
                      {post.featured && (
                        <Star className="h-3 w-3 text-terminal-accent fill-current" />
                      )}
                    </div>
                  </div>
                  <Link href={`/admin/blogs/edit/${post.id}`}>
                    <TerminalButton variant="secondary" size="sm">
                      <Edit className="h-3 w-3" />
                    </TerminalButton>
                  </Link>
                </div>
              ))
            )}
          </div>
        </TerminalCard>

        {/* Popular Categories */}
        <TerminalCard>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-terminal-accent font-mono">Categories</h2>
            <Link href="/admin/categories">
              <TerminalButton variant="secondary" size="sm">
                <FolderOpen className="h-4 w-4 mr-2" />
                Manage
              </TerminalButton>
            </Link>
          </div>
          
          <div className="space-y-3">
            {stats.popularCategories.length === 0 ? (
              <p className="text-terminal-muted text-sm">No categories yet.</p>
            ) : (
              stats.popularCategories.map((category) => (
                <div key={category.category} className="flex items-center justify-between p-3 bg-terminal-background rounded border border-terminal-border">
                  <div className="flex items-center space-x-3">
                    <FolderOpen className="h-4 w-4 text-terminal-accent" />
                    <span className="font-medium text-terminal-foreground capitalize">
                      {category.category.replace('-', ' ')}
                    </span>
                  </div>
                  <span className="text-sm text-terminal-muted font-mono">
                    {category.count} post{category.count !== 1 ? 's' : ''}
                  </span>
                </div>
              ))
            )}
          </div>
        </TerminalCard>
      </div>

      {/* Quick Actions */}
      <TerminalCard>
        <h2 className="text-lg font-semibold text-terminal-accent font-mono mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/blogs/new">
            <TerminalButton className="w-full justify-start">
              <Plus className="h-4 w-4 mr-2" />
              Create New Post
            </TerminalButton>
          </Link>
          
          <Link href="/admin/profile">
            <TerminalButton variant="secondary" className="w-full justify-start">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </TerminalButton>
          </Link>
          
          <Link href="/" target="_blank">
            <TerminalButton variant="secondary" className="w-full justify-start">
              <Eye className="h-4 w-4 mr-2" />
              View Site
            </TerminalButton>
          </Link>
        </div>
      </TerminalCard>
    </div>
  );
}
