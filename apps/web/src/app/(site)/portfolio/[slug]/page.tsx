import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Container, Section, Badge, Button } from '@/components/ui/primitives';
import { PageHeader } from '@/components/site/page-header';
import { WorkCard } from '@/components/site/work-grid';
import { CtaBand } from '@/components/site/cta-band';
import { getProject, getProjects, getSettings } from '@/lib/api';
import { projectTypeLabels } from '@/lib/utils';

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: 'Project not found' };
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary },
  };
}

export default async function ProjectDetailPage({ params }: Params) {
  const { slug } = await params;
  const [project, all, settings] = await Promise.all([
    getProject(slug),
    getProjects(),
    getSettings(),
  ]);

  if (!project) notFound();

  const more = all.filter((item) => item.slug !== project.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow={projectTypeLabels[project.type || 'web'] || project.type}
        title={project.title}
        description={project.summary}
      >
        <div className="flex flex-wrap items-center gap-3">
          {project.client ? (
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white">
              {project.client}
            </span>
          ) : null}
          {project.industry ? (
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              {project.industry}
            </span>
          ) : null}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-aqua-400/30 bg-aqua-400/10 px-4 py-2 text-sm text-aqua-200 transition hover:bg-aqua-400/20"
            >
              View live
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : null}
        </div>
      </PageHeader>

      <Section>
        <Container>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            All work
          </Link>

          {project.results?.length ? (
            <dl className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 sm:grid-cols-3">
              {project.results.map((result) => (
                <div key={result.label} className="bg-ink-950/60 px-6 py-8">
                  <dd className="font-[family-name:var(--font-display)] text-3xl font-semibold text-aqua-300">
                    {result.value}
                  </dd>
                  <dt className="mt-1 text-sm text-slate-400">{result.label}</dt>
                </div>
              ))}
            </dl>
          ) : null}

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:items-start">
            <div className="prose-site">
              <h2>What we built</h2>
              <p>{project.description || project.summary}</p>
            </div>

            <aside className="panel rounded-3xl p-6">
              <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
                Project details
              </h3>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="text-slate-500">Type</dt>
                  <dd className="mt-0.5 text-white">
                    {projectTypeLabels[project.type || 'web'] || project.type}
                  </dd>
                </div>
                {project.industry ? (
                  <div>
                    <dt className="text-slate-500">Industry</dt>
                    <dd className="mt-0.5 text-white">{project.industry}</dd>
                  </div>
                ) : null}
                {project.technologies?.length ? (
                  <div>
                    <dt className="text-slate-500">Stack</dt>
                    <dd className="mt-2 flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </dd>
                  </div>
                ) : null}
              </dl>

              <Button href="/contact" className="mt-7 w-full" withArrow>
                Start something similar
              </Button>
            </aside>
          </div>

          {project.gallery?.length ? (
            <div className="mt-14 grid gap-4 sm:grid-cols-2">
              {project.gallery.map((image) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={image}
                  src={image}
                  alt={project.title}
                  className="w-full rounded-3xl border border-white/10 object-cover"
                />
              ))}
            </div>
          ) : null}
        </Container>
      </Section>

      {more.length ? (
        <Section className="border-t border-white/8 bg-ink-900/40">
          <Container>
            <h2 className="mb-10 font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
              More work
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((item, index) => (
                <WorkCard key={item.slug} project={item} delay={index * 70} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <CtaBand settings={settings} />
    </>
  );
}
