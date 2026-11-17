'use client';

import { useState } from 'react';
import { CheckCircle2, Loader2, Send, AlertCircle } from 'lucide-react';
import { API_URL } from '@/lib/api';
import type { ServiceItem } from '@/lib/types';

const budgets = [
  'Under ₹50,000',
  '₹50,000 - ₹1.5 lakh',
  '₹1.5 - 5 lakh',
  '₹5 - 15 lakh',
  'Above ₹15 lakh',
  'Not sure yet',
];

const timelines = ['ASAP', 'In 1 month', 'In 2-3 months', 'Just exploring'];

const inputClass =
  'w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition focus:border-brand-400/60 focus:bg-white/[0.07] focus:outline-none';

const labelClass = 'mb-1.5 block text-xs font-medium tracking-wide text-slate-400';

export function ContactForm({
  services,
  defaultService,
  source = 'contact-page',
}: {
  services: ServiceItem[];
  defaultService?: string;
  source?: string;
}) {
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    setState('loading');
    setError('');

    try {
      const res = await fetch(`${API_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, source }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        const message = Array.isArray(body?.message)
          ? body.message[0]
          : body?.message;
        throw new Error(message || 'Could not send your enquiry');
      }

      setState('done');
    } catch (err) {
      setState('error');
      setError(
        err instanceof Error && err.message !== 'Failed to fetch'
          ? err.message
          : 'The server is not reachable. Please email us directly and we will reply the same day.',
      );
    }
  }

  if (state === 'done') {
    return (
      <div className="panel flex flex-col items-center rounded-3xl p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-emerald-400" />
        <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl font-semibold text-white">
          Enquiry received
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-400">
          We read every message ourselves and reply within one business day,
          usually with two or three questions and a rough plan.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="panel rounded-3xl p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            Your name *
          </label>
          <input id="name" name="name" required className={inputClass} placeholder="Raj Kamal" />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Work email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClass}
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">
            Phone / WhatsApp
          </label>
          <input id="phone" name="phone" className={inputClass} placeholder="+91 98765 43210" />
        </div>
        <div>
          <label className={labelClass} htmlFor="company">
            Company
          </label>
          <input id="company" name="company" className={inputClass} placeholder="Acme Pvt Ltd" />
        </div>

        <div>
          <label className={labelClass} htmlFor="service">
            What do you need?
          </label>
          <select
            id="service"
            name="service"
            defaultValue={defaultService || ''}
            className={inputClass}
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
            <option value="Not sure / multiple">Not sure / multiple</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="budget">
            Budget range
          </label>
          <select id="budget" name="budget" className={inputClass} defaultValue="">
            <option value="">Select a range</option>
            {budgets.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="timeline">
            When do you want to start?
          </label>
          <div className="flex flex-wrap gap-2">
            {timelines.map((timeline, index) => (
              <label
                key={timeline}
                className="cursor-pointer rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300 transition has-checked:border-brand-400/60 has-checked:bg-brand-500/15 has-checked:text-white"
              >
                <input
                  type="radio"
                  name="timeline"
                  value={timeline}
                  defaultChecked={index === 0}
                  className="sr-only"
                />
                {timeline}
              </label>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="message">
            Tell us about the project *
          </label>
          <textarea
            id="message"
            name="message"
            required
            minLength={10}
            rows={5}
            className={inputClass}
            placeholder="What are you building, who is it for, and what does success look like?"
          />
        </div>
      </div>

      {error ? (
        <p className="mt-4 flex items-start gap-2 rounded-2xl border border-rose-500/25 bg-rose-500/10 p-3 text-xs text-rose-200">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-500 to-brand-400 px-7 py-3.5 text-base font-medium text-white transition hover:from-brand-400 hover:to-aqua-400 hover:text-ink-950 disabled:opacity-60"
      >
        {state === 'loading' ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        {state === 'loading' ? 'Sending…' : 'Send enquiry'}
      </button>

      <p className="mt-3 text-center text-xs text-slate-500">
        We reply within one business day. Your details stay with us — we sign
        an NDA before seeing anything sensitive.
      </p>
    </form>
  );
}
