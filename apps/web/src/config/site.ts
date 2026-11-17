/**
 * Single place to rebrand the whole site.
 * Anything the admin panel can edit (Settings) overrides these at runtime.
 */
export const siteConfig = {
  name: 'Novacraft Digital',
  shortName: 'Novacraft',
  legalName: 'Novacraft Digital Studio',
  tagline: 'Your in-house tech and growth team, on demand.',
  description:
    'Full-service IT and growth partner: mobile and web app development, custom software, AI automation, UI/UX design, SEO, Google and Meta ads, video editing and branding.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  contact: {
    email: 'hello@novacraft.dev',
    phone: '+91 98765 43210',
    whatsapp: '919876543210',
    address: 'Jaipur, Rajasthan, India',
  },
  socials: {
    linkedin: '#',
    instagram: '#',
    x: '#',
    github: '#',
    youtube: '#',
  },
};

export const mainNav = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/portfolio' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
];

export const footerNav = [
  {
    title: 'Services',
    links: [
      { label: 'Mobile App Development', href: '/services/mobile-app-development' },
      { label: 'Web Development', href: '/services/web-development' },
      { label: 'Custom Software & SaaS', href: '/services/custom-software-saas' },
      { label: 'UI/UX Design', href: '/services/ui-ux-design' },
      { label: 'AI & Automation', href: '/services/ai-automation' },
    ],
  },
  {
    title: 'Growth',
    links: [
      { label: 'Digital Marketing', href: '/services/digital-marketing' },
      { label: 'Google & Meta Ads', href: '/services/google-meta-ads' },
      { label: 'Video Editing & Motion', href: '/services/video-editing-motion' },
      { label: 'Graphic Design & Branding', href: '/services/graphic-design-branding' },
      { label: 'E-Commerce Development', href: '/services/ecommerce-development' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', href: '/about' },
      { label: 'Our work', href: '/portfolio' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export const serviceCategories = [
  { value: 'all', label: 'Everything' },
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'media', label: 'Media' },
  { value: 'cloud', label: 'Cloud' },
  { value: 'support', label: 'Support' },
];

export const processSteps = [
  {
    step: '01',
    title: 'Discovery call',
    duration: '30 minutes, free',
    description:
      'We dig into the problem, your constraints and what success looks like in numbers. No slide deck, no sales pitch.',
  },
  {
    step: '02',
    title: 'Scope & fixed quote',
    duration: '2-3 days',
    description:
      'You get a written scope with milestones, timeline and a fixed price for phase one. Nothing starts until you approve it.',
  },
  {
    step: '03',
    title: 'Design & build sprints',
    duration: '2-week cycles',
    description:
      'Working software every two weeks with a live demo. You can change direction between sprints without blowing up the budget.',
  },
  {
    step: '04',
    title: 'Launch & handover',
    duration: 'Release week',
    description:
      'We ship to production, hand over the code, accounts and docs, and train your team on the admin panel.',
  },
  {
    step: '05',
    title: 'Grow & support',
    duration: 'Ongoing',
    description:
      'Monitoring, patches and a monthly bucket of improvements — plus marketing and ads if you want the growth side too.',
  },
];

export const engagementModels = [
  {
    name: 'Project',
    price: 'From ₹60,000',
    headline: 'A defined scope, delivered to a fixed price',
    description:
      'Best when you know what you need built: a website, an app, a store, a campaign launch.',
    features: [
      'Fixed price per milestone',
      'Written scope before work starts',
      'Demo every two weeks',
      '30-day post-launch warranty',
      'Full code and IP handover',
    ],
    cta: 'Scope my project',
    highlighted: false,
  },
  {
    name: 'Growth retainer',
    price: 'From ₹30,000/mo',
    headline: 'A team on call every month',
    description:
      'Marketing, ads, content, video and small dev changes under one monthly agreement.',
    features: [
      'Dedicated strategist and pod',
      'Monthly roadmap you approve',
      'SEO, ads, content and video',
      'Live reporting dashboard',
      'Monthly review call',
    ],
    cta: 'Plan my retainer',
    highlighted: true,
  },
  {
    name: 'Dedicated team',
    price: 'From ₹80,000/mo',
    headline: 'Engineers embedded in your company',
    description:
      'Add vetted developers, designers or marketers to your own team, full-time or part-time.',
    features: [
      'Works in your tools and standups',
      'Two-week trial period',
      'Replacement guarantee',
      'Monthly billing, no lock-in',
      'NDA and IP assignment included',
    ],
    cta: 'Hire a team',
    highlighted: false,
  },
];

export const differentiators = [
  {
    icon: 'Handshake',
    title: 'One accountable team',
    description:
      'Developers, designers, marketers and editors under one roof. No handoffs between three vendors who blame each other.',
  },
  {
    icon: 'Receipt',
    title: 'Fixed scope, fixed price',
    description:
      'You approve a written scope and price before work starts. Changes are quoted, never silently billed.',
  },
  {
    icon: 'CalendarCheck',
    title: 'A demo every two weeks',
    description:
      'You see working software or live campaign numbers on a schedule, so a project never goes quiet for a month.',
  },
  {
    icon: 'KeyRound',
    title: 'You own everything',
    description:
      'Code, design files, ad accounts, infrastructure. Transferred at handover with IP assignment in the contract.',
  },
  {
    icon: 'Gauge',
    title: 'Measured on outcomes',
    description:
      'Core Web Vitals, cost per lead, retention, revenue. We report on the number you care about, not activity logs.',
  },
  {
    icon: 'MessagesSquare',
    title: 'A human on WhatsApp',
    description:
      'Direct access to the people doing the work. No ticket queue to reach your own project lead.',
  },
];

export const techStack = [
  'Flutter',
  'React Native',
  'Next.js',
  'React',
  'NestJS',
  'Node.js',
  'TypeScript',
  'Python',
  'MongoDB',
  'PostgreSQL',
  'Redis',
  'AWS',
  'Docker',
  'Kubernetes',
  'Firebase',
  'Figma',
  'Claude API',
  'Razorpay',
  'Stripe',
  'Shopify',
];
