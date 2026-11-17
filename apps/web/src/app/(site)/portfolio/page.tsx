import type { Metadata } from 'next';
import { Container, Section } from '@/components/ui/primitives';
import { PageHeader } from '@/components/site/page-header';
import { WorkGrid } from '@/components/site/work-grid';
import { CtaBand } from '@/components/site/cta-band';
import { Testimonials } from '@/components/site/testimonials';
import { getProjects, getSettings, getTestimonials } from '@/lib/api';
import { projectTypeLabels } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Our work',
  description:
    'Case studies across mobile apps, web platforms, e-commerce, AI assistants, ad campaigns and video content — with the results each client cared about.',
};

export default async function PortfolioPage() {
  const [projects, settings, testimonials] = await Promise.all([
    getProjects(),
    getSettings(),
    getTestimonials(3),
  ]);

  const types = Array.from(new Set(projects.map((p) => p.type || 'web')));

  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title="Case studies, not a logo wall"
        description="Each project below lists what we built, what we used and the numbers that changed afterwards."
      >
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-brand-400/40 bg-brand-500/15 px-4 py-2 text-sm text-white">
            All work
            <span className="ml-2 text-xs text-slate-400">{projects.length}</span>
          </span>
          {types.map((type) => (
            <span
              key={type}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300"
            >
              {projectTypeLabels[type] || type}
              <span className="ml-2 text-xs text-slate-500">
                {projects.filter((p) => (p.type || 'web') === type).length}
              </span>
            </span>
          ))}
        </div>
      </PageHeader>

      <Section>
        <Container>
          <WorkGrid projects={projects} />
        </Container>
      </Section>

      <Testimonials testimonials={testimonials} />

      <CtaBand settings={settings} />
    </>
  );
}
