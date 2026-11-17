import * as Lucide from 'lucide-react';
import type { LucideProps } from 'lucide-react';

/**
 * Renders a lucide icon by name, so icons can be chosen from the
 * admin panel and stored as a string on the record.
 */
export function Icon({
  name,
  fallback = 'Sparkles',
  ...props
}: { name?: string; fallback?: string } & LucideProps) {
  const registry = Lucide as unknown as Record<string, React.ComponentType<LucideProps>>;
  const Component =
    (name && registry[name]) || registry[fallback] || Lucide.Sparkles;
  return <Component {...props} />;
}
