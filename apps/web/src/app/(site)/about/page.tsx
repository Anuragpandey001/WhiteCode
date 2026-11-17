import type { Metadata } from 'next';
import { Container, Section, SectionHeading, Badge } from '@/components/ui/primitives';
import { PageHeader } from '@/components/site/page-header';
import { Reveal } from '@/components/ui/reveal';
import { Process } from '@/components/site/process';
import { WhyUs } from '@/components/site/why-us';
import { CtaBand } from '@/components/site/cta-band';
import { Testimonials } from '@/components/site/testimonials';
import { getSettings, getTeam, getTestimonials } from '@/lib/api';
import { initials } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'About us',
  description:
    'We are a small, senior team that designs, builds, markets and maintains software for growing businesses.',
};

export default async function AboutPage() {
  const [team, settings, testimonials] = await Promise.all([
    getTeam(),
    getSettings(),
    getTestimonials(3),
  ]);

  const stats = settings?.stats || [];

  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="A small senior team, not a staffing pyramid"
        description="We started because too many good businesses were paying three vendors to argue with each other. One team, accountable for the whole outcome, works better — and we have the case studies to show it."
      />

      {stats.length ? (
        <Section className="py-14">
          <Container>
            <dl className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-ink-950/60 px-6 py-8 text-center">
                  <dd className="font-[family-name:var(--font-display)] text-3xl font-semibold text-white">
                    {stat.value}
                  </dd>
                  <dt className="mt-1 text-xs tracking-wide text-slate-500 uppercase">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </Container>
        </Section>
      ) : null}

      <Section className="pt-6">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <SectionHeading
              align="left"
              eyebrow="How we got here"
              title="Built by people who still write the code"
              description="Every engagement is run by someone who has shipped the thing before. Our founders stay on the delivery side — that is deliberate, and it is why timelines hold."
            />
            <div className="prose-site">
              <p>
                We began as two freelancers taking on work that was too big for
                one person: an app that needed a backend, a website that needed
                campaigns behind it, a product that needed video to sell it.
              </p>
              <p>
                Rather than hiring layers of account managers, we built a small
                bench of senior specialists — engineering, design, growth and
                media — who work together on a handful of clients at a time. That
                cap is on purpose. It is the only way a demo every two weeks is
                a promise rather than a slogan.
              </p>
              <p>
                We say no to work we are not right for, we quote before we
                build, and we hand over everything at the end. You should never
                feel locked in to keep your own product running.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <WhyUs />

      <Section className="border-y border-white/8 bg-ink-900/40">
        <Container>
          <SectionHeading
            eyebrow="The team"
            title="The people you will actually talk to"
            description="No handoff to a junior after the contract is signed."
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <Reveal key={member.name} delay={index * 70} className="h-full">
                <div className="panel panel-hover flex h-full flex-col rounded-3xl p-6 text-center">
                  {member.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="mx-auto h-20 w-20 rounded-full object-cover"
                    />
                  ) : (
                    <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-brand-500/35 to-aqua-400/25 font-[family-name:var(--font-display)] text-xl font-semibold text-white">
                      {initials(member.name)}
                    </span>
                  )}
                  <h3 className="mt-4 text-base font-semibold text-white">
                    {member.name}
                  </h3>
                  <p className="mt-0.5 text-xs tracking-wide text-aqua-300 uppercase">
                    {member.role}
                  </p>
                  {member.bio ? (
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                      {member.bio}
                    </p>
                  ) : null}
                  {member.skills?.length ? (
                    <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                      {member.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill}>{skill}</Badge>
                      ))}
                    </div>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Process />

      <Testimonials testimonials={testimonials} />

      <CtaBand settings={settings} />
    </>
  );
}
