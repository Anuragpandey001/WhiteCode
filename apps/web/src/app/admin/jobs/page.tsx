'use client';

import { ResourceManager } from '@/components/admin/resource-manager';
import { StatusPill } from '@/components/admin/ui';

export default function AdminJobsPage() {
  return (
    <ResourceManager
      config={{
        title: 'Job openings',
        description: 'Roles listed on the careers page. Applications arrive under Applications.',
        singular: 'Opening',
        basePath: '/careers',
        defaults: {
          department: 'Engineering',
          location: 'Remote',
          employmentType: 'full-time',
          openings: 1,
          published: true,
          order: 0,
        },
        fields: [
          { name: 'title', label: 'Role title', required: true },
          { name: 'slug', label: 'URL slug', help: 'Blank = from title' },
          { name: 'department', label: 'Department', placeholder: 'Engineering' },
          { name: 'location', label: 'Location', placeholder: 'Remote / Jaipur' },
          {
            name: 'employmentType',
            label: 'Employment type',
            type: 'select',
            options: [
              { value: 'full-time', label: 'Full time' },
              { value: 'part-time', label: 'Part time' },
              { value: 'internship', label: 'Internship' },
              { value: 'contract', label: 'Contract' },
              { value: 'training', label: 'Training program' },
            ],
          },
          { name: 'experience', label: 'Experience', placeholder: '1-3 years' },
          { name: 'salaryRange', label: 'Salary range', placeholder: '₹4.5 - 9 LPA' },
          { name: 'openings', label: 'Openings', type: 'number' },
          {
            name: 'description',
            label: 'Role description',
            type: 'textarea',
            full: true,
            rows: 4,
          },
          { name: 'responsibilities', label: 'Responsibilities', type: 'list', full: true },
          { name: 'requirements', label: 'Requirements', type: 'list', full: true },
          { name: 'order', label: 'Sort order', type: 'number' },
          { name: 'published', label: 'Published', type: 'boolean' },
        ],
        columns: [
          {
            key: 'title',
            label: 'Role',
            render: (row) => (
              <div>
                <p className="font-medium text-white">{String(row.title)}</p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {String(row.department ?? '')} · {String(row.location ?? '')}
                </p>
              </div>
            ),
          },
          {
            key: 'employmentType',
            label: 'Type',
            render: (row) => (
              <StatusPill className="capitalize">
                {String(row.employmentType ?? '—').replace('-', ' ')}
              </StatusPill>
            ),
          },
          { key: 'experience', label: 'Experience' },
          { key: 'openings', label: 'Openings' },
        ],
      }}
    />
  );
}
