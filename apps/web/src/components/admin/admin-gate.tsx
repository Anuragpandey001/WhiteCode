'use client';

import { useEffect, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuth } from './auth-provider';
import { AdminShell } from './shell';

export function AdminGate({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === '/admin/login';

  useEffect(() => {
    if (!loading && !user && !isLogin) router.replace('/admin/login');
    if (!loading && user && isLogin) router.replace('/admin');
  }, [loading, user, isLogin, router]);

  if (isLogin) return <>{children}</>;

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-3 text-sm text-slate-400">
        <Loader2 className="h-4 w-4 animate-spin" />
        Checking your session…
      </div>
    );
  }

  return <AdminShell>{children}</AdminShell>;
}
