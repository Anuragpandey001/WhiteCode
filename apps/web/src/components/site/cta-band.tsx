import Link from 'next/link';
import { ArrowRight, MessageCircle, PhoneCall } from 'lucide-react';
import { Container, Section } from '@/components/ui/primitives';
import { siteConfig } from '@/config/site';
import type { SiteSettings } from '@/lib/types';

export function CtaBand({ settings }: { settings?: SiteSettings }) {
  const contact = { ...siteConfig.contact, ...(settings?.contact || {}) };
  const whatsapp = (contact.whatsapp || '').replace(/\D/g, '');

  return (
    <Section>
      <Container>
        <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-linear-to-br from-brand-700/35 via-ink-850 to-aqua-500/15 px-6 py-14 sm:px-12 sm:py-18">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="glow left-[10%] top-[-30%] h-72 w-72 bg-brand-500/40" />
            <div className="glow right-[5%] bottom-[-40%] h-72 w-72 bg-aqua-500/25" />
          </div>

          <div className="relative mx-auto max-w-3xl text-center">
            <h2
              className="font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight text-white sm:text-4xl"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              Tell us what you are trying to build
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-300">
              Thirty minutes, no slide deck. You will leave the call with a
              rough scope, a realistic timeline and a price range — whether or
              not you hire us.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-medium text-ink-950 transition hover:bg-brand-100 sm:w-auto"
              >
                Book a free call
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              {whatsapp ? (
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-base font-medium text-white transition hover:bg-white/10 sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp us
                </a>
              ) : null}
              {contact.phone ? (
                <a
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 px-2 py-3 text-sm text-slate-300 transition hover:text-white"
                >
                  <PhoneCall className="h-4 w-4" />
                  {contact.phone}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
