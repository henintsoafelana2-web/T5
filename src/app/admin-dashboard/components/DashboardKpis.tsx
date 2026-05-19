'use client';
import React from 'react';
import { MessageSquare, FileText, Briefcase, FolderOpen, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

const kpis = [
  {
    key: 'kpi-quotes',
    label: 'Demandes de Devis',
    value: '5',
    subLabel: 'Non traitées',
    trend: '+2 aujourd\'hui',
    trendUp: true,
    icon: MessageSquare,
    color: 'text-warning',
    bgColor: 'bg-warning/10',
    borderColor: 'border-warning/30',
    alert: true,
  },
  {
    key: 'kpi-messages',
    label: 'Messages Contact',
    value: '3',
    subLabel: 'Non lus',
    trend: '+1 cette heure',
    trendUp: true,
    icon: FileText,
    color: 'text-danger',
    bgColor: 'bg-danger/10',
    borderColor: 'border-danger/30',
    alert: true,
  },
  {
    key: 'kpi-services',
    label: 'Services Publiés',
    value: '6',
    subLabel: 'Sur 8 total',
    trend: '2 en brouillon',
    trendUp: null,
    icon: Briefcase,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-border',
    alert: false,
  },
  {
    key: 'kpi-portfolio',
    label: 'Projets Portfolio',
    value: '12',
    subLabel: 'Publiés',
    trend: '+3 ce mois',
    trendUp: true,
    icon: FolderOpen,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    borderColor: 'border-border',
    alert: false,
  },
  {
    key: 'kpi-blog',
    label: 'Articles de Blog',
    value: '18',
    subLabel: 'Publiés',
    trend: '2 planifiés',
    trendUp: null,
    icon: FileText,
    color: 'text-success',
    bgColor: 'bg-success/10',
    borderColor: 'border-border',
    alert: false,
  },
];

export default function DashboardKpis() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
      {kpis?.map((kpi) => (
        <div
          key={kpi?.key}
          className={`glass-card rounded-2xl p-5 flex flex-col gap-3 border ${kpi?.borderColor} ${kpi?.alert ? 'shadow-lg' : ''} hover:-translate-y-0.5 transition-all duration-200`}
        >
          <div className="flex items-start justify-between">
            <div className={`w-10 h-10 rounded-xl ${kpi?.bgColor} flex items-center justify-center`}>
              <kpi.icon size={20} className={kpi?.color} />
            </div>
            {kpi?.alert && (
              <div className="w-6 h-6 rounded-full bg-warning/20 flex items-center justify-center">
                <AlertTriangle size={12} className="text-warning" />
              </div>
            )}
          </div>
          <div>
            <div className="text-3xl font-bold text-foreground tabular-nums">{kpi?.value}</div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">{kpi?.label}</div>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            {kpi?.trendUp === true && <TrendingUp size={12} className="text-success" />}
            {kpi?.trendUp === false && <TrendingDown size={12} className="text-danger" />}
            <span className={kpi?.trendUp === true ? 'text-success' : kpi?.trendUp === false ? 'text-danger' : 'text-muted-foreground'}>
              {kpi?.trend}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}