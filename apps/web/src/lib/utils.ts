export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(value?: string | Date) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateTime(value?: string | Date) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export const projectTypeLabels: Record<string, string> = {
  all: 'All work',
  web: 'Web',
  mobile: 'Mobile apps',
  ai: 'AI',
  ecommerce: 'E-commerce',
  marketing: 'Marketing',
  video: 'Video',
  branding: 'Branding',
};

export const leadStatusLabels: Record<string, string> = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  proposal: 'Proposal sent',
  won: 'Won',
  lost: 'Lost',
};

export const leadStatusStyles: Record<string, string> = {
  new: 'bg-aqua-400/15 text-aqua-300 border-aqua-400/30',
  contacted: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  qualified: 'bg-brand-400/15 text-brand-200 border-brand-400/30',
  proposal: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  won: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  lost: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
};
