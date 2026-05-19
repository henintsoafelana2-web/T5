'use client';
import React, { useState } from 'react';
import { Code2, Palette, Smartphone, ShoppingCart, BarChart3, Shield, ArrowRight } from 'lucide-react';

const services = [
  {
    key: 'svc-web',
    icon: Code2,
    title: 'Développement Web',
    description: 'Sites web et applications web sur mesure avec les dernières technologies : Next.js, React, Node.js.',
    features: ['Sites vitrine', 'Applications web', 'API REST', 'PWA'],
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    price: 'À partir de 500 000 Ar',
  },
  {
    key: 'svc-design',
    icon: Palette,
    title: 'Design UI/UX',
    description: 'Interfaces utilisateur modernes et intuitives. Prototypage, maquettes Figma, design systems.',
    features: ['Wireframing', 'Prototypage', 'Design System', 'Audit UX'],
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    price: 'À partir de 300 000 Ar',
  },
  {
    key: 'svc-mobile',
    icon: Smartphone,
    title: 'Applications Mobiles',
    description: 'Applications iOS et Android avec React Native. Performance native, expérience premium.',
    features: ['iOS & Android', 'React Native', 'Push notifications', 'App Store'],
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    price: 'À partir de 1 000 000 Ar',
  },
  {
    key: 'svc-ecom',
    icon: ShoppingCart,
    title: 'E-Commerce',
    description: 'Boutiques en ligne performantes avec gestion des stocks, paiements et livraisons intégrés.',
    features: ['WooCommerce', 'Shopify', 'Paiement mobile', 'Gestion stocks'],
    color: 'text-success',
    bgColor: 'bg-success/10',
    price: 'À partir de 800 000 Ar',
  },
  {
    key: 'svc-seo',
    icon: BarChart3,
    title: 'SEO & Marketing Digital',
    description: 'Optimisation moteurs de recherche, Google Ads, réseaux sociaux et stratégie de contenu.',
    features: ['Audit SEO', 'Google Ads', 'Social Media', 'Analytics'],
    color: 'text-warning',
    bgColor: 'bg-warning/10',
    price: 'À partir de 200 000 Ar/mois',
  },
  {
    key: 'svc-sec',
    icon: Shield,
    title: 'Sécurité & Maintenance',
    description: 'Audit de sécurité, maintenance préventive, sauvegardes automatiques et monitoring 24/7.',
    features: ['Audit sécurité', 'SSL/HTTPS', 'Monitoring', 'Sauvegardes'],
    color: 'text-danger',
    bgColor: 'bg-danger/10',
    price: 'À partir de 150 000 Ar/mois',
  },
];

export default function ServicesSection() {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  return (
    <section id="services" className="py-20 lg:py-28">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold text-accent tracking-widest uppercase bg-accent/10 rounded-full mb-4">
            Nos Services
          </span>
          <h2 className="text-section-title text-foreground mb-4">
            Solutions Digitales <span className="gradient-text">Sur Mesure</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            De la conception à la mise en ligne, nous accompagnons votre transformation digitale
            avec expertise et passion.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
          {services?.map((service) => (
            <div
              key={service?.key}
              onMouseEnter={() => setHoveredKey(service?.key)}
              onMouseLeave={() => setHoveredKey(null)}
              className={`glass-card rounded-2xl p-6 flex flex-col gap-4 cursor-pointer transition-all duration-300 ${
                hoveredKey === service?.key ? 'border-primary/40 shadow-lg shadow-primary/10 -translate-y-1' : ''
              }`}
            >
              <div className={`w-12 h-12 rounded-xl ${service?.bgColor} flex items-center justify-center transition-transform duration-300 ${hoveredKey === service?.key ? 'scale-110' : ''}`}>
                <service.icon size={24} className={service?.color} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{service?.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service?.description}</p>
              </div>
              <ul className="flex flex-wrap gap-2">
                {service?.features?.map((f, fi) => (
                  <li
                    key={`${service?.key}-feat-${fi}`}
                    className="px-2.5 py-1 text-xs font-medium text-muted-foreground bg-muted/50 rounded-lg"
                  >
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                <span className="text-xs font-semibold text-accent">{service?.price}</span>
                <button className="flex items-center gap-1 text-xs font-semibold text-primary hover:gap-2 transition-all duration-200">
                  En savoir plus <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}