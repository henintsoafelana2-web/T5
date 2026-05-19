'use client';
import React, { useState } from 'react';
import { Check, Zap } from 'lucide-react';

const plans = [
  {
    key: 'plan-starter',
    name: 'Starter',
    monthlyPrice: '500 000',
    annualPrice: '450 000',
    currency: 'Ar',
    description: 'Idéal pour les petites entreprises et les startups qui débutent leur présence en ligne.',
    features: [
      'Site vitrine 5 pages',
      'Design responsive',
      'Formulaire de contact',
      'Hébergement 1 an',
      'SSL gratuit',
      'Support par email',
    ],
    notIncluded: ['E-commerce', 'Blog', 'SEO avancé'],
    color: 'border-border',
    badge: null,
    cta: 'Démarrer',
  },
  {
    key: 'plan-pro',
    name: 'Professional',
    monthlyPrice: '1 200 000',
    annualPrice: '1 000 000',
    currency: 'Ar',
    description: 'Pour les entreprises en croissance qui ont besoin d\'une présence digitale complète et performante.',
    features: [
      'Site web jusqu\'à 15 pages',
      'Blog intégré',
      'SEO On-page',
      'Google Analytics',
      'Formulaires avancés',
      'Hébergement 1 an',
      'SSL + CDN',
      'Support prioritaire',
    ],
    notIncluded: ['E-commerce complet'],
    color: 'border-primary',
    badge: 'Plus Populaire',
    cta: 'Choisir Pro',
  },
  {
    key: 'plan-enterprise',
    name: 'Enterprise',
    monthlyPrice: 'Sur devis',
    annualPrice: 'Sur devis',
    currency: '',
    description: 'Solution complète et sur mesure pour les grandes entreprises avec des besoins spécifiques.',
    features: [
      'Application web complète',
      'E-commerce avancé',
      'API personnalisée',
      'Dashboard admin',
      'SEO complet',
      'Multilingue',
      'Maintenance incluse',
      'Support 24/7',
      'SLA garanti',
    ],
    notIncluded: [],
    color: 'border-accent',
    badge: 'Premium',
    cta: 'Nous Contacter',
  },
];

export default function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-muted/10">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold text-primary tracking-widest uppercase bg-primary/10 rounded-full mb-4">
            Tarification
          </span>
          <h2 className="text-section-title text-foreground mb-4">
            Des Prix <span className="gradient-text">Transparents</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Choisissez le plan adapté à vos besoins. Pas de frais cachés, pas de mauvaises surprises.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 glass-card rounded-full px-4 py-2">
            <span className={`text-sm font-medium transition-colors ${!annual ? 'text-foreground' : 'text-muted-foreground'}`}>Mensuel</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${annual ? 'bg-primary' : 'bg-muted'}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${annual ? 'left-7' : 'left-1'}`} />
            </button>
            <span className={`text-sm font-medium transition-colors ${annual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Annuel <span className="text-success text-xs ml-1">-15%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans?.map((plan) => (
            <div
              key={plan?.key}
              className={`glass-card rounded-2xl p-6 lg:p-8 flex flex-col gap-6 relative transition-all duration-300 hover:-translate-y-1 ${
                plan?.key === 'plan-pro' ? 'border-primary shadow-lg shadow-primary/15' : 'hover:border-primary/30'
              }`}
            >
              {plan?.badge && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-bold text-white rounded-full ${plan?.key === 'plan-pro' ? 'gradient-bg-primary' : 'bg-accent'}`}>
                  {plan?.key === 'plan-pro' && <Zap size={10} className="inline mr-1" />}
                  {plan?.badge}
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">{plan?.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{plan?.description}</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-foreground tabular-nums">
                  {annual ? plan?.annualPrice : plan?.monthlyPrice}
                </span>
                {plan?.currency && <span className="text-sm text-muted-foreground">{plan?.currency}</span>}
                {plan?.monthlyPrice !== 'Sur devis' && (
                  <span className="text-xs text-muted-foreground">/projet</span>
                )}
              </div>

              <ul className="flex flex-col gap-2.5">
                {plan?.features?.map((feat, fi) => (
                  <li key={`${plan?.key}-feat-${fi}`} className="flex items-start gap-2.5 text-sm text-foreground">
                    <Check size={16} className="text-success shrink-0 mt-0.5" />
                    {feat}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-auto w-full py-3 rounded-xl font-semibold text-sm text-center transition-all duration-150 active:scale-95 ${
                  plan?.key === 'plan-pro' ?'gradient-bg-primary text-white shadow-lg shadow-primary/25 hover:opacity-90' :'glass-card text-foreground hover:border-primary/40'
                }`}
              >
                {plan?.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}