'use client';

import { Building, MapPin, Calendar, ExternalLink, GraduationCap, Briefcase } from 'lucide-react';
import { TerminalCard } from '@/components/ui';
import { Experience } from '@/types/profile';

interface ExperienceSectionProps {
  experiences: Experience[];
}

const typeIcons = {
  work: Briefcase,
  education: GraduationCap,
  project: Building,
} as const;

function ExperienceCard({ experience }: { experience: Experience }) {
  const IconComponent = typeIcons[experience.type] || Briefcase;
  const isCurrentPosition = !experience.endDate;
  
  return (
    <TerminalCard 
      title={`experience/${experience.id}.json`}
      variant="glass" 
      className="relative overflow-hidden group hover:shadow-lg hover:shadow-terminal-accent/10 transition-all duration-300"
    >
      {experience.featured && (
        <div className="absolute top-0 right-0 bg-terminal-accent text-terminal-background px-2 py-1 text-xs font-mono rounded-bl">
          Featured
        </div>
      )}
      
      <div className="space-y-3 sm:space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex items-start gap-3">
            <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-terminal-accent flex-shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <h3 className="text-lg sm:text-xl font-semibold text-terminal-foreground group-hover:text-terminal-accent transition-colors leading-tight">
                {experience.position}
              </h3>
              <div className="flex items-center gap-2 text-terminal-muted text-sm sm:text-base mt-1">
                <Building className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="truncate">{experience.company}</span>
                {experience.website && (
                  <a
                    href={experience.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terminal-accent hover:text-terminal-accent/80 flex-shrink-0"
                  >
                    <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
          
          {isCurrentPosition && (
            <span className="bg-terminal-accent/20 text-terminal-accent px-2 py-1 rounded text-xs font-mono self-start">
              Current
            </span>
          )}
        </div>

        {/* Meta Information */}
        <div className="flex flex-col xs:flex-row xs:flex-wrap gap-2 xs:gap-4 text-xs sm:text-sm text-terminal-muted">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span>{experience.duration}</span>
          </div>
          {experience.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span>{experience.location}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-terminal-foreground leading-relaxed text-sm sm:text-base">
          {experience.description}
        </p>

        {/* Technologies */}
        <div className="space-y-2">
          <h4 className="text-xs sm:text-sm font-semibold text-terminal-accent font-mono">
            Technologies:
          </h4>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="bg-terminal-muted/20 text-terminal-foreground px-2 py-1 rounded text-xs font-mono border border-terminal-border hover:border-terminal-accent transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </TerminalCard>
  );
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const workExperiences = experiences.filter(exp => exp.type === 'work');
  const education = experiences.filter(exp => exp.type === 'education');
  
  return (
    <section id="experience" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-terminal-foreground mb-4">
            <span className="text-terminal-accent font-mono">$</span> cat experience.log
          </h2>
          <p className="text-terminal-muted font-mono max-w-2xl mx-auto text-sm sm:text-base px-2">
            {'>'} Journey through my professional development and achievements
          </p>
        </div>

        {/* Work Experience */}
        {workExperiences.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-terminal-foreground mb-8 font-mono">
              <Briefcase className="inline h-6 w-6 mr-2 text-terminal-accent" />
              Work Experience
            </h3>
            <div className="space-y-6">
              {workExperiences.map((experience) => (
                <ExperienceCard key={experience.id} experience={experience} />
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        <div>
          {education.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-terminal-foreground mb-6 font-mono">
                <GraduationCap className="inline h-6 w-6 mr-2 text-terminal-accent" />
                Education
              </h3>
              <div className="space-y-4">
                {education.map((experience) => (
                  <ExperienceCard key={experience.id} experience={experience} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
