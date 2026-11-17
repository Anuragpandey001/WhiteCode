import type { ReactNode } from 'react';
import { Container, Eyebrow, GlowBackdrop } from '@/components/ui/primitives';

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/8 pt-32 pb-16 sm:pt-40 sm:pb-20">
      <GlowBackdrop />
      <Container className="relative">
        <div className="max-w-3xl">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h1
            className="mt-5 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl"
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            {title}
          </h1>
          {description ? (
            <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
