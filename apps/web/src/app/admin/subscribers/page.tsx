'use client';

import { useCallback, useEffect, useState } from 'react';
import { Download, Trash2, AlertTriangle } from 'lucide-react';
import { adminApi } from '@/lib/admin-client';
import { AdminPageHeader } from '@/components/admin/shell';
import {
  AdminButton,
  AdminCard,
  EmptyState,
  Modal,
  Spinner,
  StatusPill,
  Toast,
} from '@/components/admin/ui';
import { formatDate } from '@/lib/utils';

interface Subscriber {
  _id: string;
  email: string;
  name?: string;
  source?: string;
  active: boolean;
  createdAt: string;
}

export default function AdminSubscribersPage() {
  const [rows, setRows] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Subscriber | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' }>({
    message: '',
    type: 'success',
  });

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await adminApi.list<Subscriber>('/newsletter');
      setRows(result.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load subscribers');
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function remove() {
    if (!deleteTarget) return;
    try {
      await adminApi.remove(`/newsletter/${deleteTarget._id}`);
      setDeleteTarget(null);
      await load();
      setToast({ message: 'Subscriber removed', type: 'success' });
      setTimeout(() => setToast({ message: '', type: 'success' }), 2400);
    } catch (err) {
      setToast({
        message: err instanceof Error ? err.message : 'Could not delete',
        type: 'error',
      });
    }
  }

  function exportCsv() {
    const header = 'Email,Name,Source,Active,Joined';
    const body = rows
      .map((row) =>
        [row.email, row.name || '', row.source || '', row.active, row.createdAt]
          .map((value) => `"${String(value ?? '').replace(/"/g, '""')}"`)
          .join(','),
      )
      .join('\n');

    const blob = new Blob([`${header}\n${body}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <AdminPageHeader
        title="Subscribers"
        description="People who signed up through the website footer."
        actions={
          rows.length ? (
            <AdminButton variant="secondary" onClick={exportCsv}>
              <Download className="h-4 w-4" />
              Export CSV
            </AdminButton>
          ) : undefined
        }
      />

      <AdminCard className="p-0">
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
            title="No subscribers yet"
            description="The footer form adds people here."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/8 text-xs tracking-wide text-slate-500 uppercase">
                <tr>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="hidden px-4 py-3 font-medium sm:table-cell">Name</th>
                  <th className="px-4 py-3 font-medium">Source</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="hidden px-4 py-3 font-medium md:table-cell">Joined</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6">
                {rows.map((row) => (
                  <tr key={row._id} className="transition hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-white">{row.email}</td>
                    <td className="hidden px-4 py-3 text-slate-300 sm:table-cell">
                      {row.name || '—'}
                    </td>
                    <td className="px-4 py-3">
                      <StatusPill>{row.source || 'website'}</StatusPill>
                    </td>
                    <td className="px-4 py-3">
                      <StatusPill
                        className={
                          row.active
                            ? 'border-emerald-500/30 bg-emerald-500/15 text-emerald-200'
                            : 'border-slate-600/40 bg-slate-600/15 text-slate-400'
                        }
                      >
                        {row.active ? 'Active' : 'Unsubscribed'}
                      </StatusPill>
                    </td>
                    <td className="hidden px-4 py-3 text-xs text-slate-500 md:table-cell">
                      {formatDate(row.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(row)}
                          aria-label="Remove subscriber"
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
      </AdminCard>

      <Modal
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Remove subscriber"
      >
        <p className="text-sm text-slate-300">
          This permanently removes{' '}
          <span className="font-medium text-white">{deleteTarget?.email}</span>{' '}
          from your list. It cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <AdminButton variant="secondary" onClick={() => setDeleteTarget(null)}>
            Keep it
          </AdminButton>
          <AdminButton variant="danger" onClick={() => void remove()}>
            Remove permanently
          </AdminButton>
        </div>
      </Modal>

      <Toast message={toast.message} type={toast.type} />
    </>
  );
}
