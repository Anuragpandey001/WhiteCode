import { Quote, Star } from 'lucide-react';
import { Container, Section, SectionHeading } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/reveal';
import { initials } from '@/lib/utils';
import type { Testimonial } from '@/lib/types';

export function Testimonials({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  if (!testimonials.length) return null;

  return (
    <Section className="border-y border-white/8 bg-ink-900/40">
      <Container>
        <SectionHeading
          eyebrow="Client words"
          title="The part we are judged on"
          description="Every quote below is from a project you can read about on our work page."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {testimonials.slice(0, 6).map((item, index) => (
            <Reveal key={item.name} delay={(index % 3) * 70} className="h-full">
              <figure className="panel panel-hover flex h-full flex-col rounded-3xl p-6">
                <Quote className="h-7 w-7 text-brand-400/60" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-300">
                  {item.quote}
                </blockquote>

                <div className="mt-6 flex items-center gap-3 border-t border-white/8 pt-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-brand-500/35 to-aqua-400/25 text-sm font-semibold text-white">
                    {initials(item.name)}
                  </span>
                  <figcaption className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">
                      {item.name}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {[item.role, item.company].filter(Boolean).join(', ')}
                    </p>
                  </figcaption>
                  <div className="flex gap-0.5">
                    {Array.from({ length: item.rating || 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
