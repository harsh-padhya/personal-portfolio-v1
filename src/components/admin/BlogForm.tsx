'use client';

import { useState, useEffect } from 'react';
import { Save, Eye, ArrowLeft, Star, Clock, Tag } from 'lucide-react';
import { TerminalCard } from '@/components/ui/terminal-card';
import { TerminalButton } from '@/components/ui/terminal-button';
import { BlogPost } from '@/types/blog';

interface BlogFormProps {
  initialData?: BlogPost;
  onSave: (data: BlogPost) => Promise<void>;
  onCancel: () => void;
  mode: 'create' | 'edit';
}

export function BlogForm({ initialData, onSave, onCancel, mode }: BlogFormProps) {
  const [formData, setFormData] = useState<BlogPost>({
    id: '',
    title: '',
    category: 'web-development',
    subcategory: 'frontend',
    tags: [],
    publishDate: new Date().toISOString().split('T')[0],
    lastModified: new Date().toISOString(),
    readTime: '5 min read',
    excerpt: '',
    content: '',
    featured: false,
    difficulty: 'beginner',
    status: 'draft',
    author: 'Harsh Vardhan',
    seoTitle: '',
    seoDescription: ''
  });

  const [saving, setSaving] = useState(false);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const categories = [
    { id: 'web-development', name: 'Web Development', subcategories: [
      { id: 'frontend', name: 'Frontend' },
      { id: 'backend', name: 'Backend' },
      { id: 'fullstack', name: 'Full Stack' }
    ]},
    { id: 'devops', name: 'DevOps', subcategories: [
      { id: 'deployment', name: 'Deployment' },
      { id: 'monitoring', name: 'Monitoring' },
      { id: 'automation', name: 'Automation' }
    ]},
    { id: 'career', name: 'Career', subcategories: [
      { id: 'growth', name: 'Growth' },
      { id: 'skills', name: 'Skills' },
      { id: 'interviews', name: 'Interviews' }
    ]}
  ];

  const selectedCategory = categories.find(cat => cat.id === formData.category);
  const subcategories = selectedCategory?.subcategories || [];

  const handleSave = async () => {
    // Validation
    if (!formData.title.trim()) {
      alert('Title is required');
      return;
    }
    if (!formData.excerpt.trim()) {
      alert('Excerpt is required');
      return;
    }
    if (!formData.content.trim()) {
      alert('Content is required');
      return;
    }

    setSaving(true);
    try {
      const dataToSave = {
        ...formData,
        id: formData.id || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        lastModified: new Date().toISOString(),
        seoTitle: formData.seoTitle || formData.title,
        seoDescription: formData.seoDescription || formData.excerpt
      };
      await onSave(dataToSave);
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error saving post. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const updateField = (field: keyof BlogPost, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <TerminalButton variant="ghost" onClick={onCancel}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </TerminalButton>
          <div>
            <h1 className="text-2xl font-bold text-terminal-accent font-mono">
              {mode === 'create' ? 'Create New Post' : 'Edit Post'}
            </h1>
            <p className="text-terminal-muted mt-1">
              {mode === 'create' ? 'Write and publish your new blog post.' : 'Update your existing blog post.'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <TerminalButton variant="secondary">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </TerminalButton>
          <TerminalButton onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Post'}
          </TerminalButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title and Content */}
          <TerminalCard>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-terminal-foreground mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground text-lg focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                  value={formData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="Enter post title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-terminal-foreground mb-2">
                  Excerpt *
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                  value={formData.excerpt}
                  onChange={(e) => updateField('excerpt', e.target.value)}
                  placeholder="Brief description of your post (150 characters max)..."
                  maxLength={150}
                />
                <p className="text-xs text-terminal-muted mt-1">
                  {formData.excerpt.length}/150 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-terminal-foreground mb-2">
                  Content * (Markdown)
                </label>
                <textarea
                  rows={20}
                  className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                  value={formData.content}
                  onChange={(e) => updateField('content', e.target.value)}
                  placeholder="Write your post content in Markdown..."
                />
              </div>
            </div>
          </TerminalCard>

          {/* SEO Settings */}
          <TerminalCard>
            <h3 className="text-lg font-semibold text-terminal-accent font-mono mb-4">SEO Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-terminal-foreground mb-2">
                  SEO Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                  value={formData.seoTitle}
                  onChange={(e) => updateField('seoTitle', e.target.value)}
                  placeholder="Leave blank to use post title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-terminal-foreground mb-2">
                  SEO Description
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                  value={formData.seoDescription}
                  onChange={(e) => updateField('seoDescription', e.target.value)}
                  placeholder="Leave blank to use excerpt"
                />
              </div>
            </div>
          </TerminalCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <TerminalCard>
            <h3 className="text-lg font-semibold text-terminal-accent font-mono mb-4">Publish Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-terminal-foreground mb-2">
                  Status
                </label>
                <select
                  className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                  value={formData.status}
                  onChange={(e) => updateField('status', e.target.value as 'draft' | 'published')}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-terminal-foreground mb-2">
                  Publish Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                  value={formData.publishDate}
                  onChange={(e) => updateField('publishDate', e.target.value)}
                />
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-terminal-accent bg-terminal-background border-terminal-border rounded focus:ring-terminal-accent focus:ring-2"
                    checked={formData.featured}
                    onChange={(e) => updateField('featured', e.target.checked)}
                  />
                  <span className="text-sm font-medium text-terminal-foreground">Featured Post</span>
                  <Star className="h-4 w-4 text-terminal-accent" />
                </label>
              </div>
            </div>
          </TerminalCard>

          {/* Category & Metadata */}
          <TerminalCard>
            <h3 className="text-lg font-semibold text-terminal-accent font-mono mb-4">Category & Metadata</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-terminal-foreground mb-2">
                  Category
                </label>
                <select
                  className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                  value={formData.category}
                  onChange={(e) => {
                    updateField('category', e.target.value);
                    // Reset subcategory when category changes
                    const newCategory = categories.find(cat => cat.id === e.target.value);
                    if (newCategory && newCategory.subcategories.length > 0) {
                      updateField('subcategory', newCategory.subcategories[0].id);
                    }
                  }}
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-terminal-foreground mb-2">
                  Subcategory
                </label>
                <select
                  className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                  value={formData.subcategory}
                  onChange={(e) => updateField('subcategory', e.target.value)}
                >
                  {subcategories.map(subcategory => (
                    <option key={subcategory.id} value={subcategory.id}>
                      {subcategory.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-terminal-foreground mb-2">
                  Difficulty
                </label>
                <select
                  className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                  value={formData.difficulty}
                  onChange={(e) => updateField('difficulty', e.target.value as 'beginner' | 'intermediate' | 'advanced')}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-terminal-foreground mb-2">
                  <Clock className="h-4 w-4 inline mr-1" />
                  Read Time
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                  value={formData.readTime}
                  onChange={(e) => updateField('readTime', e.target.value)}
                  placeholder="e.g., 5 min read"
                />
              </div>
            </div>
          </TerminalCard>

          {/* Tags */}
          <TerminalCard>
            <h3 className="text-lg font-semibold text-terminal-accent font-mono mb-4">
              <Tag className="h-5 w-5 inline mr-2" />
              Tags
            </h3>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Add a tag..."
                  className="flex-1 px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                />
                <TerminalButton onClick={addTag} size="sm">
                  Add
                </TerminalButton>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 rounded-md bg-terminal-accent/20 text-terminal-accent border border-terminal-accent/30 text-sm"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-terminal-accent/60 hover:text-terminal-accent"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </TerminalCard>
        </div>
      </div>
    </div>
  );
}
