import React from 'react';
import AppLogo from '@/components/ui/AppLogo';
import { Globe, Share2, AtSign, Link2, PlayCircle, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

const footerLinks = {
  services: [
    { label: 'Développement Web', href: '#services', key: 'fl-web' },
    { label: 'Design UI/UX', href: '#services', key: 'fl-design' },
    { label: 'Applications Mobiles', href: '#services', key: 'fl-mobile' },
    { label: 'E-Commerce', href: '#services', key: 'fl-ecom' },
    { label: 'SEO & Marketing', href: '#services', key: 'fl-seo' },
  ],
  company: [
    { label: 'À Propos', href: '#', key: 'fl-about' },
    { label: 'Portfolio', href: '#portfolio', key: 'fl-portfolio' },
    { label: 'Blog', href: '#blog', key: 'fl-blog' },
    { label: 'Carrières', href: '#', key: 'fl-careers' },
    { label: 'Contact', href: '#contact', key: 'fl-contact' },
  ],
  legal: [
    { label: 'Politique de Confidentialité', href: '#', key: 'fl-privacy' },
    { label: 'Conditions d\'Utilisation', href: '#', key: 'fl-terms' },
    { label: 'Mentions Légales', href: '#', key: 'fl-legal' },
  ],
};

const socials = [
  { key: 'soc-fb', icon: Globe, href: '#', label: 'Facebook' },
  { key: 'soc-tw', icon: Share2, href: '#', label: 'Twitter' },
  { key: 'soc-ig', icon: AtSign, href: '#', label: 'Instagram' },
  { key: 'soc-li', icon: Link2, href: '#', label: 'LinkedIn' },
  { key: 'soc-yt', icon: PlayCircle, href: '#', label: 'YouTube' },
];

export default function LandingFooter() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <AppLogo size={36} />
              <span className="font-sans text-xl font-bold text-foreground">T5-SERVICES</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
              Votre partenaire de transformation digitale à Madagascar. Nous créons des solutions
              web modernes et performantes depuis 2019.
            </p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2"><MapPin size={14} className="text-primary shrink-0" /> Antananarivo, Madagascar</div>
              <div className="flex items-center gap-2"><Phone size={14} className="text-primary shrink-0" /> +261 XX XX XXX XX</div>
              <div className="flex items-center gap-2"><Mail size={14} className="text-primary shrink-0" /> contact@t5services.mg</div>
            </div>
            <div className="flex gap-3">
              {socials?.map((social) => (
                <a
                  key={social?.key}
                  href={social?.href}
                  aria-label={social?.label}
                  className="w-9 h-9 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Services</h4>
            <ul className="flex flex-col gap-2">
              {footerLinks?.services?.map((link) => (
                <li key={link?.key}>
                  <a href={link?.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Entreprise</h4>
            <ul className="flex flex-col gap-2">
              {footerLinks?.company?.map((link) => (
                <li key={link?.key}>
                  <a href={link?.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Légal</h4>
            <ul className="flex flex-col gap-2">
              {footerLinks?.legal?.map((link) => (
                <li key={link?.key}>
                  <a href={link?.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link
                href="/admin-dashboard"
                className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Accès Admin →
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>© 2026 T5-SERVICES. Tous droits réservés.</span>
          <span className="flex items-center gap-1.5">
            Fait avec ❤️ à Antananarivo, Madagascar
          </span>
        </div>
      </div>
    </footer>
  );
}