'use client';
import { useAuthStore } from '@/app/stores/auth';
import { api } from '@/utils/api';
import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const { accessToken, setAccessToken, clearAccessToken } = useAuthStore();
  const router = useRouter();

  const { data, error } = api.auth.refresh.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
  });

  console.log('AuthProvider - Data:', data);

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
      return;
    }

    // If API returned a new access token, set it
    if (data && data.accessToken) {
      setAccessToken(data.accessToken.token);
    }
  }, [accessToken, data, error, setAccessToken, clearAccessToken, router]);

  return <>{children}</>;
}
