'use client';
import React, { useRef } from 'react';

const services = [
{
  id: 'web',
  emoji: '🌐',
  title: 'Développement Web',
  color: 'from-blue-600/20 to-blue-400/10',
  borderColor: 'border-blue-500/30',
  accentColor: 'text-blue-400',
  bgAccent: 'bg-blue-500/10',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_188dc1381-1772374162878.png",
  alt: 'Developer coding a professional website on a modern laptop with code editor open',
  subServices: [
  'Sites vitrines professionnels',
  'Sites institutionnels',
  'Sites e-commerce',
  'Applications web sur mesure',
  'Dashboards administratifs',
  'CRM, ERP, POS',
  'Marketplaces',
  'SaaS']

},
{
  id: 'mobile',
  emoji: '📱',
  title: 'Développement Mobile',
  color: 'from-purple-600/20 to-purple-400/10',
  borderColor: 'border-purple-500/30',
  accentColor: 'text-purple-400',
  bgAccent: 'bg-purple-500/10',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1241d870c-1773026216292.png",
  alt: 'Smartphone displaying a mobile application with clean modern UI design',
  subServices: [
  'Applications Android',
  'Applications iOS',
  'Applications multiplateformes Flutter',
  'Progressive Web Apps (PWA)']

},
{
  id: 'ai',
  emoji: '🤖',
  title: 'Intelligence Artificielle',
  color: 'from-cyan-600/20 to-cyan-400/10',
  borderColor: 'border-cyan-500/30',
  accentColor: 'text-cyan-400',
  bgAccent: 'bg-cyan-500/10',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_13f77e0fe-1772815067249.png",
  alt: 'Futuristic AI neural network visualization with glowing blue connections on dark background',
  subServices: [
  'Chatbots intelligents',
  'Assistants virtuels',
  'OCR et traitement de documents',
  'Automatisation de tâches',
  'Analyse prédictive',
  'Recommandation intelligente']

},
{
  id: 'data',
  emoji: '📊',
  title: 'Data Engineering & Analytics',
  color: 'from-emerald-600/20 to-emerald-400/10',
  borderColor: 'border-emerald-500/30',
  accentColor: 'text-emerald-400',
  bgAccent: 'bg-emerald-500/10',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_15a5cd0ee-1772272616119.png",
  alt: 'Data analytics dashboard with colorful charts, graphs and business intelligence metrics',
  subServices: [
  'ETL / ELT',
  'Data Warehouse',
  'Dashboards analytiques',
  'Business Intelligence',
  'Visualisation de données']

},
{
  id: 'design',
  emoji: '🎨',
  title: 'Design Graphique & UI/UX',
  color: 'from-pink-600/20 to-pink-400/10',
  borderColor: 'border-pink-500/30',
  accentColor: 'text-pink-400',
  bgAccent: 'bg-pink-500/10',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_16930f490-1768341679435.png",
  alt: 'Designer working on brand identity and UI/UX design with color palettes and Figma mockups',
  subServices: [
  'Logos',
  'Identité visuelle',
  'Flyers et affiches',
  'Bannières réseaux sociaux',
  'UI/UX Design avec Figma']

},
{
  id: 'video',
  emoji: '🎬',
  title: 'Montage Vidéo & Motion Design',
  color: 'from-orange-600/20 to-orange-400/10',
  borderColor: 'border-orange-500/30',
  accentColor: 'text-orange-400',
  bgAccent: 'bg-orange-500/10',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dbd99afb-1772208131038.png",
  alt: 'Video editor working on professional video production with timeline and motion graphics',
  subServices: [
  'Reels et Shorts',
  'Publicités vidéo',
  'Animations de logo',
  'Vidéos explicatives']

},
{
  id: 'numerique',
  emoji: '💻',
  title: 'Services Numériques',
  color: 'from-indigo-600/20 to-indigo-400/10',
  borderColor: 'border-indigo-500/30',
  accentColor: 'text-indigo-400',
  bgAccent: 'bg-indigo-500/10',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_13d45c71e-1779177686147.png",
  alt: 'Digital services overview showing web, mobile, AI and cybersecurity icons on a screen',
  subServices: [
  'Développement Web',
  'Applications Mobile',
  'Intelligence Artificielle',
  'Data Engineering',
  'Cybersécurité',
  'Design Graphique',
  'Marketing Digital']

},
{
  id: 'cctv',
  emoji: '📹',
  title: 'Installation Caméras CCTV',
  color: 'from-red-600/20 to-red-400/10',
  borderColor: 'border-red-500/30',
  accentColor: 'text-red-400',
  bgAccent: 'bg-red-500/10',
  image: "https://images.unsplash.com/photo-1615486761809-e02c3ee082fd",
  alt: 'Security camera installed on a building wall for CCTV surveillance system',
  subServices: [
  'Installation caméras IP et analogiques',
  'Configuration DVR / NVR',
  'Surveillance à distance sur téléphone',
  'Maintenance et dépannage',
  'Sécurisation maisons, bureaux et commerces']

},
{
  id: 'solar',
  emoji: '☀️',
  title: 'Installation Panneaux Solaires',
  color: 'from-yellow-600/20 to-yellow-400/10',
  borderColor: 'border-yellow-500/30',
  accentColor: 'text-yellow-400',
  bgAccent: 'bg-yellow-500/10',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1aea7cc50-1773141039797.png",
  alt: 'Solar panels installed on a rooftop under bright sunlight for renewable energy generation',
  subServices: [
  'Étude et dimensionnement du système',
  'Installation de panneaux solaires',
  'Batteries et onduleurs',
  'Systèmes résidentiels et commerciaux',
  'Maintenance et optimisation énergétique']

},
{
  id: 'photo',
  emoji: '📸',
  title: 'Photographie Professionnelle',
  color: 'from-teal-600/20 to-teal-400/10',
  borderColor: 'border-teal-500/30',
  accentColor: 'text-teal-400',
  bgAccent: 'bg-teal-500/10',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fa242636-1772528160793.png",
  alt: 'Professional photographer with camera equipment doing a studio photo shoot',
  subServices: [
  'Shooting photo studio ou extérieur',
  'Portrait professionnel',
  'Photos de produits',
  "Couverture d\'événements"]

},
{
  id: 'mariage',
  emoji: '🎥',
  title: 'Mariage & Événementiel',
  color: 'from-rose-600/20 to-rose-400/10',
  borderColor: 'border-rose-500/30',
  accentColor: 'text-rose-400',
  bgAccent: 'bg-rose-500/10',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_122227815-1777296370873.png",
  alt: 'Wedding photographer capturing a beautiful couple during their wedding ceremony',
  subServices: [
  'Photos de mariage',
  'Vidéo de mariage',
  'Drone (si disponible)',
  'Album photo professionnel',
  'Montage vidéo cinématographique']

},
{
  id: 'production',
  emoji: '🎬',
  title: 'Production Vidéo',
  color: 'from-violet-600/20 to-violet-400/10',
  borderColor: 'border-violet-500/30',
  accentColor: 'text-violet-400',
  bgAccent: 'bg-violet-500/10',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_179aeb5a8-1772240858989.png",
  alt: 'Professional video production crew filming a commercial advertisement with cinema camera',
  subServices: [
  'Clips publicitaires',
  'Reels et Shorts',
  'Montage vidéo professionnel',
  'Motion design']

}];


