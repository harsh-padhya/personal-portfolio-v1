'use client';

import { Code, Database, Cloud, Wrench } from 'lucide-react';
import { TerminalCard } from '@/components/ui';
import { SkillCategory, Skill } from '@/types/profile';

interface SkillsSectionProps {
  skills: SkillCategory[];
}

const categoryIcons = {
  frontend: Code,
  backend: Database,
  cloud: Cloud,
  tools: Wrench,
} as const;

function SkillBar({ skill }: { skill: Skill }) {
  const percentage = (skill.level / 5) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-terminal-foreground font-medium text-sm sm:text-base">{skill.name}</span>
        <span className="text-terminal-muted text-xs sm:text-sm font-mono">{skill.years}y</span>
      </div>
      <div className="relative h-1.5 sm:h-2 bg-terminal-muted rounded-full overflow-hidden">
        <div 
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-terminal-accent to-terminal-accent/80 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
      </div>
      <p className="text-terminal-muted text-xs sm:text-sm">{skill.description}</p>
    </div>
  );
}

function SkillCategoryCard({ category }: { category: SkillCategory }) {
  const IconComponent = categoryIcons[category.id as keyof typeof categoryIcons] || Code;
  
  return (
    <TerminalCard 
      title={`skills/${category.id}.json`}
      variant="glass"
      className="h-full"
    >
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-terminal-accent flex-shrink-0" />
          <h3 className="text-lg sm:text-xl font-semibold text-terminal-foreground font-mono">
            {category.name}
          </h3>
        </div>
        
        <div className="space-y-4 sm:space-y-6">
          {category.skills.map((skill) => (
            <SkillBar key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </TerminalCard>
  );
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-terminal-foreground mb-4">
            <span className="text-terminal-accent font-mono">$</span> ls -la skills/
          </h2>
          <p className="text-terminal-muted font-mono max-w-2xl mx-auto text-sm sm:text-base px-2">
            {'>'} Exploring my technical expertise and proficiency levels
          </p>
        </div>

        {/* Skills Overview */}
        <div className="mb-12">
          <TerminalCard title="skills-summary.sh" variant="code">
            <div className="font-mono text-sm space-y-2">
              <div className="text-terminal-muted"># Technical Skills Overview</div>
              <div className="flex flex-wrap gap-4 mt-4">
                {skills.map((category) => (
                  <div key={category.id} className="flex items-center gap-2">
                    <span className="text-terminal-accent">•</span>
                    <span className="text-terminal-foreground">{category.name}:</span>
                    <span className="text-terminal-muted">{category.skills.length} skills</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-terminal-muted">
                # Legend: ■■■■■ Expert (5) | ■■■■□ Advanced (4) | ■■■□□ Intermediate (3)
              </div>
            </div>
          </TerminalCard>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((category) => (
            <SkillCategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* Code Stats */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <TerminalCard variant="glass" className="text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-terminal-accent font-mono">5+</div>
              <div className="text-terminal-foreground">Years Experience</div>
              <div className="text-terminal-muted text-sm">Building web applications</div>
            </div>
          </TerminalCard>
          
          <TerminalCard variant="glass" className="text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-terminal-accent font-mono">20+</div>
              <div className="text-terminal-foreground">Technologies</div>
              <div className="text-terminal-muted text-sm">Across the full stack</div>
            </div>
          </TerminalCard>
          
          <TerminalCard variant="glass" className="text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-terminal-accent font-mono">100+</div>
              <div className="text-terminal-foreground">Projects Delivered</div>
              <div className="text-terminal-muted text-sm">From concept to production</div>
            </div>
          </TerminalCard>
        </div>
      </div>
    </section>
  );
}
