/**
 * Content used when the API is unreachable (e.g. before you start the
 * NestJS server or MongoDB). It mirrors the API seed, so the site is
 * always presentable — including in a client demo.
 */
import type {
  Faq,
  Industry,
  Job,
  Post,
  Project,
  ServiceItem,
  SiteSettings,
  TeamMember,
  Testimonial,
} from './types';

export const fallbackServices: ServiceItem[] = [
  {
    title: 'Mobile App Development',
    slug: 'mobile-app-development',
    excerpt:
      'Cross-platform iOS and Android apps built with Flutter and React Native — one codebase, native feel.',
    description:
      'We design, build and ship production mobile apps end to end: architecture, offline-first data, payments, push notifications, store submission and post-launch monitoring. Every build ships with CI, crash reporting and analytics wired in from day one.',
    icon: 'Smartphone',
    category: 'development',
    features: [
      'Flutter & React Native cross-platform builds',
      'Native iOS (Swift) and Android (Kotlin) modules',
      'Offline-first sync and local caching',
      'In-app payments and subscriptions',
      'Play Store & App Store submission handled for you',
    ],
    technologies: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase'],
    deliverables: ['Source code', 'Store listing assets', 'Release pipeline', '30-day warranty'],
    startingPrice: '₹1,20,000',
    timeline: '6-12 weeks',
    featured: true,
  },
  {
    title: 'Web Development',
    slug: 'web-development',
    excerpt:
      'Fast, SEO-ready websites and web apps on Next.js, React and Node — built to convert, not just to look good.',
    description:
      'From a marketing site that loads in under a second to a complex dashboard with role-based access, we build on a modern stack with server-side rendering, type safety and sensible caching so your pages rank and your users stay.',
    icon: 'Globe',
    category: 'development',
    features: [
      'Next.js / React front-ends with SSR and ISR',
      'Node.js & NestJS APIs',
      'Headless CMS integration',
      'Core Web Vitals above 90',
      'Accessibility and responsive by default',
    ],
    technologies: ['Next.js', 'React', 'Node.js', 'NestJS', 'PostgreSQL', 'MongoDB'],
    deliverables: ['Design system', 'Production deploy', 'Admin access', 'Docs & handover'],
    startingPrice: '₹60,000',
    timeline: '3-8 weeks',
    featured: true,
  },
  {
    title: 'Custom Software & SaaS',
    slug: 'custom-software-saas',
    excerpt:
      'Internal tools, ERPs, CRMs and multi-tenant SaaS products engineered around how your business actually runs.',
    description:
      'We map your workflow, cut the busywork and ship software your team wants to use: multi-tenancy, billing, granular roles, audit trails and reporting, built to scale with your customer count.',
    icon: 'Boxes',
    category: 'development',
    features: [
      'Multi-tenant architecture with per-tenant data isolation',
      'Subscription billing (Stripe / Razorpay)',
      'Role and permission matrices',
      'Reporting, exports and audit logs',
      'Third-party integrations and webhooks',
    ],
    technologies: ['NestJS', 'Next.js', 'PostgreSQL', 'Redis', 'Stripe', 'Razorpay'],
    deliverables: ['Technical spec', 'Staged releases', 'Admin console', 'SLA options'],
    startingPrice: '₹2,50,000',
    timeline: '8-20 weeks',
    featured: true,
  },
  {
    title: 'UI/UX Design',
    slug: 'ui-ux-design',
    excerpt:
      'Research, wireframes, prototypes and a handoff-ready design system your developers will not fight with.',
    description:
      'We start with the job your product has to do, then design the shortest path to it: user flows, wireframes, a clickable prototype you can test with real users, and a token-based design system ready for code.',
    icon: 'PenTool',
    category: 'design',
    features: [
      'Discovery workshops and user research',
      'Wireframes and clickable Figma prototypes',
      'Design system with tokens and components',
      'Usability testing rounds',
      'Developer handoff with specs',
    ],
    technologies: ['Figma', 'Framer', 'Adobe XD', 'Maze'],
    deliverables: ['Figma source', 'Prototype link', 'Design system', 'Handoff spec'],
    startingPrice: '₹45,000',
    timeline: '2-6 weeks',
    featured: true,
  },
  {
    title: 'AI & Automation',
    slug: 'ai-automation',
    excerpt:
      'LLM assistants, document pipelines, RAG search and workflow automation wired into your existing systems.',
    description:
      'We build the practical kind of AI: a support assistant trained on your docs, an invoice reader that fills your ERP, a lead scorer on your CRM data. Evaluated, monitored and cost-capped before it goes live.',
    icon: 'Brain',
    category: 'development',
    features: [
      'Chat assistants grounded in your own content (RAG)',
      'Document extraction and classification pipelines',
      'Workflow automation across your tools',
      'Model evaluation and guardrails',
      'Usage dashboards and cost controls',
    ],
    technologies: ['Claude API', 'OpenAI', 'LangChain', 'Python', 'Pinecone', 'n8n'],
    deliverables: ['Pilot build', 'Eval report', 'Production rollout', 'Monitoring'],
    startingPrice: '₹90,000',
    timeline: '4-10 weeks',
    featured: true,
  },
  {
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    excerpt:
      'SEO, content and social that compounds — a pipeline of qualified traffic instead of one-off spikes.',
    description:
      'Technical SEO fixes, a content calendar mapped to buying intent, and social channels that actually post. We report on pipeline and revenue, not vanity impressions.',
    icon: 'TrendingUp',
    category: 'marketing',
    features: [
      'Technical SEO audit and fixes',
      'Keyword and intent mapping',
      'Content calendar and production',
      'Social media management',
      'Monthly reporting on pipeline, not impressions',
    ],
    technologies: ['Google Search Console', 'Ahrefs', 'GA4', 'Meta Business Suite'],
    deliverables: ['SEO audit', 'Content calendar', 'Monthly report', 'Growth review call'],
    startingPrice: '₹30,000/mo',
    timeline: 'Ongoing',
    featured: true,
  },
  {
    title: 'Google & Meta Ads',
    slug: 'google-meta-ads',
    excerpt:
      'Performance campaigns on Google, YouTube, Meta and LinkedIn, managed to a cost-per-lead target you agree to up front.',
    description:
      'Search, Performance Max, YouTube and Meta campaigns with clean conversion tracking, landing pages built for the ad, and weekly optimisation against your CPL and ROAS targets.',
    icon: 'Target',
    category: 'marketing',
    features: [
      'Google Search, Shopping and Performance Max',
      'Meta and Instagram ad funnels',
      'LinkedIn B2B campaigns',
      'Conversion tracking and GTM setup',
      'Landing pages and A/B tests',
    ],
    technologies: ['Google Ads', 'Meta Ads', 'GTM', 'Looker Studio'],
    deliverables: ['Account setup', 'Creative set', 'Live dashboard', 'Weekly optimisation'],
    startingPrice: '₹25,000/mo + ad spend',
    timeline: 'Ongoing',
    featured: true,
  },
  {
    title: 'Video Editing & Motion',
    slug: 'video-editing-motion',
    excerpt:
      'Reels, ads, explainers and product demos — scripted, edited, colour-graded and cut for every platform.',
    description:
      'A full video desk: short-form reels for social, polished product explainers, ad creative variants for testing, motion graphics and subtitles, delivered in every aspect ratio you need.',
    icon: 'Video',
    category: 'media',
    features: [
      'Short-form reels and shorts (9:16)',
      'Product explainers and demo videos',
      'Motion graphics and animated logos',
      'Colour grading and sound design',
      'Subtitles and multi-platform exports',
    ],
    technologies: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Figma'],
    deliverables: ['Scripts', 'Edited masters', 'Platform cuts', 'Project files'],
    startingPrice: '₹15,000',
    timeline: '1-3 weeks',
    featured: true,
  },
  {
    title: 'Graphic Design & Branding',
    slug: 'graphic-design-branding',
    excerpt:
      'Logos, brand guidelines, social kits and pitch decks that make a young company look established.',
    description:
      'A complete identity: logo system, type and colour, usage rules, social templates your team can reuse, and investor-grade deck design.',
    icon: 'Palette',
    category: 'design',
    features: [
      'Logo and identity system',
      'Brand guidelines document',
      'Social media template kit',
      'Pitch and sales deck design',
      'Print and packaging artwork',
    ],
    technologies: ['Illustrator', 'Photoshop', 'Figma', 'InDesign'],
    deliverables: ['Logo files', 'Brand book', 'Template kit', 'Source files'],
    startingPrice: '₹25,000',
    timeline: '2-4 weeks',
  },
  {
    title: 'E-Commerce Development',
    slug: 'ecommerce-development',
    excerpt:
      'Shopify, WooCommerce and custom storefronts with payments, logistics and analytics already connected.',
    description:
      'Storefronts built to sell: fast product pages, a checkout that does not leak, payment and shipping integrations for India and abroad, and dashboards that show what is actually moving.',
    icon: 'ShoppingCart',
    category: 'development',
    features: [
      'Shopify and WooCommerce builds',
      'Custom headless storefronts',
      'Razorpay, Stripe and COD flows',
      'Shiprocket / Delhivery logistics',
      'Abandoned-cart and retention automation',
    ],
    technologies: ['Shopify', 'WooCommerce', 'Next.js Commerce', 'Razorpay'],
    deliverables: ['Live store', 'Payment setup', 'Catalogue import', 'Team training'],
    startingPrice: '₹70,000',
    timeline: '3-8 weeks',
  },
  {
    title: 'Cloud & DevOps',
    slug: 'cloud-devops',
    excerpt:
      'AWS, Azure and GCP infrastructure with CI/CD, containers, monitoring and a bill that stops surprising you.',
    description:
      'Infrastructure as code, containerised deploys, zero-downtime releases, backups you have actually tested, alerting that reaches a human, and a cost review that usually pays for the engagement.',
    icon: 'Cloud',
    category: 'cloud',
    features: [
      'Infrastructure as code (Terraform)',
      'Docker and Kubernetes deployments',
      'CI/CD pipelines with rollbacks',
      'Monitoring, logging and alerting',
      'Cost optimisation review',
    ],
    technologies: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform'],
    deliverables: ['IaC repo', 'Pipelines', 'Runbooks', 'Cost report'],
    startingPrice: '₹50,000',
    timeline: '2-6 weeks',
  },
  {
    title: 'QA & Test Automation',
    slug: 'qa-test-automation',
    excerpt:
      'Manual and automated testing across web, mobile and API so releases stop breaking in production.',
    description:
      'Test plans, regression suites in Playwright and Appium, API contract tests, load testing and a release checklist your team can run without us.',
    icon: 'ShieldCheck',
    category: 'support',
    features: [
      'Test plans and regression suites',
      'Playwright / Cypress web automation',
      'Appium mobile automation',
      'API and contract testing',
      'Load and performance testing',
    ],
    technologies: ['Playwright', 'Cypress', 'Appium', 'k6', 'Postman'],
    deliverables: ['Test suite', 'Bug reports', 'CI integration', 'Release checklist'],
    startingPrice: '₹35,000',
    timeline: '2-6 weeks',
  },
  {
    title: 'Hire Dedicated Developers',
    slug: 'hire-dedicated-developers',
    excerpt:
      'Vetted engineers, designers and marketers embedded in your team, full-time or part-time, billed monthly.',
    description:
      'Need capacity rather than a project? Take an engineer, designer or marketer for a fixed monthly rate. They join your standups, your board and your repo, with a two-week trial and no long lock-in.',
    icon: 'Users',
    category: 'support',
    features: [
      'Full-time or part-time engagement',
      'Works in your tools and your timezone overlap',
      'Two-week trial period',
      'Replacement guarantee',
      'Monthly billing, no long lock-in',
    ],
    technologies: ['Flutter', 'React', 'Node.js', 'Python', 'DevOps', 'Design'],
    deliverables: ['Vetted profiles', 'Trial period', 'Weekly reporting', 'NDA & IP transfer'],
    startingPrice: '₹80,000/mo',
    timeline: 'Starts in 1 week',
  },
  {
    title: 'Maintenance & Support',
    slug: 'maintenance-support',
    excerpt:
      'Monthly care plans: updates, uptime monitoring, security patches and a guaranteed response window.',
    description:
      'Someone to call when it breaks. Patching, dependency upgrades, uptime monitoring, backups, small feature work each month, and a response SLA in writing.',
    icon: 'LifeBuoy',
    category: 'support',
    features: [
      'Uptime monitoring and incident response',
      'Security patches and dependency upgrades',
      'Backups and restore drills',
      'Monthly bucket of change requests',
      'Response SLA from 4 business hours',
    ],
    technologies: ['Sentry', 'UptimeRobot', 'GitHub Actions', 'Grafana'],
    deliverables: ['Care plan', 'Monthly report', 'Incident log', 'Priority channel'],
    startingPrice: '₹12,000/mo',
    timeline: 'Ongoing',
  },
];

