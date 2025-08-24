'use client';

import { useEffect, useState } from 'react';
import { Github, Linkedin, Twitter, Download, Mail, ArrowDown } from 'lucide-react';
import { TerminalButton, TypingAnimation } from '@/components/ui';
import { Profile } from '@/types/profile';

interface HeroSectionProps {
  profile: Profile;
}

export function HeroSection({ profile }: HeroSectionProps) {
  const [showDescription, setShowDescription] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <div className="max-w-4xl mx-auto text-center">
        {/* ASCII Art Terminal Header */}
        <div className="mb-8 font-mono text-terminal-accent text-xs sm:text-sm leading-tight">
          <pre className="inline-block text-left">
{`╭──────────────────────────────────────╮
│  $ whoami                            │
│  > ${profile.personal.name.padEnd(30)} │
│  $ pwd                               │
│  > ~/portfolio                       │
│  $ ls -la skills/                    │
│  > TypeScript React Node.js AWS      │
╰──────────────────────────────────────╯`}
          </pre>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-terminal-foreground mb-4">
          <span className="text-terminal-accent font-mono">{'>'}</span>{' '}
          <TypingAnimation 
            text={profile.personal.name}
            speed={100}
            onComplete={() => setShowDescription(true)}
          />
        </h1>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl text-terminal-muted mb-6 font-mono">
          {profile.personal.title}
        </h2>

        {/* Tagline */}
        <p className="text-lg sm:text-xl text-terminal-accent mb-8 font-mono">
          {profile.hero.tagline}
        </p>

        {/* Description */}
        {showDescription && (
          <div className="mb-12 opacity-0 animate-fade-in-up">
            <p className="text-lg text-terminal-foreground max-w-3xl mx-auto leading-relaxed">
              <TypingAnimation 
                text={profile.hero.description}
                speed={30}
                showCursor={false}
                onComplete={() => setShowButtons(true)}
              />
            </p>
          </div>
        )}

        {/* Action Buttons */}
        {showButtons && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <TerminalButton
              variant="primary"
              size="lg"
              onClick={() => scrollToSection('contact')}
              className="group"
            >
              <Mail className="h-5 w-5 mr-2 group-hover:animate-bounce" />
              {profile.hero.cta}
            </TerminalButton>
            
            <TerminalButton
              variant="secondary"
              size="lg"
              onClick={() => window.open(profile.personal.resume, '_blank')}
            >
              <Download className="h-5 w-5 mr-2" />
              Download Resume
            </TerminalButton>
          </div>
        )}

        {/* Social Links */}
        {showButtons && (
          <div className="flex justify-center space-x-6 mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-muted hover:text-terminal-accent transition-colors duration-200 hover:scale-110 transform"
            >
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-muted hover:text-terminal-accent transition-colors duration-200 hover:scale-110 transform"
            >
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
            {profile.social.twitter && (
              <a
                href={profile.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-muted hover:text-terminal-accent transition-colors duration-200 hover:scale-110 transform"
              >
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
            )}
          </div>
        )}

        {/* Scroll Indicator */}
        {showButtons && (
          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <button
              onClick={() => scrollToSection('about')}
              className="text-terminal-muted hover:text-terminal-accent transition-colors duration-200 animate-bounce"
            >
              <ArrowDown className="h-6 w-6 mx-auto" />
              <span className="sr-only">Scroll to about section</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
