'use client';

export type ServiceStatus = 'published' | 'draft';

export interface ServiceSEO {
  metaTitle: string;
  metaDescription: string;
  slug: string;
}

export interface AdminService {
  id: string;
  icon: string;
  image: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  technologies: string[];
  price: string;
  timeline: string;
  status: ServiceStatus;
  order: number;
  seo: ServiceSEO;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 't5_admin_services';

const defaultServices: AdminService[] = [
{
  id: 'svc-1',
  icon: 'Code2',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d744bf07-1772861530139.png",
  title: 'Développement Web',
  shortDescription: 'Sites web et applications web sur mesure avec les dernières technologies : Next.js, React, Node.js.',
  fullDescription: 'Nous concevons et développons des sites web et applications web performants, modernes et évolutifs. Notre équipe maîtrise les dernières technologies front-end et back-end pour livrer des solutions qui répondent exactement à vos besoins métier. De la simple vitrine au SaaS complexe, nous assurons qualité, performance et maintenabilité.',
  features: ['Sites vitrine', 'Applications web', 'API REST', 'PWA', 'E-commerce', 'Intégrations tierces'],
  technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
  price: 'À partir de 500 000 Ar',
  timeline: '2 à 8 semaines',
  status: 'published',
  order: 1,
  seo: {
    metaTitle: 'Développement Web Sur Mesure | T5-SERVICES Madagascar',
    metaDescription: 'Création de sites web et applications web professionnels à Madagascar. Next.js, React, Node.js. Devis gratuit.',
    slug: 'developpement-web'
  },
  createdAt: '2026-01-10T08:00:00Z',
  updatedAt: '2026-04-15T10:30:00Z'
},
{
  id: 'svc-2',
  icon: 'Palette',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1765fc254-1779137060020.png",
  title: 'Design UI/UX',
  shortDescription: 'Interfaces utilisateur modernes et intuitives. Prototypage, maquettes Figma, design systems.',
  fullDescription: 'Notre studio de design crée des expériences utilisateur mémorables. Nous combinons recherche utilisateur, design thinking et esthétique moderne pour produire des interfaces qui convertissent et fidélisent. Chaque pixel est pensé pour guider l\'utilisateur vers son objectif.',
  features: ['Wireframing', 'Prototypage interactif', 'Design System', 'Audit UX', 'Tests utilisateurs', 'Handoff développeurs'],
  technologies: ['Figma', 'Adobe XD', 'Framer', 'Storybook', 'Zeplin'],
  price: 'À partir de 300 000 Ar',
  timeline: '1 à 4 semaines',
  status: 'published',
  order: 2,
  seo: {
    metaTitle: 'Design UI/UX Professionnel | T5-SERVICES Madagascar',
    metaDescription: 'Studio de design UI/UX à Madagascar. Maquettes Figma, prototypage, design systems. Interfaces modernes et intuitives.',
    slug: 'design-ui-ux'
  },
  createdAt: '2026-01-12T08:00:00Z',
  updatedAt: '2026-04-10T09:00:00Z'
},
{
  id: 'svc-3',
  icon: 'Smartphone',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_11fc08f8b-1778827247831.png",
  title: 'Applications Mobiles',
  shortDescription: 'Applications iOS et Android avec React Native. Performance native, expérience premium.',
  fullDescription: 'Nous développons des applications mobiles cross-platform avec React Native, offrant une expérience native sur iOS et Android depuis une seule base de code. Nos apps sont rapides, fluides et disponibles sur les stores officiels.',
  features: ['iOS & Android', 'React Native', 'Push notifications', 'Publication App Store', 'Offline mode', 'Analytics intégrés'],
  technologies: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'Redux Toolkit'],
  price: 'À partir de 1 000 000 Ar',
  timeline: '4 à 12 semaines',
  status: 'published',
  order: 3,
  seo: {
    metaTitle: 'Développement Applications Mobiles | T5-SERVICES Madagascar',
    metaDescription: 'Création d\'applications mobiles iOS et Android avec React Native à Madagascar. Performance native, expérience premium.',
    slug: 'applications-mobiles'
  },
  createdAt: '2026-01-15T08:00:00Z',
  updatedAt: '2026-03-20T14:00:00Z'
},
{
  id: 'svc-4',
  icon: 'ShoppingCart',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_12688317c-1779137059657.png",
  title: 'E-Commerce',
  shortDescription: 'Boutiques en ligne performantes avec gestion des stocks, paiements et livraisons intégrés.',
  fullDescription: 'Lancez votre boutique en ligne avec une solution e-commerce complète et performante. Gestion des produits, des commandes, des paiements mobiles (MVola, Orange Money) et des livraisons. Optimisé pour la conversion et le SEO.',
  features: ['Catalogue produits', 'Paiement mobile (MVola)', 'Gestion stocks', 'Tableau de bord vendeur', 'SEO e-commerce', 'Multi-devises'],
  technologies: ['Next.js', 'Stripe', 'WooCommerce', 'Shopify', 'PostgreSQL'],
  price: 'À partir de 800 000 Ar',
  timeline: '3 à 10 semaines',
  status: 'published',
  order: 4,
  seo: {
    metaTitle: 'Création Boutique E-Commerce | T5-SERVICES Madagascar',
    metaDescription: 'Boutiques en ligne performantes à Madagascar. Paiement MVola, gestion stocks, SEO. Devis gratuit.',
    slug: 'e-commerce'
  },
  createdAt: '2026-02-01T08:00:00Z',
  updatedAt: '2026-04-01T11:00:00Z'
},
{
  id: 'svc-5',
  icon: 'BarChart3',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f415eeea-1773886319027.png",
  title: 'SEO & Marketing Digital',
  shortDescription: 'Optimisation moteurs de recherche, Google Ads, réseaux sociaux et stratégie de contenu.',
  fullDescription: 'Augmentez votre visibilité en ligne avec notre expertise SEO et marketing digital. Audit technique, optimisation on-page, link building, gestion des campagnes Google Ads et réseaux sociaux. Résultats mesurables et reporting mensuel.',
  features: ['Audit SEO complet', 'Google Ads', 'Social Media Management', 'Analytics & Reporting', 'Content Marketing', 'Link Building'],
  technologies: ['Google Analytics', 'Google Search Console', 'SEMrush', 'Ahrefs', 'Meta Ads'],
  price: 'À partir de 200 000 Ar/mois',
  timeline: 'Contrat mensuel',
  status: 'draft',
  order: 5,
  seo: {
    metaTitle: 'SEO & Marketing Digital Madagascar | T5-SERVICES',
    metaDescription: 'Agence SEO et marketing digital à Madagascar. Google Ads, réseaux sociaux, audit SEO. Résultats garantis.',
    slug: 'seo-marketing-digital'
  },
  createdAt: '2026-02-10T08:00:00Z',
  updatedAt: '2026-04-20T16:00:00Z'
},
{
  id: 'svc-6',
  icon: 'Shield',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f3624755-1779137059447.png",
  title: 'Sécurité & Maintenance',
  shortDescription: 'Audit de sécurité, maintenance préventive, sauvegardes automatiques et monitoring 24/7.',
  fullDescription: 'Protégez votre présence digitale avec nos services de sécurité et maintenance. Audit de vulnérabilités, mises à jour régulières, sauvegardes automatiques, monitoring de disponibilité et intervention rapide en cas d\'incident.',
  features: ['Audit sécurité', 'SSL/HTTPS', 'Monitoring 24/7', 'Sauvegardes auto', 'Mises à jour', 'Rapport mensuel'],
  technologies: ['Cloudflare', 'Let\'s Encrypt', 'Uptime Robot', 'Sentry', 'Nginx'],
  price: 'À partir de 150 000 Ar/mois',
  timeline: 'Contrat mensuel',
  status: 'draft',
  order: 6,
  seo: {
    metaTitle: 'Sécurité & Maintenance Web | T5-SERVICES Madagascar',
    metaDescription: 'Services de sécurité et maintenance web à Madagascar. Monitoring 24/7, sauvegardes, audit sécurité.',
    slug: 'securite-maintenance'
  },
  createdAt: '2026-02-15T08:00:00Z',
  updatedAt: '2026-04-18T09:30:00Z'
}];


