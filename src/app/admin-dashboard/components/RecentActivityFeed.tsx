import React from 'react';
import { FileText, MessageSquare, FolderOpen, Briefcase, Star, Settings } from 'lucide-react';

const activities = [
  { key: 'act-001', icon: MessageSquare, color: 'text-warning bg-warning/10', message: 'Nouvelle demande de devis reçue', detail: 'Rakotomalala Jean-Pierre — Plateforme RH', time: 'Il y a 5 min' },
  { key: 'act-002', icon: FileText, color: 'text-primary bg-primary/10', message: 'Article de blog publié', detail: '10 Tendances Web Design 2026', time: 'Il y a 32 min' },
  { key: 'act-003', icon: MessageSquare, color: 'text-danger bg-danger/10', message: 'Nouveau message de contact', detail: 'Razafindrakoto Miora — Projet e-commerce', time: 'Il y a 1h' },
  { key: 'act-004', icon: FolderOpen, color: 'text-accent bg-accent/10', message: 'Projet portfolio ajouté', detail: 'GasyPay Fintech — Application mobile', time: 'Il y a 3h' },
  { key: 'act-005', icon: Briefcase, color: 'text-success bg-success/10', message: 'Service mis à jour', detail: 'SEO & Marketing Digital — Tarif modifié', time: 'Il y a 5h' },
  { key: 'act-006', icon: Star, color: 'text-warning bg-warning/10', message: 'Nouveau témoignage reçu', detail: 'Andrianasolo Hery — GasyPay', time: 'Hier 18:42' },
  { key: 'act-007', icon: Settings, color: 'text-muted-foreground bg-muted/30', message: 'Paramètres SEO mis à jour', detail: 'Méta-description page d\'accueil', time: 'Hier 14:20' },
  { key: 'act-008', icon: FileText, color: 'text-primary bg-primary/10', message: 'Devis #DEV-2026-044 accepté', detail: 'Raharisoa Fenitra — Design + Site vitrine', time: 'Hier 11:05' },
];

export default function RecentActivityFeed() {
  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-full">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="text-base font-semibold text-foreground">Activité Récente</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Dernières actions sur le site</p>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin divide-y divide-border">
        {activities?.map((act) => (
          <div key={act?.key} className="px-5 py-3.5 flex items-start gap-3 hover:bg-muted/20 transition-colors cursor-pointer">
            <div className={`w-8 h-8 rounded-xl ${act?.color} flex items-center justify-center shrink-0 mt-0.5`}>
              <act.icon size={15} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground">{act?.message}</p>
              <p className="text-xs text-muted-foreground truncate mt-0.5">{act?.detail}</p>
              <p className="text-xs text-muted-foreground/60 mt-1">{act?.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-5 py-3 border-t border-border">
        <button className="text-xs text-primary font-medium hover:underline transition-colors">
          Voir tout l&apos;historique →
        </button>
      </div>
    </div>
  );
}