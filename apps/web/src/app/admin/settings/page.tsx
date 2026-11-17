'use client';

import { useCallback, useEffect, useState } from 'react';
import { Save, AlertTriangle, Database } from 'lucide-react';
import { adminApi } from '@/lib/admin-client';
import { AdminPageHeader } from '@/components/admin/shell';
import {
  AdminButton,
  AdminCard,
  Spinner,
  Toast,
  adminInput,
} from '@/components/admin/ui';
import { FieldInput } from '@/components/admin/field-input';
import { useAuth } from '@/components/admin/auth-provider';
import type { SiteSettings } from '@/lib/types';

export default function AdminSettingsPage() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' }>({
    message: '',
    type: 'success',
  });

  function notify(message: string, type: 'success' | 'error' = 'success') {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: 'success' }), 2600);
  }

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setSettings(await adminApi.get<SiteSettings>('/settings'));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load settings');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function patch(path: string, value: unknown) {
    setSettings((prev) => {
      if (!prev) return prev;
      const [group, key] = path.split('.');
      if (!key) return { ...prev, [group]: value };
      return {
        ...prev,
        [group]: { ...((prev as Record<string, any>)[group] || {}), [key]: value },
      };
    });
  }

  async function save() {
    if (!settings) return;
    setSaving(true);
    try {
      await adminApi.patch('/settings', {
        brandName: settings.brandName,
        tagline: settings.tagline,
        logo: settings.logo,
        contact: settings.contact,
        socials: settings.socials,
        stats: settings.stats,
        hero: settings.hero,
        seo: settings.seo,
      });
      notify('Settings saved — the website updates within a minute');
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Could not save', 'error');
    } finally {
      setSaving(false);
    }
  }

  async function reseed() {
    setSeeding(true);
    try {
      await adminApi.post('/seed');
      notify('Demo content topped up');
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Seeding failed', 'error');
    } finally {
      setSeeding(false);
    }
  }

  if (loading) return <Spinner label="Loading settings…" />;

  if (error || !settings) {
    return (
      <>
        <AdminPageHeader title="Site settings" />
        <AdminCard>
          <div className="flex items-start gap-3 text-sm text-amber-100">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
            <p>{error || 'No settings found'}</p>
          </div>
        </AdminCard>
      </>
    );
  }

  const text = (label: string, path: string, value?: string, placeholder?: string) => (
    <div key={path}>
      <label className="mb-1.5 block text-xs font-medium text-slate-400">{label}</label>
      <input
        value={value ?? ''}
        onChange={(e) => patch(path, e.target.value)}
        placeholder={placeholder}
        className={adminInput}
      />
    </div>
  );

  return (
    <>
      <AdminPageHeader
        title="Site settings"
        description="Brand, contact details, hero copy and the numbers shown across the website."
        actions={
          <AdminButton onClick={() => void save()} loading={saving}>
            <Save className="h-4 w-4" />
            Save changes
          </AdminButton>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <AdminCard>
          <h2 className="text-sm font-semibold text-white">Brand</h2>
          <div className="mt-4 space-y-4">
            {text('Brand name', 'brandName', settings.brandName, 'Novacraft Digital')}
            {text('Tagline', 'tagline', settings.tagline)}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">
                Logo
              </label>
              <FieldInput
                field={{ name: 'logo', label: 'Logo', type: 'image' }}
                value={settings.logo}
                onChange={(value) => patch('logo', value)}
              />
            </div>
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="text-sm font-semibold text-white">Contact</h2>
          <div className="mt-4 space-y-4">
            {text('Email', 'contact.email', settings.contact?.email)}
            {text('Phone', 'contact.phone', settings.contact?.phone)}
            {text(
              'WhatsApp number',
              'contact.whatsapp',
              settings.contact?.whatsapp,
              '919876543210',
            )}
            {text('Address', 'contact.address', settings.contact?.address)}
            {text(
              'Booking calendar URL',
              'contact.calendarUrl',
              settings.contact?.calendarUrl,
              'https://cal.com/…',
            )}
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="text-sm font-semibold text-white">Hero section</h2>
          <div className="mt-4 space-y-4">
            {text('Eyebrow', 'hero.eyebrow', settings.hero?.eyebrow)}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">
                Headline
              </label>
              <textarea
                value={settings.hero?.headline ?? ''}
                onChange={(e) => patch('hero.headline', e.target.value)}
                rows={2}
                className={adminInput}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">
                Sub-headline
              </label>
              <textarea
                value={settings.hero?.subheadline ?? ''}
                onChange={(e) => patch('hero.subheadline', e.target.value)}
                rows={3}
                className={adminInput}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {text('Primary button', 'hero.primaryCta', settings.hero?.primaryCta)}
              {text('Secondary button', 'hero.secondaryCta', settings.hero?.secondaryCta)}
            </div>
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="text-sm font-semibold text-white">Social profiles</h2>
          <div className="mt-4 space-y-4">
            {(['linkedin', 'instagram', 'x', 'github', 'youtube'] as const).map((key) =>
              text(
                key === 'x' ? 'X (Twitter)' : key.charAt(0).toUpperCase() + key.slice(1),
                `socials.${key}`,
                settings.socials?.[key],
                'https://',
              ),
            )}
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="text-sm font-semibold text-white">Headline stats</h2>
          <p className="mt-1 text-xs text-slate-500">
            Shown under the hero and on the about page.
          </p>
          <div className="mt-4">
            <FieldInput
              field={{ name: 'stats', label: 'Stats', type: 'pairs' }}
              value={settings.stats}
              onChange={(value) => patch('stats', value)}
            />
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="text-sm font-semibold text-white">SEO defaults</h2>
          <div className="mt-4 space-y-4">
            {text('Meta title', 'seo.title', settings.seo?.title)}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">
                Meta description
              </label>
              <textarea
                value={settings.seo?.description ?? ''}
                onChange={(e) => patch('seo.description', e.target.value)}
                rows={3}
                className={adminInput}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">
                Keywords
              </label>
              <FieldInput
                field={{ name: 'keywords', label: 'Keywords', type: 'tags' }}
                value={settings.seo?.keywords}
                onChange={(value) => patch('seo.keywords', value)}
              />
            </div>
          </div>
        </AdminCard>
      </div>

      {user?.role === 'superadmin' ? (
        <AdminCard className="mt-4">
          <h2 className="text-sm font-semibold text-white">Demo content</h2>
          <p className="mt-1 text-xs text-slate-500">
            Adds any missing starter services, case studies, posts, FAQs and
            roles. It never overwrites records you have edited.
          </p>
          <AdminButton variant="secondary" className="mt-4" onClick={() => void reseed()} loading={seeding}>
            <Database className="h-4 w-4" />
            Top up demo content
          </AdminButton>
        </AdminCard>
      ) : null}

      <div className="mt-6 flex justify-end">
        <AdminButton onClick={() => void save()} loading={saving}>
          <Save className="h-4 w-4" />
          Save changes
        </AdminButton>
      </div>

      <Toast message={toast.message} type={toast.type} />
    </>
  );
}
