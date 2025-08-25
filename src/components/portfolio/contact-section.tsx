'use client';

import { useState } from 'react';
import { Mail, Github, Linkedin, Twitter, Send, MapPin, Calendar } from 'lucide-react';
import { TerminalCard, TerminalButton } from '@/components/ui';
import { Profile } from '@/types/profile';

interface ContactSectionProps {
  profile: Profile;
}

export function ContactSection({ profile }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission (would integrate with email service)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For now, just open email client
    const mailtoLink = `mailto:${profile.personal.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
    window.location.href = mailtoLink;
    
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-terminal-foreground mb-4">
            <span className="text-terminal-accent font-mono">$</span> ./contact.sh
          </h2>
          <p className="text-terminal-muted font-mono max-w-2xl mx-auto text-sm sm:text-base px-2">
            {'>'} Let's connect and build something amazing together
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Information */}
          <div className="space-y-4 sm:space-y-6">
            <TerminalCard title="contact-info.json" variant="glass">
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-terminal-accent mb-3 sm:mb-4 font-mono">
                    Get In Touch
                  </h3>
                  <p className="text-terminal-foreground leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                    I'm always open to discussing new opportunities, interesting projects, 
                    or just having a chat about technology. Whether you're looking to 
                    collaborate or just want to say hello, I'd love to hear from you!
                  </p>
                </div>

                {/* Contact Details */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start sm:items-center gap-2 sm:gap-3 text-terminal-foreground text-sm sm:text-base">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-terminal-accent flex-shrink-0 mt-0.5 sm:mt-0" />
                    <span className="font-mono text-xs sm:text-sm">email:</span>
                    <a 
                      href={`mailto:${profile.personal.email}`}
                      className="text-terminal-accent hover:underline break-all"
                    >
                      {profile.personal.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-terminal-foreground">
                    <MapPin className="h-5 w-5 text-terminal-accent" />
                    <span className="font-mono text-sm">location:</span>
                    <span>{profile.personal.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-terminal-foreground">
                    <Calendar className="h-5 w-5 text-terminal-accent" />
                    <span className="font-mono text-sm">timezone:</span>
                    <span>PST (UTC-8)</span>
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h4 className="text-lg font-semibold text-terminal-accent mb-3 font-mono">
                    Connect With Me
                  </h4>
                  <div className="flex space-x-4">
                    <a
                      href={profile.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-terminal-muted/20 hover:bg-terminal-accent/20 text-terminal-foreground hover:text-terminal-accent px-4 py-2 rounded transition-all duration-200 border border-terminal-border hover:border-terminal-accent"
                    >
                      <Github className="h-5 w-5" />
                      <span className="font-mono text-sm">GitHub</span>
                    </a>
                    <a
                      href={profile.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-terminal-muted/20 hover:bg-terminal-accent/20 text-terminal-foreground hover:text-terminal-accent px-4 py-2 rounded transition-all duration-200 border border-terminal-border hover:border-terminal-accent"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span className="font-mono text-sm">LinkedIn</span>
                    </a>
                    {profile.social.twitter && (
                      <a
                        href={profile.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-terminal-muted/20 hover:bg-terminal-accent/20 text-terminal-foreground hover:text-terminal-accent px-4 py-2 rounded transition-all duration-200 border border-terminal-border hover:border-terminal-accent"
                      >
                        <Twitter className="h-5 w-5" />
                        <span className="font-mono text-sm">Twitter</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </TerminalCard>

            {/* Terminal Quote */}
            <TerminalCard title="quote.txt" variant="code">
              <div className="font-mono text-sm">
                <div className="text-terminal-muted mb-2"># Daily motivation</div>
                <div className="text-terminal-foreground italic">
                  "The best way to predict the future is to implement it."
                </div>
                <div className="text-terminal-muted mt-2">- Alan Kay (adapted)</div>
              </div>
            </TerminalCard>
          </div>

          {/* Contact Form */}
          <TerminalCard title="send-message.form" variant="glass">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-terminal-accent font-mono text-sm mb-2">
                    name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-terminal-surface border border-terminal-border rounded px-4 py-2 text-terminal-foreground font-mono focus:border-terminal-accent focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-terminal-accent font-mono text-sm mb-2">
                    email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-terminal-surface border border-terminal-border rounded px-4 py-2 text-terminal-foreground font-mono focus:border-terminal-accent focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-terminal-accent font-mono text-sm mb-2">
                  subject*
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-terminal-surface border border-terminal-border rounded px-4 py-2 text-terminal-foreground font-mono focus:border-terminal-accent focus:outline-none transition-colors"
                  placeholder="Let's collaborate!"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-terminal-accent font-mono text-sm mb-2">
                  message*
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-terminal-surface border border-terminal-border rounded px-4 py-2 text-terminal-foreground font-mono focus:border-terminal-accent focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project or just say hello..."
                />
              </div>
              
              <TerminalButton
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-terminal-background border-t-transparent rounded-full mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </>
                )}
              </TerminalButton>
              
              <p className="text-terminal-muted text-xs font-mono">
                * This will open your default email client with the message pre-filled
              </p>
            </form>
          </TerminalCard>
        </div>
      </div>
    </section>
  );
}
