import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Eye } from 'lucide-react';
import { Container, Section, Badge } from '@/components/ui/primitives';
import { PageHeader } from '@/components/site/page-header';
import { BlogCard } from '@/components/site/blog-grid';
import { CtaBand } from '@/components/site/cta-band';
import { getPost, getSettings } from '@/lib/api';
import { formatDate, initials } from '@/lib/utils';

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const result = await getPost(slug);
  if (!result?.post) return { title: 'Post not found' };

  return {
    title: result.post.title,
    description: result.post.excerpt,
    openGraph: {
      type: 'article',
      title: result.post.title,
      description: result.post.excerpt,
    },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const [result, settings] = await Promise.all([getPost(slug), getSettings()]);

  if (!result?.post) notFound();
  const { post, related } = result;

  return (
    <>
      <PageHeader eyebrow={post.category} title={post.title} description={post.excerpt}>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
          {post.author?.name ? (
            <span className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-brand-500/35 to-aqua-400/25 text-xs font-semibold text-white">
                {initials(post.author.name)}
              </span>
              <span>
                <span className="block text-white">{post.author.name}</span>
                {post.author.role ? (
                  <span className="block text-xs text-slate-500">
                    {post.author.role}
                  </span>
                ) : null}
              </span>
            </span>
          ) : null}
          <span>{formatDate(post.publishedAt || post.createdAt)}</span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {post.readingTime || 3} min read
          </span>
          {post.views ? (
            <span className="flex items-center gap-1.5">
              <Eye className="h-4 w-4" />
              {post.views} views
            </span>
          ) : null}
        </div>
      </PageHeader>

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              All posts
            </Link>

            {post.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.coverImage}
                alt={post.title}
                className="mt-8 w-full rounded-3xl border border-white/10 object-cover"
              />
            ) : null}

            <article
              className="prose-site mt-10"
              dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />

            {post.tags?.length ? (
              <div className="mt-12 flex flex-wrap gap-2 border-t border-white/8 pt-8">
                {post.tags.map((tag) => (
                  <Badge key={tag} className="px-3.5 py-1.5 text-sm">
                    #{tag}
                  </Badge>
                ))}
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      {related?.length ? (
        <Section className="border-t border-white/8 bg-ink-900/40">
          <Container>
            <h2 className="mb-10 font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
              Related reading
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <BlogCard key={item.slug} post={item} delay={index * 70} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <CtaBand settings={settings} />
    </>
  );
}