function loadServices(): AdminService[] {
  if (typeof window === 'undefined') return defaultServices;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as AdminService[];
  } catch {}
  return defaultServices;
}

function saveServices(services: AdminService[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
  } catch {}
}

export function getServices(): AdminService[] {
  return loadServices();
}

export function getServiceById(id: string): AdminService | undefined {
  return loadServices().find((s) => s.id === id);
}

export function createService(data: Omit<AdminService, 'id' | 'createdAt' | 'updatedAt'>): AdminService {
  const services = loadServices();
  const newService: AdminService = {
    ...data,
    id: `svc-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  saveServices([...services, newService]);
  return newService;
}

export function updateService(id: string, data: Partial<Omit<AdminService, 'id' | 'createdAt'>>): AdminService | null {
  const services = loadServices();
  const idx = services.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  const updated = { ...services[idx], ...data, updatedAt: new Date().toISOString() };
  services[idx] = updated;
  saveServices(services);
  return updated;
}

export function deleteService(id: string): boolean {
  const services = loadServices();
  const filtered = services.filter((s) => s.id !== id);
  if (filtered.length === services.length) return false;
  saveServices(filtered);
  return true;
}

export function toggleServiceStatus(id: string): AdminService | null {
  const service = getServiceById(id);
  if (!service) return null;
  return updateService(id, { status: service.status === 'published' ? 'draft' : 'published' });
}

export const ICON_OPTIONS = [
'Code2', 'Palette', 'Smartphone', 'ShoppingCart', 'BarChart3', 'Shield',
'Globe', 'Zap', 'Database', 'Cloud', 'Lock', 'Settings', 'Star', 'Layers',
'Monitor', 'Server', 'Wifi', 'Camera', 'Video', 'Mail'];