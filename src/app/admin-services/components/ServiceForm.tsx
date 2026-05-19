'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Plus, X, Image as ImageIcon, Code2, Palette, Smartphone, ShoppingCart, BarChart3, Shield, Globe, Zap, Database, Cloud, Lock, Settings, Star, Layers, Monitor, Server, Wifi, Camera, Video, Mail, AlertCircle, CheckCircle2,  } from 'lucide-react';
import Link from 'next/link';
import { ServiceStatus, ICON_OPTIONS, createService, updateService, getServiceById,  } from '../data/servicesStore';

const ICON_MAP: Record<string, React.ElementType> = {
  Code2, Palette, Smartphone, ShoppingCart, BarChart3, Shield,
  Globe, Zap, Database, Cloud, Lock, Settings, Star, Layers,
  Monitor, Server, Wifi, Camera, Video, Mail,
};

interface Props {
  serviceId?: string;
}

const emptyForm = {
  icon: 'Code2',
  image: '',
  title: '',
  shortDescription: '',
  fullDescription: '',
  features: [''],
  technologies: [''],
  price: '',
  timeline: '',
  status: 'draft' as ServiceStatus,
  order: 1,
  seo: { metaTitle: '', metaDescription: '', slug: '' },
};

type FormState = typeof emptyForm;

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export default function ServiceForm({ serviceId }: Props) {
  const router = useRouter();
  const isEdit = Boolean(serviceId);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'details' | 'seo'>('general');

  useEffect(() => {
    if (serviceId) {
      const svc = getServiceById(serviceId);
      if (svc) {
        setForm({
          icon: svc.icon,
          image: svc.image,
          title: svc.title,
          shortDescription: svc.shortDescription,
          fullDescription: svc.fullDescription,
          features: svc.features.length > 0 ? svc.features : [''],
          technologies: svc.technologies.length > 0 ? svc.technologies : [''],
          price: svc.price,
          timeline: svc.timeline,
          status: svc.status,
          order: svc.order,
          seo: { ...svc.seo },
        });
      }
    }
  }, [serviceId]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === 'title' && !isEdit) {
        next.seo = { ...next.seo, slug: slugify(value as string) };
      }
      return next;
    });
    if (errors[key]) setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
  };

  const setSeo = (key: keyof FormState['seo'], value: string) => {
    setForm((prev) => ({ ...prev, seo: { ...prev.seo, [key]: value } }));
  };

  const setListItem = (field: 'features' | 'technologies', idx: number, value: string) => {
    const arr = [...form[field]];
    arr[idx] = value;
    set(field, arr);
  };

  const addListItem = (field: 'features' | 'technologies') => {
    set(field, [...form[field], '']);
  };

  const removeListItem = (field: 'features' | 'technologies', idx: number) => {
    const arr = form[field].filter((_, i) => i !== idx);
    set(field, arr.length > 0 ? arr : ['']);
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = 'Le titre est requis.';
    if (!form.shortDescription.trim()) errs.shortDescription = 'La description courte est requise.';
    if (!form.price.trim()) errs.price = 'Le prix est requis.';
    if (!form.seo.slug.trim()) errs.slug = 'Le slug SEO est requis.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async (status?: ServiceStatus) => {
    if (!validate()) {
      setActiveTab('general');
      return;
    }
    setSaving(true);
    const payload = {
      ...form,
      status: status ?? form.status,
      features: form.features.filter((f) => f.trim()),
      technologies: form.technologies.filter((t) => t.trim()),
    };
    if (isEdit && serviceId) {
      updateService(serviceId, payload);
    } else {
      createService(payload);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => {
      router.push('/admin-services');
    }, 800);
  };

  const SelectedIcon = ICON_MAP[form.icon] ?? Layers;

  const tabs = [
    { key: 'general', label: 'Général' },
    { key: 'details', label: 'Détails & Tarif' },
    { key: 'seo', label: 'SEO' },
  ] as const;

  return (
    <div className="px-6 lg:px-8 xl:px-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin-services"
          className="p-2 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-150"
        >
          <ArrowLeft size={18} />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">
            {isEdit ? 'Modifier le Service' : 'Nouveau Service'}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {isEdit ? 'Mettez à jour les informations du service.' : 'Remplissez les informations pour créer un nouveau service.'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSave('draft')}
            disabled={saving || saved}
            className="px-4 py-2.5 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-muted/50 transition-all duration-150 disabled:opacity-50"
          >
            Brouillon
          </button>
          <button
            onClick={() => handleSave('published')}
            disabled={saving || saved}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all duration-150 disabled:opacity-50 shadow-sm"
          >
            {saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
            {saving ? 'Enregistrement...' : saved ? 'Enregistré !' : 'Publier'}
          </button>
        </div>
      </div>

      {/* Status toggle */}
      <div className="glass-card rounded-xl p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 rounded-full ${form.status === 'published' ? 'bg-success' : 'bg-warning'}`} />
          <span className="text-sm font-medium text-foreground">
            Statut : <span className={form.status === 'published' ? 'text-success' : 'text-warning'}>
              {form.status === 'published' ? 'Publié' : 'Brouillon'}
            </span>
          </span>
        </div>
        <button
          onClick={() => set('status', form.status === 'published' ? 'draft' : 'published')}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
            form.status === 'published' ? 'bg-success' : 'bg-muted'
          }`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
            form.status === 'published' ? 'translate-x-6' : 'translate-x-1'
          }`} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-muted/30 p-1 rounded-xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-150 ${
              activeTab === tab.key
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── GENERAL TAB ── */}
      {activeTab === 'general' && (
        <div className="space-y-6">
          {/* Icon & Image row */}
          <div className="glass-card rounded-xl p-6">
            <h2 className="text-sm font-semibold text-foreground mb-4">Icône & Image</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Icon picker */}
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Icône du service
                </label>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <SelectedIcon size={24} className="text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground font-mono">{form.icon}</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {ICON_OPTIONS.map((iconName) => {
                    const Ic = ICON_MAP[iconName] ?? Layers;
                    return (
                      <button
                        key={iconName}
                        onClick={() => set('icon', iconName)}
                        title={iconName}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-150 ${
                          form.icon === iconName
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted/40 text-muted-foreground hover:bg-muted/70 hover:text-foreground'
                        }`}
                      >
                        <Ic size={18} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Image de couverture
                </label>
                {form.image ? (
                  <div className="relative mb-3">
                    <img
                      src={form.image}
                      alt="Aperçu"
                      className="w-full h-32 object-cover rounded-xl border border-border"
                    />
                    <button
                      onClick={() => set('image', '')}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-danger text-white flex items-center justify-center hover:bg-danger/90 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ) : (
                  <div className="w-full h-32 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center mb-3 bg-muted/20">
                    <ImageIcon size={24} className="text-muted-foreground mb-1" />
                    <p className="text-xs text-muted-foreground">Entrez une URL d'image</p>
                  </div>
                )}
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={form.image}
                  onChange={(e) => set('image', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-muted/40 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Basic info */}
          <div className="glass-card rounded-xl p-6 space-y-4">
            <h2 className="text-sm font-semibold text-foreground mb-2">Informations de base</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                  Titre <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: Développement Web"
                  value={form.title}
                  onChange={(e) => set('title', e.target.value)}
                  className={`w-full px-3 py-2.5 text-sm bg-muted/40 border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all ${errors.title ? 'border-danger' : 'border-border focus:border-primary/50'}`}
                />
                {errors.title && <p className="text-xs text-danger mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.title}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                  Ordre d'affichage
                </label>
                <input
                  type="number"
                  min={1}
                  value={form.order}
                  onChange={(e) => set('order', parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2.5 text-sm bg-muted/40 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Description courte <span className="text-danger">*</span>
              </label>
              <textarea
                rows={2}
                placeholder="Résumé en 1-2 phrases affiché sur les cartes..."
                value={form.shortDescription}
                onChange={(e) => set('shortDescription', e.target.value)}
                className={`w-full px-3 py-2.5 text-sm bg-muted/40 border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none ${errors.shortDescription ? 'border-danger' : 'border-border focus:border-primary/50'}`}
              />
              {errors.shortDescription && <p className="text-xs text-danger mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.shortDescription}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Description complète
              </label>
              <textarea
                rows={6}
                placeholder="Description détaillée du service, bénéfices, approche, livrables..."
                value={form.fullDescription}
                onChange={(e) => set('fullDescription', e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-muted/40 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all resize-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* ── DETAILS TAB ── */}
      {activeTab === 'details' && (
        <div className="space-y-6">
          {/* Features */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground">Fonctionnalités incluses</h2>
              <button
                onClick={() => addListItem('features')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
              >
                <Plus size={13} /> Ajouter
              </button>
            </div>
            <div className="space-y-2">
              {form.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    placeholder={`Fonctionnalité ${idx + 1}`}
                    value={feat}
                    onChange={(e) => setListItem('features', idx, e.target.value)}
                    className="flex-1 px-3 py-2 text-sm bg-muted/40 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all"
                  />
                  <button
                    onClick={() => removeListItem('features', idx)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-danger hover:bg-danger/10 transition-all"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground">Technologies utilisées</h2>
              <button
                onClick={() => addListItem('technologies')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-accent bg-accent/10 rounded-lg hover:bg-accent/20 transition-colors"
              >
                <Plus size={13} /> Ajouter
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {form.technologies.filter((t) => t.trim()).map((tech) => (
                <span key={tech} className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
                  {tech}
                </span>
              ))}
            </div>
            <div className="space-y-2">
              {form.technologies.map((tech, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder={`Technologie ${idx + 1} (ex: React, Node.js)`}
                    value={tech}
                    onChange={(e) => setListItem('technologies', idx, e.target.value)}
                    className="flex-1 px-3 py-2 text-sm bg-muted/40 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all"
                  />
                  <button
                    onClick={() => removeListItem('technologies', idx)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-danger hover:bg-danger/10 transition-all"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing & Timeline */}
          <div className="glass-card rounded-xl p-6">
            <h2 className="text-sm font-semibold text-foreground mb-4">Tarification & Délai</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                  Prix indicatif <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: À partir de 500 000 Ar"
                  value={form.price}
                  onChange={(e) => set('price', e.target.value)}
                  className={`w-full px-3 py-2.5 text-sm bg-muted/40 border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all ${errors.price ? 'border-danger' : 'border-border focus:border-primary/50'}`}
                />
                {errors.price && <p className="text-xs text-danger mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.price}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                  Délai estimé
                </label>
                <input
                  type="text"
                  placeholder="Ex: 2 à 8 semaines"
                  value={form.timeline}
                  onChange={(e) => set('timeline', e.target.value)}
                  className="w-full px-3 py-2.5 text-sm bg-muted/40 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── SEO TAB ── */}
      {activeTab === 'seo' && (
        <div className="space-y-6">
          <div className="glass-card rounded-xl p-6 space-y-4">
            <h2 className="text-sm font-semibold text-foreground mb-2">Métadonnées SEO</h2>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Slug URL <span className="text-danger">*</span>
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground bg-muted/40 border border-border rounded-l-lg px-3 py-2.5 border-r-0 whitespace-nowrap">
                  /services/
                </span>
                <input
                  type="text"
                  placeholder="mon-service"
                  value={form.seo.slug}
                  onChange={(e) => setSeo('slug', slugify(e.target.value))}
                  className={`flex-1 px-3 py-2.5 text-sm bg-muted/40 border rounded-r-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-mono ${errors.slug ? 'border-danger' : 'border-border focus:border-primary/50'}`}
                />
              </div>
              {errors.slug && <p className="text-xs text-danger mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.slug}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Meta Title
              </label>
              <input
                type="text"
                placeholder="Titre affiché dans les résultats Google (50-60 caractères)"
                value={form.seo.metaTitle}
                onChange={(e) => setSeo('metaTitle', e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-muted/40 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all"
              />
              <p className={`text-xs mt-1 ${form.seo.metaTitle.length > 60 ? 'text-danger' : 'text-muted-foreground'}`}>
                {form.seo.metaTitle.length}/60 caractères
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Meta Description
              </label>
              <textarea
                rows={3}
                placeholder="Description affichée dans les résultats Google (150-160 caractères)"
                value={form.seo.metaDescription}
                onChange={(e) => setSeo('metaDescription', e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-muted/40 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all resize-none"
              />
              <p className={`text-xs mt-1 ${form.seo.metaDescription.length > 160 ? 'text-danger' : 'text-muted-foreground'}`}>
                {form.seo.metaDescription.length}/160 caractères
              </p>
            </div>

            {/* SERP Preview */}
            {(form.seo.metaTitle || form.title) && (
              <div className="mt-4 p-4 bg-muted/20 rounded-xl border border-border">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Aperçu Google</p>
                <div className="space-y-0.5">
                  <p className="text-xs text-muted-foreground">https://t5services.mg/services/{form.seo.slug || 'mon-service'}</p>
                  <p className="text-base font-medium text-blue-400 hover:underline cursor-pointer">
                    {form.seo.metaTitle || form.title || 'Titre du service'}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {form.seo.metaDescription || form.shortDescription || 'Description du service...'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom save bar */}
      <div className="mt-8 flex items-center justify-between py-4 border-t border-border">
        <Link
          href="/admin-services"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Retour à la liste
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSave('draft')}
            disabled={saving || saved}
            className="px-4 py-2.5 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-muted/50 transition-all duration-150 disabled:opacity-50"
          >
            Enregistrer brouillon
          </button>
          <button
            onClick={() => handleSave('published')}
            disabled={saving || saved}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all duration-150 disabled:opacity-50 shadow-sm"
          >
            {saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
            {saving ? 'Enregistrement...' : saved ? 'Enregistré !' : 'Publier le service'}
          </button>
        </div>
      </div>
    </div>
  );
}
