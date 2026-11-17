'use client';

import { useCallback, useEffect, useState } from 'react';
import { ExternalLink, Trash2, Search, AlertTriangle } from 'lucide-react';
import { adminApi, type PageMeta } from '@/lib/admin-client';
import { AdminPageHeader } from '@/components/admin/shell';
import {
  AdminButton,
  AdminCard,
  EmptyState,
  Modal,
  Spinner,
  Toast,
  adminInput,
} from '@/components/admin/ui';
import { formatDateTime } from '@/lib/utils';

interface Application {
  _id: string;
  jobTitle?: string;
  name: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
  portfolio?: string;
  coverLetter?: string;
  status: string;
  createdAt: string;
}

const statuses = [
  'applied',
  'screening',
  'interview',
  'offer',
  'hired',
  'rejected',
];

export default function AdminApplicationsPage() {
  const [rows, setRows] = useState<Application[]>([]);
  const [meta, setMeta] = useState<PageMeta | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [active, setActive] = useState<Application | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Application | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' }>({
    message: '',
    type: 'success',
  });

  function notify(message: string, type: 'success' | 'error' = 'success') {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: 'success' }), 2600);
  }

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ page: String(page), limit: '20' });
      if (query) params.set('q', query);
      if (status !== 'all') params.set('status', status);
      const result = await adminApi.list<Application>(
        `/careers/applications?${params}`,
      );
      setRows(result.items);
      setMeta(result.meta);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load applications');
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [page, query, status]);

  useEffect(() => {
    void load();
  }, [load]);

  async function changeStatus(row: Application, next: string) {
    try {
      await adminApi.patch(`/careers/applications/${row._id}`, { status: next });
      await load();
      notify('Status updated');
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Could not update', 'error');
    }
  }

  async function remove() {
    if (!deleteTarget) return;
    try {
      await adminApi.remove(`/careers/applications/${deleteTarget._id}`);
      setDeleteTarget(null);
      setActive(null);
      await load();
      notify('Application deleted');
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Could not delete', 'error');
    }
  }

  return (
    <>
      <AdminPageHeader
        title="Applications"
        description="Candidates who applied through the careers page."
      />

      <AdminCard className="p-0">
        <div className="flex flex-col gap-3 border-b border-white/8 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search name, email, role…"
              className={`${adminInput} pl-9`}
            />
          </div>
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-white/10 bg-ink-900 px-3 py-2 text-sm text-white sm:w-44"
          >
            <option value="all">All stages</option>
            {statuses.map((item) => (
              <option key={item} value={item} className="capitalize">
                {item}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="p-6">
            <div className="flex items-start gap-3 rounded-xl border border-amber-500/25 bg-amber-500/10 p-4 text-sm text-amber-100">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>{error}</p>
            </div>
          </div>
        ) : rows.length === 0 ? (
          <EmptyState
            title="No applications yet"
            description="They appear here as soon as someone applies on the careers page."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/8 text-xs tracking-wide text-slate-500 uppercase">
                <tr>
                  <th className="px-4 py-3 font-medium">Candidate</th>
                  <th className="hidden px-4 py-3 font-medium sm:table-cell">Role</th>
                  <th className="px-4 py-3 font-medium">Stage</th>
                  <th className="hidden px-4 py-3 font-medium md:table-cell">Links</th>
                  <th className="hidden px-4 py-3 font-medium lg:table-cell">Applied</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6">
                {rows.map((row) => (
                  <tr key={row._id} className="transition hover:bg-white/[0.02]">
                    <td className="px-4 py-3">
                      <button type="button" onClick={() => setActive(row)} className="text-left">
                        <p className="font-medium text-white hover:text-brand-200">
                          {row.name}
                        </p>
                        <p className="text-xs text-slate-500">{row.email}</p>
                      </button>
                    </td>
                    <td className="hidden px-4 py-3 text-slate-300 sm:table-cell">
                      {row.jobTitle || '—'}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={row.status}
                        onChange={(e) => void changeStatus(row, e.target.value)}
                        className="rounded-lg border border-white/10 bg-ink-900 px-2 py-1 text-xs text-white capitalize"
                      >
                        {statuses.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="hidden px-4 py-3 md:table-cell">
                      <div className="flex gap-2">
                        {row.resumeUrl ? (
                          <a
                            href={row.resumeUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-brand-200 hover:text-white"
                          >
                            Resume <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : null}
                        {row.portfolio ? (
                          <a
                            href={row.portfolio}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-brand-200 hover:text-white"
                          >
                            Work <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : null}
                        {!row.resumeUrl && !row.portfolio ? (
                          <span className="text-xs text-slate-600">—</span>
                        ) : null}
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 text-xs text-slate-500 lg:table-cell">
                      {formatDateTime(row.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(row)}
                          aria-label="Delete application"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-500/10 hover:text-rose-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {meta && meta.pages > 1 ? (
          <div className="flex items-center justify-between border-t border-white/8 p-4">
            <p className="text-xs text-slate-500">
              Page {meta.page} of {meta.pages}
            </p>
            <div className="flex gap-2">
              <AdminButton
                variant="secondary"
                size="sm"
                disabled={meta.page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Prev
              </AdminButton>
              <AdminButton
                variant="secondary"
                size="sm"
                disabled={meta.page >= meta.pages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </AdminButton>
            </div>
          </div>
        ) : null}
      </AdminCard>

      <Modal
        open={Boolean(active)}
        onClose={() => setActive(null)}
        title={active?.name || 'Application'}
      >
        {active ? (
          <div className="space-y-4 text-sm">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
                <p className="text-xs text-slate-500">Email</p>
                <p className="mt-0.5 break-all text-slate-200">{active.email}</p>
              </div>
              <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
                <p className="text-xs text-slate-500">Phone</p>
                <p className="mt-0.5 text-slate-200">{active.phone || '—'}</p>
              </div>
              <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
                <p className="text-xs text-slate-500">Role</p>
                <p className="mt-0.5 text-slate-200">{active.jobTitle || '—'}</p>
              </div>
              <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
                <p className="text-xs text-slate-500">Applied</p>
                <p className="mt-0.5 text-slate-200">
                  {formatDateTime(active.createdAt)}
                </p>
              </div>
            </div>

            {active.coverLetter ? (
              <div>
                <p className="text-xs text-slate-500">Why them</p>
                <p className="mt-1.5 rounded-xl border border-white/8 bg-white/[0.03] p-4 leading-relaxed whitespace-pre-wrap text-slate-300">
                  {active.coverLetter}
                </p>
              </div>
            ) : null}

            <div className="flex gap-2">
              {active.resumeUrl ? (
                <a
                  href={active.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-4 py-2 text-xs text-slate-200 hover:text-white"
                >
                  Open resume <ExternalLink className="h-3 w-3" />
                </a>
              ) : null}
              {active.portfolio ? (
                <a
                  href={active.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-4 py-2 text-xs text-slate-200 hover:text-white"
                >
                  Open portfolio <ExternalLink className="h-3 w-3" />
                </a>
              ) : null}
            </div>
          </div>
        ) : null}
      </Modal>

      <Modal
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Delete application"
      >
        <p className="text-sm text-slate-300">
          This permanently deletes{' '}
          <span className="font-medium text-white">{deleteTarget?.name}</span>
          &rsquo;s application. It cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <AdminButton variant="secondary" onClick={() => setDeleteTarget(null)}>
            Keep it
          </AdminButton>
          <AdminButton variant="danger" onClick={() => void remove()}>
            Delete permanently
          </AdminButton>
        </div>
      </Modal>

      <Toast message={toast.message} type={toast.type} />
    </>
  );
}
