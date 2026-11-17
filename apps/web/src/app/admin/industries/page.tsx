'use client';

import { ResourceManager } from '@/components/admin/resource-manager';

export default function AdminIndustriesPage() {
  return (
    <ResourceManager
      config={{
        title: 'Industries',
        description: 'Sectors you serve, shown as a grid on the home page.',
        singular: 'Industry',
        basePath: '/industries',
        canPublish: false,
        defaults: { published: true, icon: 'Building2', order: 0 },
        fields: [
          { name: 'name', label: 'Industry name', required: true },
          { name: 'slug', label: 'URL slug', help: 'Blank = from name' },
          {
            name: 'description',
            label: 'One-line description',
            type: 'textarea',
            full: true,
            rows: 2,
          },
          {
            name: 'icon',
            label: 'Icon name',
            help: 'Any lucide icon, e.g. HeartPulse, Landmark, Truck',
          },
          { name: 'order', label: 'Sort order', type: 'number' },
          { name: 'published', label: 'Published', type: 'boolean' },
        ],
        columns: [
          {
            key: 'name',
            label: 'Industry',
            render: (row) => (
              <div>
                <p className="font-medium text-white">{String(row.name)}</p>
                <p className="mt-0.5 max-w-md truncate text-xs text-slate-500">
                  {String(row.description ?? '')}
                </p>
              </div>
            ),
          },
          { key: 'icon', label: 'Icon' },
          {
            key: 'published',
            label: 'Visible',
            render: (row) => (row.published ? 'Yes' : 'No'),
          },
          { key: 'order', label: 'Order' },
        ],
      }}
    />
  );
}
