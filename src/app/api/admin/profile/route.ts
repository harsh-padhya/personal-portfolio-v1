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
    if (!profileData.personal?.name || !profileData.personal?.title) {
      return NextResponse.json(
        { error: 'Name and title are required' },
        { status: 400 }
      );
    }
    
    // The profileData should already be in the correct nested format from the admin form
    // Just validate the structure and save it
    const formattedProfile = {
      personal: {
        name: profileData.personal?.name || '',
        title: profileData.personal?.title || '',
        email: profileData.personal?.email || '',
        location: profileData.personal?.location || '',
        bio: profileData.personal?.bio || '',
        avatar: profileData.personal?.avatar || '',
        resume: profileData.personal?.resume || ''
      },
      social: {
        github: profileData.social?.github || '',
        linkedin: profileData.social?.linkedin || '',
        twitter: profileData.social?.twitter || '',
        website: profileData.social?.website || ''
      },
      hero: {
        tagline: profileData.hero?.tagline || '',
        description: profileData.hero?.description || '',
        cta: profileData.hero?.cta || ''
      }
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
