import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn('relative py-20 sm:py-28', className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-[0.18em] text-brand-200 uppercase">
      <span className="h-1.5 w-1.5 rounded-full bg-aqua-400" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'center' | 'left';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2
        className="font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-[2.75rem]"
        style={{ textWrap: 'balance' } as React.CSSProperties}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'text-base leading-relaxed text-slate-400 sm:text-lg',
            align === 'center' ? 'max-w-2xl' : 'max-w-xl',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  withArrow?: boolean;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
};

const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400';

const buttonVariants: Record<string, string> = {
  primary:
    'bg-linear-to-r from-brand-500 to-brand-400 text-white shadow-[0_18px_45px_-20px_rgba(109,77,251,0.9)] hover:from-brand-400 hover:to-aqua-400 hover:text-ink-950',
  secondary:
    'border border-white/15 bg-white/5 text-white hover:border-brand-400/60 hover:bg-white/10',
  ghost: 'text-slate-300 hover:text-white',
};

const buttonSizes: Record<string, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

export function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className,
  withArrow,
  type = 'button',
  onClick,
  disabled,
}: ButtonProps) {
  const classes = cn(
    buttonBase,
    buttonVariants[variant],
    buttonSizes[size],
    className,
  );

  const content = (
    <>
      {children}
      {withArrow ? (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      ) : null}
    </>
  );

  if (href) {
    const external = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:');
    if (external) {
      return (
        <a href={href} className={cn('group', classes)} target="_blank" rel="noreferrer">
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={cn('group', classes)}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn('group', classes)}
    >
      {content}
    </button>
  );
}

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300',
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Card({
  children,
  className,
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        'panel rounded-3xl p-6',
        hover && 'panel-hover',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function GlowBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="glow animate-pulse-glow left-[-10%] top-[-10%] h-[460px] w-[460px] bg-brand-600/35" />
      <div className="glow animate-pulse-glow right-[-12%] top-[18%] h-[420px] w-[420px] bg-aqua-500/20" />
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-ink-950 to-transparent" />
    </div>
  );
}
