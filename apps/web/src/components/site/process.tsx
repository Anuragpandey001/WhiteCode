import { Container, Section, SectionHeading } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/reveal';
import { processSteps } from '@/config/site';

export function Process() {
  return (
    <Section className="border-y border-white/8 bg-ink-900/40">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title="A process that keeps you in control"
          description="No black box. You approve the scope, see a demo every two weeks and own everything at the end."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-5">
          {processSteps.map((step, index) => (
            <Reveal key={step.step} delay={index * 70} className="h-full">
              <div className="panel panel-hover relative flex h-full flex-col rounded-3xl p-6">
                <span className="font-[family-name:var(--font-display)] text-3xl font-semibold text-white/10">
                  {step.step}
                </span>
                <h3 className="mt-3 text-base font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-1 text-xs tracking-wide text-aqua-300 uppercase">
                  {step.duration}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
