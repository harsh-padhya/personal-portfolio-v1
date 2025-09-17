'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X,
  Code,
  Database,
  Cloud,
  Settings,
  Globe,
  Zap
} from 'lucide-react';
import { TerminalCard } from '@/components/ui/terminal-card';
import { TerminalButton } from '@/components/ui/terminal-button';
import { SkillCategory, Skill } from '@/types/profile';
import { getAllSkillsClient, saveSkillsClient } from '@/lib/static-data-utils';

const categoryIcons = {
  frontend: Globe,
  backend: Database,
  database: Database,
  cloud: Cloud,
  tools: Settings,
  other: Code
};

export default function SkillsAdminPage() {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState<Partial<SkillCategory>>({});
  const [skillFormData, setSkillFormData] = useState<Partial<Skill>>({});
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const data = await getAllSkillsClient();
      setSkillCategories(data);
    } catch (error) {
      console.error('Error loading skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSkills = async () => {
    try {
      const success = await saveSkillsClient(skillCategories);

      if (success) {
        console.log('Skills saved successfully');
      }
    } catch (error) {
      console.error('Error saving skills:', error);
    }
  };

  const addCategory = () => {
    setCategoryFormData({
      id: '',
      name: '',
      skills: []
    });
    setShowCategoryForm(true);
    setEditingCategoryId(null);
  };

  const editCategory = (category: SkillCategory) => {
    setCategoryFormData({ ...category });
    setEditingCategoryId(category.id);
    setShowCategoryForm(true);
  };

  const saveCategory = () => {
    if (!categoryFormData.name || !categoryFormData.id) return;

    const updatedCategories = [...skillCategories];
    const existingIndex = updatedCategories.findIndex(cat => cat.id === categoryFormData.id);

    if (existingIndex >= 0) {
      updatedCategories[existingIndex] = { ...updatedCategories[existingIndex], ...categoryFormData };
    } else {
      updatedCategories.push(categoryFormData as SkillCategory);
    }

    setSkillCategories(updatedCategories);
    setShowCategoryForm(false);
    setCategoryFormData({});
    setEditingCategoryId(null);
    saveSkills();
  };

  const deleteCategory = (categoryId: string) => {
    if (confirm('Are you sure you want to delete this category and all its skills?')) {
      const updatedCategories = skillCategories.filter(cat => cat.id !== categoryId);
      setSkillCategories(updatedCategories);
      saveSkills();
    }
  };

  const addSkill = (categoryId: string) => {
    setSkillFormData({
      name: '',
      level: 3,
      years: 1,
      description: '',
      category: categoryId
    });
    setSelectedCategoryId(categoryId);
    setShowSkillForm(true);
    setEditingSkillId(null);
  };

  const editSkill = (skill: Skill, categoryId: string) => {
    setSkillFormData({ ...skill });
    setSelectedCategoryId(categoryId);
    setEditingSkillId(`${categoryId}-${skill.name}`);
    setShowSkillForm(true);
  };

  const saveSkill = () => {
    if (!skillFormData.name || !selectedCategoryId) return;

    const updatedCategories = skillCategories.map(category => {
      if (category.id === selectedCategoryId) {
        const existingSkillIndex = category.skills.findIndex(skill => skill.name === skillFormData.name);
        const updatedSkills = [...category.skills];

        if (existingSkillIndex >= 0) {
          updatedSkills[existingSkillIndex] = { ...updatedSkills[existingSkillIndex], ...skillFormData };
        } else {
          updatedSkills.push(skillFormData as Skill);
        }

        return { ...category, skills: updatedSkills };
      }
      return category;
    });

    setSkillCategories(updatedCategories);
    setShowSkillForm(false);
    setSkillFormData({});
    setEditingSkillId(null);
    setSelectedCategoryId('');
    saveSkills();
  };

  const deleteSkill = (categoryId: string, skillName: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      const updatedCategories = skillCategories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            skills: category.skills.filter(skill => skill.name !== skillName)
          };
        }
        return category;
      });

      setSkillCategories(updatedCategories);
      saveSkills();
    }
  };

  const getLevelColor = (level: number) => {
    if (level >= 5) return 'text-green-400';
    if (level >= 4) return 'text-blue-400';
    if (level >= 3) return 'text-yellow-400';
    if (level >= 2) return 'text-orange-400';
    return 'text-red-400';
  };

  const getLevelText = (level: number) => {
    const levels = ['Beginner', 'Novice', 'Intermediate', 'Advanced', 'Expert'];
    return levels[level - 1] || 'Beginner';
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center text-terminal-green">Loading skills...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-mono text-terminal-green">Skills Management</h1>
        <TerminalButton onClick={addCategory} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Category
        </TerminalButton>
      </div>

      {/* Category Form */}
      {showCategoryForm && (
        <TerminalCard className="p-6">
          <h2 className="text-xl font-mono text-terminal-green mb-4">
            {editingCategoryId ? 'Edit' : 'Add'} Skill Category
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-mono text-terminal-green mb-2">
                Category ID
              </label>
              <input
                type="text"
                value={categoryFormData.id || ''}
                onChange={(e) => setCategoryFormData(prev => ({ ...prev, id: e.target.value }))}
                className="w-full p-2 bg-black border border-terminal-green text-terminal-green rounded font-mono"
                placeholder="e.g., frontend, backend"
                disabled={!!editingCategoryId}
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-terminal-green mb-2">
                Category Name
              </label>
              <input
                type="text"
                value={categoryFormData.name || ''}
                onChange={(e) => setCategoryFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-2 bg-black border border-terminal-green text-terminal-green rounded font-mono"
                placeholder="e.g., Frontend Development"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <TerminalButton onClick={saveCategory} className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Category
            </TerminalButton>
            <TerminalButton variant="secondary" onClick={() => setShowCategoryForm(false)}>
              Cancel
            </TerminalButton>
          </div>
        </TerminalCard>
      )}

      {/* Skill Form */}
      {showSkillForm && (
        <TerminalCard className="p-6">
          <h2 className="text-xl font-mono text-terminal-green mb-4">
            {editingSkillId ? 'Edit' : 'Add'} Skill
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-mono text-terminal-green mb-2">
                Skill Name
              </label>
              <input
                type="text"
                value={skillFormData.name || ''}
                onChange={(e) => setSkillFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-2 bg-black border border-terminal-green text-terminal-green rounded font-mono"
                placeholder="e.g., React"
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-terminal-green mb-2">
                Level (1-5)
              </label>
              <select
                value={skillFormData.level || 3}
                onChange={(e) => setSkillFormData(prev => ({ ...prev, level: parseInt(e.target.value) }))}
                className="w-full p-2 bg-black border border-terminal-green text-terminal-green rounded font-mono"
              >
                <option value={1}>1 - Beginner</option>
                <option value={2}>2 - Novice</option>
                <option value={3}>3 - Intermediate</option>
                <option value={4}>4 - Advanced</option>
                <option value={5}>5 - Expert</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-mono text-terminal-green mb-2">
                Years of Experience
              </label>
              <input
                type="number"
                value={skillFormData.years || 1}
                onChange={(e) => setSkillFormData(prev => ({ ...prev, years: parseInt(e.target.value) }))}
                className="w-full p-2 bg-black border border-terminal-green text-terminal-green rounded font-mono"
                min="0"
                max="20"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-mono text-terminal-green">
                <input
                  type="checkbox"
                  checked={skillFormData.certified || false}
                  onChange={(e) => setSkillFormData(prev => ({ ...prev, certified: e.target.checked }))}
                  className="rounded"
                />
                Certified
              </label>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-mono text-terminal-green mb-2">
                Description
              </label>
              <textarea
                value={skillFormData.description || ''}
                onChange={(e) => setSkillFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full p-2 bg-black border border-terminal-green text-terminal-green rounded font-mono"
                placeholder="Brief description of your expertise with this skill"
              />
            </div>

            {skillFormData.certified && (
              <div className="md:col-span-2">
                <label className="block text-sm font-mono text-terminal-green mb-2">
                  Certification URL
                </label>
                <input
                  type="url"
                  value={skillFormData.certificationUrl || ''}
                  onChange={(e) => setSkillFormData(prev => ({ ...prev, certificationUrl: e.target.value }))}
                  className="w-full p-2 bg-black border border-terminal-green text-terminal-green rounded font-mono"
                  placeholder="https://certification-url.com"
                />
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-6">
            <TerminalButton onClick={saveSkill} className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Skill
            </TerminalButton>
            <TerminalButton variant="secondary" onClick={() => setShowSkillForm(false)}>
              Cancel
            </TerminalButton>
          </div>
        </TerminalCard>
      )}

      {/* Skills Categories */}
      <div className="grid gap-6">
        {skillCategories.map((category) => {
          const IconComponent = categoryIcons[category.id as keyof typeof categoryIcons] || Code;
          return (
            <TerminalCard key={category.id} className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <IconComponent className="w-6 h-6 text-terminal-green" />
                  <h2 className="text-xl font-mono text-terminal-green">{category.name}</h2>
                  <span className="text-terminal-green/60 text-sm font-mono">
                    ({category.skills.length} skills)
                  </span>
                </div>
                <div className="flex gap-2">
                  <TerminalButton
                    size="sm"
                    onClick={() => addSkill(category.id)}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Skill
                  </TerminalButton>
                  <TerminalButton
                    size="sm"
                    onClick={() => editCategory(category)}
                    className="flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </TerminalButton>
                  <TerminalButton
                    size="sm"
                    variant="secondary"
                    onClick={() => deleteCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </TerminalButton>
                </div>
              </div>

              <div className="grid gap-3">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex justify-between items-center p-3 bg-black/50 rounded border border-terminal-green/30"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-mono text-terminal-green">{skill.name}</h3>
                        <div className="flex items-center gap-2">
                          <div className={`text-sm font-mono ${getLevelColor(skill.level)}`}>
                            Level {skill.level}
                          </div>
                          <span className="text-terminal-green/60 text-sm font-mono">
                            {getLevelText(skill.level)}
                          </span>
                          <span className="text-terminal-green/60 text-sm font-mono">
                            {skill.years} year{skill.years !== 1 ? 's' : ''}
                          </span>
                          {skill.certified && (
                            <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-mono">
                              Certified
                            </span>
                          )}
                        </div>
                      </div>
                      {skill.description && (
                        <p className="text-terminal-green/80 text-sm">
                          {skill.description}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <TerminalButton
                        size="sm"
                        onClick={() => editSkill(skill, category.id)}
                        className="flex items-center gap-2"
                      >
                        <Edit className="w-3 h-3" />
                        Edit
                      </TerminalButton>
                      <TerminalButton
                        size="sm"
                        variant="secondary"
                        onClick={() => deleteSkill(category.id, skill.name)}
                        className="flex items-center gap-2"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </TerminalButton>
                    </div>
                  </div>
                ))}

                {category.skills.length === 0 && (
                  <div className="text-center py-8 text-terminal-green/60">
                    <p className="font-mono mb-2">No skills in this category yet.</p>
                    <TerminalButton size="sm" onClick={() => addSkill(category.id)}>
                      Add First Skill
                    </TerminalButton>
                  </div>
                )}
              </div>
            </TerminalCard>
          );
        })}
      </div>

      {skillCategories.length === 0 && (
        <TerminalCard className="p-8 text-center">
          <p className="text-terminal-green/70 font-mono mb-4">
            No skill categories added yet. Click "Add Category" to get started.
          </p>
        </TerminalCard>
      )}
    </div>
  );
}
