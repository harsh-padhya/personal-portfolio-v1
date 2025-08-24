import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const EXPERIENCE_FILE = path.join(process.cwd(), 'src/data/experience.json');

export async function GET() {
  try {
    const data = await fs.readFile(EXPERIENCE_FILE, 'utf-8');
    const experience = JSON.parse(data);
    return NextResponse.json(experience);
  } catch (error) {
    console.error('Error reading experience data:', error);
    return NextResponse.json({ error: 'Failed to load experience data' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const experienceData = await request.json();
    
    await fs.writeFile(EXPERIENCE_FILE, JSON.stringify(experienceData, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving experience data:', error);
    return NextResponse.json({ error: 'Failed to save experience data' }, { status: 500 });
  }
}
