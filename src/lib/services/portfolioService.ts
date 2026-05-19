'use client';

import { createClient } from '@/lib/supabase/client';

export type ProjectStatus = 'published' | 'draft';
export type ProjectCategory =
  | 'web' | 'mobile' | 'ai' | 'data' | 'design' |'video' | 'cctv' | 'solar' | 'photography' | 'events';

export interface ProjectImage {
  url: string;
  alt: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  images: ProjectImage[];
  technologies: string[];
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
  publishStatus: ProjectStatus;
  sortOrder: number;
  backupTimestamp: string;
  version: number;
  createdAt: string;
  updatedAt: string;
}

function isSchemaError(error: any): boolean {
  if (!error) return false;
  if (error.code && typeof error.code === 'string') {
    const cls = error.code.substring(0, 2);
    if (cls === '42' || cls === '08') return true;
    if (cls === '23') return false;
  }
  if (error.message) {
    return /relation.*does not exist|column.*does not exist|function.*does not exist|syntax error|type.*does not exist/i.test(error.message);
  }
  return false;
}

function rowToProject(row: any): PortfolioProject {
  return {
    id: row.id,
    title: row.title,
    category: row.category as ProjectCategory,
    description: row.description ?? '',
    images: Array.isArray(row.images) ? row.images : [],
    technologies: Array.isArray(row.technologies) ? row.technologies : [],
    demoUrl: row.demo_url ?? '',
    githubUrl: row.github_url ?? '',
    featured: row.featured ?? false,
    publishStatus: row.publish_status as ProjectStatus,
    sortOrder: row.sort_order ?? 0,
    backupTimestamp: row.backup_timestamp ?? row.updated_at,
    version: row.version ?? 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export const portfolioService = {
  async getAll(): Promise<PortfolioProject[]> {
    const supabase = createClient();
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) {
        if (isSchemaError(error)) throw error;
        return [];
      }
      return (data ?? []).map(rowToProject);
    } catch (err: any) {
      throw err;
    }
  },

  async getById(id: string): Promise<PortfolioProject | null> {
    const supabase = createClient();
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      if (error) {
        if (isSchemaError(error)) throw error;
        return null;
      }
      return data ? rowToProject(data) : null;
    } catch (err: any) {
      throw err;
    }
  },

  async create(project: Omit<PortfolioProject, 'id' | 'createdAt' | 'updatedAt' | 'backupTimestamp' | 'version'>): Promise<PortfolioProject> {
    const supabase = createClient();
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .insert({
          title: project.title,
          category: project.category,
          description: project.description,
          images: project.images,
          technologies: project.technologies,
          demo_url: project.demoUrl || null,
          github_url: project.githubUrl || null,
          featured: project.featured,
          publish_status: project.publishStatus,
          sort_order: project.sortOrder,
        })
        .select()
        .single();
      if (error) {
        if (isSchemaError(error)) throw error;
        throw new Error(error.message);
      }
      return rowToProject(data);
    } catch (err: any) {
      throw err;
    }
  },

  async update(id: string, project: Partial<Omit<PortfolioProject, 'id' | 'createdAt'>>): Promise<PortfolioProject> {
    const supabase = createClient();
    // Conflict detection: check current version
    const current = await this.getById(id);
    if (!current) throw new Error('Project not found');
    if (project.version !== undefined && project.version < current.version) {
      throw new Error(`CONFLICT:${current.version}`);
    }
    try {
      const payload: any = {};
      if (project.title !== undefined) payload.title = project.title;
      if (project.category !== undefined) payload.category = project.category;
      if (project.description !== undefined) payload.description = project.description;
      if (project.images !== undefined) payload.images = project.images;
      if (project.technologies !== undefined) payload.technologies = project.technologies;
      if (project.demoUrl !== undefined) payload.demo_url = project.demoUrl || null;
      if (project.githubUrl !== undefined) payload.github_url = project.githubUrl || null;
      if (project.featured !== undefined) payload.featured = project.featured;
      if (project.publishStatus !== undefined) payload.publish_status = project.publishStatus;
      if (project.sortOrder !== undefined) payload.sort_order = project.sortOrder;

      const { data, error } = await supabase
        .from('portfolio_projects')
        .update(payload)
        .eq('id', id)
        .select()
        .single();
      if (error) {
        if (isSchemaError(error)) throw error;
        throw new Error(error.message);
      }
      return rowToProject(data);
    } catch (err: any) {
      throw err;
    }
  },

  async delete(id: string): Promise<void> {
    const supabase = createClient();
    try {
      const { error } = await supabase
        .from('portfolio_projects')
        .delete()
        .eq('id', id);
      if (error) {
        if (isSchemaError(error)) throw error;
        throw new Error(error.message);
      }
    } catch (err: any) {
      throw err;
    }
  },

  async bulkImport(projects: Omit<PortfolioProject, 'id' | 'createdAt' | 'updatedAt' | 'backupTimestamp' | 'version'>[]): Promise<number> {
    const supabase = createClient();
    try {
      const rows = projects.map((p) => ({
        title: p.title,
        category: p.category,
        description: p.description,
        images: p.images,
        technologies: p.technologies,
        demo_url: p.demoUrl || null,
        github_url: p.githubUrl || null,
        featured: p.featured,
        publish_status: p.publishStatus,
        sort_order: p.sortOrder,
      }));
      const { data, error } = await supabase
        .from('portfolio_projects')
        .insert(rows)
        .select();
      if (error) {
        if (isSchemaError(error)) throw error;
        throw new Error(error.message);
      }
      return data?.length ?? 0;
    } catch (err: any) {
      throw err;
    }
  },
};
