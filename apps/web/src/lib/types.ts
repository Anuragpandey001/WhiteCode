export interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  meta?: { total: number; page: number; limit: number; pages: number };
}

export interface ServiceItem {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  description?: string;
  icon?: string;
  category?: string;
  features?: string[];
  technologies?: string[];
  deliverables?: string[];
  startingPrice?: string;
  timeline?: string;
  coverImage?: string;
  order?: number;
  featured?: boolean;
  published?: boolean;
}

export interface Project {
  _id?: string;
  title: string;
  slug: string;
  client?: string;
  summary: string;
  description?: string;
  type?: string;
  industry?: string;
  coverImage?: string;
  gallery?: string[];
  technologies?: string[];
  results?: { label: string; value: string }[];
  liveUrl?: string;
  featured?: boolean;
  published?: boolean;
  completedAt?: string;
}

export interface Post {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  coverImage?: string;
  category?: string;
  tags?: string[];
  author?: { name?: string; role?: string; avatar?: string };
  readingTime?: number;
  views?: number;
  featured?: boolean;
  published?: boolean;
  publishedAt?: string;
  createdAt?: string;
}

export interface Testimonial {
  _id?: string;
  name: string;
  role?: string;
  company?: string;
  avatar?: string;
  quote: string;
  rating?: number;
}

export interface TeamMember {
  _id?: string;
  name: string;
  role: string;
  bio?: string;
  avatar?: string;
  skills?: string[];
  socials?: Record<string, string>;
}

export interface Faq {
  _id?: string;
  question: string;
  answer: string;
  category?: string;
}

export interface Industry {
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

export interface Job {
  _id?: string;
  title: string;
  slug: string;
  department?: string;
  location?: string;
  employmentType?: string;
  experience?: string;
  description?: string;
  responsibilities?: string[];
  requirements?: string[];
  salaryRange?: string;
  openings?: number;
}

export interface SiteSettings {
  brandName?: string;
  tagline?: string;
  logo?: string;
  contact?: {
    email?: string;
    phone?: string;
    whatsapp?: string;
    address?: string;
    calendarUrl?: string;
  };
  socials?: Record<string, string>;
  stats?: { label: string; value: string }[];
  hero?: {
    eyebrow?: string;
    headline?: string;
    subheadline?: string;
    primaryCta?: string;
    secondaryCta?: string;
  };
  seo?: { title?: string; description?: string; keywords?: string[] };
}
