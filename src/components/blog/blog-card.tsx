'use client';

import { Calendar, Clock, User, Tag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { TerminalCard } from '@/components/ui';
import { BlogListItem } from '@/types/blog';

interface BlogCardProps {
  post: BlogListItem;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const difficultyColors = {
    beginner: 'text-green-400',
    intermediate: 'text-yellow-400',
    advanced: 'text-red-400',
  };

  return (
    <TerminalCard 
      variant="glass" 
      className={`group hover:shadow-lg hover:shadow-terminal-accent/10 transition-all duration-300 ${
        featured ? 'border-terminal-accent' : ''
      }`}
    >
      <div className="space-y-3 sm:space-y-4">
        {/* Header with Featured Badge */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            {featured && (
              <span className="inline-block bg-terminal-accent text-terminal-background px-2 py-1 rounded text-xs font-mono mb-2">
                Featured
              </span>
            )}
            <h3 className="text-lg sm:text-xl font-semibold text-terminal-foreground group-hover:text-terminal-accent transition-colors mb-2 leading-tight">
              <Link href={`/blog/${post.category}/${post.subcategory}/${post.id}`}>
                {post.title}
              </Link>
            </h3>
          </div>
        </div>

        {/* Meta Information */}
        <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-terminal-muted">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span>{new Date(post.publishDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span>{post.readTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span>{post.author}</span>
          </div>
          <div className={`flex items-center gap-1 ${difficultyColors[post.difficulty]}`}>
            <Tag className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span className="capitalize">{post.difficulty}</span>
          </div>
        </div>
        {/* Excerpt */}
        <p className="text-terminal-foreground leading-relaxed text-sm sm:text-base">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="bg-terminal-muted/20 text-terminal-foreground px-2 py-1 rounded text-xs font-mono border border-terminal-border"
            >
              #{tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="text-terminal-muted text-xs font-mono">
              +{post.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Read More Link */}
        <div className="pt-2">
          <Link
            href={`/blog/${post.category}/${post.subcategory}/${post.id}`}
            className="inline-flex items-center gap-2 text-terminal-accent hover:text-terminal-accent/80 font-mono text-sm group-hover:translate-x-1 transition-transform"
          >
            Read more
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </Link>
        </div>
      </div>
    </TerminalCard>
  );
}
