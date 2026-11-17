import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { Container, Section, SectionHeading, Button } from '@/components/ui/primitives';
import { PageHeader } from '@/components/site/page-header';
import { FaqAccordion } from '@/components/site/faq-accordion';
import { CtaBand } from '@/components/site/cta-band';
import { engagementModels } from '@/config/site';
import { getFaqs, getServices, getSettings } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Transparent starting prices for app development, websites, custom software, marketing retainers, ads, video and dedicated teams.',
};

export default async function PricingPage() {
  const [services, faqs, settings] = await Promise.all([
    getServices(),
    getFaqs(),
    getSettings(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Real numbers, before the first call"
        description="These are honest starting points, not bait. Your final quote depends on scope — which we write down and agree before anything is built."
      />

      <Section className="pt-6">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            {engagementModels.map((model) => (
              <div
                key={model.name}
                className={`panel relative flex flex-col rounded-3xl p-7 ${
                  model.highlighted
                    ? 'border-brand-400/45 bg-linear-to-b from-brand-600/15 to-transparent'
                    : 'panel-hover'
                }`}
              >
                {model.highlighted ? (
                  <span className="absolute -top-3 left-7 rounded-full bg-linear-to-r from-brand-500 to-aqua-400 px-3 py-1 text-xs font-medium text-white">
                    Most popular
                  </span>
                ) : null}
                <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                  {model.name}
                </h2>
                <p className="mt-1 text-sm text-slate-400">{model.headline}</p>
                <p className="mt-5 font-[family-name:var(--font-display)] text-3xl font-semibold text-white">
                  {model.price}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {model.description}
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {model.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-sm text-slate-300">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-aqua-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  href="/contact"
                  variant={model.highlighted ? 'primary' : 'secondary'}
                  className="mt-7 w-full"
                  withArrow
                >
                  {model.cta}
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-white/8 bg-ink-900/40">
        <Container>
          <SectionHeading
            eyebrow="Service pricing"
            title="Starting price for every service"
            description="Per service, with a typical delivery window. Bundles get a better rate."
          />

          <div className="mt-12 overflow-hidden rounded-3xl border border-white/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/[0.04] text-xs tracking-wide text-slate-400 uppercase">
                <tr>
                  <th className="px-6 py-4 font-medium">Service</th>
                  <th className="hidden px-6 py-4 font-medium sm:table-cell">
                    Category
                  </th>
                  <th className="px-6 py-4 font-medium">Starts at</th>
                  <th className="hidden px-6 py-4 font-medium md:table-cell">
                    Timeline
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/8">
                {services.map((service) => (
                  <tr key={service.slug} className="transition hover:bg-white/[0.02]">
                    <td className="px-6 py-4">
                      <a
                        href={`/services/${service.slug}`}
                        className="font-medium text-white hover:text-brand-200"
                      >
                        {service.title}
                      </a>
                      <p className="mt-1 max-w-md text-xs text-slate-500 sm:hidden">
                        {service.category}
                      </p>
                    </td>
                    <td className="hidden px-6 py-4 text-slate-400 capitalize sm:table-cell">
                      {service.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-aqua-300">
                      {service.startingPrice || 'On request'}
                    </td>
                    <td className="hidden px-6 py-4 text-slate-400 md:table-cell">
                      {service.timeline || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            GST extra where applicable. Ad spend is paid directly to the
            platform, never marked up by us.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="FAQ"
            title="Pricing questions, answered"
            className="mb-14"
          />
          <FaqAccordion faqs={faqs} />
        </Container>
      </Section>

      <CtaBand settings={settings} />
    </>
  );
}
