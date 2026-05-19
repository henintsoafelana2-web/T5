import React from 'react';
import { Zap, HeartHandshake, Trophy, Clock, Globe, Headphones } from 'lucide-react';

const reasons = [
  { key: 'why-speed', icon: Zap, title: 'Livraison Rapide', description: 'Délais respectés à 95%. Nous livrons dans les temps, sans compromis sur la qualité.', color: 'text-warning' },
  { key: 'why-trust', icon: HeartHandshake, title: 'Relation de Confiance', description: 'Communication transparente à chaque étape. Vous êtes informé en temps réel de l\'avancement.', color: 'text-accent' },
  { key: 'why-quality', icon: Trophy, title: 'Excellence Technique', description: 'Code propre, bonnes pratiques, dernières technologies. Vos projets sont entre de bonnes mains.', color: 'text-warning' },
  { key: 'why-time', icon: Clock, title: 'Disponible 24/7', description: 'Support réactif via WhatsApp, email et téléphone. Votre succès est notre priorité absolue.', color: 'text-success' },
  { key: 'why-local', icon: Globe, title: 'Expertise Locale & Globale', description: 'Basés à Madagascar, nous comprenons le marché local tout en appliquant les standards internationaux.', color: 'text-primary' },
  { key: 'why-support', icon: Headphones, title: 'Suivi Post-Livraison', description: 'Maintenance, mises à jour et support inclus. Nous ne disparaissons pas après la livraison.', color: 'text-purple-400' },
];

export default function WhyUsSection() {
  return (
    <section className="py-20 lg:py-28 bg-muted/10">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <span className="inline-block px-4 py-1.5 text-xs font-semibold text-primary tracking-widest uppercase bg-primary/10 rounded-full mb-4">
              Pourquoi Nous Choisir
            </span>
            <h2 className="text-section-title text-foreground mb-6">
              L&apos;Agence Digitale qui <span className="gradient-text">Fait la Différence</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              T5-SERVICES n&apos;est pas juste une agence web. Nous sommes vos partenaires de transformation
              digitale. Chaque projet est traité avec la même passion et le même niveau d&apos;exigence.
            </p>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Satisfaction client', value: 98, key: 'prog-sat' },
                { label: 'Projets livrés à temps', value: 95, key: 'prog-time' },
                { label: 'Clients fidèles', value: 87, key: 'prog-loyal' },
              ]?.map((item) => (
                <div key={item?.key}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm font-medium text-foreground">{item?.label}</span>
                    <span className="text-sm font-bold text-primary tabular-nums">{item?.value}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full gradient-bg-primary rounded-full"
                      style={{ width: `${item?.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons?.map((reason) => (
              <div
                key={reason?.key}
                className="glass-card rounded-2xl p-5 flex flex-col gap-3 hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                <reason.icon size={24} className={reason?.color} />
                <h3 className="text-sm font-semibold text-foreground">{reason?.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{reason?.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}