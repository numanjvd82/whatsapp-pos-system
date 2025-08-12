'use client';
import { useAuthStore } from '@/app/stores/store.auth';
import { api } from '@/utils/api';
import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const { accessToken, setAccessToken, clearAccessToken } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const { data, error } = api.auth.refresh.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
  });

  useEffect(() => {
    // Public paths where unauthenticated users should be
    const publicPaths = ['/login', '/signup'];

    if (accessToken && publicPaths.includes(pathname || '')) {
      router.push('/dashboard');
    }
  }, [accessToken, router, pathname]);

  useEffect(() => {
    const now = dayjs().unix();
    let isTokenExpired = false;
    if (accessToken) {
      const decoded = jwtDecode(accessToken) as { exp: number };
      isTokenExpired = dayjs(decoded.exp * 1000).isBefore(now);
    }

    // If token is expired or API returned error, clear and redirect
    if (isTokenExpired || error) {
      clearAccessToken();
      router.push('/login');
    }

    // If API returned a new access token, set it
    if (data && data.accessToken) {
      setAccessToken(data.accessToken.token);
    }
  }, [accessToken, data, error, setAccessToken, clearAccessToken, router]);

  return <>{children}</>;
}
