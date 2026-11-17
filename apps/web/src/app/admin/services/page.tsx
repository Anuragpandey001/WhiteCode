'use client';

import { ResourceManager } from '@/components/admin/resource-manager';
import { StatusPill } from '@/components/admin/ui';

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'media', label: 'Media' },
  { value: 'cloud', label: 'Cloud' },
  { value: 'support', label: 'Support' },
];

export default function AdminServicesPage() {
  return (
    <ResourceManager
      config={{
        title: 'Services',
        description:
          'What you sell. Each service gets its own page, price and enquiry form on the website.',
        singular: 'Service',
        basePath: '/services',
        defaults: { category: 'development', published: true, icon: 'Sparkles', order: 0 },
        fields: [
          { name: 'title', label: 'Title', required: true, placeholder: 'Mobile App Development' },
          {
            name: 'slug',
            label: 'URL slug',
            help: 'Leave blank to generate from the title',
            placeholder: 'mobile-app-development',
          },
          {
            name: 'excerpt',
            label: 'Short description (cards & SEO)',
            type: 'textarea',
            required: true,
            full: true,
            rows: 2,
          },
          {
            name: 'description',
            label: 'Full description (service page)',
            type: 'textarea',
            full: true,
            rows: 5,
          },
          { name: 'category', label: 'Category', type: 'select', options: categories },
          {
            name: 'icon',
            label: 'Icon name',
            help: 'Any lucide icon name, e.g. Smartphone, Globe, Brain, Video',
            placeholder: 'Smartphone',
          },
          { name: 'startingPrice', label: 'Starting price', placeholder: '₹1,20,000' },
          { name: 'timeline', label: 'Typical timeline', placeholder: '6-12 weeks' },
          {
            name: 'features',
            label: 'What is included',
            type: 'list',
            full: true,
            placeholder: 'Flutter & React Native cross-platform builds',
          },
          {
            name: 'deliverables',
            label: 'Deliverables',
            type: 'tags',
            full: true,
            placeholder: 'Source code',
          },
          {
            name: 'technologies',
            label: 'Technologies',
            type: 'tags',
            full: true,
            placeholder: 'Flutter',
          },
          { name: 'coverImage', label: 'Cover image', type: 'image', full: true },
          { name: 'order', label: 'Sort order', type: 'number' },
          { name: 'featured', label: 'Featured', type: 'boolean', help: 'Show in hero & home page' },
          { name: 'published', label: 'Published', type: 'boolean', help: 'Visible on the website' },
        ],
        columns: [
          {
            key: 'title',
            label: 'Service',
            render: (row) => (
              <div>
                <p className="font-medium text-white">{String(row.title)}</p>
                <p className="mt-0.5 max-w-md truncate text-xs text-slate-500">
                  {String(row.excerpt ?? '')}
                </p>
              </div>
            ),
          },
          {
            key: 'category',
            label: 'Category',
            render: (row) => (
              <StatusPill className="capitalize">{String(row.category ?? '—')}</StatusPill>
            ),
          },
          { key: 'startingPrice', label: 'From' },
          {
            key: 'featured',
            label: 'Featured',
            render: (row) => (row.featured ? 'Yes' : '—'),
          },
          { key: 'order', label: 'Order' },
        ],
      }}
    />
  );
}