export const fallbackProjects: Project[] = [
  {
    title: 'ClinicPulse — Clinic Management Suite',
    slug: 'clinicpulse-clinic-management',
    client: 'Multi-speciality clinic chain',
    summary:
      'Appointments, billing, prescriptions and WhatsApp reminders for a chain of nine clinics, replacing three separate tools.',
    description:
      'We replaced a spreadsheet-and-paper workflow with one system: slot-based appointments across nine branches, GST billing, digital prescriptions, lab integrations and automatic WhatsApp reminders. No-shows dropped by a third within two months.',
    type: 'web',
    industry: 'Healthcare',
    technologies: ['Next.js', 'NestJS', 'MongoDB', 'WhatsApp Cloud API'],
    results: [
      { label: 'No-shows', value: '-34%' },
      { label: 'Billing time', value: '-60%' },
      { label: 'Branches live', value: '9' },
    ],
    featured: true,
  },
  {
    title: 'FitLoop — Fitness Coaching App',
    slug: 'fitloop-fitness-app',
    client: 'D2C fitness brand',
    summary:
      'Flutter app with workout plans, habit streaks, coach chat and subscription billing on both stores.',
    description:
      'Built in Flutter for iOS and Android: plan builder for coaches, offline workout logging, streaks and reminders, in-app subscriptions and a coach dashboard on the web. Shipped in eleven weeks.',
    type: 'mobile',
    industry: 'Health & Fitness',
    technologies: ['Flutter', 'Firebase', 'NestJS', 'RevenueCat'],
    results: [
      { label: 'Installs in 90 days', value: '42K' },
      { label: 'D30 retention', value: '31%' },
      { label: 'Store rating', value: '4.7' },
    ],
    featured: true,
  },
  {
    title: 'Kiraana Express — Quick Commerce Storefront',
    slug: 'kiraana-express-quick-commerce',
    client: 'Regional grocery retailer',
    summary:
      'Headless storefront with 20-minute delivery slots, live inventory per dark store and Razorpay checkout.',
    description:
      'A Next.js storefront on a headless commerce backend: per-dark-store inventory, delivery slotting, COD and UPI, plus an ops dashboard for pickers. Page loads went from 4.2s to 0.9s.',
    type: 'ecommerce',
    industry: 'Retail',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Razorpay', 'Redis'],
    results: [
      { label: 'Page load', value: '0.9s' },
      { label: 'Conversion', value: '+58%' },
      { label: 'Orders / day', value: '2.3K' },
    ],
    featured: true,
  },
  {
    title: 'DeskSense — AI Support Assistant',
    slug: 'desksense-ai-support-assistant',
    client: 'B2B SaaS company',
    summary:
      'RAG assistant trained on 1,800 help articles that resolves 62% of tickets without a human.',
    description:
      'We indexed the full knowledge base, built a grounded assistant with citations and escalation, ran an eval set of 400 real tickets before launch, and wired cost caps and quality monitoring into the dashboard.',
    type: 'ai',
    industry: 'SaaS',
    technologies: ['Claude API', 'Python', 'Pinecone', 'Next.js'],
    results: [
      { label: 'Tickets auto-resolved', value: '62%' },
      { label: 'First response', value: '<5s' },
      { label: 'CSAT', value: '4.6/5' },
    ],
    featured: true,
  },
  {
    title: 'Horizon Realty — Launch Campaign',
    slug: 'horizon-realty-launch-campaign',
    client: 'Real estate developer',
    summary:
      'Google and Meta campaigns plus landing pages that brought 1,240 site-visit bookings in one quarter.',
    description:
      'Search and Performance Max for high-intent queries, Meta retargeting on video walkthroughs, three landing-page variants tested against each other, and CRM integration so sales could see source per booking.',
    type: 'marketing',
    industry: 'Real Estate',
    technologies: ['Google Ads', 'Meta Ads', 'Next.js', 'GTM'],
    results: [
      { label: 'Site-visit bookings', value: '1,240' },
      { label: 'Cost per lead', value: '-41%' },
      { label: 'ROAS', value: '6.8x' },
    ],
    featured: true,
  },
  {
    title: 'Crave Reels — Food Brand Content Engine',
    slug: 'crave-reels-content-engine',
    client: 'Cloud kitchen brand',
    summary:
      '90 short-form videos a quarter, scripted and edited in-house, that took the brand past 400K followers.',
    description:
      'A repeatable content engine: monthly shoot days, a hook library tested against performance data, motion graphics templates for consistency, and platform-specific cuts for Reels, Shorts and ads.',
    type: 'video',
    industry: 'Food & Beverage',
    technologies: ['Premiere Pro', 'After Effects', 'Meta Ads'],
    results: [
      { label: 'Followers', value: '400K+' },
      { label: 'Avg. views / reel', value: '180K' },
      { label: 'Videos / quarter', value: '90' },
    ],
    featured: true,
  },
];

