import type {
  ApiEnvelope,
  Faq,
  Industry,
  Job,
  Post,
  Project,
  ServiceItem,
  SiteSettings,
  TeamMember,
  Testimonial,
} from './types';
import {
  fallbackFaqs,
  fallbackIndustries,
  fallbackJobs,
  fallbackPosts,
  fallbackProjects,
  fallbackServices,
  fallbackSettings,
  fallbackTeam,
  fallbackTestimonials,
} from './fallback';

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001/api/v1';

/**
 * Server-side GET with graceful degradation: if the API is down we render
 * the bundled fallback content instead of an error page.
 */
async function get<T>(path: string, fallback: T, revalidate = 300): Promise<T> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      next: { revalidate },
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return fallback;

    const json = (await res.json()) as ApiEnvelope<T>;
    const data = json?.data;
    if (data === null || data === undefined) return fallback;
    if (Array.isArray(data) && data.length === 0) return fallback;
    return data;
  } catch {
    return fallback;
  }
}

/** Same as get(), but an empty/missing result stays empty (no demo content). */
async function getStrict<T>(path: string, empty: T, revalidate = 300): Promise<T> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      next: { revalidate },
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return empty;
    const json = (await res.json()) as ApiEnvelope<T>;
    return (json?.data ?? empty) as T;
  } catch {
    return empty;
  }
}

// ---------------- services ----------------
export const getServices = (category?: string) =>
  get<ServiceItem[]>(
    `/services${category && category !== 'all' ? `?category=${category}` : ''}`,
    category && category !== 'all'
      ? fallbackServices.filter((s) => s.category === category)
      : fallbackServices,
  );

export const getFeaturedServices = (limit = 8) =>
  get<ServiceItem[]>(
    `/services/featured?limit=${limit}`,
    fallbackServices.filter((s) => s.featured).slice(0, limit),
  );

export async function getService(slug: string): Promise<ServiceItem | null> {
  const fallback = fallbackServices.find((s) => s.slug === slug) ?? null;
  return get<ServiceItem | null>(`/services/slug/${slug}`, fallback);
}

// ---------------- projects ----------------
export const getProjects = (type?: string) =>
  get<Project[]>(
    `/projects${type && type !== 'all' ? `?type=${type}` : ''}`,
    type && type !== 'all'
      ? fallbackProjects.filter((p) => p.type === type)
      : fallbackProjects,
  );

export const getFeaturedProjects = (limit = 6) =>
  get<Project[]>(
    `/projects/featured?limit=${limit}`,
    fallbackProjects.slice(0, limit),
  );

export async function getProject(slug: string): Promise<Project | null> {
  const fallback = fallbackProjects.find((p) => p.slug === slug) ?? null;
  return get<Project | null>(`/projects/slug/${slug}`, fallback);
}

// ---------------- blog ----------------
export const getPosts = (limit?: number) =>
  get<Post[]>(
    `/blog${limit ? `?limit=${limit}` : ''}`,
    limit ? fallbackPosts.slice(0, limit) : fallbackPosts,
  );

export async function getPost(
  slug: string,
): Promise<{ post: Post; related: Post[] } | null> {
  const local = fallbackPosts.find((p) => p.slug === slug);
  const fallback = local
    ? {
        post: local,
        related: fallbackPosts.filter((p) => p.slug !== slug).slice(0, 3),
      }
    : null;
  return get<{ post: Post; related: Post[] } | null>(
    `/blog/slug/${slug}`,
    fallback,
    60,
  );
}

// ---------------- the rest ----------------
export const getTestimonials = (limit?: number) =>
  get<Testimonial[]>(
    `/testimonials${limit ? `?limit=${limit}` : ''}`,
    limit ? fallbackTestimonials.slice(0, limit) : fallbackTestimonials,
  );

export const getTeam = () => get<TeamMember[]>('/team', fallbackTeam);

export const getFaqs = (category?: string) =>
  get<Faq[]>(
    `/faqs${category && category !== 'all' ? `?category=${category}` : ''}`,
    fallbackFaqs,
  );

export const getIndustries = () =>
  get<Industry[]>('/industries', fallbackIndustries);

export const getJobs = () => get<Job[]>('/careers', fallbackJobs);

export async function getJob(slug: string): Promise<Job | null> {
  const fallback = fallbackJobs.find((j) => j.slug === slug) ?? null;
  return get<Job | null>(`/careers/slug/${slug}`, fallback);
}

export const getSettings = () =>
  get<SiteSettings>('/settings', fallbackSettings, 120);

export { getStrict };
