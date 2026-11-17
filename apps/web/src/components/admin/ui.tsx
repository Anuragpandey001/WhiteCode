'use client';

import type { ReactNode } from 'react';
import { Loader2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const adminInput =
  'w-full rounded-xl border border-white/10 bg-ink-900/70 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 transition focus:border-brand-400/60 focus:outline-none';

export function AdminButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  type = 'button',
  loading,
  disabled,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md';
  type?: 'button' | 'submit';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}) {
  const variants: Record<string, string> = {
    primary:
      'bg-linear-to-r from-brand-500 to-brand-400 text-white hover:from-brand-400 hover:to-aqua-400 hover:text-ink-950',
    secondary:
      'border border-white/12 bg-white/5 text-slate-200 hover:border-brand-400/50 hover:text-white',
    danger:
      'border border-rose-500/30 bg-rose-500/10 text-rose-200 hover:bg-rose-500/20',
    ghost: 'text-slate-400 hover:text-white',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition disabled:cursor-not-allowed disabled:opacity-50',
        size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2.5 text-sm',
        variants[variant],
        className,
      )}
    >
      {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
      {children}
    </button>
  );
}

export function AdminCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/10 bg-ink-900/60 p-5',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Modal({
  open,
  title,
  onClose,
  children,
  wide,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-start justify-center overflow-y-auto bg-ink-950/80 p-4 backdrop-blur-sm sm:p-8">
      <div
        className={cn(
          'relative w-full rounded-2xl border border-white/10 bg-ink-850 shadow-2xl',
          wide ? 'max-w-4xl' : 'max-w-2xl',
        )}
      >
        <div className="flex items-center justify-between border-b border-white/8 px-6 py-4">
          <h2 className="font-[family-name:var(--font-display)] text-base font-semibold text-white">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

export function Toast({
  message,
  type = 'success',
}: {
  message: string;
  type?: 'success' | 'error';
}) {
  if (!message) return null;
  return (
    <div
      className={cn(
        'fixed bottom-6 left-1/2 z-200 -translate-x-1/2 rounded-xl border px-5 py-3 text-sm shadow-xl',
        type === 'success'
          ? 'border-emerald-500/30 bg-emerald-500/15 text-emerald-100'
          : 'border-rose-500/30 bg-rose-500/15 text-rose-100',
      )}
    >
      {message}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/12 px-6 py-16 text-center">
      <p className="text-sm font-medium text-white">{title}</p>
      {description ? (
        <p className="mt-1.5 max-w-sm text-sm text-slate-500">{description}</p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

export function Spinner({ label }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-sm text-slate-400">
      <Loader2 className="h-4 w-4 animate-spin" />
      {label || 'Loading…'}
    </div>
  );
}

export function StatusPill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs',
        className || 'border-white/12 bg-white/5 text-slate-300',
      )}
    >
      {children}
    </span>
  );
}