export const fallbackTestimonials: Testimonial[] = [
  {
    name: 'Dr. Meera Krishnan',
    role: 'Managing Director',
    company: 'Sanjeevani Clinics',
    quote:
      'They understood our clinic workflow better than the vendors we had used for years. Nine branches moved to the new system in six weeks with no downtime.',
    rating: 5,
  },
  {
    name: 'Arjun Mehta',
    role: 'Founder',
    company: 'FitLoop',
    quote:
      'We shipped to both stores in eleven weeks. What stood out was the weekly demo — we always knew exactly what we were paying for.',
    rating: 5,
  },
  {
    name: 'Priya Nair',
    role: 'Head of Growth',
    company: 'Kiraana Express',
    quote:
      'Conversion went up 58% after the rebuild. They treated our checkout speed like a revenue problem, not a technical one.',
    rating: 5,
  },
  {
    name: 'Rohit Bansal',
    role: 'VP Customer Success',
    company: 'DeskSense',
    quote:
      'The AI assistant was evaluated against 400 real tickets before launch. That rigour is why we trusted it with customers.',
    rating: 5,
  },
  {
    name: 'Sameer Qureshi',
    role: 'Director',
    company: 'Horizon Realty',
    quote:
      'Cost per lead dropped 41% in the first quarter and we could finally see which campaign a booking came from.',
    rating: 5,
  },
];

