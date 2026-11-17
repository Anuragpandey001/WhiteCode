'use client';

import { ResourceManager } from '@/components/admin/resource-manager';
import { StatusPill } from '@/components/admin/ui';

export default function AdminFaqsPage() {
  return (
    <ResourceManager
      config={{
        title: 'FAQs',
        description:
          'Shown on the home, services, pricing and contact pages. Answer the objection, not the question.',
        singular: 'FAQ',
        basePath: '/faqs',
        defaults: { category: 'general', published: true, order: 0 },
        fields: [
          { name: 'question', label: 'Question', required: true, full: true },
          {
            name: 'answer',
            label: 'Answer',
            type: 'textarea',
            required: true,
            full: true,
            rows: 5,
          },
          {
            name: 'category',
            label: 'Category',
            type: 'select',
            options: [
              { value: 'general', label: 'General' },
              { value: 'process', label: 'Process' },
              { value: 'pricing', label: 'Pricing' },
              { value: 'legal', label: 'Legal' },
              { value: 'support', label: 'Support' },
            ],
          },
          { name: 'order', label: 'Sort order', type: 'number' },
          { name: 'published', label: 'Published', type: 'boolean' },
        ],
        columns: [
          {
            key: 'question',
            label: 'Question',
            render: (row) => (
              <p className="max-w-lg font-medium text-white">{String(row.question)}</p>
            ),
          },
          {
            key: 'category',
            label: 'Category',
            render: (row) => (
              <StatusPill className="capitalize">{String(row.category ?? '—')}</StatusPill>
            ),
          },
          { key: 'order', label: 'Order' },
        ],
      }}
    />
  );
}
