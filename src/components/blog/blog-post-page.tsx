'use client';

import { Calendar, Clock, User, Tag, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import Link from 'next/link';
import { TerminalCard, TerminalButton } from '@/components/ui';
import { MarkdownContent } from '@/components/blog/markdown-content';
import { BlogPost, BlogListItem } from '@/types/blog';

interface BlogPostPageProps {
  post: BlogPost;
  relatedPosts?: BlogListItem[];
}

export function BlogPostPage({ post, relatedPosts = [] }: BlogPostPageProps) {
  const difficultyColors = {
    beginner: 'text-green-400',
    intermediate: 'text-yellow-400',
    advanced: 'text-red-400',
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-terminal-background pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-terminal-accent hover:text-terminal-accent/80 font-mono text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>
        </div>

        {/* Article Header */}
        <TerminalCard title={`${post.category}/${post.id}.md`} variant="glass" className="mb-8">
          <div className="space-y-6">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-terminal-foreground leading-tight">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap gap-4 text-sm text-terminal-muted">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.publishDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className={`flex items-center gap-1 ${difficultyColors[post.difficulty]}`}>
                <Tag className="h-4 w-4" />
                <span className="capitalize">{post.difficulty}</span>
              </div>
            </div>

            {/* Excerpt */}
            <p className="text-lg text-terminal-muted leading-relaxed">
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-terminal-muted/20 text-terminal-foreground px-3 py-1 rounded font-mono text-sm border border-terminal-border hover:border-terminal-accent transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4 border-t border-terminal-border">
              <TerminalButton variant="secondary" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </TerminalButton>
              <TerminalButton variant="ghost" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                Bookmark
              </TerminalButton>
            </div>
          </div>
        </TerminalCard>

        {/* Article Content */}
        <TerminalCard title="content.md" variant="glass" className="mb-8">
          <MarkdownContent content={post.content} />
        </TerminalCard>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <TerminalCard title="related-posts.json" variant="glass">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-terminal-accent font-mono">
                Related Posts
              </h3>
              <div className="grid gap-4">
                {relatedPosts.slice(0, 3).map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.category}/${relatedPost.subcategory}/${relatedPost.id}`}
                    className="block p-4 border border-terminal-border rounded hover:border-terminal-accent transition-colors group"
                  >
                    <div className="space-y-2">
                      <h4 className="font-semibold text-terminal-foreground group-hover:text-terminal-accent transition-colors">
                        {relatedPost.title}
                      </h4>
                      <p className="text-terminal-muted text-sm line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-terminal-muted">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(relatedPost.publishDate).toLocaleDateString()}</span>
                        <Clock className="h-3 w-3 ml-2" />
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </TerminalCard>
        )}
      </div>
    </div>
  );
}
