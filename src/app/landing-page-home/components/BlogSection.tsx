import React from 'react';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';

const posts = [
{ key: 'post-001', title: '10 Tendances Web Design à Adopter en 2026', excerpt: 'Découvrez les tendances qui domineront le design web cette année : glassmorphism, dark mode, micro-animations et bien plus.', category: 'Design', date: '12 Mai 2026', readTime: '5 min', image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a65592e4-1772952558235.png", imageAlt: 'Modern web design workspace with colorful UI components on screen' },
{ key: 'post-002', title: 'Pourquoi votre PME Malgache a Besoin d\'un Site Web en 2026', excerpt: 'Le digital n\'est plus optionnel pour les entreprises. Voici comment une présence en ligne peut tripler votre chiffre d\'affaires.', category: 'Business', date: '8 Mai 2026', readTime: '7 min', image: "https://img.rocket.new/generatedImages/rocket_gen_img_18fc22fb1-1772255848177.png", imageAlt: 'Business team reviewing website analytics on laptop in office' },
{ key: 'post-003', title: 'Next.js vs WordPress : Quel CMS Choisir pour votre Business ?', excerpt: 'Comparaison complète entre Next.js et WordPress en termes de performance, SEO, coût et facilité de gestion pour 2026.', category: 'Tech', date: '3 Mai 2026', readTime: '10 min', image: "https://images.unsplash.com/photo-1725800066480-7ccf189e9513", imageAlt: 'Code editor showing React and JavaScript code on dark screen' }];


const categoryColors: Record<string, string> = {
  Design: 'text-accent bg-accent/10',
  Business: 'text-success bg-success/10',
  Tech: 'text-primary bg-primary/10'
};

export default function BlogSection() {
  return (
    <section id="blog" className="py-20 lg:py-28 bg-muted/10">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 text-xs font-semibold text-primary tracking-widest uppercase bg-primary/10 rounded-full mb-4">
              Blog
            </span>
            <h2 className="text-section-title text-foreground">
              Nos Derniers <span className="gradient-text">Articles</span>
            </h2>
          </div>
          <button className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors duration-200 shrink-0">
            Voir tous les articles <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) =>
          <article
            key={post.key}
            className="glass-card rounded-2xl overflow-hidden group hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            
              <div className="relative h-48 overflow-hidden">
                <AppImage
                src={post.image}
                alt={post.imageAlt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw" />
              
                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${categoryColors[post.category] ?? 'text-muted-foreground bg-muted/50'}`}>
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-3">
                <h3 className="font-semibold text-foreground leading-snug group-hover:text-primary transition-colors duration-200">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto pt-3 border-t border-border">
                  <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
                  <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</span>
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>);

}