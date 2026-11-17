import type { Metadata } from 'next';
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  CalendarCheck,
} from 'lucide-react';
import { Container, Section } from '@/components/ui/primitives';
import { PageHeader } from '@/components/site/page-header';
import { ContactForm } from '@/components/site/contact-form';
import { FaqAccordion } from '@/components/site/faq-accordion';
import { getFaqs, getServices, getSettings } from '@/lib/api';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Tell us what you are building. Free 30-minute discovery call, reply within one business day.',
};

export default async function ContactPage() {
  const [services, settings, faqs] = await Promise.all([
    getServices(),
    getSettings(),
    getFaqs(),
  ]);

  const contact = { ...siteConfig.contact, ...(settings?.contact || {}) };
  const whatsapp = (contact.whatsapp || '').replace(/\D/g, '');

  const channels = [
    {
      Icon: Mail,
      label: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
      note: 'Replies within one business day',
    },
    {
      Icon: Phone,
      label: 'Phone',
      value: contact.phone,
      href: `tel:${(contact.phone || '').replace(/\s/g, '')}`,
      note: 'Mon-Sat, 10am - 7pm IST',
    },
    whatsapp
      ? {
          Icon: MessageCircle,
          label: 'WhatsApp',
          value: 'Chat with us',
          href: `https://wa.me/${whatsapp}`,
          note: 'Fastest for quick questions',
        }
      : null,
    {
      Icon: MapPin,
      label: 'Studio',
      value: contact.address,
      href: undefined,
      note: 'Visits by appointment',
    },
  ].filter(Boolean) as {
    Icon: typeof Mail;
    label: string;
    value?: string;
    href?: string;
    note: string;
  }[];

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let us scope it together"
        description="Share the problem, the timeline and roughly what you can spend. You will get a straight answer about whether we are the right team — and what it would take."
      />

      <Section className="pt-6">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start">
            <div>
              <div className="grid gap-4 sm:grid-cols-2">
                {channels.map(({ Icon, label, value, href, note }) => {
                  const body = (
                    <>
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-brand-500/25 to-aqua-400/15 text-brand-200">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="mt-4 block text-xs tracking-wide text-slate-500 uppercase">
                        {label}
                      </span>
                      <span className="mt-1 block text-sm font-medium break-words text-white">
                        {value}
                      </span>
                      <span className="mt-1 block text-xs text-slate-500">
                        {note}
                      </span>
                    </>
                  );

                  return href ? (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="panel panel-hover block rounded-3xl p-5"
                    >
                      {body}
                    </a>
                  ) : (
                    <div key={label} className="panel rounded-3xl p-5">
                      {body}
                    </div>
                  );
                })}
              </div>

              <div className="panel mt-6 rounded-3xl p-6">
                <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                  What happens after you send this
                </h2>
                <ol className="mt-5 space-y-4">
                  {[
                    {
                      Icon: Mail,
                      title: 'We read it ourselves',
                      body: 'No bot, no SDR. Usually a reply the same day with two or three questions.',
                    },
                    {
                      Icon: CalendarCheck,
                      title: '30-minute call',
                      body: 'We talk through the problem, constraints and what success means in numbers.',
                    },
                    {
                      Icon: Clock,
                      title: 'Scope in 2-3 days',
                      body: 'A written scope with milestones, timeline and fixed price for phase one.',
                    },
                  ].map((step) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-brand-200">
                        <step.Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {step.title}
                        </p>
                        <p className="mt-0.5 text-sm text-slate-400">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <ContactForm services={services} />
          </div>
        </Container>
      </Section>

      <Section className="border-t border-white/8 bg-ink-900/40">
        <Container>
          <h2 className="mb-12 text-center font-[family-name:var(--font-display)] text-3xl font-semibold text-white">
            Before you ask
          </h2>
          <FaqAccordion faqs={faqs} />
        </Container>
      </Section>
    </>
  );
}
