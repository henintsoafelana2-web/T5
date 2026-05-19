import React from 'react';
import { Plus, FileText, FolderOpen, Briefcase } from 'lucide-react';
import Link from 'next/link';

const actions = [
  { key: 'qa-service', icon: Briefcase, label: 'Nouveau Service', href: '/admin-dashboard' },
  { key: 'qa-portfolio', icon: FolderOpen, label: 'Ajouter Projet', href: '/admin-dashboard' },
  { key: 'qa-blog', icon: FileText, label: 'Écrire Article', href: '/admin-dashboard' },
];

export default function QuickActions() {
  return (
    <div className="flex items-center gap-2">
      {actions?.map((action) => (
        <Link
          key={action?.key}
          href={action?.href}
          className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground glass-card rounded-xl hover:border-primary/40 active:scale-95 transition-all duration-150"
        >
          <action.icon size={14} />
          <span className="hidden md:inline">{action?.label}</span>
        </Link>
      ))}
      <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white gradient-bg-primary rounded-xl hover:opacity-90 active:scale-95 transition-all duration-150 shadow-lg shadow-primary/25">
        <Plus size={16} /> Nouveau
      </button>
    </div>
  );
}