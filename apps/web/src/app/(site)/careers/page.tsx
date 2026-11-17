import type { Metadata } from 'next';
import { Briefcase, MapPin, Clock3, IndianRupee, Users } from 'lucide-react';
import { Container, Section, SectionHeading, Badge } from '@/components/ui/primitives';
import { PageHeader } from '@/components/site/page-header';
import { Reveal } from '@/components/ui/reveal';
import { ApplyForm } from '@/components/site/apply-form';
import { CtaBand } from '@/components/site/cta-band';
import { getJobs, getSettings } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Open roles for Flutter and Next.js developers, performance marketers and video editors, plus a paid six-month training program for students.',
};

export default async function CareersPage() {
  const [jobs, settings] = await Promise.all([getJobs(), getSettings()]);

  const totalOpenings = jobs.reduce((sum, job) => sum + (job.openings || 1), 0);

  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Work on real products, not tickets"
        description="We are small, so what you build ships and you talk to the client who uses it. Seniors here still write code — you will learn by pairing, not by watching."
      >
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white">
            <Briefcase className="h-4 w-4 text-aqua-300" />
            {jobs.length} open roles
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white">
            <Users className="h-4 w-4 text-aqua-300" />
            {totalOpenings} positions
          </span>
        </div>
      </PageHeader>

      <Section>
        <Container>
          <SectionHeading
            align="left"
            eyebrow="Open roles"
            title="Where we need people right now"
          />

          <div className="mt-12 space-y-4">
            {jobs.map((job, index) => (
              <Reveal key={job.slug} delay={index * 60}>
                <article className="panel panel-hover rounded-3xl p-6 sm:p-7">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                          {job.title}
                        </h3>
                        <Badge className="border-brand-400/30 bg-brand-500/15 text-brand-200 capitalize">
                          {job.employmentType?.replace('-', ' ')}
                        </Badge>
                      </div>

                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
                        {job.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock3 className="h-3.5 w-3.5" />
                          {job.experience}
                        </span>
                        {job.salaryRange ? (
                          <span className="flex items-center gap-1.5">
                            <IndianRupee className="h-3.5 w-3.5" />
                            {job.salaryRange}
                          </span>
                        ) : null}
                        <span className="flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5" />
                          {job.openings} opening{(job.openings || 1) > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 lg:w-72">
                      {job.requirements?.length ? (
                        <ul className="space-y-1.5">
                          {job.requirements.slice(0, 3).map((req) => (
                            <li
                              key={req}
                              className="flex gap-2 text-xs text-slate-400"
                            >
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-aqua-400" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      <a
                        href="#apply"
                        className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white transition hover:border-brand-400/60 hover:bg-white/10"
                      >
                        Apply for this role
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="apply" className="border-y border-white/8 bg-ink-900/40">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Apply"
                title="One form, no login walls"
                description="Send us something you built. We care far more about that than your CGPA or a keyword-stuffed resume."
              />

              <div className="mt-8 space-y-4">
                {[
                  {
                    title: 'Students & freshers welcome',
                    body: 'Third and fourth-year students can apply to the paid six-month training program and convert to full-time.',
                  },
                  {
                    title: 'How hiring runs',
                    body: 'A short call, one practical task you can do in an evening, then a conversation with the team you would join.',
                  },
                  {
                    title: 'Remote-friendly',
                    body: 'Most roles are remote or hybrid from Jaipur. Media roles are on-site because of the studio.',
                  },
                ].map((item) => (
                  <div key={item.title} className="panel rounded-2xl p-5">
                    <h3 className="text-sm font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <ApplyForm jobs={jobs} />
          </div>
        </Container>
      </Section>

      <CtaBand settings={settings} />
    </>
  );
}
