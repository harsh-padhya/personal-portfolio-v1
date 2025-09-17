'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X,
  Briefcase,
  GraduationCap,
  Award,
  Heart
} from 'lucide-react';
import { TerminalCard } from '@/components/ui/terminal-card';
import { TerminalButton } from '@/components/ui/terminal-button';
import { Experience } from '@/types/profile';
import { getAllExperienceClient, saveExperienceClient } from '@/lib/static-data-utils';

const typeIcons = {
  work: Briefcase,
  education: GraduationCap,
  certification: Award,
  volunteer: Heart
};

export default function ExperienceAdminPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Experience>>({});

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      const data = await getAllExperienceClient();
      setExperiences(data);
    } catch (error) {
      console.error('Error loading experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveExperiences = async () => {
    try {
      const success = await saveExperienceClient(experiences);

      if (success) {
        console.log('Experiences saved successfully');
      }
    } catch (error) {
      console.error('Error saving experiences:', error);
    }
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: `exp-${Date.now()}`,
      company: '',
      position: '',
      startDate: '',
      endDate: null,
      duration: '',
      description: '',
      technologies: [],
      type: 'work',
      featured: false,
      location: ''
    };

    setFormData(newExperience);
    setEditingId(newExperience.id);
    setShowForm(true);
  };

  const editExperience = (experience: Experience) => {
    setFormData({ ...experience });
    setEditingId(experience.id);
    setShowForm(true);
  };

  const updateExperience = (field: keyof Experience, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const saveExperience = () => {
    if (!formData.id || !formData.company || !formData.position) return;

    const updatedExperiences = [...experiences];
    const existingIndex = updatedExperiences.findIndex(exp => exp.id === formData.id);

    if (existingIndex >= 0) {
      updatedExperiences[existingIndex] = formData as Experience;
    } else {
      updatedExperiences.push(formData as Experience);
    }

    setExperiences(updatedExperiences);
    setShowForm(false);
    setEditingId(null);
    setFormData({});
    saveExperiences();
  };

  const deleteExperience = (id: string) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      const updatedExperiences = experiences.filter(exp => exp.id !== id);
      setExperiences(updatedExperiences);
      saveExperiences();
    }
  };

  const cancelEdit = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({});
  };

  const addTechnology = () => {
    const tech = prompt('Enter technology name:');
    if (tech) {
      const technologies = [...(formData.technologies || []), tech];
      updateExperience('technologies', technologies);
    }
  };

  const removeTechnology = (tech: string) => {
    const technologies = (formData.technologies || []).filter(t => t !== tech);
    updateExperience('technologies', technologies);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center text-terminal-green">Loading experiences...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-mono text-terminal-green">Experience Management</h1>
        <TerminalButton onClick={addExperience} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Experience
        </TerminalButton>
      </div>

      {showForm && (
        <TerminalCard className="p-6">
          <h2 className="text-xl font-mono text-terminal-green mb-4">
            {editingId === formData.id && experiences.find(e => e.id === editingId) ? 'Edit' : 'Add'} Experience
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-mono text-terminal-green mb-2">
                Company/Institution
              </label>
              <input
                type="text"
                value={formData.company || ''}
                onChange={(e) => updateExperience('company', e.target.value)}
                className="w-full p-2 bg-black border border-terminal-green text-terminal-green rounded font-mono"
                placeholder="Company name"
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-terminal-green mb-2">
                Position/Title
              </label>
              <input
                type="text"
                value={formData.position || ''}
                onChange={(e) => updateExperience('position', e.target.value)}
                className="w-full p-2 bg-black border border-terminal-green text-terminal-green rounded font-mono"
                placeholder="Job title or degree"
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-terminal-green mb-2">
                Type
              </label>
              <select
                value={formData.type || 'work'}
                onChange={(e) => updateExperience('type', e.target.value)}
                className="w-full p-2 bg-black border border-terminal-green text-terminal-green rounded font-mono"
              >
                <option value="work">Work Experience</option>
                <option value="education">Education</option>
                <option value="certification">Certification</option>
                <option value="volunteer">Volunteer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-mono text-terminal-green mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location || ''}
                onChange={(e) => updateExperience('location', e.target.value)}
                className="w-full p-2 bg-black border border-terminal-green text-terminal-green rounded font-mono"
                placeholder="Location"
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-terminal-green mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate ? formData.startDate.split('T')[0] : ''}
                onChange={(e) => updateExperience('startDate', e.target.value)}
                className="w-full p-2 bg-black border border-terminal-green text-terminal-green rounded font-mono"
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-terminal-green mb-2">
                End Date (leave empty if current)
              </label>
              <input
                type="date"
                value={formData.endDate ? formData.endDate.split('T')[0] : ''}
                onChange={(e) => updateExperience('endDate', e.target.value || null)}
                className="w-full p-2 bg-black border border-terminal-green text-terminal-green rounded font-mono"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-mono text-terminal-green mb-2">
                Description
              </label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => updateExperience('description', e.target.value)}
                rows={4}
                className="w-full p-2 bg-black border border-terminal-green text-terminal-green rounded font-mono"
                placeholder="Describe your role and achievements"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-mono text-terminal-green mb-2">
                Technologies/Skills
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {(formData.technologies || []).map((tech, index) => (
                  <span
                    key={index}
                    className="bg-terminal-green text-black px-2 py-1 rounded text-sm font-mono flex items-center gap-1"
                  >
                    {tech}
                    <button
                      onClick={() => removeTechnology(tech)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <TerminalButton size="sm" onClick={addTechnology}>
                Add Technology
              </TerminalButton>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-mono text-terminal-green">
                <input
                  type="checkbox"
                  checked={formData.featured || false}
                  onChange={(e) => updateExperience('featured', e.target.checked)}
                  className="rounded"
                />
                Featured Experience
              </label>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <TerminalButton onClick={saveExperience} className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Experience
            </TerminalButton>
            <TerminalButton variant="secondary" onClick={cancelEdit}>
              Cancel
            </TerminalButton>
          </div>
        </TerminalCard>
      )}

      <div className="grid gap-4">
        {experiences.map((experience) => {
          const IconComponent = typeIcons[experience.type];
          return (
            <TerminalCard key={experience.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4 flex-1">
                  <IconComponent className="w-6 h-6 text-terminal-green mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-mono text-terminal-green">
                        {experience.position}
                      </h3>
                      {experience.featured && (
                        <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-mono">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-terminal-green/80 font-mono mb-2">
                      {experience.company} • {experience.location}
                    </p>
                    <p className="text-terminal-green/70 text-sm font-mono mb-3">
                      {experience.duration}
                    </p>
                    <p className="text-terminal-green/90 mb-3 leading-relaxed">
                      {experience.description}
                    </p>
                    {experience.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="bg-terminal-green/20 text-terminal-green px-2 py-1 rounded text-sm font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <TerminalButton
                    size="sm"
                    onClick={() => editExperience(experience)}
                    className="flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </TerminalButton>
                  <TerminalButton
                    size="sm"
                    variant="secondary"
                    onClick={() => deleteExperience(experience.id)}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </TerminalButton>
                </div>
              </div>
            </TerminalCard>
          );
        })}
      </div>

      {experiences.length === 0 && (
        <TerminalCard className="p-8 text-center">
          <p className="text-terminal-green/70 font-mono mb-4">
            No experiences added yet. Click "Add Experience" to get started.
          </p>
        </TerminalCard>
      )}
    </div>
  );
}
