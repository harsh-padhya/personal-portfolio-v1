'use client';

import { useState } from 'react';
import { 
  Save, 
  Settings, 
  Globe, 
  Shield,
  Database,
  Palette,
  Bell
} from 'lucide-react';
import { TerminalCard } from '@/components/ui/terminal-card';
import { TerminalButton } from '@/components/ui/terminal-button';

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState({
    site: {
      title: 'Harsh Vardhan - Software Engineer',
      description: 'Personal portfolio and blog of a software engineer with 5+ years of experience',
      url: 'https://harshvardhan.dev',
      language: 'en',
      timezone: 'UTC'
    },
    blog: {
      postsPerPage: 10,
      enableComments: false,
      defaultStatus: 'draft',
      autoSave: true,
      enableRSS: true
    },
    theme: {
      primaryColor: '#22c55e',
      fontFamily: 'JetBrains Mono',
      darkMode: true
    },
    security: {
      adminOnlyMode: true,
      enableBackups: true,
      backupFrequency: 'daily'
    },
    notifications: {
      emailOnNewComment: false,
      emailOnNewContact: true,
      discordWebhook: ''
    }
  });

  const [saving, setSaving] = useState(false);

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // In a real app, this would save to an API
      console.log('Saving settings:', settings);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-terminal-accent font-mono">Settings</h1>
          <p className="text-terminal-muted mt-1">Configure your portfolio and blog settings.</p>
        </div>
        <TerminalButton onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Saving...' : 'Save All Settings'}
        </TerminalButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Site Settings */}
        <TerminalCard>
          <h2 className="text-lg font-semibold text-terminal-accent font-mono mb-4">
            <Globe className="h-5 w-5 inline mr-2" />
            Site Settings
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-terminal-foreground mb-2">
                Site Title
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                value={settings.site.title}
                onChange={(e) => updateSetting('site', 'title', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-terminal-foreground mb-2">
                Site Description
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                value={settings.site.description}
                onChange={(e) => updateSetting('site', 'description', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-terminal-foreground mb-2">
                Site URL
              </label>
              <input
                type="url"
                className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                value={settings.site.url}
                onChange={(e) => updateSetting('site', 'url', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-terminal-foreground mb-2">
                  Language
                </label>
                <select
                  className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                  value={settings.site.language}
                  onChange={(e) => updateSetting('site', 'language', e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-terminal-foreground mb-2">
                  Timezone
                </label>
                <select
                  className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                  value={settings.site.timezone}
                  onChange={(e) => updateSetting('site', 'timezone', e.target.value)}
                >
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">EST</option>
                  <option value="America/Los_Angeles">PST</option>
                  <option value="Europe/London">GMT</option>
                </select>
              </div>
            </div>
          </div>
        </TerminalCard>

        {/* Blog Settings */}
        <TerminalCard>
          <h2 className="text-lg font-semibold text-terminal-accent font-mono mb-4">
            <Settings className="h-5 w-5 inline mr-2" />
            Blog Settings
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-terminal-foreground mb-2">
                Posts per Page
              </label>
              <input
                type="number"
                min="1"
                max="50"
                className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                value={settings.blog.postsPerPage}
                onChange={(e) => updateSetting('blog', 'postsPerPage', parseInt(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-terminal-foreground mb-2">
                Default Post Status
              </label>
              <select
                className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                value={settings.blog.defaultStatus}
                onChange={(e) => updateSetting('blog', 'defaultStatus', e.target.value)}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-terminal-accent bg-terminal-background border-terminal-border rounded focus:ring-terminal-accent focus:ring-2"
                  checked={settings.blog.enableComments}
                  onChange={(e) => updateSetting('blog', 'enableComments', e.target.checked)}
                />
                <span className="text-sm font-medium text-terminal-foreground">Enable Comments</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-terminal-accent bg-terminal-background border-terminal-border rounded focus:ring-terminal-accent focus:ring-2"
                  checked={settings.blog.autoSave}
                  onChange={(e) => updateSetting('blog', 'autoSave', e.target.checked)}
                />
                <span className="text-sm font-medium text-terminal-foreground">Auto-save Drafts</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-terminal-accent bg-terminal-background border-terminal-border rounded focus:ring-terminal-accent focus:ring-2"
                  checked={settings.blog.enableRSS}
                  onChange={(e) => updateSetting('blog', 'enableRSS', e.target.checked)}
                />
                <span className="text-sm font-medium text-terminal-foreground">Enable RSS Feed</span>
              </label>
            </div>
          </div>
        </TerminalCard>

        {/* Theme Settings */}
        <TerminalCard>
          <h2 className="text-lg font-semibold text-terminal-accent font-mono mb-4">
            <Palette className="h-5 w-5 inline mr-2" />
            Theme Settings
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-terminal-foreground mb-2">
                Primary Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  className="w-12 h-10 border border-terminal-border rounded cursor-pointer"
                  value={settings.theme.primaryColor}
                  onChange={(e) => updateSetting('theme', 'primaryColor', e.target.value)}
                />
                <input
                  type="text"
                  className="flex-1 px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                  value={settings.theme.primaryColor}
                  onChange={(e) => updateSetting('theme', 'primaryColor', e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-terminal-foreground mb-2">
                Font Family
              </label>
              <select
                className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                value={settings.theme.fontFamily}
                onChange={(e) => updateSetting('theme', 'fontFamily', e.target.value)}
              >
                <option value="JetBrains Mono">JetBrains Mono</option>
                <option value="Fira Code">Fira Code</option>
                <option value="Source Code Pro">Source Code Pro</option>
                <option value="Consolas">Consolas</option>
              </select>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-terminal-accent bg-terminal-background border-terminal-border rounded focus:ring-terminal-accent focus:ring-2"
                  checked={settings.theme.darkMode}
                  onChange={(e) => updateSetting('theme', 'darkMode', e.target.checked)}
                />
                <span className="text-sm font-medium text-terminal-foreground">Dark Mode</span>
              </label>
            </div>
          </div>
        </TerminalCard>

        {/* Security Settings */}
        <TerminalCard>
          <h2 className="text-lg font-semibold text-terminal-accent font-mono mb-4">
            <Shield className="h-5 w-5 inline mr-2" />
            Security & Backup
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-terminal-accent bg-terminal-background border-terminal-border rounded focus:ring-terminal-accent focus:ring-2"
                  checked={settings.security.adminOnlyMode}
                  onChange={(e) => updateSetting('security', 'adminOnlyMode', e.target.checked)}
                />
                <span className="text-sm font-medium text-terminal-foreground">Admin Only Mode</span>
              </label>
              <p className="text-xs text-terminal-muted ml-6">
                Only authenticated users can access the admin interface
              </p>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-terminal-accent bg-terminal-background border-terminal-border rounded focus:ring-terminal-accent focus:ring-2"
                  checked={settings.security.enableBackups}
                  onChange={(e) => updateSetting('security', 'enableBackups', e.target.checked)}
                />
                <span className="text-sm font-medium text-terminal-foreground">Enable Automatic Backups</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-terminal-foreground mb-2">
                Backup Frequency
              </label>
              <select
                className="w-full px-3 py-2 bg-terminal-background border border-terminal-border rounded-md text-terminal-foreground focus:outline-none focus:ring-2 focus:ring-terminal-accent focus:border-transparent"
                value={settings.security.backupFrequency}
                onChange={(e) => updateSetting('security', 'backupFrequency', e.target.value)}
                disabled={!settings.security.enableBackups}
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
        </TerminalCard>
      </div>

      {/* Actions */}
      <TerminalCard>
        <h2 className="text-lg font-semibold text-terminal-accent font-mono mb-4">
          <Database className="h-5 w-5 inline mr-2" />
          Data Management
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TerminalButton variant="secondary" className="justify-start">
            Export Data
          </TerminalButton>
          <TerminalButton variant="secondary" className="justify-start">
            Import Data
          </TerminalButton>
          <TerminalButton variant="ghost" className="justify-start text-red-500 border-red-500/30">
            Reset All Settings
          </TerminalButton>
        </div>
      </TerminalCard>
    </div>
  );
}
