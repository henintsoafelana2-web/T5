'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from '../admin-dashboard/components/AdminLayout';
import { Plus, Search, Pencil, Trash2, Star, StarOff, Eye, EyeOff, Download, Upload, RefreshCw, AlertTriangle, CheckCircle2, Clock, Filter, X, Save, ChevronDown, Globe, GitBranch, Image as ImageIcon, ToggleLeft, ToggleRight, Loader2, FolderOpen } from 'lucide-react';
import { portfolioService, PortfolioProject, ProjectCategory, ProjectStatus } from '@/lib/services/portfolioService';

const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  web: 'Développement Web',
  mobile: 'Mobile',
  ai: 'Intelligence Artificielle',
  data: 'Data Engineering',
  design: 'Design Graphique',
  video: 'Vidéo & Motion',
  cctv: 'CCTV & Surveillance',
  solar: 'Panneaux Solaires',
  photography: 'Photographie',
  events: 'Mariage & Événements',
};

const CATEGORY_COLORS: Record<ProjectCategory, string> = {
  web: 'bg-blue-500/15 text-blue-400',
  mobile: 'bg-purple-500/15 text-purple-400',
  ai: 'bg-orange-500/15 text-orange-400',
  data: 'bg-cyan-500/15 text-cyan-400',
  design: 'bg-pink-500/15 text-pink-400',
  video: 'bg-red-500/15 text-red-400',
  cctv: 'bg-gray-500/15 text-gray-400',
  solar: 'bg-yellow-500/15 text-yellow-400',
  photography: 'bg-emerald-500/15 text-emerald-400',
  events: 'bg-rose-500/15 text-rose-400',
};