export const fallbackTeam: TeamMember[] = [
  {
    name: 'Raj Kamal',
    role: 'Founder & Principal Engineer',
    bio: 'Leads architecture and delivery. Ten years across mobile, web and cloud, with a bias for shipping small and often.',
    skills: ['Flutter', 'Next.js', 'NestJS', 'AWS'],
    socials: { linkedin: '#', github: '#' },
  },
  {
    name: 'Ananya Sharma',
    role: 'Design Lead',
    bio: 'Product designer who starts with the user flow and ends with a design system developers can build from.',
    skills: ['Figma', 'Design Systems', 'User Research'],
    socials: { linkedin: '#' },
  },
  {
    name: 'Vikram Singh',
    role: 'Growth Lead',
    bio: 'Runs paid and organic. Reports on pipeline, not impressions.',
    skills: ['Google Ads', 'SEO', 'Analytics'],
    socials: { linkedin: '#' },
  },
  {
    name: 'Neha Pillai',
    role: 'Media Lead',
    bio: 'Scripts and edits the short-form content engine. Built a hook library that is tested, not guessed.',
    skills: ['Premiere Pro', 'After Effects', 'Content Strategy'],
    socials: { instagram: '#', linkedin: '#' },
  },
];

export const fallbackFaqs: Faq[] = [
  {
    question: 'What exactly do you do?',
    answer:
      'Everything between an idea and a running product: mobile and web development, custom software, UI/UX, AI automation, cloud and DevOps, QA, plus the growth side — SEO, Google and Meta ads, video editing and branding. You can hire us for one piece or the whole stack.',
    category: 'general',
  },
  {
    question: 'How do projects start?',
    answer:
      'A 30-minute call, then a written scope with milestones, timeline and a fixed price for phase one. You approve it before any work begins. Discovery calls are free.',
    category: 'process',
  },
  {
    question: 'How long does an app take?',
    answer:
      'A focused MVP is typically 6-10 weeks. A full product with payments, admin panel and integrations runs 3-5 months. We ship in two-week increments so you see working software throughout, not at the end.',
    category: 'process',
  },
  {
    question: 'How do you charge?',
    answer:
      'Fixed price per milestone for defined scope, or a monthly retainer for ongoing work and dedicated team members. No hidden hourly surprises — any scope change is quoted before it is built.',
    category: 'pricing',
  },
  {
    question: 'Who owns the code?',
    answer:
      'You do, completely. Source code, design files, infrastructure and accounts are transferred to you at handover, with an IP assignment in the contract.',
    category: 'legal',
  },
  {
    question: 'What happens after launch?',
    answer:
      'Every project includes 30 days of warranty support. After that you can take a monthly care plan covering monitoring, patches, backups and a bucket of change requests with a response SLA.',
    category: 'support',
  },
  {
    question: 'Can you work with our existing team or codebase?',
    answer:
      'Yes. We regularly join existing repos, take over half-finished projects and embed engineers into client teams. We start with a short audit so there are no surprises.',
    category: 'general',
  },
  {
    question: 'Do you sign NDAs?',
    answer: 'Always, before we see anything sensitive. We can use yours or send ours.',
    category: 'legal',
  },
];

