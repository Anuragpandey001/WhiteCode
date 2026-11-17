import { Container, Section, SectionHeading } from '@/components/ui/primitives';
import { Icon } from '@/components/ui/icon';
import { techStack } from '@/config/site';
import type { Industry } from '@/lib/types';

export function TechMarquee() {
  const row = [...techStack, ...techStack];
  return (
    <div className="border-y border-white/8 bg-ink-900/60 py-6">
      <div className="marquee-mask overflow-hidden">
        <div className="animate-marquee flex w-max gap-3">
          {row.map((tech, index) => (
            <span
              key={`${tech}-${index}`}
              className="rounded-full border border-white/8 bg-white/[0.04] px-4 py-2 text-sm whitespace-nowrap text-slate-400"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Industries({ industries }: { industries: Industry[] }) {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Industries"
          title="We have shipped in your sector before"
          description="Domain context matters. We bring patterns that already worked in your industry instead of learning on your budget."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {industries.map((industry) => (
            <div
              key={industry.slug}
              className="panel panel-hover rounded-3xl p-5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-brand-500/25 to-aqua-400/15 text-brand-200">
                <Icon name={industry.icon} fallback="Building2" className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-sm font-semibold text-white">
                {industry.name}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                {industry.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
