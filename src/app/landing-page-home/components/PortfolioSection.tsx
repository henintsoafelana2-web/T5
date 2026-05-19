'use client';
import React, { useState } from 'react';
import { ExternalLink, GitBranch, Star } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';

const categories = ['Tous', 'Web', 'Mobile', 'E-Commerce', 'Design'];

const projects = [
{ key: 'proj-001', title: 'MobiJob Madagascar', category: 'Web', tags: ['Next.js', 'Supabase'], description: 'Plateforme d\'emploi leader à Madagascar avec 50k+ offres.', featured: true, demoUrl: '#', githubUrl: '#', image: "https://img.rocket.new/generatedImages/rocket_gen_img_17dc879bd-1772300015314.png", imageAlt: 'Dashboard analytics web application with charts and data tables' },
{ key: 'proj-002', title: 'Jovenna Mobile App', category: 'Mobile', tags: ['React Native', 'Firebase'], description: 'Application mobile de gestion des stations-service Jovenna.', featured: false, demoUrl: '#', githubUrl: '#', image: "https://img.rocket.new/generatedImages/rocket_gen_img_1106ce6ca-1772127554630.png", imageAlt: 'Mobile application interface showing fuel station management dashboard' },
{ key: 'proj-003', title: 'BazarMada Shop', category: 'E-Commerce', tags: ['Shopify', 'Tailwind'], description: 'Boutique e-commerce de mode malagasy avec 2000+ produits.', featured: true, demoUrl: '#', githubUrl: '#', image: "https://img.rocket.new/generatedImages/rocket_gen_img_12d184e67-1772389889698.png", imageAlt: 'E-commerce product listing page with fashion items and shopping cart' },
{ key: 'proj-004', title: 'AirMada Dashboard', category: 'Web', tags: ['React', 'Node.js'], description: 'Système de gestion des réservations et vols internes.', featured: false, demoUrl: '#', githubUrl: '#', image: "https://img.rocket.new/generatedImages/rocket_gen_img_140bbe367-1772724724699.png", imageAlt: 'Airline booking management dashboard with flight schedules and reservations' },
{ key: 'proj-005', title: 'TechMada Brand', category: 'Design', tags: ['Figma', 'Branding'], description: 'Identité visuelle complète pour startup tech malgache.', featured: false, demoUrl: '#', githubUrl: '#', image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c060d1eb-1779176795301.png", imageAlt: 'Brand identity design with logo variations and color palette presentation' },
{ key: 'proj-006', title: 'GasyPay Fintech', category: 'Mobile', tags: ['Flutter', 'API'], description: 'Application de paiement mobile et transfert d\'argent local.', featured: true, demoUrl: '#', githubUrl: '#', image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c392243f-1772381256803.png", imageAlt: 'Mobile payment application showing transaction history and wallet balance' }];


export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('Tous');

  const filtered = activeCategory === 'Tous' ?
  projects :
  projects?.filter((p) => p?.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-muted/10">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold text-primary tracking-widest uppercase bg-primary/10 rounded-full mb-4">
            Portfolio
          </span>
          <h2 className="text-section-title text-foreground mb-4">
            Nos <span className="gradient-text">Réalisations</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Découvrez quelques-uns de nos projets les plus marquants réalisés pour nos clients.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories?.map((cat) =>
          <button
            key={`cat-${cat}`}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
            activeCategory === cat ?
            'gradient-bg-primary text-white shadow-lg shadow-primary/25' :
            'glass-card text-muted-foreground hover:text-foreground'}`
            }>
            
              {cat}
            </button>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
          {filtered?.map((project) =>
          <div
            key={project?.key}
            className="glass-card rounded-2xl overflow-hidden group hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">
            
              <div className="relative h-48 overflow-hidden">
                <AppImage
                src={project?.image}
                alt={project?.imageAlt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw" />
              
                {project?.featured &&
              <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-warning/20 backdrop-blur-sm rounded-full border border-warning/30">
                    <Star size={10} className="text-warning fill-warning" />
                    <span className="text-xs font-semibold text-warning">Vedette</span>
                  </div>
              }
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-3">
                  <a href={project?.demoUrl} className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary/80 transition-colors">
                    <ExternalLink size={12} /> Démo
                  </a>
                  <a href={project?.githubUrl} className="flex items-center gap-1.5 px-4 py-2 bg-muted text-foreground text-xs font-semibold rounded-lg hover:bg-muted/80 transition-colors">
                    <GitBranch size={12} /> Code
                  </a>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{project?.title}</h3>
                  <span className="text-xs font-medium text-accent bg-accent/10 px-2.5 py-1 rounded-full">{project?.category}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{project?.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project?.tags?.map((tag, ti) =>
                <span key={`${project?.key}-tag-${ti}`} className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-md font-mono">
                      {tag}
                    </span>
                )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-10">
          <button className="px-8 py-3.5 font-semibold text-foreground glass-card rounded-xl hover:border-primary/40 active:scale-95 transition-all duration-150">
            Voir Tous les Projets
          </button>
        </div>
      </div>
    </section>);

}