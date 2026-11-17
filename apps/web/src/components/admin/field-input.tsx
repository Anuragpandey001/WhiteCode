'use client';

import { useRef, useState } from 'react';
import { Plus, Trash2, Upload, Loader2 } from 'lucide-react';
import { adminApi } from '@/lib/admin-client';
import { adminInput, AdminButton } from './ui';

export type FieldType =
  | 'text'
  | 'textarea'
  | 'html'
  | 'number'
  | 'boolean'
  | 'select'
  | 'tags'
  | 'list'
  | 'pairs'
  | 'image'
  | 'password'
  | 'email';

export interface FieldDef {
  name: string;
  label: string;
  type?: FieldType;
  placeholder?: string;
  help?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  full?: boolean;
  rows?: number;
}

type Value = unknown;

export function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: Value;
  onChange: (value: Value) => void;
}) {
  const type = field.type || 'text';

  if (type === 'boolean') {
    return (
      <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-ink-900/70 px-3.5 py-2.5">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 accent-brand-500"
        />
        <span className="text-sm text-slate-300">{field.help || 'Enabled'}</span>
      </label>
    );
  }

  if (type === 'select') {
    return (
      <select
        value={(value as string) ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className={adminInput}
      >
        <option value="">Select…</option>
        {field.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  if (type === 'textarea' || type === 'html') {
    return (
      <textarea
        value={(value as string) ?? ''}
        onChange={(e) => onChange(e.target.value)}
        rows={field.rows || (type === 'html' ? 12 : 4)}
        placeholder={field.placeholder}
        className={`${adminInput} ${type === 'html' ? 'font-mono text-xs' : ''}`}
      />
    );
  }

  if (type === 'number') {
    return (
      <input
        type="number"
        value={value === undefined || value === null ? '' : String(value)}
        onChange={(e) =>
          onChange(e.target.value === '' ? undefined : Number(e.target.value))
        }
        placeholder={field.placeholder}
        className={adminInput}
      />
    );
  }

  if (type === 'tags') {
    return <TagsInput value={(value as string[]) || []} onChange={onChange} field={field} />;
  }

  if (type === 'list') {
    return <ListInput value={(value as string[]) || []} onChange={onChange} field={field} />;
  }

  if (type === 'pairs') {
    return (
      <PairsInput
        value={(value as { label: string; value: string }[]) || []}
        onChange={onChange}
      />
    );
  }

  if (type === 'image') {
    return <ImageInput value={(value as string) || ''} onChange={onChange} />;
  }

  return (
    <input
      type={type === 'password' ? 'password' : type === 'email' ? 'email' : 'text'}
      value={(value as string) ?? ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
      className={adminInput}
    />
  );
}

function TagsInput({
  value,
  onChange,
  field,
}: {
  value: string[];
  onChange: (value: string[]) => void;
  field: FieldDef;
}) {
  const [draft, setDraft] = useState('');

  function add() {
    const next = draft.trim();
    if (!next) return;
    onChange([...value, next]);
    setDraft('');
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault();
              add();
            }
          }}
          placeholder={field.placeholder || 'Type and press Enter'}
          className={adminInput}
        />
        <AdminButton variant="secondary" onClick={add}>
          <Plus className="h-3.5 w-3.5" />
        </AdminButton>
      </div>
      {value.length ? (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {value.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/5 px-2.5 py-1 text-xs text-slate-300"
            >
              {tag}
              <button
                type="button"
                onClick={() => onChange(value.filter((_, i) => i !== index))}
                className="text-slate-500 transition hover:text-rose-300"
                aria-label={`Remove ${tag}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ListInput({
  value,
  onChange,
  field,
}: {
  value: string[];
  onChange: (value: string[]) => void;
  field: FieldDef;
}) {
  return (
    <div className="space-y-2">
      {value.map((item, index) => (
        <div key={index} className="flex gap-2">
          <input
            value={item}
            onChange={(e) => {
              const next = [...value];
              next[index] = e.target.value;
              onChange(next);
            }}
            placeholder={field.placeholder}
            className={adminInput}
          />
          <button
            type="button"
            onClick={() => onChange(value.filter((_, i) => i !== index))}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 text-slate-500 transition hover:border-rose-500/40 hover:text-rose-300"
            aria-label="Remove item"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
      <AdminButton variant="secondary" size="sm" onClick={() => onChange([...value, ''])}>
        <Plus className="h-3.5 w-3.5" />
        Add line
      </AdminButton>
    </div>
  );
}

function PairsInput({
  value,
  onChange,
}: {
  value: { label: string; value: string }[];
  onChange: (value: { label: string; value: string }[]) => void;
}) {
  return (
    <div className="space-y-2">
      {value.map((pair, index) => (
        <div key={index} className="flex gap-2">
          <input
            value={pair.label}
            onChange={(e) => {
              const next = [...value];
              next[index] = { ...next[index], label: e.target.value };
              onChange(next);
            }}
            placeholder="Label (e.g. Conversion)"
            className={adminInput}
          />
          <input
            value={pair.value}
            onChange={(e) => {
              const next = [...value];
              next[index] = { ...next[index], value: e.target.value };
              onChange(next);
            }}
            placeholder="Value (e.g. +58%)"
            className={adminInput}
          />
          <button
            type="button"
            onClick={() => onChange(value.filter((_, i) => i !== index))}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 text-slate-500 transition hover:border-rose-500/40 hover:text-rose-300"
            aria-label="Remove pair"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
      <AdminButton
        variant="secondary"
        size="sm"
        onClick={() => onChange([...value, { label: '', value: '' }])}
      >
        <Plus className="h-3.5 w-3.5" />
        Add row
      </AdminButton>
    </div>
  );
}

function ImageInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function upload(file: File) {
    setUploading(true);
    setError('');
    try {
      const result = await adminApi.upload(file);
      onChange(result.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://… or upload"
          className={adminInput}
        />
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void upload(file);
          }}
        />
        <AdminButton variant="secondary" onClick={() => inputRef.current?.click()}>
          {uploading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Upload className="h-3.5 w-3.5" />
          )}
        </AdminButton>
      </div>
      {error ? <p className="mt-1.5 text-xs text-rose-300">{error}</p> : null}
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt="preview"
          className="mt-2.5 h-24 rounded-xl border border-white/10 object-cover"
        />
      ) : null}
    </div>
  );
}
