'use client';

import { useState, useEffect } from 'react';
import { 
  Save, 
  User, 
  Mail, 
  MapPin, 
  Phone,
  Globe,
  Github,
  Linkedin,
  Twitter,
  FileText,
  Plus,
  Minus
} from 'lucide-react';
import { TerminalCard } from '@/components/ui/terminal-card';
import { TerminalButton } from '@/components/ui/terminal-button';

interface ProfileData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  bio: string;
  avatar: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
  };
  skills: string[];
  interests: string[];
}

export default function ProfileAdminPage() {
  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    bio: '',
    avatar: '',
    social: {
      github: '',
      linkedin: '',
      twitter: ''
    },
    skills: [],
    interests: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await fetch('/api/admin/profile');
        if (!response.ok) {
          throw new Error('Failed to load profile');
        }
        
        const data = await response.json();
        setProfile({
          name: data.name || '',
          title: data.title || '',
          email: data.contact?.email || '',
          phone: data.contact?.phone || '',
          location: data.contact?.location || '',
          website: data.contact?.website || '',
          bio: data.bio || '',
          avatar: data.avatar || '',
          social: {
            github: data.social?.github || '',
            linkedin: data.social?.linkedin || '',
            twitter: data.social?.twitter || ''
          },
          skills: data.skills?.map((skill: any) => skill.name) || [],
          interests: data.interests || []
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

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const addInterest = () => {
    if (newInterest.trim() && !profile.interests.includes(newInterest.trim())) {
      setProfile(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
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
                value={profile.name}
                onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-terminal-foreground mb-2">
                Professional Title
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                value={profile.title}
                onChange={(e) => setProfile(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-terminal-foreground mb-2">
                Bio
              </label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                value={profile.bio}
                onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-terminal-foreground mb-2">
                Avatar URL
              </label>
              <input
                type="url"
                className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                value={profile.avatar}
                onChange={(e) => setProfile(prev => ({ ...prev, avatar: e.target.value }))}
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
                value={profile.email}
                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-terminal-foreground mb-2">
                Phone
              </label>
              <input
                type="tel"
                className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                value={profile.phone}
                onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-terminal-foreground mb-2">
                Location
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                value={profile.location}
                onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-terminal-foreground mb-2">
                Website
              </label>
              <input
                type="url"
                className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                value={profile.website}
                onChange={(e) => setProfile(prev => ({ ...prev, website: e.target.value }))}
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

        {/* Skills */}
        <TerminalCard>
          <h2 className="text-lg font-semibold text-terminal-accent font-mono mb-4">
            <FileText className="h-5 w-5 inline mr-2" />
            Skills
          </h2>
          
          <div className="space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Add a skill..."
                className="flex-1 px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              />
              <TerminalButton onClick={addSkill} size="sm">
                <Plus className="h-4 w-4" />
              </TerminalButton>
            </div>

            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-3 py-1 rounded-md bg-terminal-accent/20 text-terminal-accent border border-terminal-accent/30"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-terminal-accent/60 hover:text-terminal-accent"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </TerminalCard>
      </div>
    </div>
  );
}
