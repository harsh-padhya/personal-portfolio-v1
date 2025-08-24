'use client';

import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { TerminalButton } from '@/components/ui';
import { BlogCategory } from '@/types/blog';

interface CategoryFilterProps {
  categories: BlogCategory[];
  selectedCategory?: string;
  selectedSubcategory?: string;
  onCategoryChange: (categoryId?: string) => void;
  onSubcategoryChange: (subcategoryId?: string) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  selectedSubcategory,
  onCategoryChange,
  onSubcategoryChange,
}: CategoryFilterProps) {
  const [showFilters, setShowFilters] = useState(false);

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  const clearFilters = () => {
    onCategoryChange(undefined);
    onSubcategoryChange(undefined);
  };

  return (
    <div className="space-y-4">
      {/* Mobile Filter Toggle */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-terminal-foreground font-mono">
          Filters
        </h3>
        <TerminalButton
          variant="ghost"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden"
        >
          <Filter className="h-4 w-4 mr-2" />
          {showFilters ? 'Hide' : 'Show'}
        </TerminalButton>
      </div>

      {/* Filter Content */}
      <div className={`space-y-4 ${showFilters || 'hidden md:block'}`}>
        {/* Active Filters */}
        {(selectedCategory || selectedSubcategory) && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-terminal-muted font-mono">Active filters:</span>
              <TerminalButton variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear all
              </TerminalButton>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedCategory && (
                <span className="bg-terminal-accent/20 text-terminal-accent px-2 py-1 rounded text-xs font-mono border border-terminal-accent/30">
                  {categories.find(cat => cat.id === selectedCategory)?.name}
                </span>
              )}
              {selectedSubcategory && selectedCategoryData && (
                <span className="bg-terminal-accent/20 text-terminal-accent px-2 py-1 rounded text-xs font-mono border border-terminal-accent/30">
                  {selectedCategoryData.subcategories.find(sub => sub.id === selectedSubcategory)?.name}
                </span>
              )}
            </div>
          </div>
        )}

        {/* All Posts */}
        <TerminalButton
          variant={!selectedCategory ? "primary" : "ghost"}
          size="sm"
          onClick={() => {
            onCategoryChange(undefined);
            onSubcategoryChange(undefined);
          }}
          className="w-full justify-start"
        >
          All Posts
        </TerminalButton>

        {/* Categories */}
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="space-y-1">
              <TerminalButton
                variant={selectedCategory === category.id ? "primary" : "ghost"}
                size="sm"
                onClick={() => {
                  if (selectedCategory === category.id) {
                    onCategoryChange(undefined);
                    onSubcategoryChange(undefined);
                  } else {
                    onCategoryChange(category.id);
                    onSubcategoryChange(undefined);
                  }
                }}
                className="w-full justify-start"
              >
                {category.name}
              </TerminalButton>

              {/* Subcategories */}
              {selectedCategory === category.id && category.subcategories.length > 0 && (
                <div className="ml-4 space-y-1">
                  {category.subcategories.map((subcategory) => (
                    <TerminalButton
                      key={subcategory.id}
                      variant={selectedSubcategory === subcategory.id ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => {
                        if (selectedSubcategory === subcategory.id) {
                          onSubcategoryChange(undefined);
                        } else {
                          onSubcategoryChange(subcategory.id);
                        }
                      }}
                      className="w-full justify-start text-sm"
                    >
                      {subcategory.name}
                    </TerminalButton>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
