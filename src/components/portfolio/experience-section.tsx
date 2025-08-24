'use client';

import { Building, MapPin, Calendar, ExternalLink, Award, GraduationCap, Briefcase } from 'lucide-react';
import { TerminalCard } from '@/components/ui';
import { Experience } from '@/types/profile';

interface ExperienceSectionProps {
  experiences: Experience[];
}

const typeIcons = {
  work: Briefcase,
  education: GraduationCap,
  certification: Award,
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
      
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <IconComponent className="h-6 w-6 text-terminal-accent flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-terminal-foreground group-hover:text-terminal-accent transition-colors">
                {experience.position}
              </h3>
              <div className="flex items-center gap-2 text-terminal-muted">
                <Building className="h-4 w-4" />
                <span>{experience.company}</span>
                {experience.website && (
                  <a
                    href={experience.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terminal-accent hover:text-terminal-accent/80"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
          
          {isCurrentPosition && (
            <span className="bg-terminal-accent/20 text-terminal-accent px-2 py-1 rounded text-xs font-mono">
              Current
            </span>
          )}
        </div>

        {/* Meta Information */}
        <div className="flex flex-wrap gap-4 text-sm text-terminal-muted">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{experience.duration}</span>
          </div>
          {experience.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{experience.location}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-terminal-foreground leading-relaxed">
          {experience.description}
        </p>

        {/* Technologies */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-terminal-accent font-mono">
            Technologies:
          </h4>
          <div className="flex flex-wrap gap-2">
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
  const certifications = experiences.filter(exp => exp.type === 'certification');
  
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-terminal-foreground mb-4">
            <span className="text-terminal-accent font-mono">$</span> cat experience.log
          </h2>
          <p className="text-terminal-muted font-mono max-w-2xl mx-auto">
            {'>'} Journey through my professional development and achievements
          </p>
        </div>

        {/* Experience Timeline Header */}
        <div className="mb-12">
          <TerminalCard title="experience-summary.sh" variant="code">
            <div className="font-mono text-sm space-y-2">
              <div className="text-terminal-muted"># Professional Experience Summary</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-terminal-accent" />
                  <span className="text-terminal-foreground">Work:</span>
                  <span className="text-terminal-accent">{workExperiences.length} positions</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-terminal-accent" />
                  <span className="text-terminal-foreground">Education:</span>
                  <span className="text-terminal-accent">{education.length} degrees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-terminal-accent" />
                  <span className="text-terminal-foreground">Certifications:</span>
                  <span className="text-terminal-accent">{certifications.length} earned</span>
                </div>
              </div>
            </div>
          </TerminalCard>
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

        {/* Education & Certifications */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Education */}
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

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-terminal-foreground mb-6 font-mono">
                <Award className="inline h-6 w-6 mr-2 text-terminal-accent" />
                Certifications
              </h3>
              <div className="space-y-4">
                {certifications.map((experience) => (
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
