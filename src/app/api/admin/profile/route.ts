import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const PROFILE_PATH = path.join(process.cwd(), 'src', 'data', 'profile.json');

export async function GET() {
  try {
    const profileData = await fs.readFile(PROFILE_PATH, 'utf-8');
    const profile = JSON.parse(profileData);
    
    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error reading profile:', error);
    return NextResponse.json(
      { error: 'Failed to load profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const profileData = await request.json();
    
    // Validate required fields
    if (!profileData.name || !profileData.title) {
      return NextResponse.json(
        { error: 'Name and title are required' },
        { status: 400 }
      );
    }
    
    // Transform the admin profile data to match the existing profile format
    const formattedProfile = {
      name: profileData.name,
      title: profileData.title,
      bio: profileData.bio,
      avatar: profileData.avatar,
      contact: {
        email: profileData.email,
        phone: profileData.phone,
        location: profileData.location,
        website: profileData.website
      },
      social: {
        github: profileData.social?.github || '',
        linkedin: profileData.social?.linkedin || '',
        twitter: profileData.social?.twitter || ''
      },
      skills: profileData.skills?.map((skill: string) => ({
        name: skill,
        level: 'intermediate', // Default level
        category: 'technical' // Default category
      })) || [],
      interests: profileData.interests || []
    };
    
    await fs.writeFile(PROFILE_PATH, JSON.stringify(formattedProfile, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving profile:', error);
    return NextResponse.json(
      { error: 'Failed to save profile' },
      { status: 500 }
    );
  }
}
