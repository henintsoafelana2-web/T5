import React from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';

export default function CtaBanner() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16">
        <div className="relative rounded-3xl overflow-hidden gradient-bg-primary p-12 lg:p-16 text-center">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white blur-3xl" />
          </div>
          <div className="relative z-10 flex flex-col items-center gap-6">
            <h2 className="text-section-title text-white max-w-2xl">
              Prêt à Transformer Votre Vision en Réalité ?
            </h2>
            <p className="text-white/80 max-w-xl leading-relaxed">
              Démarrez votre projet digital dès aujourd&apos;hui. Consultation gratuite,
              devis sous 24 heures. Votre succès est notre priorité.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#contact"
                className="flex items-center gap-2 px-8 py-3.5 font-semibold text-primary bg-white rounded-xl hover:bg-white/90 active:scale-95 transition-all duration-150 shadow-lg"
              >
                Demander un Devis Gratuit <ArrowRight size={18} />
              </a>
              <a
                href="https://wa.me/261XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-3.5 font-semibold text-white border-2 border-white/40 rounded-xl hover:bg-white/10 active:scale-95 transition-all duration-150"
              >
                <MessageSquare size={18} /> WhatsApp Maintenant
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}