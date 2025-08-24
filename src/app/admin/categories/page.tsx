'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  FolderOpen,
  Save,
  X
} from 'lucide-react';
import { TerminalCard } from '@/components/ui/terminal-card';
import { TerminalButton } from '@/components/ui/terminal-button';
import { BlogCategory, BlogSubcategory } from '@/types/blog';
import { getCategoriesClient } from '@/lib/admin-utils';

export default function CategoriesAdminPage() {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingSubcategory, setEditingSubcategory] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);

  const saveChanges = async () => {
    try {
      // In a real implementation, this would save to an API
      console.log('Categories saved successfully', categories);
    } catch (error) {
      console.error('Error saving categories:', error);
    }
  };

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesData = await getCategoriesClient();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading categories:', error);
        // Fall back to default categories if loading fails
        const defaultCategories: BlogCategory[] = [
          {
            id: 'web-development',
            name: 'Web Development',
            description: 'Frontend, backend, and full-stack development topics',
            subcategories: [
              { id: 'frontend', name: 'Frontend', description: 'React, Vue, Angular, CSS, HTML' },
              { id: 'backend', name: 'Backend', description: 'Node.js, Python, databases, APIs' },
              { id: 'fullstack', name: 'Full Stack', description: 'End-to-end development projects' }
            ]
          },
          {
            id: 'devops',
            name: 'DevOps',
            description: 'Deployment, automation, and infrastructure topics',
            subcategories: [
              { id: 'deployment', name: 'Deployment', description: 'CI/CD, hosting, containerization' },
              { id: 'monitoring', name: 'Monitoring', description: 'Logging, metrics, observability' },
              { id: 'automation', name: 'Automation', description: 'Scripts, workflows, tools' }
            ]
          },
          {
            id: 'career',
            name: 'Career',
            description: 'Professional development and career advice',
            subcategories: [
              { id: 'growth', name: 'Growth', description: 'Career progression, leadership' },
              { id: 'skills', name: 'Skills', description: 'Learning, certifications, technologies' },
              { id: 'interviews', name: 'Interviews', description: 'Interview prep, tips, experiences' }
            ]
          }
        ];
        
        setCategories(defaultCategories);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  const addCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory: BlogCategory = {
        id: newCategoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name: newCategoryName,
        description: '',
        subcategories: []
      };
      
      setCategories(prev => [...prev, newCategory]);
      setNewCategoryName('');
      setShowNewCategoryForm(false);
    }
  };

  const updateCategory = (categoryId: string, field: keyof BlogCategory, value: string) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId ? { ...cat, [field]: value } : cat
    ));
    saveChanges(); // Auto-save changes
  };

  const deleteCategory = (categoryId: string) => {
    if (confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    }
  };

  const addSubcategory = (categoryId: string) => {
    const subcategoryName = prompt('Enter subcategory name:');
    if (subcategoryName?.trim()) {
      const newSubcategory: BlogSubcategory = {
        id: subcategoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name: subcategoryName,
        description: ''
      };

      setCategories(prev => prev.map(cat => 
        cat.id === categoryId 
          ? { ...cat, subcategories: [...cat.subcategories, newSubcategory] }
          : cat
      ));
    }
  };

  const updateSubcategory = (categoryId: string, subcategoryId: string, field: keyof BlogSubcategory, value: string) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId 
        ? {
            ...cat,
            subcategories: cat.subcategories.map(sub =>
              sub.id === subcategoryId ? { ...sub, [field]: value } : sub
            )
          }
        : cat
    ));
    saveChanges(); // Auto-save changes
  };

  const deleteSubcategory = (categoryId: string, subcategoryId: string) => {
    if (confirm('Are you sure you want to delete this subcategory?')) {
      setCategories(prev => prev.map(cat => 
        cat.id === categoryId 
          ? { ...cat, subcategories: cat.subcategories.filter(sub => sub.id !== subcategoryId) }
          : cat
      ));
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-terminal-accent font-mono">Categories</h1>
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
          <h1 className="text-2xl font-bold text-terminal-accent font-mono">Categories</h1>
          <p className="text-terminal-muted mt-1">Organize your blog content with categories and subcategories.</p>
        </div>
        <TerminalButton onClick={() => setShowNewCategoryForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </TerminalButton>
      </div>

      {/* New Category Form */}
      {showNewCategoryForm && (
        <TerminalCard>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Category name..."
              className="flex-1 px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCategory()}
            />
            <TerminalButton onClick={addCategory}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </TerminalButton>
            <TerminalButton variant="ghost" onClick={() => {
              setShowNewCategoryForm(false);
              setNewCategoryName('');
            }}>
              <X className="h-4 w-4" />
            </TerminalButton>
          </div>
        </TerminalCard>
      )}

      {/* Categories List */}
      <div className="space-y-4">
        {categories.map((category) => (
          <TerminalCard key={category.id}>
            <div className="space-y-4">
              {/* Category Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <FolderOpen className="h-5 w-5 text-terminal-accent" />
                    {editingCategory === category.id ? (
                      <input
                        type="text"
                        className="text-lg font-semibold bg-terminal-background border border-terminal-border rounded px-2 py-1 text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent"
                        value={category.name}
                        onChange={(e) => updateCategory(category.id, 'name', e.target.value)}
                        onBlur={() => setEditingCategory(null)}
                        onKeyPress={(e) => e.key === 'Enter' && setEditingCategory(null)}
                        autoFocus
                      />
                    ) : (
                      <h3 className="text-lg font-semibold text-terminal-accent font-mono">
                        {category.name}
                      </h3>
                    )}
                    <span className="text-sm text-terminal-muted font-mono">
                      {category.subcategories.length} subcategories
                    </span>
                  </div>
                  
                  {editingCategory === category.id ? (
                    <textarea
                      className="w-full bg-terminal-background border border-terminal-border rounded px-2 py-1 text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent"
                      value={category.description}
                      onChange={(e) => updateCategory(category.id, 'description', e.target.value)}
                      placeholder="Category description..."
                      rows={2}
                    />
                  ) : (
                    <p className="text-terminal-muted text-sm">
                      {category.description || 'No description'}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <TerminalButton 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setEditingCategory(editingCategory === category.id ? null : category.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </TerminalButton>
                  <TerminalButton 
                    variant="ghost" 
                    size="sm"
                    onClick={() => deleteCategory(category.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </TerminalButton>
                </div>
              </div>

              {/* Subcategories */}
              <div className="ml-8 space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-terminal-foreground">Subcategories</h4>
                  <TerminalButton variant="ghost" size="sm" onClick={() => addSubcategory(category.id)}>
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </TerminalButton>
                </div>

                {category.subcategories.length === 0 ? (
                  <p className="text-terminal-muted text-sm italic">No subcategories yet</p>
                ) : (
                  category.subcategories.map((subcategory) => (
                    <div key={subcategory.id} className="flex items-center justify-between p-2 bg-terminal-background rounded border border-terminal-border">
                      <div className="flex-1">
                        {editingSubcategory === subcategory.id ? (
                          <div className="space-y-2">
                            <input
                              type="text"
                              className="w-full bg-terminal-surface border border-terminal-border rounded px-2 py-1 text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent"
                              value={subcategory.name}
                              onChange={(e) => updateSubcategory(category.id, subcategory.id, 'name', e.target.value)}
                            />
                            <input
                              type="text"
                              className="w-full bg-terminal-surface border border-terminal-border rounded px-2 py-1 text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent"
                              value={subcategory.description}
                              onChange={(e) => updateSubcategory(category.id, subcategory.id, 'description', e.target.value)}
                              placeholder="Description..."
                            />
                          </div>
                        ) : (
                          <div>
                            <p className="font-medium text-terminal-foreground text-sm">
                              {subcategory.name}
                            </p>
                            <p className="text-terminal-muted text-xs">
                              {subcategory.description || 'No description'}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <TerminalButton 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setEditingSubcategory(
                            editingSubcategory === subcategory.id ? null : subcategory.id
                          )}
                        >
                          {editingSubcategory === subcategory.id ? (
                            <Save className="h-3 w-3" />
                          ) : (
                            <Edit className="h-3 w-3" />
                          )}
                        </TerminalButton>
                        <TerminalButton 
                          variant="ghost" 
                          size="sm"
                          onClick={() => deleteSubcategory(category.id, subcategory.id)}
                        >
                          <Trash2 className="h-3 w-3 text-red-500" />
                        </TerminalButton>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </TerminalCard>
        ))}
      </div>

      {/* Summary */}
      <TerminalCard>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-terminal-accent font-mono">
              {categories.length}
            </p>
            <p className="text-terminal-muted text-sm">Total Categories</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-terminal-accent font-mono">
              {categories.reduce((sum, cat) => sum + cat.subcategories.length, 0)}
            </p>
            <p className="text-terminal-muted text-sm">Total Subcategories</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-terminal-accent font-mono">
              {Math.round(categories.reduce((sum, cat) => sum + cat.subcategories.length, 0) / Math.max(categories.length, 1) * 10) / 10}
            </p>
            <p className="text-terminal-muted text-sm">Avg per Category</p>
          </div>
        </div>
      </TerminalCard>
    </div>
  );
}
