'use client';

import { useRouter } from 'next/navigation';
import { BlogForm } from '@/components/admin/BlogForm';
import { BlogPost } from '@/types/blog';
import { saveBlogPostClient } from '@/lib/admin-utils';
import { calculateReadTime, slugify } from '@/lib/utils';

export default function NewBlogPostPage() {
  const router = useRouter();

  const handleSave = async (data: BlogPost) => {
    try {
      // Generate ID from title if not provided
      const postData = {
        ...data,
        id: data.id || slugify(data.title),
        readTime: data.content ? calculateReadTime(data.content) : '1 min read',
        lastModified: new Date().toISOString()
      };
      
      await saveBlogPostClient(postData);
      
      alert('Blog post created successfully!');
      router.push('/admin/blogs');
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  };

  const handleCancel = () => {
    router.push('/admin/blogs');
  };

  return (
    <BlogForm
      mode="create"
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
}
