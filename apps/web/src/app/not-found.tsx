import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="glow left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 bg-brand-600/30" />
      </div>

      <p className="relative font-[family-name:var(--font-display)] text-7xl font-semibold text-white/10">
        404
      </p>
      <h1 className="relative mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold text-white">
        This page moved or never existed
      </h1>
      <p className="relative mt-3 max-w-md text-slate-400">
        Check the address, or head back and start from the home page.
      </p>
      <Link
        href="/"
        className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-brand-500 to-brand-400 px-6 py-3 text-sm font-medium text-white transition hover:from-brand-400 hover:to-aqua-400 hover:text-ink-950"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>
    </div>
  );
}
