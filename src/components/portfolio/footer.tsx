'use client';

import { Terminal, Heart, Github, Linkedin, Twitter } from 'lucide-react';
import { Profile } from '@/types/profile';

interface FooterProps {
  profile: Profile;
}

export function Footer({ profile }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-terminal-surface border-t border-terminal-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-terminal-accent">
              <Terminal className="h-6 w-6" />
              <span className="font-mono font-bold text-lg">./portfolio</span>
            </div>
            <p className="text-terminal-muted text-sm leading-relaxed">
              Building exceptional digital experiences with clean code, 
              thoughtful design, and a passion for technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-terminal-foreground font-mono font-semibold">Quick Links</h3>
            <nav className="space-y-2">
              <a href="#about" className="block text-terminal-muted hover:text-terminal-accent transition-colors text-sm">
                About
              </a>
              <a href="#experience" className="block text-terminal-muted hover:text-terminal-accent transition-colors text-sm">
                Experience
              </a>
              <a href="#skills" className="block text-terminal-muted hover:text-terminal-accent transition-colors text-sm">
                Skills
              </a>
              <a href="/blog" className="block text-terminal-muted hover:text-terminal-accent transition-colors text-sm">
                Blog
              </a>
              <a href="#contact" className="block text-terminal-muted hover:text-terminal-accent transition-colors text-sm">
                Contact
              </a>
            </nav>
          </div>

          {/* Social & Contact */}
          <div className="space-y-4">
            <h3 className="text-terminal-foreground font-mono font-semibold">Connect</h3>
            <div className="flex space-x-4">
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-muted hover:text-terminal-accent transition-colors"
                title="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-muted hover:text-terminal-accent transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              {profile.social.twitter && (
                <a
                  href={profile.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terminal-muted hover:text-terminal-accent transition-colors"
                  title="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
            </div>
            <div className="text-terminal-muted text-sm">
              <a 
                href={`mailto:${profile.personal.email}`}
                className="hover:text-terminal-accent transition-colors"
              >
                {profile.personal.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-terminal-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-terminal-muted text-sm font-mono mb-4 sm:mb-0">
            © {currentYear} {profile.personal.name}. All rights reserved.
          </div>
          
          <div className="flex items-center text-terminal-muted text-sm">
            <span>Built with</span>
            <Heart className="h-4 w-4 mx-1 text-red-500 animate-pulse" />
            <span>using Next.js & TypeScript</span>
          </div>
        </div>

        {/* Terminal-style bottom line */}
        <div className="mt-4 font-mono text-xs text-terminal-muted">
          <span className="text-terminal-accent">$</span> echo "Thanks for visiting my portfolio!"
        </div>
      </div>
    </footer>
  );
}
