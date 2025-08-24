import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllBlogPosts, 
  saveBlogPost, 
  deleteBlogPost, 
  getBlogPostById 
} from '@/lib/blog-utils';
import { BlogPost } from '@/types/blog';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const post = await getBlogPostById(id);
      if (!post) {
        return NextResponse.json(
          { error: 'Post not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(post);
    }

    const posts = await getAllBlogPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const postData: BlogPost = await request.json();
    
    // Validate required fields
    if (!postData.title || !postData.content || !postData.category || !postData.subcategory) {
      return NextResponse.json(
        { error: 'Title, content, category, and subcategory are required' },
        { status: 400 }
      );
    }

    await saveBlogPost(postData);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const postData: BlogPost = await request.json();
    
    // Validate required fields
    if (!postData.id || !postData.title || !postData.content) {
      return NextResponse.json(
        { error: 'ID, title, and content are required' },
        { status: 400 }
      );
    }

    await saveBlogPost(postData);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');

    if (!id || !category || !subcategory) {
      return NextResponse.json(
        { error: 'ID, category, and subcategory are required' },
        { status: 400 }
      );
    }

    await deleteBlogPost(category, subcategory, id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
