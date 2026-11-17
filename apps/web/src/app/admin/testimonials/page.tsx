'use client';

import { ResourceManager } from '@/components/admin/resource-manager';

export default function AdminTestimonialsPage() {
  return (
    <ResourceManager
      config={{
        title: 'Testimonials',
        description: 'Client quotes shown on the home, work and about pages.',
        singular: 'Testimonial',
        basePath: '/testimonials',
        defaults: { rating: 5, published: true, order: 0 },
        fields: [
          { name: 'name', label: 'Client name', required: true },
          { name: 'role', label: 'Role', placeholder: 'Founder' },
          { name: 'company', label: 'Company' },
          { name: 'projectSlug', label: 'Related case study slug' },
          {
            name: 'quote',
            label: 'Quote',
            type: 'textarea',
            required: true,
            full: true,
            rows: 4,
          },
          { name: 'avatar', label: 'Photo', type: 'image', full: true },
          { name: 'rating', label: 'Rating (1-5)', type: 'number' },
          { name: 'order', label: 'Sort order', type: 'number' },
          { name: 'published', label: 'Published', type: 'boolean' },
        ],
        columns: [
          {
            key: 'name',
            label: 'Client',
            render: (row) => (
              <div>
                <p className="font-medium text-white">{String(row.name)}</p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {[row.role, row.company].filter(Boolean).join(', ')}
                </p>
              </div>
            ),
          },
          {
            key: 'quote',
            label: 'Quote',
            render: (row) => (
              <p className="max-w-md truncate text-slate-400">{String(row.quote)}</p>
            ),
          },
          { key: 'rating', label: 'Rating' },
          { key: 'order', label: 'Order' },
        ],
      }}
    />
  );
}
