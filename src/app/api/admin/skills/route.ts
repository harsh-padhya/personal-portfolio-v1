import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const SKILLS_FILE = path.join(process.cwd(), 'src/data/skills.json');

export async function GET() {
  try {
    const data = await fs.readFile(SKILLS_FILE, 'utf-8');
    const skills = JSON.parse(data);
    return NextResponse.json(skills);
  } catch (error) {
    console.error('Error reading skills data:', error);
    return NextResponse.json({ error: 'Failed to load skills data' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const skillsData = await request.json();
    
    await fs.writeFile(SKILLS_FILE, JSON.stringify(skillsData, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving skills data:', error);
    return NextResponse.json({ error: 'Failed to save skills data' }, { status: 500 });
  }
}
