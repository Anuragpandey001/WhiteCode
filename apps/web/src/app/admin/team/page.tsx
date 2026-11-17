'use client';

import { ResourceManager } from '@/components/admin/resource-manager';

export default function AdminTeamPage() {
  return (
    <ResourceManager
      config={{
        title: 'Team',
        description: 'People shown on the about page.',
        singular: 'Team member',
        basePath: '/team',
        defaults: { published: true, order: 0 },
        fields: [
          { name: 'name', label: 'Name', required: true },
          { name: 'role', label: 'Role', required: true, placeholder: 'Design Lead' },
          { name: 'bio', label: 'Short bio', type: 'textarea', full: true, rows: 3 },
          { name: 'avatar', label: 'Photo', type: 'image', full: true },
          { name: 'skills', label: 'Skills', type: 'tags', full: true },
          { name: 'order', label: 'Sort order', type: 'number' },
          { name: 'published', label: 'Published', type: 'boolean' },
        ],
        columns: [
          {
            key: 'name',
            label: 'Member',
            render: (row) => (
              <div>
                <p className="font-medium text-white">{String(row.name)}</p>
                <p className="mt-0.5 text-xs text-slate-500">{String(row.role)}</p>
              </div>
            ),
          },
          {
            key: 'skills',
            label: 'Skills',
            render: (row) => ((row.skills as string[]) || []).join(', ') || '—',
          },
          { key: 'order', label: 'Order' },
        ],
      }}
    />
  );
}
