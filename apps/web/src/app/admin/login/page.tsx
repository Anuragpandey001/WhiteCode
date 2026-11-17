'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Hexagon, Loader2, LogIn, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/components/admin/auth-provider';
import { adminInput } from '@/components/admin/ui';

export default function AdminLoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not sign in');
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="glow left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 bg-brand-600/30" />
      </div>

      <div className="relative w-full max-w-md">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to website
        </Link>

        <div className="rounded-3xl border border-white/10 bg-ink-900/80 p-8 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-brand-500 to-aqua-400">
              <Hexagon className="h-5 w-5 text-white" strokeWidth={2.5} />
            </span>
            <div>
              <h1 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                Admin sign in
              </h1>
              <p className="text-xs text-slate-500">
                Manage services, work, leads and content
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={adminInput}
                placeholder="admin@novacraft.dev"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={adminInput}
                placeholder="••••••••"
              />
            </div>

            {error ? (
              <p className="flex items-start gap-2 rounded-xl border border-rose-500/25 bg-rose-500/10 p-3 text-xs text-rose-200">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-brand-500 to-brand-400 px-5 py-3 text-sm font-medium text-white transition hover:from-brand-400 hover:to-aqua-400 hover:text-ink-950 disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LogIn className="h-4 w-4" />
              )}
              Sign in
            </button>
          </form>

          <p className="mt-6 rounded-xl border border-white/8 bg-white/[0.03] p-3 text-xs leading-relaxed text-slate-500">
            First run? Start the API and run <code className="text-slate-300">npm run seed</code>{' '}
            to create the superadmin from the values in{' '}
            <code className="text-slate-300">apps/api/.env</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
