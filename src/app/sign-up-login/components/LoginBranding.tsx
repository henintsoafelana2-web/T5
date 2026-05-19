import React from 'react';
import AppLogo from '@/components/ui/AppLogo';
import { Code2, Palette, Smartphone, Shield } from 'lucide-react';

const features = [
  { key: 'feat-dev', icon: Code2, label: 'Développement Web Premium' },
  { key: 'feat-design', icon: Palette, label: 'Design UI/UX Moderne' },
  { key: 'feat-mobile', icon: Smartphone, label: 'Applications Mobiles' },
  { key: 'feat-sec', icon: Shield, label: 'Sécurité & Performance' },
];

export default function LoginBranding() {
  return (
    <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden gradient-bg-hero items-center justify-center p-12">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 blob-blue opacity-50 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 blob-cyan opacity-30 pointer-events-none" />
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg gap-8">
        <div className="flex items-center gap-4">
          <AppLogo size={56} />
          <div className="text-left">
            <div className="text-3xl font-extrabold text-foreground">T5-SERVICES</div>
            <div className="text-sm text-accent font-medium tracking-wider">Your Vision, Our Creation</div>
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-extrabold text-foreground mb-4 leading-tight">
            Bienvenue dans votre<br />
            <span className="gradient-text">Espace Admin</span>
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Gérez votre contenu, suivez vos leads et pilotez la croissance
            de T5-SERVICES depuis un tableau de bord centralisé et sécurisé.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full">
          {features?.map((feat) => (
            <div key={feat?.key} className="glass-card rounded-xl p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <feat.icon size={18} className="text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground text-left">{feat?.label}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold gradient-text">150+</span>
            <span className="text-xs">Projets</span>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold gradient-text">80+</span>
            <span className="text-xs">Clients</span>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold gradient-text">5 ans</span>
            <span className="text-xs">Expérience</span>
          </div>
        </div>
      </div>
    </div>
  );
}