export const fallbackIndustries: Industry[] = [
  { name: 'Healthcare', slug: 'healthcare', icon: 'HeartPulse', description: 'Clinic systems, telemedicine and patient apps built to handle sensitive data properly.' },
  { name: 'Fintech', slug: 'fintech', icon: 'Landmark', description: 'Lending, payments and wealth platforms with audit trails and reconciliation built in.' },
  { name: 'E-commerce', slug: 'ecommerce', icon: 'ShoppingBag', description: 'Storefronts, marketplaces and retention automation for brands that ship daily.' },
  { name: 'Education', slug: 'education', icon: 'GraduationCap', description: 'Course platforms, live classes and assessment engines for institutes and creators.' },
  { name: 'Real Estate', slug: 'real-estate', icon: 'Building2', description: 'Listing portals, CRM for site visits and virtual walkthroughs.' },
  { name: 'Logistics', slug: 'logistics', icon: 'Truck', description: 'Fleet tracking, route planning and delivery apps for the field.' },
  { name: 'On-Demand', slug: 'on-demand', icon: 'Zap', description: 'Booking, dispatch and rating flows for services delivered at the door.' },
  { name: 'Media & Entertainment', slug: 'media-entertainment', icon: 'Clapperboard', description: 'Streaming, short-video and creator monetisation products.' },
  { name: 'Manufacturing', slug: 'manufacturing', icon: 'Factory', description: 'Shop-floor dashboards, inventory and quality tracking.' },
  { name: 'Travel & Hospitality', slug: 'travel-hospitality', icon: 'Plane', description: 'Booking engines, property management and guest experience apps.' },
];

