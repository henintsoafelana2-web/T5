'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, Globe, ChevronDown, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';

const navLinks = [
  { label: 'Accueil', href: '#hero', key: 'nav-home' },
  { label: 'Services', href: '#services', key: 'nav-services' },
  { label: 'Portfolio', href: '#portfolio', key: 'nav-portfolio' },
  { label: 'Tarifs', href: '#pricing', key: 'nav-pricing' },
  { label: 'Blog', href: '#blog', key: 'nav-blog' },
  { label: 'Contact', href: '#contact', key: 'nav-contact' },
];

const languages = [
  { code: 'fr', label: 'Français', key: 'lang-fr' },
  { code: 'mg', label: 'Malagasy', key: 'lang-mg' },
  { code: 'en', label: 'English', key: 'lang-en' },
];

export default function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeLang, setActiveLang] = useState('fr');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-xl border-b border-border shadow-lg shadow-primary/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 border border-border">
              <Image
                src="/assets/images/image-1779177091981.png"
                alt="T5-Services logo — fond noir, T5 blanc esquissé, texte doré TEAM FIVE SERVICES"
                width={36}
                height={36}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <span className="font-sans font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-200 hidden sm:block">
              T5-SERVICES
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks?.map((link) => (
              <a
                key={link?.key}
                href={link?.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200"
              >
                {link?.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Passer en mode bleu' : 'Passer en mode clair'}
              title={theme === 'light' ? 'Mode Bleu' : 'Mode Clair'}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200 border border-border"
            >
              {theme === 'light' ? (
                <>
                  <Moon size={16} className="text-primary" />
                  <span className="hidden sm:inline text-xs font-semibold">Bleu</span>
                </>
              ) : (
                <>
                  <Sun size={16} className="text-yellow-400" />
                  <span className="hidden sm:inline text-xs font-semibold">Clair</span>
                </>
              )}
            </button>

            {/* Language Switcher */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200"
              >
                <Globe size={16} />
                <span className="uppercase">{activeLang}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 w-36 glass-card rounded-xl shadow-xl overflow-hidden">
                  {languages?.map((lang) => (
                    <button
                      key={lang?.key}
                      onClick={() => { setActiveLang(lang?.code); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 ${
                        activeLang === lang?.code
                          ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      {lang?.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/admin-dashboard"
              className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground border border-border hover:border-primary/50 rounded-lg transition-all duration-200"
            >
              Admin
            </Link>

            <a
              href="#contact"
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white gradient-bg-primary rounded-lg hover:opacity-90 active:scale-95 transition-all duration-150 shadow-lg shadow-primary/25"
            >
              Devis Gratuit
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } bg-background/95 backdrop-blur-xl border-b border-border`}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {navLinks?.map((link) => (
            <a
              key={`mobile-${link?.key}`}
              href={link?.href}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200"
            >
              {link?.label}
            </a>
          ))}
          <div className="flex gap-2 mt-2 pt-2 border-t border-border items-center">
            {languages?.map((lang) => (
              <button
                key={`mobile-${lang?.key}`}
                onClick={() => setActiveLang(lang?.code)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 ${
                  activeLang === lang?.code
                    ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {lang?.code?.toUpperCase()}
              </button>
            ))}
            <button
              onClick={toggleTheme}
              className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-muted-foreground hover:text-foreground transition-all duration-150"
            >
              {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
              {theme === 'light' ? 'Mode Bleu' : 'Mode Clair'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}