'use client';

import { User, MapPin, Mail, Calendar } from 'lucide-react';
import { TerminalCard } from '@/components/ui';
import { Profile } from '@/types/profile';

interface AboutSectionProps {
  profile: Profile;
}

export function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-terminal-foreground mb-4">
            <span className="text-terminal-accent font-mono">$</span> whoami
          </h2>
          <p className="text-terminal-muted font-mono max-w-2xl mx-auto">
            {'>'} Getting to know the person behind the code
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Profile Info Card */}
          <TerminalCard title="profile.json" variant="glass" className="h-fit">
            <div className="space-y-6">
              {/* Personal Info */}
              <div>
                <h3 className="text-xl font-semibold text-terminal-accent mb-4 font-mono">
                  Personal Info
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-terminal-foreground">
                    <User className="h-5 w-5 text-terminal-accent" />
                    <span className="font-mono text-sm">name:</span>
                    <span>"{profile.personal.name}"</span>
                  </div>
                  <div className="flex items-center gap-3 text-terminal-foreground">
                    <MapPin className="h-5 w-5 text-terminal-accent" />
                    <span className="font-mono text-sm">location:</span>
                    <span>"{profile.personal.location}"</span>
                  </div>
                  <div className="flex items-center gap-3 text-terminal-foreground">
                    <Mail className="h-5 w-5 text-terminal-accent" />
                    <span className="font-mono text-sm">email:</span>
                    <a 
                      href={`mailto:${profile.personal.email}`}
                      className="text-terminal-accent hover:underline"
                    >
                      "{profile.personal.email}"
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-terminal-foreground">
                    <Calendar className="h-5 w-5 text-terminal-accent" />
                    <span className="font-mono text-sm">experience:</span>
                    <span>"5+ years"</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-semibold text-terminal-accent mb-3 font-mono">
                  Social Links
                </h3>
                <div className="space-y-2">
                  <div className="text-terminal-foreground">
                    <span className="font-mono text-sm">github:</span>{' '}
                    <a 
                      href={profile.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-terminal-accent hover:underline"
                    >
                      "{profile.social.github}"
                    </a>
                  </div>
                  <div className="text-terminal-foreground">
                    <span className="font-mono text-sm">linkedin:</span>{' '}
                    <a 
                      href={profile.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-terminal-accent hover:underline"
                    >
                      "{profile.social.linkedin}"
                    </a>
                  </div>
                  {profile.social.twitter && (
                    <div className="text-terminal-foreground">
                      <span className="font-mono text-sm">twitter:</span>{' '}
                      <a 
                        href={profile.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-terminal-accent hover:underline"
                      >
                        "{profile.social.twitter}"
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TerminalCard>

          {/* Bio Section */}
          <TerminalCard title="about.md" variant="code" className="h-fit">
            <div className="space-y-4">
              <div className="text-terminal-muted font-mono text-sm">
                # About Me
              </div>
              <div className="text-terminal-foreground leading-relaxed">
                {profile.personal.bio}
              </div>
              
              {/* Code-style interests */}
              <div className="mt-6">
                <div className="text-terminal-muted font-mono text-sm mb-2">
                  ## Current Focus
                </div>
                <div className="font-mono text-sm space-y-1">
                  <div><span className="text-terminal-accent">•</span> Building scalable web applications</div>
                  <div><span className="text-terminal-accent">•</span> Exploring serverless architectures</div>
                  <div><span className="text-terminal-accent">•</span> Contributing to open source</div>
                  <div><span className="text-terminal-accent">•</span> Mentoring junior developers</div>
                </div>
              </div>

              {/* Fun fact */}
              <div className="mt-6 p-4 bg-terminal-muted/20 rounded border-l-4 border-terminal-accent">
                <div className="text-terminal-muted font-mono text-sm mb-1">
                  // Fun fact
                </div>
                <div className="text-terminal-foreground text-sm">
                  When I'm not coding, you'll find me exploring hiking trails or experimenting with new coffee brewing methods. I believe the best ideas come when you step away from the screen!
                </div>
              </div>
            </div>
          </TerminalCard>
        </div>
      </div>
    </section>
  );
}