export const fallbackPosts: Post[] = [
  {
    title: 'What an MVP should actually include in 2026',
    slug: 'what-an-mvp-should-include-2026',
    excerpt:
      'Most MVPs fail because they ship too much, not too little. Here is the cut list we use with founders.',
    content:
      '<p>Every founder we meet has a feature list. Our first job is usually to delete two thirds of it.</p><h2>Ship the one loop</h2><p>An MVP needs exactly one complete loop: a user arrives, does the core thing, and gets value. Everything that is not on that loop can wait for real usage data.</p><h2>What always makes the cut</h2><ul><li>Authentication, boring and reliable</li><li>The core action, polished enough to screenshot</li><li>Payments, if money is part of the proof</li><li>Analytics, so launch tells you something</li><li>A way to contact a human</li></ul><h2>What almost never does</h2><p>Dark mode, onboarding tours, an admin panel for data you can edit in the database, and a mobile app when a responsive web app would answer the same question.</p>',
    category: 'Product',
    tags: ['MVP', 'Product Strategy', 'Startups'],
    author: { name: 'Raj Kamal', role: 'Founder & Principal Engineer' },
    readingTime: 4,
    featured: true,
    publishedAt: '2026-10-12T00:00:00.000Z',
  },
  {
    title: 'Flutter or React Native: how we actually choose',
    slug: 'flutter-or-react-native-how-we-choose',
    excerpt:
      'Both are good. The decision usually comes down to your team, not the framework benchmark charts.',
    content:
      '<p>We ship in both. Here is the short version of how we pick.</p><h2>Choose Flutter when</h2><p>Your UI is custom and animation-heavy, you want pixel-identical screens on both platforms, or your team is comfortable in a typed language.</p><h2>Choose React Native when</h2><p>You already have a React web team and want shared logic, you lean on native third-party SDKs, or you want over-the-air updates.</p><h2>What matters less than people think</h2><p>Raw performance. Your architecture and network handling will matter more than the framework.</p>',
    category: 'Engineering',
    tags: ['Flutter', 'React Native', 'Mobile'],
    author: { name: 'Raj Kamal', role: 'Founder & Principal Engineer' },
    readingTime: 3,
    publishedAt: '2026-09-28T00:00:00.000Z',
  },
  {
    title: 'Why your ads are expensive (and it is not the bidding)',
    slug: 'why-your-ads-are-expensive',
    excerpt:
      'In nine out of ten audits, the problem is tracking and landing pages, not the campaign settings.',
    content:
      '<p>When a new client asks us to fix their cost per lead, we look at the account last.</p><h2>First: is conversion tracking honest?</h2><p>Half the accounts we audit optimise towards the wrong event. The algorithm will faithfully buy you more of whatever you measure.</p><h2>Second: does the landing page match the ad?</h2><p>If the ad promises a price and the page opens with a brand video, you pay for the mismatch in bounce rate.</p><h2>Third: is the offer worth the click?</h2><p>No bid strategy saves a weak offer.</p>',
    category: 'Marketing',
    tags: ['Google Ads', 'Meta Ads', 'Conversion'],
    author: { name: 'Vikram Singh', role: 'Growth Lead' },
    readingTime: 3,
    publishedAt: '2026-09-05T00:00:00.000Z',
  },
  {
    title: 'Putting an AI assistant in front of customers safely',
    slug: 'ai-assistant-in-front-of-customers',
    excerpt:
      'Grounding, evaluation and escalation — the three things that separate a useful assistant from a liability.',
    content:
      '<p>An assistant that confidently invents a refund policy costs more than it saves. Three practices keep ours honest.</p><h2>Ground every answer</h2><p>Retrieval over your own documents, with citations shown to the user.</p><h2>Evaluate before launch</h2><p>We score every model and prompt change against real historical tickets. No eval, no launch.</p><h2>Escalate early</h2><p>Any policy or money question hands over to a human with the full transcript attached.</p>',
    category: 'AI',
    tags: ['AI', 'RAG', 'Customer Support'],
    author: { name: 'Raj Kamal', role: 'Founder & Principal Engineer' },
    readingTime: 4,
    publishedAt: '2026-08-22T00:00:00.000Z',
  },
];

