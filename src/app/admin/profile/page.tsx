'use client';

import { useState, useEffect } from 'react';
import { 
  Save, 
  User, 
  Mail, 
  Globe,
  Github,
  Linkedin,
  Twitter
} from 'lucide-react';
import { TerminalCard } from '@/components/ui/terminal-card';
import { TerminalButton } from '@/components/ui/terminal-button';
import { Profile } from '@/types/portfolio';

export default function ProfileAdminPage() {
  const [profile, setProfile] = useState<Profile>({
    personal: {
      name: '',
      title: '',
      email: '',
      location: '',
      bio: '',
      avatar: '',
      resume: ''
    },
    social: {
      github: '',
      linkedin: '',
      twitter: '',
      website: ''
    },
    hero: {
      tagline: '',
      description: '',
      cta: ''
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await fetch('/api/admin/profile');
        if (!response.ok) {
          throw new Error('Failed to load profile');
        }
        
        const data = await response.json();
        setProfile({
          personal: {
            name: data.personal?.name || '',
            title: data.personal?.title || '',
            email: data.personal?.email || '',
            location: data.personal?.location || '',
            bio: data.personal?.bio || '',
            avatar: data.personal?.avatar || '',
            resume: data.personal?.resume || ''
          },
          social: {
            github: data.social?.github || '',
            linkedin: data.social?.linkedin || '',
            twitter: data.social?.twitter || '',
            website: data.social?.website || ''
          },
          hero: {
            tagline: data.hero?.tagline || '',
            description: data.hero?.description || '',
            cta: data.hero?.cta || ''
          }
        });
      } catch (error) {
        console.error('Error loading profile:', error);
        alert('Error loading profile data');
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      alert('Profile saved successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-terminal-accent font-mono">Profile Settings</h1>
        </div>
        <TerminalCard className="animate-pulse">
          <div className="h-64 bg-terminal-muted/20 rounded"></div>
        </TerminalCard>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-terminal-accent font-mono">Profile Settings</h1>
          <p className="text-terminal-muted mt-1">Manage your personal information and public profile.</p>
        </div>
        <TerminalButton 
          onClick={handleSave}
          disabled={saving}
        >
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Saving...' : 'Save Changes'}
        </TerminalButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <TerminalCard>
          <h2 className="text-lg font-semibold text-terminal-accent font-mono mb-4">
            <User className="h-5 w-5 inline mr-2" />
            Basic Information
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-terminal-foreground mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                value={profile.personal.name}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  personal: { ...prev.personal, name: e.target.value }
                }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-terminal-foreground mb-2">
                Professional Title
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                value={profile.personal.title}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  personal: { ...prev.personal, title: e.target.value }
                }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-terminal-foreground mb-2">
                Bio
              </label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                value={profile.personal.bio}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  personal: { ...prev.personal, bio: e.target.value }
                }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-terminal-foreground mb-2">
                Avatar URL
              </label>
              <input
                type="url"
                className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                value={profile.personal.avatar}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  personal: { ...prev.personal, avatar: e.target.value }
                }))}
              />
            </div>
          </div>
        </TerminalCard>

        {/* Contact Information */}
        <TerminalCard>
          <h2 className="text-lg font-semibold text-terminal-accent font-mono mb-4">
            <Mail className="h-5 w-5 inline mr-2" />
            Contact Information
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-terminal-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                value={profile.personal.email}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  personal: { ...prev.personal, email: e.target.value }
                }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-terminal-foreground mb-2">
                Location
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                value={profile.personal.location}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  personal: { ...prev.personal, location: e.target.value }
                }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-terminal-foreground mb-2">
                Website
              </label>
              <input
                type="url"
                className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                value={profile.social.website}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  social: { ...prev.social, website: e.target.value }
                }))}
              />
            </div>
          </div>
        </TerminalCard>

        {/* Social Media */}
        <TerminalCard>
          <h2 className="text-lg font-semibold text-terminal-accent font-mono mb-4">
            <Globe className="h-5 w-5 inline mr-2" />
            Social Media
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-terminal-foreground mb-2">
                <Github className="h-4 w-4 inline mr-1" />
                GitHub
              </label>
              <input
                type="url"
                className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                value={profile.social.github}
                onChange={(e) => setProfile(prev => ({ 
                  ...prev, 
                  social: { ...prev.social, github: e.target.value }
                }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-terminal-foreground mb-2">
                <Linkedin className="h-4 w-4 inline mr-1" />
                LinkedIn
              </label>
              <input
                type="url"
                className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                value={profile.social.linkedin}
                onChange={(e) => setProfile(prev => ({ 
                  ...prev, 
                  social: { ...prev.social, linkedin: e.target.value }
                }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-terminal-foreground mb-2">
                <Twitter className="h-4 w-4 inline mr-1" />
                Twitter
              </label>
              <input
                type="url"
                className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                value={profile.social.twitter}
                onChange={(e) => setProfile(prev => ({ 
                  ...prev, 
                  social: { ...prev.social, twitter: e.target.value }
                }))}
              />
            </div>
          </div>
        </TerminalCard>
      </div>
    </div>
  );
}
