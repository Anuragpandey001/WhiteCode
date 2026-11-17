import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { getPosts, getProjects, getServices } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, '');
  const [services, projects, posts] = await Promise.all([
    getServices(),
    getProjects(),
    getPosts(),
  ]);

  const staticRoutes = [
    '',
    '/services',
    '/portfolio',
    '/pricing',
    '/about',
    '/blog',
    '/careers',
    '/contact',
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  return [
    ...staticRoutes,
    ...services.map((service) => ({
      url: `${base}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...projects.map((project) => ({
      url: `${base}/portfolio/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...posts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt || Date.now()),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ];
}
