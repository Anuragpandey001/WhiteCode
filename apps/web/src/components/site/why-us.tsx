import { Container, Section, SectionHeading } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/reveal';
import { Icon } from '@/components/ui/icon';
import { differentiators } from '@/config/site';

export function WhyUs() {
  return (
    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHeading
            align="left"
            eyebrow="Why teams pick us"
            title="Agency reach, in-house accountability"
            description="Most agencies sell you a department. We give you one team that owns the outcome end to end — and tells you the truth about timelines."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {differentiators.map((item, index) => (
              <Reveal key={item.title} delay={index * 60} className="h-full">
                <div className="panel panel-hover flex h-full gap-4 rounded-3xl p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-brand-500/25 to-aqua-400/15 text-brand-200">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
