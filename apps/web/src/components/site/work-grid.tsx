import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/reveal';
import { projectTypeLabels } from '@/lib/utils';
import type { Project } from '@/lib/types';

export function WorkCard({
  project,
  delay = 0,
  featured = false,
}: {
  project: Project;
  delay?: number;
  featured?: boolean;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <Link
        href={`/portfolio/${project.slug}`}
        className="panel panel-hover group flex h-full flex-col overflow-hidden rounded-3xl"
      >
        <div
          className={`relative overflow-hidden ${featured ? 'h-56' : 'h-44'}`}
        >
          {project.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.coverImage}
              alt={project.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="relative h-full w-full bg-linear-to-br from-brand-700/40 via-ink-800 to-aqua-500/20">
              <div className="absolute inset-0 grid-bg opacity-40" />
              <span className="absolute bottom-4 left-5 font-[family-name:var(--font-display)] text-5xl font-semibold text-white/10">
                {project.title.slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}
          <span className="absolute right-4 top-4 rounded-full border border-white/15 bg-ink-950/75 px-3 py-1 text-xs text-slate-200 backdrop-blur">
            {projectTypeLabels[project.type || 'web'] || project.type}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          {project.client ? (
            <p className="text-xs tracking-[0.14em] text-slate-500 uppercase">
              {project.client}
            </p>
          ) : null}
          <h3 className="mt-2 flex items-start gap-2 font-[family-name:var(--font-display)] text-lg font-semibold leading-snug text-white">
            <span className="flex-1">{project.title}</span>
            <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-slate-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-300" />
          </h3>
          <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-400">
            {project.summary}
          </p>

          {project.results?.length ? (
            <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/8 pt-4">
              {project.results.slice(0, 3).map((result) => (
                <div key={result.label}>
                  <p className="font-[family-name:var(--font-display)] text-base font-semibold text-aqua-300">
                    {result.value}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-tight text-slate-500">
                    {result.label}
                  </p>
                </div>
              ))}
            </div>
          ) : project.technologies?.length ? (
            <div className="mt-5 flex flex-wrap gap-1.5 border-t border-white/8 pt-4">
              {project.technologies.slice(0, 4).map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          ) : null}
        </div>
      </Link>
    </Reveal>
  );
}

export function WorkGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <WorkCard
          key={project.slug}
          project={project}
          delay={(index % 3) * 70}
        />
      ))}
    </div>
  );
}
