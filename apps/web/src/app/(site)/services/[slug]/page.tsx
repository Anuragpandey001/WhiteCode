import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check, Clock, IndianRupee, Package } from 'lucide-react';
import { Container, Section, Badge } from '@/components/ui/primitives';
import { PageHeader } from '@/components/site/page-header';
import { ServiceCard } from '@/components/site/service-grid';
import { ContactForm } from '@/components/site/contact-form';
import { Icon } from '@/components/ui/icon';
import { getService, getServices } from '@/lib/api';

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return { title: 'Service not found' };

  return {
    title: service.title,
    description: service.excerpt,
    openGraph: { title: service.title, description: service.excerpt },
  };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const [service, allServices] = await Promise.all([
    getService(slug),
    getServices(),
  ]);

  if (!service) notFound();

  const related = allServices
    .filter((item) => item.slug !== service.slug)
    .filter((item) => item.category === service.category)
    .slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow={service.category}
        title={service.title}
        description={service.excerpt}
      >
        <div className="flex flex-wrap items-center gap-3">
          {service.startingPrice ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white">
              <IndianRupee className="h-4 w-4 text-aqua-300" />
              from {service.startingPrice}
            </span>
          ) : null}
          {service.timeline ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white">
              <Clock className="h-4 w-4 text-aqua-300" />
              {service.timeline}
            </span>
          ) : null}
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white">
            <Icon name={service.icon} className="h-4 w-4 text-brand-300" />
            {service.category}
          </span>
        </div>
      </PageHeader>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:items-start">
            <div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                All services
              </Link>

              <div className="prose-site mt-8">
                <p className="text-lg leading-relaxed text-slate-300">
                  {service.description || service.excerpt}
                </p>
              </div>

              {service.features?.length ? (
                <div className="mt-12">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">
                    What is included
                  </h2>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="panel flex gap-3 rounded-2xl p-4 text-sm text-slate-300"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-aqua-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {service.deliverables?.length ? (
                <div className="mt-12">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">
                    What you get at the end
                  </h2>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {service.deliverables.map((item) => (
                      <div
                        key={item}
                        className="panel rounded-2xl p-4 text-center"
                      >
                        <Package className="mx-auto h-5 w-5 text-brand-300" />
                        <p className="mt-2 text-xs text-slate-300">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {service.technologies?.length ? (
                <div className="mt-12">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">
                    Tools and technologies
                  </h2>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.technologies.map((tech) => (
                      <Badge key={tech} className="px-3.5 py-1.5 text-sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="lg:sticky lg:top-24">
              <h2 className="mb-4 font-[family-name:var(--font-display)] text-xl font-semibold text-white">
                Get a quote for {service.title.toLowerCase()}
              </h2>
              <ContactForm
                services={allServices}
                defaultService={service.title}
                source={`service:${service.slug}`}
              />
            </div>
          </div>
        </Container>
      </Section>

      {related.length ? (
        <Section className="border-t border-white/8 bg-ink-900/40">
          <Container>
            <h2 className="mb-10 font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
              Often bought together
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <ServiceCard key={item.slug} service={item} delay={index * 70} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
