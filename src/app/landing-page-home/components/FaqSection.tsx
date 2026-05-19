'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { key: 'faq-1', q: 'Combien de temps prend la création d\'un site web ?', a: 'Le délai dépend de la complexité du projet. Un site vitrine simple prend 1 à 2 semaines, un site e-commerce 3 à 6 semaines, et une application web sur mesure 2 à 4 mois. Nous établissons un calendrier précis lors de la phase de conception.' },
  { key: 'faq-2', q: 'Quels sont vos modes de paiement acceptés ?', a: 'Nous acceptons les virements bancaires, MVola, Orange Money, Airtel Money et les paiements par carte via Stripe pour les clients internationaux. Un acompte de 40% est requis au démarrage, le solde à la livraison.' },
  { key: 'faq-3', q: 'Proposez-vous la maintenance après livraison ?', a: 'Oui, nous proposons des contrats de maintenance mensuelle incluant les mises à jour de sécurité, sauvegardes, monitoring de performance et petites modifications de contenu. Les tarifs commencent à 150 000 Ar/mois.' },
  { key: 'faq-4', q: 'Mon site sera-t-il optimisé pour les moteurs de recherche ?', a: 'Absolument. Tous nos sites incluent une optimisation SEO de base : structure HTML sémantique, méta-données, vitesse de chargement, responsive design et intégration Google Analytics. Le SEO avancé est disponible en option.' },
  { key: 'faq-5', q: 'Travaillez-vous avec des clients hors de Madagascar ?', a: 'Oui, nous travaillons avec des clients dans toute l\'Afrique et à l\'international. Nous communiquons en français, anglais et malagasy. Les paiements internationaux sont acceptés via Stripe ou virement SWIFT.' },
  { key: 'faq-6', q: 'Puis-je modifier le contenu de mon site moi-même ?', a: 'Oui, tous nos sites sont livrés avec un système de gestion de contenu (CMS) intuitif. Nous fournissons une formation complète et une documentation pour que vous puissiez gérer votre contenu en toute autonomie.' },
  { key: 'faq-7', q: 'Que se passe-t-il si je ne suis pas satisfait du résultat ?', a: 'Nous travaillons par étapes avec validation à chaque phase. Des révisions illimitées sont incluses jusqu\'à votre satisfaction totale. Notre objectif est que vous soyez fier du résultat final.' },
  { key: 'faq-8', q: 'Proposez-vous des solutions pour les petits budgets ?', a: 'Oui, nous avons des solutions adaptées à tous les budgets. Nous pouvons proposer un développement par phases, en commençant par l\'essentiel et en ajoutant des fonctionnalités progressivement selon vos moyens.' },
];

export default function FaqSection() {
  const [openKey, setOpenKey] = useState<string | null>('faq-1');

  return (
    <section id="faq" className="py-20 lg:py-28">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="inline-block px-4 py-1.5 text-xs font-semibold text-accent tracking-widest uppercase bg-accent/10 rounded-full mb-4">
              FAQ
            </span>
            <h2 className="text-section-title text-foreground mb-6">
              Questions <span className="gradient-text">Fréquentes</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Vous avez une question ? Consultez notre FAQ ou contactez-nous directement.
              Notre équipe répond sous 2 heures en jours ouvrés.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white gradient-bg-primary rounded-xl hover:opacity-90 active:scale-95 transition-all duration-150 shadow-lg shadow-primary/25"
            >
              Poser une Question
            </a>
          </div>

          <div className="flex flex-col gap-3">
            {faqs?.map((faq) => (
              <div key={faq?.key} className="glass-card rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenKey(openKey === faq?.key ? null : faq?.key)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/30 transition-colors duration-150"
                >
                  <span className="text-sm font-semibold text-foreground pr-4">{faq?.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-muted-foreground shrink-0 transition-transform duration-300 ${openKey === faq?.key ? 'rotate-180 text-primary' : ''}`}
                  />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openKey === faq?.key ? 'max-h-48' : 'max-h-0'}`}>
                  <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                    {faq?.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}