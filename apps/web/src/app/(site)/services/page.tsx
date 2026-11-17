import type { Metadata } from 'next';
import { Container, Section, Button } from '@/components/ui/primitives';
import { PageHeader } from '@/components/site/page-header';
import { ServiceGrid } from '@/components/site/service-grid';
import { Process } from '@/components/site/process';
import { CtaBand } from '@/components/site/cta-band';
import { FaqAccordion } from '@/components/site/faq-accordion';
import { getFaqs, getServices, getSettings } from '@/lib/api';
import { serviceCategories } from '@/config/site';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'App development, web development, custom software, UI/UX, AI automation, SEO, Google and Meta ads, video editing, branding, cloud, QA and dedicated teams.',
};

export default async function ServicesPage() {
  const [services, settings, faqs] = await Promise.all([
    getServices(),
    getSettings(),
    getFaqs(),
  ]);

  const grouped = serviceCategories
    .filter((category) => category.value !== 'all')
    .map((category) => ({
      ...category,
      items: services.filter((service) => service.category === category.value),
    }))
    .filter((group) => group.items.length);

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Everything we do, in plain language"
        description="Fourteen services across build and growth. Each one has a starting price and a realistic timeline — no 'contact us for pricing' games."
      >
        <div className="flex flex-wrap gap-2">
          {grouped.map((group) => (
            <a
              key={group.value}
              href={`#${group.value}`}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-brand-400/50 hover:text-white"
            >
              {group.label}
              <span className="ml-2 text-xs text-slate-500">
                {group.items.length}
              </span>
            </a>
          ))}
        </div>
      </PageHeader>

      {grouped.map((group) => (
        <Section key={group.value} id={group.value} className="py-14 sm:py-16">
          <Container>
            <div className="mb-8 flex items-center gap-4">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
                {group.label}
              </h2>
              <span className="h-px flex-1 bg-white/10" />
              <span className="text-sm text-slate-500">
                {group.items.length} services
              </span>
            </div>
            <ServiceGrid services={group.items} />
          </Container>
        </Section>
      ))}

      <Process />

      <Section>
        <Container>
          <div className="mb-12 text-center">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-white">
              Still deciding what you need?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-400">
              Tell us the problem instead of the solution. We will tell you
              which of these services actually applies — and which you can skip.
            </p>
            <Button href="/contact" size="lg" className="mt-7" withArrow>
              Get a free recommendation
            </Button>
          </div>
          <FaqAccordion faqs={faqs} />
        </Container>
      </Section>

      <CtaBand settings={settings} />
    </>
  );
}
