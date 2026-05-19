'use client';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';

const testimonials = [
{ key: 'testi-001', name: 'Rakotomalala Jean-Pierre', role: 'CEO, MobiJob Madagascar', content: 'T5-SERVICES a transformé notre vision en une plateforme d\'emploi performante. Leur maîtrise technique et leur sens du détail sont impressionnants. Délais respectés, qualité irréprochable.', rating: 5, avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12fc6cbe7-1772369417485.png", avatarAlt: 'Professional man in business attire smiling confidently' },
{ key: 'testi-002', name: 'Razafindrakoto Miora', role: 'Directrice Marketing, BazarMada', content: 'Notre boutique en ligne a vu ses ventes augmenter de 340% après la refonte par T5-SERVICES. Ils comprennent vraiment les besoins du marché malgache tout en appliquant les standards internationaux.', rating: 5, avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10778c045-1765088831422.png", avatarAlt: 'Professional woman with natural hair smiling warmly' },
{ key: 'testi-003', name: 'Andrianasolo Hery', role: 'CTO, GasyPay Fintech', content: 'Équipe très professionnelle, communication excellente et résultats au-delà de nos attentes. L\'application mobile qu\'ils ont développée est stable, rapide et nos utilisateurs adorent l\'interface.', rating: 5, avatar: "https://images.unsplash.com/photo-1597703182612-964f151b555d", avatarAlt: 'Young professional man with glasses looking at camera' },
{ key: 'testi-004', name: 'Raharisoa Fenitra', role: 'Fondatrice, TechMada', content: 'Un partenaire de confiance pour notre transformation digitale. T5-SERVICES a créé notre identité de marque et notre site web en un temps record, avec une qualité exceptionnelle.', rating: 5, avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_124644cb0-1763295764731.png", avatarAlt: 'Young businesswoman with warm smile in professional setting' }];


export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials?.length) % testimonials?.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials?.length);
  const testi = testimonials?.[current];

  return (
    <section id="testimonials" className="py-20 lg:py-28">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold text-accent tracking-widest uppercase bg-accent/10 rounded-full mb-4">
            Témoignages
          </span>
          <h2 className="text-section-title text-foreground mb-4">
            Ce que Disent <span className="gradient-text">Nos Clients</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main testimonial */}
          <div className="glass-card rounded-3xl p-8 lg:p-12 relative">
            <Quote size={48} className="text-primary/20 absolute top-6 left-6" />

            <div className="relative z-10">
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testi?.rating })?.map((_, i) =>
                <Star key={`star-${testi?.key}-${i}`} size={18} className="text-warning fill-warning" />
                )}
              </div>

              <p className="text-lg lg:text-xl text-foreground leading-relaxed mb-8 italic">
                &ldquo;{testi?.content}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary/30">
                  <AppImage
                    src={testi?.avatar}
                    alt={testi?.avatarAlt}
                    fill
                    className="object-cover"
                    sizes="56px" />
                  
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testi?.name}</div>
                  <div className="text-sm text-muted-foreground">{testi?.role}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prev}
              className="p-3 glass-card rounded-xl text-muted-foreground hover:text-foreground hover:border-primary/40 active:scale-95 transition-all duration-150">
              
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {testimonials?.map((t, i) =>
              <button
                key={`dot-${t?.key}`}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 rounded-full ${
                i === current ? 'w-8 h-2.5 bg-primary' : 'w-2.5 h-2.5 bg-muted hover:bg-muted-foreground'}`
                } />

              )}
            </div>

            <button
              onClick={next}
              className="p-3 glass-card rounded-xl text-muted-foreground hover:text-foreground hover:border-primary/40 active:scale-95 transition-all duration-150">
              
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>);

}