import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  Container,
  Section,
  SectionHeading,
  Button,
} from '@/components/ui/primitives';
import { Hero } from '@/components/site/hero';
import { ServiceGrid } from '@/components/site/service-grid';
import { WorkGrid } from '@/components/site/work-grid';
import { Process } from '@/components/site/process';
import { WhyUs } from '@/components/site/why-us';
import { Industries, TechMarquee } from '@/components/site/marquees';
import { Testimonials } from '@/components/site/testimonials';
import { FaqAccordion } from '@/components/site/faq-accordion';
import { CtaBand } from '@/components/site/cta-band';
import { BlogGrid } from '@/components/site/blog-grid';
import { engagementModels } from '@/config/site';
import {
  getFaqs,
  getFeaturedProjects,
  getIndustries,
  getPosts,
  getServices,
  getSettings,
  getTestimonials,
} from '@/lib/api';

export default async function HomePage() {
  const [settings, services, projects, testimonials, industries, faqs, posts] =
    await Promise.all([
      getSettings(),
      getServices(),
      getFeaturedProjects(6),
      getTestimonials(6),
      getIndustries(),
      getFaqs(),
      getPosts(3),
    ]);

  return (
    <>
      <Hero settings={settings} services={services} />

      <TechMarquee />

      <Section id="services">
        <Container>
          <SectionHeading
            eyebrow="Our services"
            title="Everything your business needs, under one roof"
            description="Development, design, marketing and media. Hire us for one piece or hand us the whole stack — the same team stays accountable either way."
          />
          <div className="mt-14">
            <ServiceGrid services={services} />
          </div>
          <div className="mt-10 flex justify-center">
            <Button href="/services" variant="secondary" size="lg" withArrow>
              Explore all services
            </Button>
          </div>
        </Container>
      </Section>

      <WhyUs />

      <Section className="border-y border-white/8 bg-ink-900/40">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              align="left"
              eyebrow="Selected work"
              title="Projects with numbers attached"
              description="Six builds that shipped, with the results the client actually cared about."
            />
            <Button href="/portfolio" variant="secondary" withArrow>
              All case studies
            </Button>
          </div>
          <div className="mt-14">
            <WorkGrid projects={projects} />
          </div>
        </Container>
      </Section>

      <Process />

      <Industries industries={industries} />

      <Testimonials testimonials={testimonials} />

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Engagement models"
            title="Three ways to work with us"
            description="Pick the shape that fits. You can switch between them as the work changes."
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {engagementModels.map((model) => (
              <div
                key={model.name}
                className={`panel relative flex flex-col rounded-3xl p-7 ${
                  model.highlighted
                    ? 'border-brand-400/45 bg-linear-to-b from-brand-600/15 to-transparent'
                    : 'panel-hover'
                }`}
              >
                {model.highlighted ? (
                  <span className="absolute -top-3 left-7 rounded-full bg-linear-to-r from-brand-500 to-aqua-400 px-3 py-1 text-xs font-medium text-white">
                    Most popular
                  </span>
                ) : null}

                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                  {model.name}
                </h3>
                <p className="mt-1 text-sm text-slate-400">{model.headline}</p>
                <p className="mt-5 font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
                  {model.price}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {model.description}
                </p>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {model.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-2.5 text-sm text-slate-300"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-aqua-400" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  href="/contact"
                  variant={model.highlighted ? 'primary' : 'secondary'}
                  className="mt-7 w-full"
                  withArrow
                >
                  {model.cta}
                </Button>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-slate-500">
            Need something in between?{' '}
            <Link href="/pricing" className="text-aqua-300 hover:underline">
              See what each package includes
            </Link>
          </p>
        </Container>
      </Section>

      {posts.length ? (
        <Section className="border-y border-white/8 bg-ink-900/40">
          <Container>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                align="left"
                eyebrow="From the team"
                title="What we learned shipping"
                description="Notes from real projects — no listicles."
              />
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 text-sm text-brand-200 hover:text-white"
              >
                Read the blog
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="mt-14">
              <BlogGrid posts={posts} />
            </div>
          </Container>
        </Section>
      ) : null}

      <Section>
        <Container>
          <SectionHeading
            eyebrow="FAQ"
            title="The questions every client asks"
            className="mb-14"
          />
          <FaqAccordion faqs={faqs} />
        </Container>
      </Section>

      <CtaBand settings={settings} />
    </>
  );
}
