'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { adminApi, tokenStore, type AdminUser } from '@/lib/admin-client';

interface AuthState {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState>({
  user: null,
  loading: true,
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const cached = tokenStore.user();
    if (cached) setUser(cached);

    if (!tokenStore.get()) {
      setLoading(false);
      return;
    }

    adminApi
      .me()
      .then((fresh) => setUser(fresh))
      .catch(() => {
        tokenStore.clear();
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const result = await adminApi.login(email, password);
      tokenStore.set(result.token, result.user);
      setUser(result.user);
      router.push('/admin');
    },
    [router],
  );

  const logout = useCallback(() => {
    tokenStore.clear();
    setUser(null);
    router.push('/admin/login');
  }, [router]);

  const value = useMemo(
    () => ({ user, loading, login, logout }),
    [user, loading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
