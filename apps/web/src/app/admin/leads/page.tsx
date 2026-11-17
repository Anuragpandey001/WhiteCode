'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  Search,
  Download,
  Trash2,
  MessageSquarePlus,
  Mail,
  Phone,
  Building2,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';
import { adminApi, type PageMeta } from '@/lib/admin-client';
import { AdminPageHeader } from '@/components/admin/shell';
import {
  AdminButton,
  AdminCard,
  EmptyState,
  Modal,
  Spinner,
  StatusPill,
  Toast,
  adminInput,
} from '@/components/admin/ui';
import { formatDateTime, leadStatusLabels, leadStatusStyles } from '@/lib/utils';

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  message: string;
  source?: string;
  status: string;
  dealValue?: number;
  notes?: { text: string; author: string; at: string }[];
  createdAt: string;
}

const statusFilters = ['all', ...Object.keys(leadStatusLabels)];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [meta, setMeta] = useState<PageMeta | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const [active, setActive] = useState<Lead | null>(null);
  const [note, setNote] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Lead | null>(null);
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
      if (status !== 'all') params.set('status', status);
      if (query) params.set('q', query);
      const result = await adminApi.list<Lead>(`/leads?${params}`);
      setLeads(result.items);
      setMeta(result.meta);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load leads');
      setLeads([]);
    } finally {
      setLoading(false);
    }
  }, [page, query, status]);

  useEffect(() => {
    void load();
  }, [load]);

  async function changeStatus(lead: Lead, next: string) {
    try {
      await adminApi.patch(`/leads/${lead._id}`, { status: next });
      notify('Status updated');
      setActive((prev) => (prev ? { ...prev, status: next } : prev));
      await load();
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Could not update', 'error');
    }
  }

  async function addNote() {
    if (!active || !note.trim()) return;
    try {
      const updated = await adminApi.post<Lead>(`/leads/${active._id}/notes`, {
        text: note.trim(),
      });
      setActive(updated);
      setNote('');
      notify('Note added');
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Could not add note', 'error');
    }
  }

  async function removeLead() {
    if (!deleteTarget) return;
    try {
      await adminApi.remove(`/leads/${deleteTarget._id}`);
      setDeleteTarget(null);
      setActive(null);
      await load();
      notify('Lead deleted');
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Could not delete', 'error');
    }
  }

  async function exportCsv() {
    try {
      const csv = await adminApi.exportCsv();
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      URL.revokeObjectURL(url);
      notify('CSV downloaded');
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Export failed', 'error');
    }
  }

  return (
    <>
      <AdminPageHeader
        title="Leads"
        description="Every enquiry from the website, with the stage it is at."
        actions={
          <>
            <AdminButton variant="secondary" onClick={() => void load()}>
              <RefreshCw className="h-4 w-4" />
              Refresh
            </AdminButton>
            <AdminButton onClick={() => void exportCsv()}>
              <Download className="h-4 w-4" />
              Export CSV
            </AdminButton>
          </>
        }
      />

      <AdminCard className="p-0">
        <div className="flex flex-col gap-3 border-b border-white/8 p-4">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search name, email, company…"
              className={`${adminInput} pl-9`}
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {statusFilters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setStatus(item);
                  setPage(1);
                }}
                className={`rounded-full border px-3 py-1.5 text-xs transition ${
                  status === item
                    ? 'border-brand-400/50 bg-brand-500/15 text-white'
                    : 'border-white/10 bg-white/[0.03] text-slate-400 hover:text-white'
                }`}
              >
                {item === 'all' ? 'All' : leadStatusLabels[item]}
              </button>
            ))}
          </div>
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
        ) : leads.length === 0 ? (
          <EmptyState
            title="No leads here yet"
            description="Enquiries from the website contact form land here instantly."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/8 text-xs tracking-wide text-slate-500 uppercase">
                <tr>
                  <th className="px-4 py-3 font-medium">Contact</th>
                  <th className="hidden px-4 py-3 font-medium sm:table-cell">Service</th>
                  <th className="hidden px-4 py-3 font-medium lg:table-cell">Budget</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="hidden px-4 py-3 font-medium md:table-cell">Received</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6">
                {leads.map((lead) => (
                  <tr key={lead._id} className="transition hover:bg-white/[0.02]">
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => setActive(lead)}
                        className="text-left"
                      >
                        <p className="font-medium text-white hover:text-brand-200">
                          {lead.name}
                        </p>
                        <p className="text-xs text-slate-500">{lead.email}</p>
                      </button>
                    </td>
                    <td className="hidden px-4 py-3 text-slate-300 sm:table-cell">
                      {lead.service || '—'}
                    </td>
                    <td className="hidden px-4 py-3 text-slate-400 lg:table-cell">
                      {lead.budget || '—'}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={lead.status}
                        onChange={(e) => void changeStatus(lead, e.target.value)}
                        className="rounded-lg border border-white/10 bg-ink-900 px-2 py-1 text-xs text-white"
                      >
                        {Object.entries(leadStatusLabels).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="hidden px-4 py-3 text-xs text-slate-500 md:table-cell">
                      {formatDateTime(lead.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => setActive(lead)}
                          className="rounded-lg px-2.5 py-1 text-xs text-slate-300 transition hover:bg-white/5 hover:text-white"
                        >
                          Open
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(lead)}
                          aria-label="Delete lead"
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
              Page {meta.page} of {meta.pages} · {meta.total} leads
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
        title={active?.name || 'Lead'}
        wide
      >
        {active ? (
          <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusPill className={leadStatusStyles[active.status]}>
                  {leadStatusLabels[active.status] || active.status}
                </StatusPill>
                {active.source ? (
                  <StatusPill>source: {active.source}</StatusPill>
                ) : null}
                <StatusPill>{formatDateTime(active.createdAt)}</StatusPill>
              </div>

              <div className="mt-5 space-y-2.5 text-sm">
                <a
                  href={`mailto:${active.email}`}
                  className="flex items-center gap-2.5 text-slate-300 hover:text-white"
                >
                  <Mail className="h-4 w-4 text-brand-300" />
                  {active.email}
                </a>
                {active.phone ? (
                  <a
                    href={`tel:${active.phone}`}
                    className="flex items-center gap-2.5 text-slate-300 hover:text-white"
                  >
                    <Phone className="h-4 w-4 text-brand-300" />
                    {active.phone}
                  </a>
                ) : null}
                {active.company ? (
                  <p className="flex items-center gap-2.5 text-slate-300">
                    <Building2 className="h-4 w-4 text-brand-300" />
                    {active.company}
                  </p>
                ) : null}
              </div>

              <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
                  <dt className="text-xs text-slate-500">Service</dt>
                  <dd className="mt-0.5 text-slate-200">{active.service || '—'}</dd>
                </div>
                <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
                  <dt className="text-xs text-slate-500">Budget</dt>
                  <dd className="mt-0.5 text-slate-200">{active.budget || '—'}</dd>
                </div>
                <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
                  <dt className="text-xs text-slate-500">Timeline</dt>
                  <dd className="mt-0.5 text-slate-200">{active.timeline || '—'}</dd>
                </div>
                <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
                  <dt className="text-xs text-slate-500">Stage</dt>
                  <dd className="mt-1">
                    <select
                      value={active.status}
                      onChange={(e) => void changeStatus(active, e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-ink-900 px-2 py-1 text-xs text-white"
                    >
                      {Object.entries(leadStatusLabels).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </dd>
                </div>
              </dl>

              <div className="mt-5">
                <p className="text-xs text-slate-500">Message</p>
                <p className="mt-1.5 rounded-xl border border-white/8 bg-white/[0.03] p-4 text-sm leading-relaxed whitespace-pre-wrap text-slate-300">
                  {active.message}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">Internal notes</h3>
              <div className="mt-3 max-h-56 space-y-2 overflow-y-auto pr-1">
                {active.notes?.length ? (
                  active.notes.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-white/8 bg-white/[0.03] p-3"
                    >
                      <p className="text-sm text-slate-300">{item.text}</p>
                      <p className="mt-1 text-xs text-slate-600">
                        {item.author} · {formatDateTime(item.at)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">No notes yet.</p>
                )}
              </div>

              <div className="mt-4">
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  placeholder="Called, sent proposal, waiting on their board…"
                  className={adminInput}
                />
                <div className="mt-3 flex justify-between gap-2">
                  <AdminButton
                    variant="danger"
                    size="sm"
                    onClick={() => setDeleteTarget(active)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete lead
                  </AdminButton>
                  <AdminButton size="sm" onClick={() => void addNote()} disabled={!note.trim()}>
                    <MessageSquarePlus className="h-3.5 w-3.5" />
                    Add note
                  </AdminButton>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>

      <Modal
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Delete lead"
      >
        <p className="text-sm text-slate-300">
          This permanently deletes the enquiry from{' '}
          <span className="font-medium text-white">{deleteTarget?.name}</span>{' '}
          and its notes. It cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <AdminButton variant="secondary" onClick={() => setDeleteTarget(null)}>
            Keep it
          </AdminButton>
          <AdminButton variant="danger" onClick={() => void removeLead()}>
            Delete permanently
          </AdminButton>
        </div>
      </Modal>

      <Toast message={toast.message} type={toast.type} />
    </>
  );
}
