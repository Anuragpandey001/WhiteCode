'use client';

import { API_URL } from './api';

const TOKEN_KEY = 'whitecodel.admin.token';
const USER_KEY = 'whitecodel.admin.user';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'editor';
  avatar?: string;
}

export const tokenStore = {
  get(): string | null {
    if (typeof window === 'undefined') return null;
    try {
      return window.localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  set(token: string, user: AdminUser) {
    try {
      window.localStorage.setItem(TOKEN_KEY, token);
      window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch {
      /* storage unavailable */
    }
  },
  user(): AdminUser | null {
    if (typeof window === 'undefined') return null;
    try {
      const raw = window.localStorage.getItem(USER_KEY);
      return raw ? (JSON.parse(raw) as AdminUser) : null;
    } catch {
      return null;
    }
  },
  clear() {
    try {
      window.localStorage.removeItem(TOKEN_KEY);
      window.localStorage.removeItem(USER_KEY);
    } catch {
      /* ignore */
    }
  },
};

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(
  path: string,
  options: RequestInit & { raw?: boolean } = {},
): Promise<T> {
  const token = tokenStore.get();
  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, { ...options, headers });
  } catch {
    throw new ApiError(
      `Cannot reach the API at ${API_URL}. Is the NestJS server running?`,
      0,
    );
  }

  if (res.status === 401) {
    tokenStore.clear();
    throw new ApiError('Your session expired. Please sign in again.', 401);
  }

  if (options.raw) {
    if (!res.ok) throw new ApiError('Request failed', res.status);
    return (await res.text()) as unknown as T;
  }

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    const message = Array.isArray(json?.message)
      ? json.message.join(', ')
      : json?.message || 'Request failed';
    throw new ApiError(message, res.status);
  }

  return (json?.data ?? json) as T;
}

export const adminApi = {
  login: (email: string, password: string) =>
    request<{ token: string; user: AdminUser }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  me: () => request<AdminUser>('/auth/me'),

  get: <T>(path: string) => request<T>(path),

  /** List endpoints return { data, meta }; this keeps the meta. */
  async list<T>(path: string): Promise<{ items: T[]; meta?: PageMeta }> {
    const token = tokenStore.get();
    const res = await fetch(`${API_URL}${path}`, {
      headers: token
        ? { Authorization: `Bearer ${token}`, Accept: 'application/json' }
        : { Accept: 'application/json' },
    }).catch(() => null);

    if (!res) {
      throw new ApiError(
        `Cannot reach the API at ${API_URL}. Is the NestJS server running?`,
        0,
      );
    }
    if (res.status === 401) {
      tokenStore.clear();
      throw new ApiError('Your session expired. Please sign in again.', 401);
    }

    const json = await res.json().catch(() => null);
    if (!res.ok) {
      const message = Array.isArray(json?.message)
        ? json.message.join(', ')
        : json?.message || 'Request failed';
      throw new ApiError(message, res.status);
    }

    const data = json?.data ?? [];
    return { items: Array.isArray(data) ? data : [], meta: json?.meta };
  },

  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined }),

  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'PATCH', body: body ? JSON.stringify(body) : undefined }),

  remove: <T>(path: string) => request<T>(path, { method: 'DELETE' }),

  upload: async (file: File) => {
    const body = new FormData();
    body.append('file', file);
    return request<{ url: string; filename: string }>('/uploads', {
      method: 'POST',
      body,
    });
  },

  exportCsv: () => request<string>('/leads/export', { raw: true }),
};

export interface PageMeta {
  total: number;
  page: number;
  limit: number;
  pages: number;
}