export default function AllServicesScrollSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="py-16 lg:py-24 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 gap-4">
          <div>
            <span className="inline-block px-4 py-1.5 text-xs font-semibold text-accent tracking-widest uppercase bg-accent/10 rounded-full mb-4">
              Tous nos services
            </span>
            <h2 className="text-section-title text-foreground leading-tight">
              Services Officiels{' '}
              <span className="gradient-text">T5-SERVICES</span>
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl leading-relaxed text-sm">
              Découvrez l'ensemble de nos expertises — du digital à l'installation physique, nous couvrons tous vos besoins.
            </p>
          </div>
          {/* Scroll controls */}
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => scroll('left')}
              aria-label="Défiler à gauche"
              className="w-10 h-10 rounded-full glass-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-200">
              
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Défiler à droite"
              className="w-10 h-10 rounded-full glass-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-200">
              
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: 'thin', scrollbarColor: 'var(--border) transparent' }}>
          
          {services.map((service) =>
          <div
            key={service.id}
            className={`flex-none w-72 rounded-2xl border ${service.borderColor} bg-gradient-to-b ${service.color} glass-card overflow-hidden group hover:-translate-y-1 hover:shadow-lg transition-all duration-300`}>
            
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                src={service.image}
                alt={service.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                {/* Emoji badge */}
                <div className={`absolute top-3 left-3 w-9 h-9 rounded-xl ${service.bgAccent} backdrop-blur-sm flex items-center justify-center text-lg border ${service.borderColor}`}>
                  {service.emoji}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className={`text-sm font-bold ${service.accentColor} mb-3 leading-tight`}>
                  {service.title}
                </h3>
                <ul className="space-y-1.5">
                  {service.subServices.map((sub, idx) =>
                <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                      <span className={`mt-0.5 w-1 h-1 rounded-full ${service.bgAccent} border ${service.borderColor} shrink-0 mt-1.5`} />
                      {sub}
                    </li>
                )}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Scroll hint */}
        <p className="text-center text-xs text-muted-foreground/50 mt-4 select-none">
          ← Faites défiler pour voir tous les services →
        </p>
      </div>
    </section>);

}