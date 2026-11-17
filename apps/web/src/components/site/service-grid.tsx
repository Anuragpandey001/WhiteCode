import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import { Icon } from '@/components/ui/icon';
import { Reveal } from '@/components/ui/reveal';
import type { ServiceItem } from '@/lib/types';

export function ServiceCard({
  service,
  delay = 0,
}: {
  service: ServiceItem;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <Link
        href={`/services/${service.slug}`}
        className="panel panel-hover group flex h-full flex-col rounded-3xl p-6"
      >
        <div className="flex items-start justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-brand-500/25 to-aqua-400/15 text-brand-200 transition group-hover:from-brand-500/40 group-hover:text-white">
            <Icon name={service.icon} className="h-6 w-6" />
          </span>
          <ArrowUpRight className="h-5 w-5 text-slate-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-300" />
        </div>

        <h3 className="mt-5 font-[family-name:var(--font-display)] text-lg font-semibold text-white">
          {service.title}
        </h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-400">
          {service.excerpt}
        </p>

        {service.features?.length ? (
          <ul className="mt-5 space-y-2">
            {service.features.slice(0, 3).map((feature) => (
              <li key={feature} className="flex gap-2 text-xs text-slate-400">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-aqua-400" />
                <span className="line-clamp-1">{feature}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {service.startingPrice || service.timeline ? (
          <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4 text-xs">
            {service.startingPrice ? (
              <span className="text-slate-300">
                <span className="text-slate-500">from </span>
                {service.startingPrice}
              </span>
            ) : (
              <span />
            )}
            {service.timeline ? (
              <span className="text-slate-500">{service.timeline}</span>
            ) : null}
          </div>
        ) : null}
      </Link>
    </Reveal>
  );
}

export function ServiceGrid({ services }: { services: ServiceItem[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => (
        <ServiceCard
          key={service.slug}
          service={service}
          delay={(index % 3) * 70}
        />
      ))}
    </div>
  );
}
