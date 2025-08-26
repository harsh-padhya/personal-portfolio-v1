'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { BlogForm } from '@/components/admin/BlogForm';
import { BlogPost } from '@/types/blog';
import { getBlogPostByIdClient, saveBlogPostClient } from '@/lib/static-data-utils';
import { calculateReadTime } from '@/lib/utils';

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      try {
        const slug = params.slug as string;
        const fullPost = await getBlogPostByIdClient(slug);
        
        if (!fullPost) {
          alert('Post not found');
          router.push('/admin/blogs');
          return;
        }

        setPost(fullPost);
      } catch (error) {
        console.error('Error loading post:', error);
        alert('Error loading post');
        router.push('/admin/blogs');
      } finally {
        setLoading(false);
      }
    }

    if (params.slug) {
      loadPost();
    }
  }, [params.slug, router]);

  const handleSave = async (data: BlogPost) => {
    try {
      const postData = {
        ...data,
        readTime: data.content ? calculateReadTime(data.content) : '1 min read',
        lastModified: new Date().toISOString()
      };
      
      await saveBlogPostClient(postData);
      
      alert('Blog post updated successfully!');
      router.push('/admin/blogs');
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  };

  const handleCancel = () => {
    router.push('/admin/blogs');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-terminal-accent">Loading post...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-terminal-muted">Post not found</div>
      </div>
    );
  }

  return (
    <BlogForm
      mode="edit"
      initialData={post}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
}
