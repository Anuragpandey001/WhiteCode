'use client';

import { useState } from 'react';
import { Loader2, Mail, Check } from 'lucide-react';
import { API_URL } from '@/lib/api';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setState('loading');
    try {
      const res = await fetch(`${API_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' }),
      });
      if (!res.ok) throw new Error('Request failed');
      setState('done');
      setMessage('You are on the list.');
      setEmail('');
    } catch {
      setState('error');
      setMessage('Could not subscribe right now. Please email us instead.');
    }
  }

  return (
    <form onSubmit={submit} className="w-full">
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-brand-400/60 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={state === 'loading' || state === 'done'}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-500 to-brand-400 px-5 py-3 text-sm font-medium text-white transition hover:from-brand-400 hover:to-aqua-400 hover:text-ink-950 disabled:opacity-60"
        >
          {state === 'loading' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : state === 'done' ? (
            <Check className="h-4 w-4" />
          ) : null}
          {state === 'done' ? 'Subscribed' : 'Subscribe'}
        </button>
      </div>
      {message ? (
        <p
          className={`mt-2 text-xs ${
            state === 'error' ? 'text-rose-300' : 'text-aqua-300'
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
