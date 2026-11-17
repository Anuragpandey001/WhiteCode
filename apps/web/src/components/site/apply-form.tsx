'use client';

import { useState } from 'react';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { API_URL } from '@/lib/api';
import type { Job } from '@/lib/types';

const inputClass =
  'w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition focus:border-brand-400/60 focus:outline-none';

export function ApplyForm({ jobs }: { jobs: Job[] }) {
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());

    setState('loading');
    setError('');

    try {
      const res = await fetch(`${API_URL}/careers/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(
          Array.isArray(body?.message) ? body.message[0] : body?.message || 'Failed',
        );
      }
      setState('done');
    } catch (err) {
      setState('error');
      setError(
        'We could not submit the form. Email your resume to us directly and we will pick it up.',
      );
      void err;
    }
  }

  if (state === 'done') {
    return (
      <div className="panel flex flex-col items-center rounded-3xl p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-emerald-400" />
        <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl font-semibold text-white">
          Application received
        </h3>
        <p className="mt-2 max-w-sm text-sm text-slate-400">
          We review every application ourselves. If there is a fit you will hear
          from us within a week.
        </p>
      </div>
    );
  }

  const openRoles = jobs.filter((job) => job._id);

  return (
    <form onSubmit={onSubmit} className="panel rounded-3xl p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs text-slate-400" htmlFor="job">
            Role you are applying for *
          </label>
          {openRoles.length ? (
            <select id="job" name="job" required className={inputClass} defaultValue="">
              <option value="">Select a role</option>
              {openRoles.map((job) => (
                <option key={job._id} value={job._id}>
                  {job.title} — {job.location}
                </option>
              ))}
            </select>
          ) : (
            <p className="rounded-2xl border border-amber-500/25 bg-amber-500/10 p-3 text-xs text-amber-200">
              Live roles load from the API. Start the backend (or run the seed)
              to enable applications, or email us your resume directly.
            </p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-xs text-slate-400" htmlFor="apply-name">
            Full name *
          </label>
          <input id="apply-name" name="name" required className={inputClass} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-slate-400" htmlFor="apply-email">
            Email *
          </label>
          <input
            id="apply-email"
            name="email"
            type="email"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-slate-400" htmlFor="apply-phone">
            Phone
          </label>
          <input id="apply-phone" name="phone" className={inputClass} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-slate-400" htmlFor="resumeUrl">
            Resume link (Drive / PDF)
          </label>
          <input
            id="resumeUrl"
            name="resumeUrl"
            className={inputClass}
            placeholder="https://"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs text-slate-400" htmlFor="portfolio">
            Portfolio / GitHub / reel
          </label>
          <input
            id="portfolio"
            name="portfolio"
            className={inputClass}
            placeholder="https://"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs text-slate-400" htmlFor="coverLetter">
            Why you, in a few lines
          </label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            rows={4}
            className={inputClass}
            placeholder="The most interesting thing you have built, and what you want to learn next."
          />
        </div>
      </div>

      {error ? <p className="mt-4 text-xs text-rose-300">{error}</p> : null}

      <button
        type="submit"
        disabled={state === 'loading' || !openRoles.length}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-500 to-brand-400 px-7 py-3.5 text-base font-medium text-white transition hover:from-brand-400 hover:to-aqua-400 hover:text-ink-950 disabled:opacity-50"
      >
        {state === 'loading' ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        Submit application
      </button>
    </form>
  );
}
