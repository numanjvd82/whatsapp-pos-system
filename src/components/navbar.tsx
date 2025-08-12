'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { api } from '@/utils/api';
import useAuthUser from '@/lib/hooks/useAuthUser';
import { useAuthStore } from '@/app/stores/store.auth';

export default function Navbar(): React.ReactElement | null {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isUserLoading } = useAuthUser();
  const { clearAccessToken, clearUser, accessToken } = useAuthStore();
  const logoutMutation = api.auth.logout.useMutation();

  // Check if current path is a public path (login or signup)
  const publicPaths = ['/login', '/signup', '/'];
  const isPublicPath = publicPaths.includes(pathname || '');

  const handleLogout = async (): Promise<void> => {
    try {
      await logoutMutation.mutateAsync();
      clearAccessToken();
      clearUser();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  // Don't render navbar on public paths or when not authenticated
  if (isPublicPath) return null;
  if (!accessToken) return null;
  if (!user && !isUserLoading) return null;

  return (
    <nav className='border-b px-4 py-3 bg-white'>
      <div className='max-w-7xl mx-auto flex justify-between items-center'>
        <Link href='/dashboard' className='font-semibold text-lg'>
          WhatsApp POS
        </Link>

        <div className='flex items-center space-x-4'>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className='outline-none'>
              <Avatar>
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || 'User'}`}
                  alt={user?.name || 'User'}
                />
                <AvatarFallback>
                  <User className='h-5 w-5' />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>
                <div className='flex flex-col'>
                  <span>{user?.name}</span>
                  <span className='text-xs text-muted-foreground'>
                    {user?.email}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href='/settings'>Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
