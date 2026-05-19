-- ============================================================
-- Portfolio Projects Module
-- ============================================================

-- 1. ENUM types
DROP TYPE IF EXISTS public.project_status CASCADE;
CREATE TYPE public.project_status AS ENUM ('published', 'draft');

DROP TYPE IF EXISTS public.project_category CASCADE;
CREATE TYPE public.project_category AS ENUM (
  'web',
  'mobile',
  'ai',
  'data',
  'design',
  'video',
  'cctv',
  'solar',
  'photography',
  'events'
);

-- 2. Core table
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category public.project_category NOT NULL DEFAULT 'web'::public.project_category,
  description TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  technologies TEXT[] DEFAULT ARRAY[]::TEXT[],
  demo_url TEXT,
  github_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  publish_status public.project_status NOT NULL DEFAULT 'draft'::public.project_status,
  sort_order INTEGER NOT NULL DEFAULT 0,
  backup_timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Indexes
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_category ON public.portfolio_projects(category);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_status ON public.portfolio_projects(publish_status);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_featured ON public.portfolio_projects(featured);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_sort ON public.portfolio_projects(sort_order);

-- 4. updated_at trigger function
CREATE OR REPLACE FUNCTION public.set_portfolio_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  NEW.version = OLD.version + 1;
  NEW.backup_timestamp = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$;

-- 5. Enable RLS
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies
-- Public can read published projects
DROP POLICY IF EXISTS "public_read_published_portfolio" ON public.portfolio_projects;
CREATE POLICY "public_read_published_portfolio"
ON public.portfolio_projects
FOR SELECT
TO public
USING (publish_status = 'published'::public.project_status);

-- Authenticated users (admins) can do everything
DROP POLICY IF EXISTS "authenticated_manage_portfolio" ON public.portfolio_projects;
CREATE POLICY "authenticated_manage_portfolio"
ON public.portfolio_projects
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 7. Trigger
DROP TRIGGER IF EXISTS portfolio_projects_updated_at ON public.portfolio_projects;
CREATE TRIGGER portfolio_projects_updated_at
  BEFORE UPDATE ON public.portfolio_projects
  FOR EACH ROW
  EXECUTE FUNCTION public.set_portfolio_updated_at();

-- 8. Seed data — T5-SERVICES portfolio projects
DO $$
BEGIN
  INSERT INTO public.portfolio_projects
    (id, title, category, description, images, technologies, demo_url, github_url, featured, publish_status, sort_order)
  VALUES
    (
      gen_random_uuid(), 'Site Vitrine Professionnel', 'web'::public.project_category,
      'Création d''un site vitrine moderne pour une entreprise locale avec Next.js et Tailwind CSS. Design responsive, SEO optimisé et performances élevées.',
      '[{"url":"https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800","alt":"Site vitrine professionnel"}]'::jsonb,
      ARRAY['Next.js','React','TypeScript','Tailwind CSS','Vercel'],
      'https://example.com', NULL, true, 'published'::public.project_status, 1
    ),
    (
      gen_random_uuid(), 'Application E-Commerce', 'web'::public.project_category,
      'Boutique en ligne complète avec paiement MVola et Orange Money, gestion des stocks et tableau de bord vendeur.',
      '[{"url":"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800","alt":"Application e-commerce"}]'::jsonb,
      ARRAY['Next.js','Node.js','PostgreSQL','Stripe','Tailwind CSS'],
      'https://example.com', NULL, true, 'published'::public.project_status, 2
    ),
    (
      gen_random_uuid(), 'Application Mobile Flutter', 'mobile'::public.project_category,
      'Application mobile cross-platform iOS/Android pour la gestion de livraisons avec tracking en temps réel.',
      '[{"url":"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800","alt":"Application mobile Flutter"}]'::jsonb,
      ARRAY['Flutter','Dart','Firebase','Google Maps API'],
      NULL, NULL, true, 'published'::public.project_status, 3
    ),
    (
      gen_random_uuid(), 'Chatbot IA Support Client', 'ai'::public.project_category,
      'Chatbot intelligent intégré sur un site e-commerce pour répondre aux questions clients 24h/24 avec traitement du langage naturel.',
      '[{"url":"https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800","alt":"Chatbot IA"}]'::jsonb,
      ARRAY['Python','OpenAI GPT-4','LangChain','FastAPI','React'],
      NULL, NULL, false, 'published'::public.project_status, 4
    ),
    (
      gen_random_uuid(), 'Dashboard Analytics Data', 'data'::public.project_category,
      'Tableau de bord analytique pour une entreprise de distribution avec visualisation des ventes, stocks et KPIs en temps réel.',
      '[{"url":"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800","alt":"Dashboard analytics"}]'::jsonb,
      ARRAY['Python','Apache Airflow','PostgreSQL','Metabase','dbt'],
      NULL, NULL, false, 'published'::public.project_status, 5
    ),
    (
      gen_random_uuid(), 'Identité Visuelle & Branding', 'design'::public.project_category,
      'Création complète de l''identité visuelle d''une startup : logo, charte graphique, supports print et digitaux.',
      '[{"url":"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800","alt":"Identité visuelle branding"}]'::jsonb,
      ARRAY['Figma','Adobe Illustrator','Adobe Photoshop'],
      NULL, NULL, false, 'published'::public.project_status, 6
    ),
    (
      gen_random_uuid(), 'Clip Publicitaire Produit', 'video'::public.project_category,
      'Production d''un clip publicitaire pour le lancement d''un nouveau produit cosmétique local avec motion design.',
      '[{"url":"https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800","alt":"Production vidéo clip"}]'::jsonb,
      ARRAY['Adobe Premiere Pro','After Effects','DaVinci Resolve'],
      NULL, NULL, false, 'published'::public.project_status, 7
    ),
    (
      gen_random_uuid(), 'Installation CCTV Bureau', 'cctv'::public.project_category,
      'Installation d''un système de surveillance complet pour un immeuble de bureaux : 16 caméras IP, NVR et accès mobile.',
      '[{"url":"https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800","alt":"Installation caméras CCTV"}]'::jsonb,
      ARRAY['Caméras IP Hikvision','NVR','Configuration réseau','Application mobile'],
      NULL, NULL, false, 'published'::public.project_status, 8
    ),
    (
      gen_random_uuid(), 'Installation Solaire Résidentielle', 'solar'::public.project_category,
      'Installation d''un système solaire de 5kWc pour une villa avec batteries de stockage et monitoring de production.',
      '[{"url":"https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800","alt":"Panneaux solaires installation"}]'::jsonb,
      ARRAY['Panneaux Jinko Solar','Onduleur Growatt','Batteries LiFePO4','Monitoring'],
      NULL, NULL, false, 'published'::public.project_status, 9
    ),
    (
      gen_random_uuid(), 'Couverture Mariage Cinématographique', 'events'::public.project_category,
      'Couverture photo et vidéo d''un mariage avec drone, montage cinématographique et album photo professionnel.',
      '[{"url":"https://images.unsplash.com/photo-1519741497674-611481863552?w=800","alt":"Photographie mariage"}]'::jsonb,
      ARRAY['Sony A7 IV','DJI Mavic 3','Adobe Lightroom','Premiere Pro'],
      NULL, NULL, true, 'published'::public.project_status, 10
    )
  ON CONFLICT (id) DO NOTHING;

EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Seed data insertion failed: %', SQLERRM;
END $$;
