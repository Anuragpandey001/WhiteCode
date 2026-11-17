import { ArrowRight, Play, Star } from 'lucide-react';
import Link from 'next/link';
import { Container, GlowBackdrop } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/reveal';
import type { ServiceItem, SiteSettings } from '@/lib/types';
import { Icon } from '@/components/ui/icon';

export function Hero({
  settings,
  services,
}: {
  settings?: SiteSettings;
  services: ServiceItem[];
}) {
  const hero = settings?.hero || {};
  const stats = settings?.stats?.slice(0, 4) || [];

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <GlowBackdrop />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium tracking-[0.16em] text-brand-200 uppercase">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-aqua-400" />
                {hero.eyebrow || 'Design · Build · Market · Scale'}
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1
                className="mt-6 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
                style={{ textWrap: 'balance' } as React.CSSProperties}
              >
                {hero.headline ? (
                  hero.headline
                ) : (
                  <>
                    One team for everything your{' '}
                    <span className="text-gradient">business needs online</span>
                  </>
                )}
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
                {hero.subheadline ||
                  'Apps, websites, custom software, AI automation, marketing, ads and video — delivered by a single accountable team, with fixed milestones and no agency runaround.'}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-500 to-brand-400 px-7 py-3.5 text-base font-medium text-white shadow-[0_18px_45px_-20px_rgba(109,77,251,0.9)] transition-all duration-300 hover:from-brand-400 hover:to-aqua-400 hover:text-ink-950"
                >
                  {hero.primaryCta || 'Book a free strategy call'}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-base font-medium text-white transition hover:border-brand-400/60 hover:bg-white/10"
                >
                  <Play className="h-4 w-4" />
                  {hero.secondaryCta || 'See our work'}
                </Link>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-slate-400">
                    4.9 average across 45+ clients
                  </span>
                </div>
                <span className="hidden h-4 w-px bg-white/10 sm:block" />
                <span className="text-sm text-slate-400">
                  Free 30-minute discovery call
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="relative">
              <div className="panel animate-float rounded-4xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs tracking-[0.18em] text-slate-500 uppercase">
                      What we do
                    </p>
                    <p className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                      Full-stack delivery
                    </p>
                  </div>
                  <span className="rounded-full border border-aqua-400/30 bg-aqua-400/10 px-3 py-1 text-xs text-aqua-300">
                    {services.length || 14} services
                  </span>
                </div>

                <div className="mt-6 grid gap-3">
                  {(services.length ? services : []).slice(0, 5).map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="group flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-3.5 transition hover:border-brand-400/45 hover:bg-white/[0.06]"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-brand-500/25 to-aqua-400/15 text-brand-200">
                        <Icon name={service.icon} className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-white">
                          {service.title}
                        </span>
                        <span className="block truncate text-xs text-slate-500">
                          {service.startingPrice
                            ? `from ${service.startingPrice}`
                            : service.timeline}
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-slate-600 transition group-hover:translate-x-0.5 group-hover:text-brand-300" />
                    </Link>
                  ))}
                </div>

                <Link
                  href="/services"
                  className="mt-5 flex items-center justify-center gap-2 rounded-2xl border border-white/10 py-3 text-sm text-slate-300 transition hover:border-brand-400/50 hover:text-white"
                >
                  View all services
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        {stats.length ? (
          <Reveal delay={380}>
            <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-ink-950/60 px-6 py-7 text-center">
                  <dt className="order-2 mt-1 text-xs tracking-wide text-slate-500 uppercase">
                    {stat.label}
                  </dt>
                  <dd className="font-[family-name:var(--font-display)] text-3xl font-semibold text-white">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
