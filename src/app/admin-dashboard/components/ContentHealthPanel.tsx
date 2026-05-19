import React from 'react';
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';

const sections = [
  { key: 'ch-hero', label: 'Hero Section', status: 'published', lastEdit: 'Il y a 2 jours' },
  { key: 'ch-services', label: 'Services (6)', status: 'published', lastEdit: 'Il y a 5 jours' },
  { key: 'ch-portfolio', label: 'Portfolio (12)', status: 'published', lastEdit: 'Il y a 1 semaine' },
  { key: 'ch-testimonials', label: 'Témoignages (4)', status: 'published', lastEdit: 'Il y a 3 jours' },
  { key: 'ch-pricing', label: 'Tarification', status: 'published', lastEdit: 'Il y a 2 semaines' },
  { key: 'ch-faq', label: 'FAQ (8)', status: 'published', lastEdit: 'Il y a 1 semaine' },
  { key: 'ch-blog', label: 'Blog (18)', status: 'draft', lastEdit: '2 brouillons' },
  { key: 'ch-seo', label: 'SEO Global', status: 'warning', lastEdit: 'À mettre à jour' },
  { key: 'ch-contact', label: 'Infos Contact', status: 'warning', lastEdit: 'Téléphone manquant' },
];

const statusConfig = {
  published: { icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10', label: 'Publié' },
  draft: { icon: Clock, color: 'text-warning', bg: 'bg-warning/10', label: 'Brouillon' },
  warning: { icon: AlertCircle, color: 'text-danger', bg: 'bg-danger/10', label: 'Attention' },
};

export default function ContentHealthPanel() {
  const publishedCount = sections.filter((s) => s.status === 'published').length;
  const total = sections.length;

  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">Santé du Contenu</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{publishedCount}/{total} sections publiées</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-foreground tabular-nums">
            {Math.round((publishedCount / total) * 100)}%
          </div>
          <div className="text-xs text-muted-foreground">Complétude</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full gradient-bg-primary rounded-full transition-all duration-500"
          style={{ width: `${(publishedCount / total) * 100}%` }}
        />
      </div>

      {/* Sections list */}
      <div className="flex flex-col gap-1.5 overflow-y-auto scrollbar-thin">
        {sections.map((section) => {
          const config = statusConfig[section.status as keyof typeof statusConfig];
          return (
            <div key={section.key} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-muted/30 transition-colors cursor-pointer">
              <div className={`w-7 h-7 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}>
                <config.icon size={14} className={config.color} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-foreground truncate">{section.label}</div>
                <div className="text-xs text-muted-foreground">{section.lastEdit}</div>
              </div>
              <span className={`text-xs font-medium ${config.color} shrink-0`}>{config.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}