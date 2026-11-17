'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  Inbox,
  Sparkles,
  FolderKanban,
  Newspaper,
  Quote,
  Users,
  HelpCircle,
  Building2,
  Briefcase,
  FileUser,
  Mails,
  Settings,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  Hexagon,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from './auth-provider';
import { cn } from '@/lib/utils';
import { initials } from '@/lib/utils';

const navGroups = [
  {
    title: 'Overview',
    items: [
      { href: '/admin', label: 'Dashboard', Icon: LayoutDashboard },
      { href: '/admin/leads', label: 'Leads', Icon: Inbox },
    ],
  },
  {
    title: 'Website content',
    items: [
      { href: '/admin/services', label: 'Services', Icon: Sparkles },
      { href: '/admin/projects', label: 'Portfolio', Icon: FolderKanban },
      { href: '/admin/blog', label: 'Blog', Icon: Newspaper },
      { href: '/admin/testimonials', label: 'Testimonials', Icon: Quote },
      { href: '/admin/team', label: 'Team', Icon: Users },
      { href: '/admin/faqs', label: 'FAQs', Icon: HelpCircle },
      { href: '/admin/industries', label: 'Industries', Icon: Building2 },
    ],
  },
  {
    title: 'Hiring',
    items: [
      { href: '/admin/jobs', label: 'Job openings', Icon: Briefcase },
      { href: '/admin/applications', label: 'Applications', Icon: FileUser },
    ],
  },
  {
    title: 'Settings',
    items: [
      { href: '/admin/subscribers', label: 'Subscribers', Icon: Mails },
      { href: '/admin/settings', label: 'Site settings', Icon: Settings },
      { href: '/admin/users', label: 'Admin users', Icon: ShieldCheck },
    ],
  },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2.5 border-b border-white/8 px-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-brand-500 to-aqua-400">
          <Hexagon className="h-4 w-4 text-white" strokeWidth={2.5} />
        </span>
        <span className="font-[family-name:var(--font-display)] text-sm font-semibold text-white">
          Admin panel
        </span>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {navGroups.map((group) => (
          <div key={group.title}>
            <p className="px-3 pb-2 text-[11px] font-medium tracking-[0.14em] text-slate-600 uppercase">
              {group.title}
            </p>
            <div className="space-y-0.5">
              {group.items.map(({ href, label, Icon }) => {
                const active =
                  href === '/admin'
                    ? pathname === '/admin'
                    : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition',
                      active
                        ? 'bg-brand-500/15 text-white'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white',
                    )}
                  >
                    <Icon
                      className={cn(
                        'h-4 w-4',
                        active ? 'text-brand-300' : 'text-slate-500',
                      )}
                    />
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/8 p-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
        >
          <ExternalLink className="h-4 w-4 text-slate-500" />
          View website
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-ink-950">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-white/8 bg-ink-900/70 lg:block">
        {sidebar}
      </aside>

      {open ? (
        <>
          <div
            className="fixed inset-0 z-40 bg-ink-950/70 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 bg-ink-900 lg:hidden">
            {sidebar}
          </aside>
        </>
      ) : null}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-white/8 bg-ink-950/90 px-4 backdrop-blur-xl sm:px-6">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-300 lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>

          <div className="hidden text-sm text-slate-500 lg:block">
            Signed in as{' '}
            <span className="text-slate-300">{user?.email}</span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-brand-500/40 to-aqua-400/25 text-xs font-semibold text-white">
                {initials(user?.name || 'Admin')}
              </span>
              <div className="hidden sm:block">
                <p className="text-sm text-white">{user?.name}</p>
                <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={logout}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition hover:border-rose-500/40 hover:text-rose-300"
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}

export function AdminPageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
          {title}
        </h1>
        {description ? (
          <p className="mt-1 text-sm text-slate-400">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex gap-2">{actions}</div> : null}
    </div>
  );
}
