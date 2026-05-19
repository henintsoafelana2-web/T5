import React from 'react';
import { MessageSquare, FileSearch, Cpu, Rocket } from 'lucide-react';

const steps = [
  { key: 'step-1', num: '01', icon: MessageSquare, title: 'Consultation', description: 'Échange initial pour comprendre vos besoins, objectifs et contraintes. Analyse du marché et de la concurrence.', color: 'text-primary', bgColor: 'bg-primary/10' },
  { key: 'step-2', num: '02', icon: FileSearch, title: 'Conception', description: 'Maquettes, wireframes et prototypes interactifs. Validation de l\'architecture et du design avant développement.', color: 'text-accent', bgColor: 'bg-accent/10' },
  { key: 'step-3', num: '03', icon: Cpu, title: 'Développement', description: 'Développement agile avec sprints réguliers. Tests continus, revues de code et démonstrations intermédiaires.', color: 'text-purple-400', bgColor: 'bg-purple-400/10' },
  { key: 'step-4', num: '04', icon: Rocket, title: 'Lancement', description: 'Déploiement, formation, documentation et support post-lancement. Suivi des performances et optimisations.', color: 'text-success', bgColor: 'bg-success/10' },
];

export default function ProcessSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold text-accent tracking-widest uppercase bg-accent/10 rounded-full mb-4">
            Notre Processus
          </span>
          <h2 className="text-section-title text-foreground mb-4">
            De l&apos;Idée au <span className="gradient-text">Lancement</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Un processus éprouvé en 4 étapes pour garantir le succès de votre projet digital.
          </p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps?.map((step, i) => (
              <div key={step?.key} className="flex flex-col items-center text-center gap-5 relative">
                {/* Number badge */}
                <div className="relative">
                  <div className={`w-16 h-16 rounded-2xl ${step?.bgColor} flex items-center justify-center relative z-10 shadow-lg`}>
                    <step.icon size={28} className={step?.color} />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full gradient-bg-primary text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step?.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}