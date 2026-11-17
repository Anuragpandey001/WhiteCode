import Link from 'next/link';
import { Clock, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/reveal';
import { formatDate } from '@/lib/utils';
import type { Post } from '@/lib/types';

export function BlogCard({ post, delay = 0 }: { post: Post; delay?: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <Link
        href={`/blog/${post.slug}`}
        className="panel panel-hover group flex h-full flex-col overflow-hidden rounded-3xl"
      >
        <div className="relative h-40 overflow-hidden">
          {post.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="relative h-full w-full bg-linear-to-br from-ink-800 via-brand-800/30 to-aqua-500/10">
              <div className="absolute inset-0 grid-bg opacity-30" />
            </div>
          )}
          {post.category ? (
            <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-ink-950/75 px-3 py-1 text-xs text-brand-200 backdrop-blur">
              {post.category}
            </span>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="flex items-start gap-2 font-[family-name:var(--font-display)] text-base font-semibold leading-snug text-white">
            <span className="flex-1">{post.title}</span>
            <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-300" />
          </h3>
          <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-400">
            {post.excerpt}
          </p>

          <div className="mt-5 flex items-center gap-3 border-t border-white/8 pt-4 text-xs text-slate-500">
            <span>{formatDate(post.publishedAt || post.createdAt)}</span>
            <span className="h-1 w-1 rounded-full bg-slate-700" />
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readingTime || 3} min read
            </span>
          </div>

          {post.tags?.length ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          ) : null}
        </div>
      </Link>
    </Reveal>
  );
}

export function BlogGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <BlogCard key={post.slug} post={post} delay={(index % 3) * 70} />
      ))}
    </div>
  );
}
