'use client';
import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Sparkles, Code2, Palette, TrendingUp } from 'lucide-react';

const words = ['Digitales', 'Modernes', 'Performantes', 'Innovantes'];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % words?.length);
        setVisible(true);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const floatingCards = [
    { icon: Code2, label: 'Développement Web', value: '150+ projets', color: 'text-primary', key: 'float-dev' },
    { icon: Palette, label: 'Design UI/UX', value: '98% satisfaction', color: 'text-accent', key: 'float-design' },
    { icon: TrendingUp, label: 'Performance', value: 'Score 99/100', color: 'text-success', key: 'float-perf' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-bg-hero pt-20"
    >
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 blob-blue opacity-60 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 blob-cyan opacity-40 pointer-events-none" />
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-light w-fit">
              <Sparkles size={14} className="text-accent" />
              <span className="text-xs font-semibold text-accent tracking-wider uppercase">
                Agence Digitale à Madagascar
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-hero-xl text-foreground">
              Vos Solutions{' '}
              <span
                className={`gradient-text inline-block transition-all duration-300 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                }`}
              >
                {words?.[wordIndex]}
              </span>
              <br />
              <span className="text-foreground">Commencent Ici</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Nous transformons vos idées en solutions digitales modernes et performantes.
              <strong className="text-foreground"> Your Vision, Our Creation</strong> — Développement web,
              design UI/UX, et stratégie digitale sur mesure.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="flex items-center gap-2 px-6 py-3.5 font-semibold text-white gradient-bg-primary rounded-xl hover:opacity-90 active:scale-95 transition-all duration-150 shadow-lg shadow-primary/30 animate-glow"
              >
                Démarrer un Projet
                <ArrowRight size={18} />
              </a>
              <a
                href="#portfolio"
                className="flex items-center gap-2 px-6 py-3.5 font-semibold text-foreground glass-card rounded-xl hover:border-primary/40 active:scale-95 transition-all duration-150"
              >
                <Play size={16} className="text-accent" />
                Voir nos Réalisations
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 pt-2">
              {[
                { value: '5+', label: 'Ans d\'expérience', key: 'trust-exp' },
                { value: '150+', label: 'Projets livrés', key: 'trust-proj' },
                { value: '98%', label: 'Clients satisfaits', key: 'trust-sat' },
              ]?.map((item) => (
                <div key={item?.key} className="flex flex-col gap-0.5">
                  <span className="text-2xl font-bold gradient-text tabular-nums">{item?.value}</span>
                  <span className="text-xs text-muted-foreground font-medium">{item?.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Visual */}
          <div className="relative hidden lg:flex items-center justify-center">
            {/* Main card */}
            <div className="relative w-full max-w-md">
              <div className="glass-card rounded-3xl p-8 shadow-2xl shadow-primary/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-danger" />
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <span className="ml-2 text-xs text-muted-foreground font-mono">t5services.mg</span>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-muted/50 rounded-full w-3/4" />
                  <div className="h-4 bg-muted/50 rounded-full w-full" />
                  <div className="h-4 bg-muted/50 rounded-full w-2/3" />
                  <div className="h-20 gradient-bg-primary rounded-xl mt-4 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">Landing Page Premium</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="h-12 bg-muted/30 rounded-lg" />
                    <div className="h-12 bg-muted/30 rounded-lg" />
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              {floatingCards?.map((card, i) => (
                <div
                  key={card?.key}
                  className="absolute glass-card rounded-xl px-4 py-3 shadow-lg animate-float"
                  style={{
                    top: i === 0 ? '-1rem' : i === 1 ? '40%' : 'auto',
                    bottom: i === 2 ? '-1rem' : 'auto',
                    right: i === 0 ? '-2rem' : 'auto',
                    left: i === 1 ? '-2.5rem' : i === 2 ? '1rem' : 'auto',
                    animationDelay: `${i * 1.5}s`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <card.icon size={16} className={card?.color} />
                    <div>
                      <div className="text-xs font-semibold text-foreground">{card?.label}</div>
                      <div className="text-xs text-muted-foreground">{card?.value}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
        <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase">Découvrir</span>
      </div>
    </section>
  );
}