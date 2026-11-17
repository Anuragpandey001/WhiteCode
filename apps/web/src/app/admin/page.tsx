'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Inbox,
  Sparkles,
  FolderKanban,
  Newspaper,
  Users,
  Mails,
  Briefcase,
  TrendingUp,
  ArrowUpRight,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';
import { adminApi } from '@/lib/admin-client';
import { AdminPageHeader } from '@/components/admin/shell';
import { AdminButton, AdminCard, Spinner, StatusPill } from '@/components/admin/ui';
import { formatDateTime, leadStatusLabels, leadStatusStyles } from '@/lib/utils';

interface Overview {
  counts: {
    services: number;
    projects: number;
    posts: number;
    publishedPosts: number;
    team: number;
    openJobs: number;
    applications: number;
    subscribers: number;
    leads: number;
    newLeads: number;
  };
  leads: {
    byStatus: { status: string; count: number }[];
    total: number;
    won: number;
    pipelineValue: number;
    conversionRate: number;
    monthly: { month: string; count: number }[];
  };
  recentLeads: {
    _id: string;
    name: string;
    email: string;
    company?: string;
    service?: string;
    status: string;
    createdAt: string;
  }[];
  servicesByCategory: { category: string; count: number }[];
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<Overview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setData(await adminApi.get<Overview>('/dashboard/overview'));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load the dashboard');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (loading) return <Spinner label="Loading dashboard…" />;

  if (error || !data) {
    return (
      <>
        <AdminPageHeader title="Dashboard" />
        <AdminCard>
          <div className="flex items-start gap-3 text-sm text-amber-100">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
            <div>
              <p className="font-medium">{error || 'No data'}</p>
              <p className="mt-1 text-xs text-amber-200/80">
                The dashboard reads live data from the API. Start it with{' '}
                <code>npm run dev:api</code> and make sure MongoDB is running,
                then run <code>npm run seed</code> once.
              </p>
              <AdminButton variant="secondary" size="sm" className="mt-4" onClick={() => void load()}>
                <RefreshCw className="h-3.5 w-3.5" />
                Try again
              </AdminButton>
            </div>
          </div>
        </AdminCard>
      </>
    );
  }

  const { counts, leads, recentLeads, servicesByCategory } = data;

  const tiles = [
    {
      label: 'Total leads',
      value: counts.leads,
      sub: `${counts.newLeads} new`,
      Icon: Inbox,
      href: '/admin/leads',
    },
    {
      label: 'Conversion rate',
      value: `${leads.conversionRate}%`,
      sub: `${leads.won} won`,
      Icon: TrendingUp,
      href: '/admin/leads',
    },
    {
      label: 'Services live',
      value: counts.services,
      sub: `${servicesByCategory.length} categories`,
      Icon: Sparkles,
      href: '/admin/services',
    },
    {
      label: 'Case studies',
      value: counts.projects,
      sub: 'portfolio items',
      Icon: FolderKanban,
      href: '/admin/projects',
    },
    {
      label: 'Blog posts',
      value: counts.posts,
      sub: `${counts.publishedPosts} published`,
      Icon: Newspaper,
      href: '/admin/blog',
    },
    {
      label: 'Team members',
      value: counts.team,
      sub: 'on the about page',
      Icon: Users,
      href: '/admin/team',
    },
    {
      label: 'Open roles',
      value: counts.openJobs,
      sub: `${counts.applications} applications`,
      Icon: Briefcase,
      href: '/admin/jobs',
    },
    {
      label: 'Subscribers',
      value: counts.subscribers,
      sub: 'newsletter list',
      Icon: Mails,
      href: '/admin/subscribers',
    },
  ];

  const maxMonthly = Math.max(1, ...leads.monthly.map((m) => m.count));

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description="Live numbers from your website and sales pipeline."
        actions={
          <AdminButton variant="secondary" onClick={() => void load()}>
            <RefreshCw className="h-4 w-4" />
            Refresh
          </AdminButton>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {tiles.map(({ label, value, sub, Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="group rounded-2xl border border-white/10 bg-ink-900/60 p-5 transition hover:border-brand-400/40 hover:bg-ink-900"
          >
            <div className="flex items-start justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-brand-500/25 to-aqua-400/15 text-brand-200">
                <Icon className="h-5 w-5" />
              </span>
              <ArrowUpRight className="h-4 w-4 text-slate-600 transition group-hover:text-brand-300" />
            </div>
            <p className="mt-4 font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
              {value}
            </p>
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-0.5 text-xs text-slate-600">{sub}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <AdminCard>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Leads per month</h2>
            <span className="text-xs text-slate-500">last 12 months</span>
          </div>

          {leads.monthly.length ? (
            <div className="mt-6 flex h-44 items-end gap-2">
              {leads.monthly.map((month) => (
                <div key={month.month} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-full w-full items-end">
                    <div
                      className="w-full rounded-t-lg bg-linear-to-t from-brand-600/40 to-aqua-400/80"
                      style={{ height: `${(month.count / maxMonthly) * 100}%` }}
                      title={`${month.count} leads`}
                    />
                  </div>
                  <span className="text-[10px] text-slate-600">
                    {month.month.slice(5)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-sm text-slate-500">
              No leads yet. They appear here as soon as the contact form is used.
            </p>
          )}
        </AdminCard>

        <AdminCard>
          <h2 className="text-sm font-semibold text-white">Pipeline by stage</h2>
          <div className="mt-5 space-y-3">
            {Object.keys(leadStatusLabels).map((status) => {
              const entry = leads.byStatus.find((s) => s.status === status);
              const count = entry?.count ?? 0;
              const pct = leads.total ? Math.round((count / leads.total) * 100) : 0;
              return (
                <div key={status}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">{leadStatusLabels[status]}</span>
                    <span className="text-slate-500">
                      {count} · {pct}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-brand-500 to-aqua-400"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </AdminCard>
      </div>

      <AdminCard className="mt-6 p-0">
        <div className="flex items-center justify-between border-b border-white/8 p-4">
          <h2 className="text-sm font-semibold text-white">Recent enquiries</h2>
          <Link href="/admin/leads" className="text-xs text-brand-200 hover:text-white">
            View all leads
          </Link>
        </div>

        {recentLeads.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/8 text-xs tracking-wide text-slate-500 uppercase">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Service</th>
                  <th className="hidden px-4 py-3 font-medium sm:table-cell">Company</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="hidden px-4 py-3 font-medium md:table-cell">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6">
                {recentLeads.map((lead) => (
                  <tr key={lead._id} className="transition hover:bg-white/[0.02]">
                    <td className="px-4 py-3">
                      <p className="text-white">{lead.name}</p>
                      <p className="text-xs text-slate-500">{lead.email}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-300">{lead.service || '—'}</td>
                    <td className="hidden px-4 py-3 text-slate-400 sm:table-cell">
                      {lead.company || '—'}
                    </td>
                    <td className="px-4 py-3">
                      <StatusPill className={leadStatusStyles[lead.status]}>
                        {leadStatusLabels[lead.status] || lead.status}
                      </StatusPill>
                    </td>
                    <td className="hidden px-4 py-3 text-xs text-slate-500 md:table-cell">
                      {formatDateTime(lead.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="p-6 text-sm text-slate-500">No enquiries yet.</p>
        )}
      </AdminCard>
    </>
  );
}
