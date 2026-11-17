'use client';

import { useCallback, useEffect, useState } from 'react';
import { Plus, Trash2, AlertTriangle, KeyRound } from 'lucide-react';
import { adminApi } from '@/lib/admin-client';
import { AdminPageHeader } from '@/components/admin/shell';
import {
  AdminButton,
  AdminCard,
  Modal,
  Spinner,
  StatusPill,
  Toast,
  adminInput,
} from '@/components/admin/ui';
import { useAuth } from '@/components/admin/auth-provider';
import { formatDateTime } from '@/lib/utils';

interface User {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'editor';
  active: boolean;
  lastLoginAt?: string;
}

const roles = [
  { value: 'editor', label: 'Editor — content only' },
  { value: 'admin', label: 'Admin — content, leads, settings' },
  { value: 'superadmin', label: 'Superadmin — everything incl. users' },
];

export default function AdminUsersPage() {
  const { user: currentUser } = useAuth();
  const [rows, setRows] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'editor' });
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
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
      const result = await adminApi.list<User>('/auth/users');
      setRows(result.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load users');
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function createUser() {
    setSaving(true);
    setFormError('');
    try {
      await adminApi.post('/auth/users', form);
      setCreateOpen(false);
      setForm({ name: '', email: '', password: '', role: 'editor' });
      await load();
      notify('User created');
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Could not create user');
    } finally {
      setSaving(false);
    }
  }

  async function changePassword() {
    setSaving(true);
    setFormError('');
    try {
      await adminApi.patch('/auth/me/password', passwords);
      setPasswordOpen(false);
      setPasswords({ currentPassword: '', newPassword: '' });
      notify('Password updated');
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Could not update password');
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(row: User) {
    try {
      await adminApi.patch(`/auth/users/${row._id || row.id}`, { active: !row.active });
      await load();
      notify(row.active ? 'User disabled' : 'User enabled');
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Could not update', 'error');
    }
  }

  async function removeUser() {
    if (!deleteTarget) return;
    try {
      await adminApi.remove(`/auth/users/${deleteTarget._id || deleteTarget.id}`);
      setDeleteTarget(null);
      await load();
      notify('User deleted');
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Could not delete', 'error');
    }
  }

  const isSuperadmin = currentUser?.role === 'superadmin';

  return (
    <>
      <AdminPageHeader
        title="Admin users"
        description="Who can sign in to this panel, and what they can touch."
        actions={
          <>
            <AdminButton variant="secondary" onClick={() => setPasswordOpen(true)}>
              <KeyRound className="h-4 w-4" />
              Change my password
            </AdminButton>
            {isSuperadmin ? (
              <AdminButton onClick={() => setCreateOpen(true)}>
                <Plus className="h-4 w-4" />
                New user
              </AdminButton>
            ) : null}
          </>
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
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/8 text-xs tracking-wide text-slate-500 uppercase">
                <tr>
                  <th className="px-4 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="hidden px-4 py-3 font-medium md:table-cell">Last login</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6">
                {rows.map((row) => {
                  const id = row._id || row.id;
                  const isMe = id === currentUser?.id;
                  return (
                    <tr key={id} className="transition hover:bg-white/[0.02]">
                      <td className="px-4 py-3">
                        <p className="font-medium text-white">
                          {row.name}
                          {isMe ? (
                            <span className="ml-2 text-xs text-brand-300">you</span>
                          ) : null}
                        </p>
                        <p className="text-xs text-slate-500">{row.email}</p>
                      </td>
                      <td className="px-4 py-3">
                        <StatusPill className="capitalize">{row.role}</StatusPill>
                      </td>
                      <td className="px-4 py-3">
                        <StatusPill
                          className={
                            row.active
                              ? 'border-emerald-500/30 bg-emerald-500/15 text-emerald-200'
                              : 'border-slate-600/40 bg-slate-600/15 text-slate-400'
                          }
                        >
                          {row.active ? 'Active' : 'Disabled'}
                        </StatusPill>
                      </td>
                      <td className="hidden px-4 py-3 text-xs text-slate-500 md:table-cell">
                        {row.lastLoginAt ? formatDateTime(row.lastLoginAt) : 'Never'}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-1">
                          {isSuperadmin && !isMe ? (
                            <>
                              <button
                                type="button"
                                onClick={() => void toggleActive(row)}
                                className="rounded-lg px-2.5 py-1 text-xs text-slate-300 transition hover:bg-white/5 hover:text-white"
                              >
                                {row.active ? 'Disable' : 'Enable'}
                              </button>
                              <button
                                type="button"
                                onClick={() => setDeleteTarget(row)}
                                aria-label="Delete user"
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-500/10 hover:text-rose-300"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </>
                          ) : (
                            <span className="text-xs text-slate-600">—</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </AdminCard>

      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="New admin user">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={adminInput}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={adminInput}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">
              Temporary password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className={adminInput}
              placeholder="At least 8 characters"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">Role</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className={adminInput}
            >
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {formError ? (
          <p className="mt-4 rounded-xl border border-rose-500/25 bg-rose-500/10 p-3 text-xs text-rose-200">
            {formError}
          </p>
        ) : null}

        <div className="mt-6 flex justify-end gap-2">
          <AdminButton variant="secondary" onClick={() => setCreateOpen(false)}>
            Cancel
          </AdminButton>
          <AdminButton onClick={() => void createUser()} loading={saving}>
            Create user
          </AdminButton>
        </div>
      </Modal>

      <Modal
        open={passwordOpen}
        onClose={() => setPasswordOpen(false)}
        title="Change my password"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">
              Current password
            </label>
            <input
              type="password"
              value={passwords.currentPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, currentPassword: e.target.value })
              }
              className={adminInput}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">
              New password
            </label>
            <input
              type="password"
              value={passwords.newPassword}
              onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
              className={adminInput}
              placeholder="At least 8 characters"
            />
          </div>
        </div>

        {formError ? (
          <p className="mt-4 rounded-xl border border-rose-500/25 bg-rose-500/10 p-3 text-xs text-rose-200">
            {formError}
          </p>
        ) : null}

        <div className="mt-6 flex justify-end gap-2">
          <AdminButton variant="secondary" onClick={() => setPasswordOpen(false)}>
            Cancel
          </AdminButton>
          <AdminButton onClick={() => void changePassword()} loading={saving}>
            Update password
          </AdminButton>
        </div>
      </Modal>

      <Modal
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Delete admin user"
      >
        <p className="text-sm text-slate-300">
          This permanently removes{' '}
          <span className="font-medium text-white">{deleteTarget?.email}</span>{' '}
          and their access to this panel. It cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <AdminButton variant="secondary" onClick={() => setDeleteTarget(null)}>
            Keep it
          </AdminButton>
          <AdminButton variant="danger" onClick={() => void removeUser()}>
            Delete permanently
          </AdminButton>
        </div>
      </Modal>

      <Toast message={toast.message} type={toast.type} />
    </>
  );
}
