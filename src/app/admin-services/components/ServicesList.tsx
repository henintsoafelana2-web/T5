'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Plus, Search, Pencil, Trash2, Eye, EyeOff, MoreVertical,
  Code2, Palette, Smartphone, ShoppingCart, BarChart3, Shield,
  Globe, Zap, Database, Cloud, Lock, Settings, Star, Layers,
  Monitor, Server, Wifi, Camera, Video, Mail, ArrowUpDown,
  CheckCircle2, Clock, Filter,
} from 'lucide-react';
import { AdminService, getServices, deleteService, toggleServiceStatus } from '../data/servicesStore';

const ICON_MAP: Record<string, React.ElementType> = {
  Code2, Palette, Smartphone, ShoppingCart, BarChart3, Shield,
  Globe, Zap, Database, Cloud, Lock, Settings, Star, Layers,
  Monitor, Server, Wifi, Camera, Video, Mail,
};

export default function ServicesList() {
  const [services, setServices] = useState<AdminService[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [sortField, setSortField] = useState<'order' | 'title' | 'updatedAt'>('order');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    setServices(getServices());
  }, []);

  const handleToggleStatus = (id: string) => {
    toggleServiceStatus(id);
    setServices(getServices());
    setOpenMenuId(null);
  };

  const handleDelete = (id: string) => {
    deleteService(id);
    setServices(getServices());
    setDeleteConfirmId(null);
    setOpenMenuId(null);
  };

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  const filtered = services
    .filter((s) => {
      const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.shortDescription.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || s.status === statusFilter;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      let valA: string | number = a[sortField];
      let valB: string | number = b[sortField];
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      if (valA < valB) return sortDir === 'asc' ? -1 : 1;
      if (valA > valB) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

  const publishedCount = services.filter((s) => s.status === 'published').length;
  const draftCount = services.filter((s) => s.status === 'draft').length;

  return (
    <div className="px-6 lg:px-8 xl:px-10 max-w-screen-2xl mx-auto">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gestion des Services</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {services.length} service{services.length !== 1 ? 's' : ''} au total —{' '}
            <span className="text-success font-medium">{publishedCount} publié{publishedCount !== 1 ? 's' : ''}</span>
            {' · '}
            <span className="text-warning font-medium">{draftCount} brouillon{draftCount !== 1 ? 's' : ''}</span>
          </p>
        </div>
        <Link
          href="/admin-services/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors duration-150 shadow-sm"
        >
          <Plus size={16} />
          Nouveau Service
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total', value: services.length, icon: Layers, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Publiés', value: publishedCount, icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10' },
          { label: 'Brouillons', value: draftCount, icon: Clock, color: 'text-warning', bg: 'bg-warning/10' },
          { label: 'Technologies', value: [...new Set(services.flatMap((s) => s.technologies))].length, icon: Code2, color: 'text-accent', bg: 'bg-accent/10' },
        ].map((stat) => (
          <div key={stat.label} className="glass-card rounded-xl p-4 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center shrink-0`}>
              <stat.icon size={18} className={stat.color} />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="glass-card rounded-xl p-4 mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher un service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-muted/40 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={15} className="text-muted-foreground shrink-0" />
          {(['all', 'published', 'draft'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 ${
                statusFilter === f
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted/70'
              }`}
            >
              {f === 'all' ? 'Tous' : f === 'published' ? 'Publiés' : 'Brouillons'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/20">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <button onClick={() => handleSort('order')} className="flex items-center gap-1 hover:text-foreground transition-colors">
                    # <ArrowUpDown size={12} />
                  </button>
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <button onClick={() => handleSort('title')} className="flex items-center gap-1 hover:text-foreground transition-colors">
                    Service <ArrowUpDown size={12} />
                  </button>
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Technologies</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Prix</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Délai</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Statut</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden xl:table-cell">
                  <button onClick={() => handleSort('updatedAt')} className="flex items-center gap-1 hover:text-foreground transition-colors">
                    Modifié <ArrowUpDown size={12} />
                  </button>
                </th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-16 text-muted-foreground">
                    <Layers size={32} className="mx-auto mb-3 opacity-30" />
                    <p className="font-medium">Aucun service trouvé</p>
                    <p className="text-xs mt-1">Modifiez vos filtres ou créez un nouveau service.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((service) => {
                  const IconComp = ICON_MAP[service.icon] ?? Layers;
                  return (
                    <tr key={service.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors duration-100">
                      <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{service.order}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {service.image ? (
                            <img
                              src={service.image}
                              alt={service.title}
                              className="w-10 h-10 rounded-lg object-cover shrink-0 border border-border"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                              <IconComp size={18} className="text-primary" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-semibold text-foreground truncate max-w-[180px]">{service.title}</p>
                            <p className="text-xs text-muted-foreground truncate max-w-[180px]">{service.seo.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {service.technologies.slice(0, 3).map((tech) => (
                            <span key={tech} className="px-2 py-0.5 text-xs bg-muted/60 text-muted-foreground rounded-md">
                              {tech}
                            </span>
                          ))}
                          {service.technologies.length > 3 && (
                            <span className="px-2 py-0.5 text-xs bg-muted/60 text-muted-foreground rounded-md">
                              +{service.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span className="text-xs font-medium text-accent">{service.price}</span>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span className="text-xs text-muted-foreground">{service.timeline}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          service.status === 'published' ?'bg-success/15 text-success' :'bg-warning/15 text-warning'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${service.status === 'published' ? 'bg-success' : 'bg-warning'}`} />
                          {service.status === 'published' ? 'Publié' : 'Brouillon'}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden xl:table-cell text-xs text-muted-foreground">
                        {new Date(service.updatedAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/admin-services/${service.id}/edit`}
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-150"
                            title="Modifier"
                          >
                            <Pencil size={15} />
                          </Link>
                          <button
                            onClick={() => handleToggleStatus(service.id)}
                            className={`p-1.5 rounded-lg transition-all duration-150 ${
                              service.status === 'published' ?'text-muted-foreground hover:text-warning hover:bg-warning/10' :'text-muted-foreground hover:text-success hover:bg-success/10'
                            }`}
                            title={service.status === 'published' ? 'Dépublier' : 'Publier'}
                          >
                            {service.status === 'published' ? <EyeOff size={15} /> : <Eye size={15} />}
                          </button>
                          <div className="relative">
                            <button
                              onClick={() => setOpenMenuId(openMenuId === service.id ? null : service.id)}
                              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-150"
                            >
                              <MoreVertical size={15} />
                            </button>
                            {openMenuId === service.id && (
                              <div className="absolute right-0 top-8 z-20 w-40 bg-card border border-border rounded-xl shadow-xl py-1">
                                <Link
                                  href={`/admin-services/${service.id}/edit`}
                                  className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors"
                                  onClick={() => setOpenMenuId(null)}
                                >
                                  <Pencil size={14} /> Modifier
                                </Link>
                                <button
                                  onClick={() => handleToggleStatus(service.id)}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors"
                                >
                                  {service.status === 'published' ? <EyeOff size={14} /> : <Eye size={14} />}
                                  {service.status === 'published' ? 'Dépublier' : 'Publier'}
                                </button>
                                <hr className="border-border my-1" />
                                <button
                                  onClick={() => { setDeleteConfirmId(service.id); setOpenMenuId(null); }}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-danger hover:bg-danger/10 transition-colors"
                                >
                                  <Trash2 size={14} /> Supprimer
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirm modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-danger/10 flex items-center justify-center mb-4">
              <Trash2 size={22} className="text-danger" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Supprimer ce service ?</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Cette action est irréversible. Le service sera définitivement supprimé.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-danger text-white text-sm font-semibold hover:bg-danger/90 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Close dropdown on outside click */}
      {openMenuId && (
        <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
      )}
    </div>
  );
}
