'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Users, Briefcase, Award, Clock } from 'lucide-react';

const stats = [
  { icon: Briefcase, value: 150, suffix: '+', label: 'Projets Réalisés', color: 'text-primary', key: 'stat-projects' },
  { icon: Users, value: 80, suffix: '+', label: 'Clients Satisfaits', color: 'text-accent', key: 'stat-clients' },
  { icon: Award, value: 5, suffix: ' ans', label: 'D\'Expérience', color: 'text-success', key: 'stat-exp' },
  { icon: Clock, value: 98, suffix: '%', label: 'Taux de Satisfaction', color: 'text-warning', key: 'stat-sat' },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ stat, animate }: { stat: typeof stats[0]; animate: boolean }) {
  const count = useCountUp(stat.value, 2000, animate);
  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col items-center text-center gap-3 hover:border-primary/40 transition-all duration-300 group">
      <div className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
        <stat.icon size={24} className={stat.color} />
      </div>
      <div className="tabular-nums">
        <span className="text-4xl font-bold gradient-text">{count}</span>
        <span className="text-2xl font-bold gradient-text">{stat.suffix}</span>
      </div>
      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 lg:py-20 bg-muted/20 border-y border-border">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.key} stat={stat} animate={animate} />
          ))}
        </div>
      </div>
    </section>
  );
}