import type { ReactNode } from 'react';
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { getSettings } from '@/lib/api';

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const settings = await getSettings();

  return (
    <>
      <Navbar brandName={settings?.brandName} />
      <main className="min-h-screen">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