const CATEGORIES = Object.keys(CATEGORY_LABELS) as ProjectCategory[];

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: string) => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-start gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium transition-all duration-300 ${
            t.type === 'success' ? 'bg-success/10 border-success/30 text-success' :
            t.type === 'error' ? 'bg-danger/10 border-danger/30 text-danger' :
            t.type === 'warning'? 'bg-warning/10 border-warning/30 text-warning' : 'bg-primary/10 border-primary/30 text-primary'
          }`}
        >
          {t.type === 'success' && <CheckCircle2 size={16} className="shrink-0 mt-0.5" />}
          {t.type === 'error' && <AlertTriangle size={16} className="shrink-0 mt-0.5" />}
          {t.type === 'warning' && <AlertTriangle size={16} className="shrink-0 mt-0.5" />}
          {t.type === 'info' && <RefreshCw size={16} className="shrink-0 mt-0.5" />}
          <span className="flex-1">{t.message}</span>
          <button onClick={() => onRemove(t.id)} className="shrink-0 opacity-60 hover:opacity-100">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

const EMPTY_PROJECT: Omit<PortfolioProject, 'id' | 'createdAt' | 'updatedAt' | 'backupTimestamp' | 'version'> = {
  title: '',
  category: 'web',
  description: '',
  images: [],
  technologies: [],
  demoUrl: '',
  githubUrl: '',
  featured: false,
  publishStatus: 'draft',
  sortOrder: 0,
};

interface ProjectFormProps {
  initial?: PortfolioProject | null;
  onSave: (data: any) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}

function ProjectForm({ initial, onSave, onCancel, saving }: ProjectFormProps) {
  const [form, setForm] = useState<typeof EMPTY_PROJECT>(
    initial
      ? {
          title: initial.title,
          category: initial.category,
          description: initial.description,
          images: initial.images,
          technologies: initial.technologies,
          demoUrl: initial.demoUrl,
          githubUrl: initial.githubUrl,
          featured: initial.featured,
          publishStatus: initial.publishStatus,
          sortOrder: initial.sortOrder,
        }
      : { ...EMPTY_PROJECT }
  );
  const [techInput, setTechInput] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [imageAltInput, setImageAltInput] = useState('');

  const set = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }));

  const addTech = () => {
    const t = techInput.trim();
    if (t && !form.technologies.includes(t)) {
      set('technologies', [...form.technologies, t]);
    }
    setTechInput('');
  };

  const removeTech = (tech: string) => set('technologies', form.technologies.filter((t) => t !== tech));

  const addImage = () => {
    const url = imageUrlInput.trim();
    const alt = imageAltInput.trim();
    if (url) {
      set('images', [...form.images, { url, alt: alt || url }]);
      setImageUrlInput('');
      setImageAltInput('');
    }
  };

  const removeImage = (idx: number) => set('images', form.images.filter((_, i) => i !== idx));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...form, version: initial?.version });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-sm overflow-y-auto py-8 px-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-2xl shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">
            {initial ? 'Modifier le Projet' : 'Nouveau Projet'}
          </h2>
          <button onClick={onCancel} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
              Titre *
            </label>
            <input
              required
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="Nom du projet"
              className="w-full px-3 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
            />
          </div>

          {/* Category + Status row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                Catégorie
              </label>
              <div className="relative">
                <select
                  value={form.category}
                  onChange={(e) => set('category', e.target.value as ProjectCategory)}
                  className="w-full px-3 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 appearance-none pr-8"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                Statut
              </label>
              <div className="relative">
                <select
                  value={form.publishStatus}
                  onChange={(e) => set('publishStatus', e.target.value as ProjectStatus)}
                  className="w-full px-3 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 appearance-none pr-8"
                >
                  <option value="published">Publié</option>
                  <option value="draft">Brouillon</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Description du projet..."
              className="w-full px-3 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 resize-none"
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
              Images
            </label>
            <div className="flex gap-2 mb-2">
              <input
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                placeholder="URL de l'image"
                className="flex-1 px-3 py-2 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:border-primary/50"
              />
              <input
                value={imageAltInput}
                onChange={(e) => setImageAltInput(e.target.value)}
                placeholder="Texte alternatif"
                className="flex-1 px-3 py-2 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:border-primary/50"
              />
              <button
                type="button"
                onClick={addImage}
                className="px-3 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 text-sm font-medium"
              >
                <Plus size={16} />
              </button>
            </div>
            {form.images.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {form.images.map((img, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-muted/50 border border-border text-xs text-foreground">
                    <ImageIcon size={12} className="text-muted-foreground" />
                    <span className="max-w-[120px] truncate">{img.alt || img.url}</span>
                    <button type="button" onClick={() => removeImage(i)} className="text-muted-foreground hover:text-danger">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
              Technologies
            </label>
            <div className="flex gap-2 mb-2">
              <input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTech(); } }}
                placeholder="Ex: React, Node.js..."
                className="flex-1 px-3 py-2 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:border-primary/50"
              />
              <button
                type="button"
                onClick={addTech}
                className="px-3 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 text-sm font-medium"
              >
                <Plus size={16} />
              </button>
            </div>
            {form.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {form.technologies.map((tech) => (
                  <span key={tech} className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {tech}
                    <button type="button" onClick={() => removeTech(tech)} className="hover:text-danger">
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                Lien Demo
              </label>
              <div className="relative">
                <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="url"
                  value={form.demoUrl}
                  onChange={(e) => set('demoUrl', e.target.value)}
                  placeholder="https://..."
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:border-primary/50"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                Lien GitHub
              </label>
              <div className="relative">
                <GitBranch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="url"
                  value={form.githubUrl}
                  onChange={(e) => set('githubUrl', e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:border-primary/50"
                />
              </div>
            </div>
          </div>

          {/* Sort order + Featured */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                Ordre d&apos;affichage
              </label>
              <input
                type="number"
                min={0}
                value={form.sortOrder}
                onChange={(e) => set('sortOrder', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:border-primary/50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                Mis en avant
              </label>
              <button
                type="button"
                onClick={() => set('featured', !form.featured)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                  form.featured
                    ? 'bg-warning/15 border-warning/30 text-warning' :'bg-background border-border text-muted-foreground hover:border-warning/30'
                }`}
              >
                {form.featured ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                {form.featured ? 'Oui' : 'Non'}
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-border">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2.5 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 text-sm font-medium transition-all"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 disabled:opacity-60 transition-all"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {saving ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminPortfolioPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ProjectCategory | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState<PortfolioProject | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [lastBackup, setLastBackup] = useState<string | null>(null);
  const [conflictProject, setConflictProject] = useState<{ local: any; remote: PortfolioProject } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addToast = useCallback((type: Toast['type'], message: string) => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    try {
      const data = await portfolioService.getAll();
      setProjects(data);
      setLastBackup(new Date().toISOString());
    } catch (err: any) {
      addToast('error', `Erreur de chargement: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/sign-up-login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) loadProjects();
  }, [user, loadProjects]);

  const handleSave = async (formData: any) => {
    setSaving(true);
    try {
      if (editProject) {
        await portfolioService.update(editProject.id, { ...formData, version: editProject.version });
        addToast('success', 'Projet mis à jour avec succès');
      } else {
        await portfolioService.create(formData);
        addToast('success', 'Projet créé avec succès');
      }
      setShowForm(false);
      setEditProject(null);
      await loadProjects();
    } catch (err: any) {
      if (err.message?.startsWith('CONFLICT:')) {
        const remoteVersion = parseInt(err.message.split(':')[1]);
        const remote = await portfolioService.getById(editProject!.id);
        if (remote) {
          setConflictProject({ local: formData, remote });
          addToast('warning', `Conflit détecté — version distante: v${remoteVersion}`);
        }
      } else {
        addToast('error', `Erreur: ${err.message}`);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleConflictResolve = async (useLocal: boolean) => {
    if (!conflictProject || !editProject) return;
    setSaving(true);
    try {
      const remote = conflictProject.remote;
      const payload = useLocal
        ? { ...conflictProject.local, version: remote.version }
        : { ...conflictProject.local };
      await portfolioService.update(editProject.id, payload);
      addToast('success', useLocal ? 'Version locale appliquée' : 'Version distante conservée');
      setConflictProject(null);
      setShowForm(false);
      setEditProject(null);
      await loadProjects();
    } catch (err: any) {
      addToast('error', `Erreur de résolution: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await portfolioService.delete(id);
      addToast('success', 'Projet supprimé');
      setDeleteConfirmId(null);
      await loadProjects();
    } catch (err: any) {
      addToast('error', `Erreur: ${err.message}`);
    }
  };

  const handleToggleFeatured = async (project: PortfolioProject) => {
    try {
      await portfolioService.update(project.id, { featured: !project.featured, version: project.version });
      await loadProjects();
    } catch (err: any) {
      addToast('error', `Erreur: ${err.message}`);
    }
  };

  const handleToggleStatus = async (project: PortfolioProject) => {
    try {
      await portfolioService.update(project.id, {
        publishStatus: project.publishStatus === 'published' ? 'draft' : 'published',
        version: project.version,
      });
      await loadProjects();
    } catch (err: any) {
      addToast('error', `Erreur: ${err.message}`);
    }
  };

  const handleExport = () => {
    const exportData = {
      exportedAt: new Date().toISOString(),
      version: '1.0',
      count: projects.length,
      projects: projects.map((p) => ({
        title: p.title,
        category: p.category,
        description: p.description,
        images: p.images,
        technologies: p.technologies,
        demoUrl: p.demoUrl,
        githubUrl: p.githubUrl,
        featured: p.featured,
        publishStatus: p.publishStatus,
        sortOrder: p.sortOrder,
      })),
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `t5-portfolio-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('success', `${projects.length} projets exportés`);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const importProjects = parsed.projects ?? parsed;
      if (!Array.isArray(importProjects)) throw new Error('Format invalide');
      const count = await portfolioService.bulkImport(importProjects);
      addToast('success', `${count} projets importés avec succès`);
      await loadProjects();
    } catch (err: any) {
      addToast('error', `Erreur d'import: ${err.message}`);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const filtered = projects.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchCat = categoryFilter === 'all' || p.category === categoryFilter;
    const matchStatus = statusFilter === 'all' || p.publishStatus === statusFilter;
    return matchSearch && matchCat && matchStatus;
  });

  const publishedCount = projects.filter((p) => p.publishStatus === 'published').length;
  const featuredCount = projects.filter((p) => p.featured).length;

  if (authLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 size={32} className="animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  if (!user) return null;

  return (
    <AdminLayout>
      <div className="px-6 lg:px-8 xl:px-10 max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Gestion du Portfolio</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {projects.length} projet{projects.length !== 1 ? 's' : ''} —{' '}
              <span className="text-success font-medium">{publishedCount} publié{publishedCount !== 1 ? 's' : ''}</span>
              {' · '}
              <span className="text-warning font-medium">{featuredCount} mis en avant</span>
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {lastBackup && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/50 border border-border text-xs text-muted-foreground">
                <Clock size={12} />
                <span>Sauvegarde: {new Date(lastBackup).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            )}
            <button
              onClick={loadProjects}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 text-sm transition-all"
            >
              <RefreshCw size={14} />
              <span className="hidden sm:inline">Actualiser</span>
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 text-sm transition-all"
            >
              <Download size={14} />
              <span className="hidden sm:inline">Exporter</span>
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 text-sm transition-all"
            >
              <Upload size={14} />
              <span className="hidden sm:inline">Importer</span>
            </button>
            <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
            <button
              onClick={() => { setEditProject(null); setShowForm(true); }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all"
            >
              <Plus size={16} />
              Nouveau Projet
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un projet, technologie..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
            />
          </div>
          <div className="relative">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as any)}
              className="pl-8 pr-8 py-2.5 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 appearance-none"
            >
              <option value="all">Toutes catégories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
              ))}
            </select>
            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-2.5 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 appearance-none pr-8"
            >
              <option value="all">Tous statuts</option>
              <option value="published">Publié</option>
              <option value="draft">Brouillon</option>
            </select>
            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={28} className="animate-spin text-primary" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <FolderOpen size={40} className="mb-3 opacity-40" />
              <p className="text-sm font-medium">Aucun projet trouvé</p>
              <p className="text-xs mt-1 opacity-60">Modifiez vos filtres ou créez un nouveau projet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Projet</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell">Catégorie</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden lg:table-cell">Technologies</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Statut</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Vedette</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden xl:table-cell">Sauvegarde</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((project) => (
                    <tr key={project.id} className="hover:bg-muted/20 transition-colors group">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          {project.images?.[0] ? (
                            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-muted">
                              <img
                                src={project.images[0].url}
                                alt={project.images[0].alt}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-muted/50 border border-border flex items-center justify-center shrink-0">
                              <ImageIcon size={16} className="text-muted-foreground" />
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-foreground truncate max-w-[180px]">{project.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">v{project.version}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 hidden md:table-cell">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${CATEGORY_COLORS[project.category]}`}>
                          {CATEGORY_LABELS[project.category]}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {project.technologies.slice(0, 3).map((t) => (
                            <span key={t} className="px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground text-xs">{t}</span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground text-xs">+{project.technologies.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <button
                          onClick={() => handleToggleStatus(project)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                            project.publishStatus === 'published' ?'bg-success/15 text-success hover:bg-success/25' :'bg-warning/15 text-warning hover:bg-warning/25'
                          }`}
                        >
                          {project.publishStatus === 'published' ? <Eye size={11} /> : <EyeOff size={11} />}
                          {project.publishStatus === 'published' ? 'Publié' : 'Brouillon'}
                        </button>
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <button
                          onClick={() => handleToggleFeatured(project)}
                          className={`p-1.5 rounded-lg transition-all ${
                            project.featured
                              ? 'text-warning bg-warning/10 hover:bg-warning/20' :'text-muted-foreground hover:text-warning hover:bg-warning/10'
                          }`}
                          title={project.featured ? 'Retirer de la vedette' : 'Mettre en vedette'}
                        >
                          {project.featured ? <Star size={15} fill="currentColor" /> : <StarOff size={15} />}
                        </button>
                      </td>
                      <td className="px-4 py-3.5 hidden xl:table-cell">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock size={11} />
                          <span>{new Date(project.backupTimestamp).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center justify-end gap-1">
                          {project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                              title="Voir le demo"
                            >
                              <Globe size={14} />
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                              title="Voir GitHub"
                            >
                              <GitBranch size={14} />
                            </a>
                          )}
                          <button
                            onClick={() => { setEditProject(project); setShowForm(true); }}
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                            title="Modifier"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(project.id)}
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-danger hover:bg-danger/10 transition-all"
                            title="Supprimer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Results count */}
        {!loading && filtered.length > 0 && (
          <p className="text-xs text-muted-foreground mt-3 text-right">
            {filtered.length} projet{filtered.length !== 1 ? 's' : ''} affiché{filtered.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Project Form Modal */}
      {showForm && (
        <ProjectForm
          initial={editProject}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditProject(null); }}
          saving={saving}
        />
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4">
          <div className="bg-card border border-border rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-danger/10 flex items-center justify-center">
                <AlertTriangle size={20} className="text-danger" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Supprimer le projet</h3>
                <p className="text-xs text-muted-foreground">Cette action est irréversible</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 text-sm font-medium transition-all"
              >
                Annuler
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-danger text-white text-sm font-semibold hover:bg-danger/90 transition-all"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Conflict Resolution Modal */}
      {conflictProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4">
          <div className="bg-card border border-border rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
                <AlertTriangle size={20} className="text-warning" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Conflit de version détecté</h3>
                <p className="text-xs text-muted-foreground">Ce projet a été modifié depuis une autre session</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
              <div className="p-3 rounded-xl bg-muted/30 border border-border">
                <p className="font-semibold text-foreground mb-1">Votre version</p>
                <p className="text-muted-foreground">Modifications locales non sauvegardées</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/30 border border-border">
                <p className="font-semibold text-foreground mb-1">Version distante</p>
                <p className="text-muted-foreground">v{conflictProject.remote.version} — {new Date(conflictProject.remote.updatedAt).toLocaleString('fr-FR')}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleConflictResolve(false)}
                disabled={saving}
                className="flex-1 px-4 py-2.5 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 text-sm font-medium transition-all"
              >
                Garder distante
              </button>
              <button
                onClick={() => handleConflictResolve(true)}
                disabled={saving}
                className="flex-1 px-4 py-2.5 rounded-xl bg-warning text-white text-sm font-semibold hover:bg-warning/90 transition-all"
              >
                {saving ? <Loader2 size={14} className="animate-spin mx-auto" /> : 'Appliquer locale'}
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </AdminLayout>
  );
}
