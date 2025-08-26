import { Navigation } from '@/components/portfolio/navigation';
import { HeroSection } from '@/components/portfolio/hero-section';
import { AboutSection } from '@/components/portfolio/about-section';
import { SkillsSection } from '@/components/portfolio/skills-section';
import { ExperienceSection } from '@/components/portfolio/experience-section';
import { ContactSection } from '@/components/portfolio/contact-section';
import { Footer } from '@/components/portfolio/footer';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Profile, SkillCategory, Experience } from '@/types/profile';

// Load profile data
function getProfileData(): Profile {
  const filePath = join(process.cwd(), 'src/data/profile.json');
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

// Load skills data
function getSkillsData(): SkillCategory[] {
  const filePath = join(process.cwd(), 'src/data/skills.json');
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

// Load experience data
function getExperienceData(): Experience[] {
  const filePath = join(process.cwd(), 'src/data/experience.json');
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default function Home() {
  const profile = getProfileData();
  const skills = getSkillsData();
  const experiences = getExperienceData();

  return (
    <div className="min-h-screen bg-terminal-background">
      <Navigation />
      <main>
        <HeroSection profile={profile} />
        <AboutSection profile={profile} />
        <ExperienceSection experiences={experiences} />
        <SkillsSection skills={skills} />
        <ContactSection profile={profile} />
      </main>
      <Footer profile={profile} />
    </div>
  );
}
