export interface AdminDashboardData {
  totalPosts: number;
  totalCategories: number;
  recentPosts: BlogListItem[];
  draftPosts: number;
  publishedPosts: number;
}

export interface ContentOperation {
  type: 'create' | 'update' | 'delete';
  contentType: 'blog' | 'category' | 'profile';
  id?: string;
  data?: any;
}

export interface AdminNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: string;
}

import type { BlogListItem } from './blog';
