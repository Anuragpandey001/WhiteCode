'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Faq } from '@/lib/types';
import { cn } from '@/lib/utils';

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-white/8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
      {faqs.map((faq, index) => {
        const isOpen = open === index;
        return (
          <div key={faq.question}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-start gap-4 px-6 py-5 text-left transition hover:bg-white/[0.03]"
            >
              <span className="flex-1 text-base font-medium text-white">
                {faq.question}
              </span>
              <Plus
                className={cn(
                  'mt-0.5 h-5 w-5 shrink-0 text-brand-300 transition-transform duration-300',
                  isOpen && 'rotate-45',
                )}
              />
            </button>
            <div
              className={cn(
                'grid transition-all duration-300 ease-out',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-sm leading-relaxed text-slate-400">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