export const fallbackJobs: Job[] = [
  {
    title: 'Flutter Developer',
    slug: 'flutter-developer',
    department: 'Engineering',
    location: 'Remote / Jaipur',
    employmentType: 'full-time',
    experience: '1-3 years',
    description:
      'Build production Flutter apps for clients across healthcare, fitness and commerce. You will own features end to end, from API contract to store release.',
    responsibilities: [
      'Build and ship Flutter features for iOS and Android',
      'Work directly with designers and the client team',
      'Write widget and integration tests',
      'Help with store releases and crash triage',
    ],
    requirements: [
      '1+ year of Flutter in production',
      'Comfortable with REST APIs and state management',
      'Git and code review discipline',
      'Clear written English',
    ],
    salaryRange: '₹4.5 - 9 LPA',
    openings: 2,
  },
  {
    title: 'Next.js Developer',
    slug: 'nextjs-developer',
    department: 'Engineering',
    location: 'Remote',
    employmentType: 'full-time',
    experience: '2-4 years',
    description:
      'Build fast, accessible web products on Next.js and NestJS for clients who care about Core Web Vitals.',
    responsibilities: [
      'Build Next.js App Router front-ends',
      'Integrate and extend NestJS APIs',
      'Own performance and accessibility budgets',
      'Review code and mentor juniors',
    ],
    requirements: [
      '2+ years with React and TypeScript',
      'Experience with SSR / ISR trade-offs',
      'Familiarity with Node backends',
      'An eye for UI detail',
    ],
    salaryRange: '₹6 - 12 LPA',
    openings: 1,
  },
  {
    title: 'Performance Marketer',
    slug: 'performance-marketer',
    department: 'Growth',
    location: 'Remote / Jaipur',
    employmentType: 'full-time',
    experience: '2-5 years',
    description:
      'Run Google and Meta accounts against CPL and ROAS targets for a portfolio of clients.',
    responsibilities: [
      'Plan and run Search, PMax and Meta campaigns',
      'Set up clean conversion tracking',
      'Brief creative and run A/B tests',
      'Present monthly results to clients',
    ],
    requirements: [
      '2+ years managing live ad budgets',
      'Strong with GA4 and GTM',
      'Comfortable presenting to clients',
      'Spreadsheet fluency',
    ],
    salaryRange: '₹4 - 9 LPA',
    openings: 1,
  },
  {
    title: 'Video Editor',
    slug: 'video-editor',
    department: 'Media',
    location: 'Jaipur (on-site)',
    employmentType: 'full-time',
    experience: '1-3 years',
    description:
      'Edit short-form content and product videos for brands, from raw footage to platform-ready cuts.',
    responsibilities: [
      'Edit reels, ads and explainer videos',
      'Build and reuse motion graphics templates',
      'Colour grade and mix audio',
      'Deliver platform-specific exports',
    ],
    requirements: [
      'Strong Premiere Pro and After Effects skills',
      'A reel we can watch',
      'Sense of pacing for short-form',
      'Able to take feedback quickly',
    ],
    salaryRange: '₹3 - 6.5 LPA',
    openings: 2,
  },
  {
    title: 'Engineering Trainee (Internship)',
    slug: 'engineering-trainee-internship',
    department: 'Engineering',
    location: 'Remote / Jaipur',
    employmentType: 'training',
    experience: 'Fresher / 3rd-4th year students',
    description:
      'A six-month paid training program for final-year students and recent graduates. Work on real client features with a mentor, with a full-time offer for top performers.',
    responsibilities: [
      'Learn the stack through small real tasks',
      'Pair with a senior engineer weekly',
      'Write tests for what you build',
      'Present your work at the monthly demo',
    ],
    requirements: [
      'Strong fundamentals in any one language',
      'Built at least one project you can show',
      'Available for six months',
      'Curiosity, and the habit of asking early',
    ],
    salaryRange: '₹8,000 - 15,000 / month stipend',
    openings: 5,
  },
];

export const fallbackSettings: SiteSettings = {
  brandName: 'WhiteCodel',
  tagline: 'Your in-house tech and growth team, on demand.',
  contact: {
    email: 'hello@whitecodel.dev',
    phone: '+91 98765 43210',
    whatsapp: '919876543210',
    address: 'Jaipur, Rajasthan, India',
  },
  socials: { linkedin: '#', instagram: '#', x: '#', github: '#', youtube: '#' },
  stats: [
    { label: 'Projects delivered', value: '120+' },
    { label: 'Clients served', value: '45+' },
    { label: 'Avg. client rating', value: '4.9/5' },
    { label: 'Years building', value: '7' },
  ],
  hero: {
    eyebrow: 'Design · Build · Market · Scale',
    headline: 'One team for everything your business needs online',
    subheadline:
      'Apps, websites, custom software, AI automation, marketing, ads and video — delivered by a single accountable team, with fixed milestones and no agency runaround.',
    primaryCta: 'Book a free strategy call',
    secondaryCta: 'See our work',
  },
};
