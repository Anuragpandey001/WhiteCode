import Link from 'next/link';
import {
  Hexagon,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  Github,
  Youtube,
} from 'lucide-react';
import { footerNav, siteConfig } from '@/config/site';
import { NewsletterForm } from './newsletter-form';
import type { SiteSettings } from '@/lib/types';

const socialIcons = [
  { key: 'linkedin', Icon: Linkedin, label: 'LinkedIn' },
  { key: 'instagram', Icon: Instagram, label: 'Instagram' },
  { key: 'github', Icon: Github, label: 'GitHub' },
  { key: 'youtube', Icon: Youtube, label: 'YouTube' },
];

export function Footer({ settings }: { settings?: SiteSettings }) {
  const brand = settings?.brandName || siteConfig.name;
  const contact = { ...siteConfig.contact, ...(settings?.contact || {}) };
  const socials = { ...siteConfig.socials, ...(settings?.socials || {}) };

  return (
    <footer className="relative mt-10 border-t border-white/10 bg-ink-900">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-brand-500 to-aqua-400">
                <Hexagon className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
              </span>
              <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                {brand}
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              {settings?.tagline || siteConfig.tagline} We design, build, market
              and maintain the software behind growing businesses.
            </p>

            <div className="mt-6 space-y-3 text-sm">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2.5 text-slate-300 transition hover:text-white"
              >
                <Mail className="h-4 w-4 text-brand-300" />
                {contact.email}
              </a>
              <a
                href={`tel:${(contact.phone || '').replace(/\s/g, '')}`}
                className="flex items-center gap-2.5 text-slate-300 transition hover:text-white"
              >
                <Phone className="h-4 w-4 text-brand-300" />
                {contact.phone}
              </a>
              <p className="flex items-center gap-2.5 text-slate-400">
                <MapPin className="h-4 w-4 text-brand-300" />
                {contact.address}
              </p>
            </div>

            <div className="mt-6 flex gap-2">
              {socialIcons.map(({ key, Icon, label }) => {
                const href = (socials as Record<string, string>)[key];
                if (!href) return null;
                return (
                  <a
                    key={key}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-brand-400/50 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold text-white">{group.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-400 transition hover:text-brand-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">
              One useful email a month
            </h3>
            <p className="mt-1.5 text-sm text-slate-400">
              What we learned shipping client products — no newsletter filler.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/contact" className="transition hover:text-slate-300">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
