'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import {
  LayoutDashboard, Globe, Briefcase, FolderOpen, MessageSquare, FileText,
  HelpCircle, DollarSign, Users, Settings, Bell, ChevronLeft, ChevronRight,
  Image, Star, BarChart3, Shield, LogOut, X
} from 'lucide-react';

const navGroups = [
  {
    key: 'group-main',
    label: 'Principal',
    items: [
      { key: 'nav-dashboard', icon: LayoutDashboard, label: 'Tableau de Bord', href: '/admin-dashboard', badge: null },
      { key: 'nav-analytics', icon: BarChart3, label: 'Analytiques', href: '/admin-dashboard', badge: null },
    ],
  },
  {
    key: 'group-content',
    label: 'Contenu',
    items: [
      { key: 'nav-services', icon: Briefcase, label: 'Services', href: '/admin-services', badge: '6' },
      { key: 'nav-portfolio', icon: FolderOpen, label: 'Portfolio', href: '/admin-portfolio', badge: null },
      { key: 'nav-blog', icon: FileText, label: 'Blog', href: '/admin-dashboard', badge: '2' },
      { key: 'nav-testimonials', icon: Star, label: 'Témoignages', href: '/admin-dashboard', badge: null },
      { key: 'nav-faq', icon: HelpCircle, label: 'FAQ', href: '/admin-dashboard', badge: null },
      { key: 'nav-pricing', icon: DollarSign, label: 'Tarification', href: '/admin-dashboard', badge: null },
      { key: 'nav-media', icon: Image, label: 'Médiathèque', href: '/admin-dashboard', badge: null },
    ],
  },
  {
    key: 'group-leads',
    label: 'Leads & CRM',
    items: [
      { key: 'nav-quotes', icon: MessageSquare, label: 'Demandes de Devis', href: '/admin-dashboard', badge: '5' },
      { key: 'nav-contacts', icon: Globe, label: 'Messages Contact', href: '/admin-dashboard', badge: '3' },
      { key: 'nav-clients', icon: Users, label: 'Clients', href: '/admin-dashboard', badge: null },
    ],
  },
  {
    key: 'group-system',
    label: 'Système',
    items: [
      { key: 'nav-notif', icon: Bell, label: 'Notifications', href: '/admin-dashboard', badge: '8' },
      { key: 'nav-settings', icon: Settings, label: 'Paramètres', href: '/admin-dashboard', badge: null },
      { key: 'nav-security', icon: Shield, label: 'Sécurité', href: '/admin-dashboard', badge: null },
    ],
  },
];

interface Props {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function AdminSidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: Props) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 flex flex-col bg-card border-r border-border transition-all duration-300 hidden lg:flex ${
          collapsed ? 'w-16' : 'w-60'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-border shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <AppLogo size={32} />
            {!collapsed && (
              <span className="font-bold text-sm text-foreground whitespace-nowrap overflow-hidden">
                T5-SERVICES
              </span>
            )}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin py-4 px-2">
          {navGroups.map((group) => (
            <div key={group.key} className="mb-4">
              {!collapsed && (
                <div className="px-3 mb-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  {group.label}
                </div>
              )}
              {group.items.map((item) => {
                const isActive = pathname === item.href && item.key === 'nav-dashboard'
                  ? pathname === '/admin-dashboard'
                  : pathname === item.href && item.href !== '/admin-dashboard';
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all duration-150 group relative ${
                      isActive
                        ? 'bg-primary/15 text-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <item.icon size={18} className="shrink-0" />
                    {!collapsed && (
                      <span className="text-sm font-medium truncate flex-1">{item.label}</span>
                    )}
                    {!collapsed && item.badge && (
                      <span className="ml-auto text-xs font-bold text-white bg-primary rounded-full w-5 h-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                    {collapsed && item.badge && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-2 border-t border-border shrink-0">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-150 mb-1"
            title={collapsed ? 'Voir le Site' : undefined}
          >
            <Globe size={18} className="shrink-0" />
            {!collapsed && <span className="text-sm font-medium">Voir le Site</span>}
          </Link>
          <Link
            href="/sign-up-login"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-danger hover:bg-danger/10 transition-all duration-150"
            title={collapsed ? 'Déconnexion' : undefined}
          >
            <LogOut size={18} className="shrink-0" />
            {!collapsed && <span className="text-sm font-medium">Déconnexion</span>}
          </Link>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={onToggle}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-150 shadow-sm"
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </aside>

      {/* Mobile sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 flex flex-col bg-card border-r border-border w-64 transition-transform duration-300 lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          <div className="flex items-center gap-3">
            <AppLogo size={32} />
            <span className="font-bold text-sm text-foreground">T5-SERVICES</span>
          </div>
          <button onClick={onMobileClose} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50">
            <X size={18} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto scrollbar-thin py-4 px-2">
          {navGroups.map((group) => (
            <div key={`mob-${group.key}`} className="mb-4">
              <div className="px-3 mb-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                {group.label}
              </div>
              {group.items.map((item) => (
                <Link
                  key={`mob-${item.key}`}
                  href={item.href}
                  onClick={onMobileClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-150"
                >
                  <item.icon size={18} className="shrink-0" />
                  <span className="text-sm font-medium flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="text-xs font-bold text-white bg-primary rounded-full w-5 h-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}