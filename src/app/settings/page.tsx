'use client';
import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import useAuthUser from '@/lib/hooks/useAuthUser';

export default function SettingsPage(): React.ReactElement {
  const { user, isUserLoading, isUserError } = useAuthUser();

  return (
    <div className='p-6 space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle className='text-xl font-bold'>Account Settings</CardTitle>
          <CardDescription>
            Manage your profile and business info
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isUserLoading ? (
            <Skeleton className='h-24 w-full' />
          ) : isUserError ? (
            <div className='text-red-600'>Failed to load user data.</div>
          ) : user ? (
            <div className='space-y-4'>
              <div className='flex items-center gap-4'>
                <span className='font-medium text-gray-800'>Name:</span>
                <span>{user.name}</span>
                <Badge variant='secondary'>You</Badge>
              </div>
              <div className='flex items-center gap-4'>
                <span className='font-medium text-gray-800'>Email:</span>
                <span>{user.email}</span>
              </div>
              <div className='flex items-center gap-4'>
                <span className='font-medium text-gray-800'>Business:</span>
                <span>{user.businessName}</span>
              </div>
              <div className='flex items-center gap-4'>
                <span className='font-medium text-gray-800'>Phone:</span>
                <span>{user.phone}</span>
              </div>
            </div>
          ) : (
            <div className='text-gray-600'>No user data found.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
