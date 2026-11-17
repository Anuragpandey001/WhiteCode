'use client';

import { ResourceManager } from '@/components/admin/resource-manager';
import { StatusPill } from '@/components/admin/ui';

const types = [
  { value: 'web', label: 'Web' },
  { value: 'mobile', label: 'Mobile app' },
  { value: 'ai', label: 'AI' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'video', label: 'Video' },
  { value: 'branding', label: 'Branding' },
];

export default function AdminProjectsPage() {
  return (
    <ResourceManager
      config={{
        title: 'Portfolio',
        description:
          'Case studies with the results clients care about. These drive most enquiries.',
        singular: 'Case study',
        basePath: '/projects',
        defaults: { type: 'web', published: true, featured: true, order: 0 },
        fields: [
          { name: 'title', label: 'Project title', required: true },
          { name: 'slug', label: 'URL slug', help: 'Blank = from title' },
          { name: 'client', label: 'Client', placeholder: 'Multi-speciality clinic chain' },
          { name: 'type', label: 'Type', type: 'select', options: types },
          { name: 'industry', label: 'Industry', placeholder: 'Healthcare' },
          { name: 'liveUrl', label: 'Live URL', placeholder: 'https://' },
          {
            name: 'summary',
            label: 'Summary (card text)',
            type: 'textarea',
            required: true,
            full: true,
            rows: 2,
          },
          {
            name: 'description',
            label: 'What we built (case study body)',
            type: 'textarea',
            full: true,
            rows: 6,
          },
          {
            name: 'results',
            label: 'Headline results',
            type: 'pairs',
            full: true,
            help: 'Label + value, e.g. "Conversion" / "+58%"',
          },
          { name: 'technologies', label: 'Stack', type: 'tags', full: true },
          { name: 'coverImage', label: 'Cover image', type: 'image', full: true },
          { name: 'gallery', label: 'Gallery image URLs', type: 'list', full: true },
          { name: 'order', label: 'Sort order', type: 'number' },
          { name: 'featured', label: 'Featured', type: 'boolean', help: 'Show on the home page' },
          { name: 'published', label: 'Published', type: 'boolean', help: 'Visible on the website' },
        ],
        columns: [
          {
            key: 'title',
            label: 'Project',
            render: (row) => (
              <div>
                <p className="font-medium text-white">{String(row.title)}</p>
                <p className="mt-0.5 text-xs text-slate-500">{String(row.client ?? '')}</p>
              </div>
            ),
          },
          {
            key: 'type',
            label: 'Type',
            render: (row) => (
              <StatusPill className="capitalize">{String(row.type ?? '—')}</StatusPill>
            ),
          },
          { key: 'industry', label: 'Industry' },
          {
            key: 'results',
            label: 'Results',
            render: (row) => {
              const results = (row.results as { label: string; value: string }[]) || [];
              return results.length ? `${results.length} metrics` : '—';
            },
          },
          { key: 'order', label: 'Order' },
        ],
      }}
    />
  );
}
