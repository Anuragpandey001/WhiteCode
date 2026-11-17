'use client';

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';
import { adminApi, type PageMeta } from '@/lib/admin-client';
import { AdminPageHeader } from './shell';
import {
  AdminButton,
  AdminCard,
  EmptyState,
  Modal,
  Spinner,
  StatusPill,
  Toast,
  adminInput,
} from './ui';
import { FieldInput, type FieldDef } from './field-input';

export interface ColumnDef<T> {
  key: string;
  label: string;
  render?: (row: T) => ReactNode;
  className?: string;
}

export interface ResourceConfig<T> {
  title: string;
  description?: string;
  singular: string;
  /** Mutations post to this path, e.g. '/services' */
  basePath: string;
  /** Admin listing path, defaults to `${basePath}/manage` */
  listPath?: string;
  fields: FieldDef[];
  columns: ColumnDef<T>[];
  canPublish?: boolean;
  canCreate?: boolean;
  defaults?: Record<string, unknown>;
  pageSize?: number;
}

type Row = Record<string, unknown> & { _id?: string; published?: boolean };

export function ResourceManager<T extends Row>({
  config,
}: {
  config: ResourceConfig<T>;
}) {
  const {
    title,
    description,
    singular,
    basePath,
    listPath,
    fields,
    columns,
    canPublish = true,
    canCreate = true,
    defaults = {},
    pageSize = 20,
  } = config;

  const [rows, setRows] = useState<T[]>([]);
  const [meta, setMeta] = useState<PageMeta | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const [editing, setEditing] = useState<T | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<T | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' }>({
    message: '',
    type: 'success',
  });

  const effectiveListPath = listPath ?? `${basePath}/manage`;

  const notify = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: 'success' }), 2600);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(pageSize),
      });
      if (query) params.set('q', query);
      const result = await adminApi.list<T>(`${effectiveListPath}?${params}`);
      setRows(result.items);
      setMeta(result.meta);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load records');
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [effectiveListPath, page, pageSize, query]);

  useEffect(() => {
    void load();
  }, [load]);

  function openCreate() {
    setEditing(null);
    setForm({ ...defaults });
    setFormError('');
    setModalOpen(true);
  }

  function openEdit(row: T) {
    setEditing(row);
    const next: Record<string, unknown> = {};
    fields.forEach((field) => {
      next[field.name] = row[field.name];
    });
    setForm(next);
    setFormError('');
    setModalOpen(true);
  }

  async function save() {
    setSaving(true);
    setFormError('');

    const payload: Record<string, unknown> = {};
    fields.forEach((field) => {
      const value = form[field.name];
      if (value === '' || value === undefined) {
        if (editing) payload[field.name] = value === '' ? '' : undefined;
        return;
      }
      payload[field.name] = value;
    });

    try {
      if (editing?._id) {
        await adminApi.patch(`${basePath}/${editing._id}`, payload);
        notify(`${singular} updated`);
      } else {
        await adminApi.post(basePath, payload);
        notify(`${singular} created`);
      }
      setModalOpen(false);
      await load();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Could not save');
    } finally {
      setSaving(false);
    }
  }

  async function togglePublished(row: T) {
    try {
      await adminApi.patch(`${basePath}/${row._id}/publish`);
      await load();
      notify(row.published ? `${singular} hidden` : `${singular} published`);
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Could not update', 'error');
    }
  }

  async function confirmDelete() {
    if (!deleteTarget?._id) return;
    try {
      await adminApi.remove(`${basePath}/${deleteTarget._id}`);
      setDeleteTarget(null);
      await load();
      notify(`${singular} deleted`);
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Could not delete', 'error');
    }
  }

  const totalPages = meta?.pages ?? 1;

  const visibleColumns = useMemo(
    () => (canPublish ? columns : columns),
    [canPublish, columns],
  );

  return (
    <>
      <AdminPageHeader
        title={title}
        description={description}
        actions={
          canCreate ? (
            <AdminButton onClick={openCreate}>
              <Plus className="h-4 w-4" />
              New {singular.toLowerCase()}
            </AdminButton>
          ) : undefined
        }
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
              placeholder={`Search ${title.toLowerCase()}…`}
              className={`${adminInput} pl-9`}
            />
          </div>
          <p className="text-xs text-slate-500">
            {meta ? `${meta.total} total` : `${rows.length} loaded`}
          </p>
        </div>

        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="p-6">
            <div className="flex items-start gap-3 rounded-xl border border-amber-500/25 bg-amber-500/10 p-4 text-sm text-amber-100">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <div>
                <p className="font-medium">{error}</p>
                <p className="mt-1 text-xs text-amber-200/80">
                  Start the API with <code>npm run dev:api</code> and make sure
                  MongoDB is running.
                </p>
              </div>
            </div>
          </div>
        ) : rows.length === 0 ? (
          <EmptyState
            title={`No ${title.toLowerCase()} yet`}
            description={`Create your first ${singular.toLowerCase()} — it appears on the website immediately.`}
            action={
              canCreate ? (
                <AdminButton onClick={openCreate}>
                  <Plus className="h-4 w-4" />
                  New {singular.toLowerCase()}
                </AdminButton>
              ) : undefined
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/8 text-xs tracking-wide text-slate-500 uppercase">
                <tr>
                  {visibleColumns.map((column) => (
                    <th key={column.key} className="px-4 py-3 font-medium">
                      {column.label}
                    </th>
                  ))}
                  {canPublish ? (
                    <th className="px-4 py-3 font-medium">Status</th>
                  ) : null}
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6">
                {rows.map((row) => (
                  <tr key={row._id} className="transition hover:bg-white/[0.02]">
                    {visibleColumns.map((column) => (
                      <td
                        key={column.key}
                        className={`px-4 py-3 align-top ${column.className || 'text-slate-300'}`}
                      >
                        {column.render
                          ? column.render(row)
                          : String(row[column.key] ?? '—')}
                      </td>
                    ))}
                    {canPublish ? (
                      <td className="px-4 py-3 align-top">
                        <StatusPill
                          className={
                            row.published
                              ? 'border-emerald-500/30 bg-emerald-500/15 text-emerald-200'
                              : 'border-slate-600/40 bg-slate-600/15 text-slate-400'
                          }
                        >
                          {row.published ? 'Live' : 'Draft'}
                        </StatusPill>
                      </td>
                    ) : null}
                    <td className="px-4 py-3 align-top">
                      <div className="flex items-center justify-end gap-1">
                        {canPublish ? (
                          <button
                            type="button"
                            onClick={() => void togglePublished(row)}
                            title={row.published ? 'Unpublish' : 'Publish'}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/5 hover:text-white"
                          >
                            {row.published ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        ) : null}
                        <button
                          type="button"
                          onClick={() => openEdit(row)}
                          title="Edit"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/5 hover:text-white"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(row)}
                          title="Delete"
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

        {totalPages > 1 ? (
          <div className="flex items-center justify-between border-t border-white/8 p-4">
            <p className="text-xs text-slate-500">
              Page {meta?.page ?? page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <AdminButton
                variant="secondary"
                size="sm"
                disabled={(meta?.page ?? page) <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Prev
              </AdminButton>
              <AdminButton
                variant="secondary"
                size="sm"
                disabled={(meta?.page ?? page) >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
                <ChevronRight className="h-3.5 w-3.5" />
              </AdminButton>
            </div>
          </div>
        ) : null}
      </AdminCard>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? `Edit ${singular.toLowerCase()}` : `New ${singular.toLowerCase()}`}
        wide
      >
        <div className="grid max-h-[65vh] gap-4 overflow-y-auto pr-1 sm:grid-cols-2">
          {fields.map((field) => (
            <div
              key={field.name}
              className={field.full || field.type === 'html' ? 'sm:col-span-2' : ''}
            >
              <label className="mb-1.5 block text-xs font-medium text-slate-400">
                {field.label}
                {field.required ? <span className="text-rose-400"> *</span> : null}
              </label>
              <FieldInput
                field={field}
                value={form[field.name]}
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, [field.name]: value }))
                }
              />
              {field.help && field.type !== 'boolean' ? (
                <p className="mt-1 text-xs text-slate-600">{field.help}</p>
              ) : null}
            </div>
          ))}
        </div>

        {formError ? (
          <p className="mt-4 rounded-xl border border-rose-500/25 bg-rose-500/10 p-3 text-xs text-rose-200">
            {formError}
          </p>
        ) : null}

        <div className="mt-6 flex justify-end gap-2 border-t border-white/8 pt-4">
          <AdminButton variant="secondary" onClick={() => setModalOpen(false)}>
            Cancel
          </AdminButton>
          <AdminButton onClick={() => void save()} loading={saving}>
            {editing ? 'Save changes' : `Create ${singular.toLowerCase()}`}
          </AdminButton>
        </div>
      </Modal>

      <Modal
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title={`Delete ${singular.toLowerCase()}`}
      >
        <p className="text-sm text-slate-300">
          This permanently deletes{' '}
          <span className="font-medium text-white">
            {String(
              deleteTarget?.title ||
                deleteTarget?.name ||
                deleteTarget?.question ||
                'this record',
            )}
          </span>
          . It cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <AdminButton variant="secondary" onClick={() => setDeleteTarget(null)}>
            Keep it
          </AdminButton>
          <AdminButton variant="danger" onClick={() => void confirmDelete()}>
            Delete permanently
          </AdminButton>
        </div>
      </Modal>

      <Toast message={toast.message} type={toast.type} />
    </>
  );
}
