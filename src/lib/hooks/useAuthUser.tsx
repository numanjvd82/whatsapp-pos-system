'use client';
import { useAuthStore } from '@/app/stores/store.auth';
import { PartialUser } from '@/utils';
import { api } from '@/utils/api';
import { useEffect } from 'react';

export default function useAuthUser(): {
  user: PartialUser | null;
  isUserLoading: boolean;
  isUserError: boolean;
} {
  const { setUser, user } = useAuthStore();
  const authUser = api.user.me.useQuery();

  useEffect(() => {
    if (authUser.data && !user) {
      setUser(authUser.data);
    }
  }, [authUser.data, user, setUser]);

  return {
    user,
    isUserLoading: authUser.isLoading,
    isUserError: authUser.isError,
  };
}
