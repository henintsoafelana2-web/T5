'use client';
import React, { useState } from 'react';
import { Bell, Search, Menu, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';


export default function AdminTopbar({ onMobileMenuOpen }: { onMobileMenuOpen: () => void }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    { key: 'notif-1', type: 'quote', message: 'Nouvelle demande de devis de Rakoto Jean', time: 'Il y a 5 min', unread: true },
    { key: 'notif-2', type: 'contact', message: 'Message de contact de Miora Raza', time: 'Il y a 23 min', unread: true },
    { key: 'notif-3', type: 'system', message: 'Sauvegarde automatique effectuée', time: 'Il y a 1h', unread: false },
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-card/80 backdrop-blur-xl border-b border-border flex items-center px-6 gap-4">
      {/* Mobile menu */}
      <button
        onClick={onMobileMenuOpen}
        className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
      >
        <Menu size={20} />
      </button>

      {/* Search */}
      <div className="relative flex-1 max-w-sm hidden md:block">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Rechercher..."
          className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-mono">⌘K</span>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* View site */}
        <Link
          href="/"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all"
        >
          Voir le site ↗
        </Link>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 glass-card rounded-2xl shadow-2xl overflow-hidden">
              <div className="px-4 py-3 border-bborder-border flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">Notifications</span>
                <span className="text-xs text-primary font-medium cursor-pointer hover:underline">Tout marquer lu</span>
              </div>
              {notifications.map((n) => (
                <div key={n.key} className={`px-4 py-3 flex items-start gap-3 hover:bg-muted/30 transition-colors cursor-pointer border-b border-border last:border-0 ${n.unread ? 'bg-primary/5' : ''}`}>
                  <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${n.unread ? 'bg-primary' : 'bg-transparent'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-foreground leading-relaxed">{n.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                  </div>
                </div>
              ))}
              <div className="px-4 py-3 text-center">
                <button className="text-xs text-primary font-medium hover:underline">Voir toutes les notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-muted/50 transition-all"
          >
            <div className="w-8 h-8 rounded-full gradient-bg-primary flex items-center justify-center text-white text-xs font-bold">
              SA
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-semibold text-foreground">Super Admin</div>
              <div className="text-xs text-muted-foreground">admin@t5services.mg</div>
            </div>
            <ChevronDown size={14} className={`text-muted-foreground transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 glass-card rounded-2xl shadow-2xl overflow-hidden">
              <div className="px-4 py-3 border-b border-border">
                <div className="text-sm font-semibold text-foreground">Super Admin</div>
                <div className="text-xs text-muted-foreground">admin@t5services.mg</div>
              </div>
              {[
                { key: 'prof-profile', icon: User, label: 'Mon Profil' },
                { key: 'prof-settings', icon: Settings, label: 'Paramètres' },
              ].map((item) => (
                <button key={item.key} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                  <item.icon size={16} />
                  {item.label}
                </button>
              ))}
              <div className="border-t border-border">
                <Link href="/sign-up-login" className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-danger hover:bg-danger/10 transition-colors">
                  <LogOut size={16} />
                  Déconnexion
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}