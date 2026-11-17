import type { Metadata } from 'next';
import { Container, Section } from '@/components/ui/primitives';
import { PageHeader } from '@/components/site/page-header';
import { BlogGrid } from '@/components/site/blog-grid';
import { CtaBand } from '@/components/site/cta-band';
import { getPosts, getSettings } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Notes from real client projects: product strategy, engineering trade-offs, marketing and AI.',
};

export default async function BlogPage() {
  const [posts, settings] = await Promise.all([getPosts(), getSettings()]);
  const categories = Array.from(
    new Set(posts.map((post) => post.category).filter(Boolean)),
  ) as string[];

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="What we learned shipping client work"
        description="Written by the people doing the work, after the project shipped — not before."
      >
        {categories.length ? (
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300"
              >
                {category}
                <span className="ml-2 text-xs text-slate-500">
                  {posts.filter((p) => p.category === category).length}
                </span>
              </span>
            ))}
          </div>
        ) : null}
      </PageHeader>

      <Section>
        <Container>
          {posts.length ? (
            <BlogGrid posts={posts} />
          ) : (
            <p className="text-center text-slate-400">
              No posts published yet. Check back soon.
            </p>
          )}
        </Container>
      </Section>

      <CtaBand settings={settings} />
    </>
  );
}
