'use client';

import { ResourceManager } from '@/components/admin/resource-manager';
import { StatusPill } from '@/components/admin/ui';
import { formatDate } from '@/lib/utils';

export default function AdminBlogPage() {
  return (
    <ResourceManager
      config={{
        title: 'Blog posts',
        description:
          'Posts are stored as HTML. Paste from your editor or write the markup directly.',
        singular: 'Post',
        basePath: '/blog',
        defaults: { category: 'Engineering', published: false },
        fields: [
          { name: 'title', label: 'Title', required: true, full: true },
          { name: 'slug', label: 'URL slug', help: 'Blank = from title' },
          { name: 'category', label: 'Category', placeholder: 'Engineering' },
          {
            name: 'excerpt',
            label: 'Excerpt',
            type: 'textarea',
            required: true,
            full: true,
            rows: 2,
          },
          {
            name: 'content',
            label: 'Content (HTML)',
            type: 'html',
            full: true,
            help: 'Use <h2>, <p>, <ul><li> — the site styles them automatically.',
          },
          { name: 'coverImage', label: 'Cover image', type: 'image', full: true },
          { name: 'tags', label: 'Tags', type: 'tags', full: true },
          { name: 'featured', label: 'Featured', type: 'boolean' },
          { name: 'published', label: 'Published', type: 'boolean' },
        ],
        columns: [
          {
            key: 'title',
            label: 'Post',
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
            render: (row) => <StatusPill>{String(row.category ?? '—')}</StatusPill>,
          },
          {
            key: 'readingTime',
            label: 'Read',
            render: (row) => `${row.readingTime ?? 1} min`,
          },
          { key: 'views', label: 'Views' },
          {
            key: 'publishedAt',
            label: 'Published',
            render: (row) =>
              row.publishedAt ? formatDate(String(row.publishedAt)) : '—',
          },
        ],
      }}
    />
  );
}
