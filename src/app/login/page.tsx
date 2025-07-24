'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MessageCircle, ShoppingCart, Eye, EyeOff } from 'lucide-react';
import { z } from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { loginSchema } from '@/schemas/auth.schema';
import { api } from '@/utils/api';
import { useRouter } from 'next/navigation';

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage(): React.ReactElement {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { isPending, mutateAsync: loginUser } = api.auth.login.useMutation({
    onSuccess: (data) => {
      console.log('Sign up successful:', data);
      toast.success('Account created successfully!');
      reset();
      router.push('/dashboard');
    },
  });

  const onSubmit = async (data: LoginFormData): Promise<void> => {
    try {
      await loginUser(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Login error:', error);
        toast.error(error.message || 'An unexpected error occurred');
      }
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='text-center'>
          <div className='flex justify-center items-center gap-2 mb-4'>
            <div className='bg-green-500 p-2 rounded-lg'>
              <MessageCircle className='h-6 w-6 text-white' />
            </div>
            <div className='bg-blue-500 p-2 rounded-lg'>
              <ShoppingCart className='h-6 w-6 text-white' />
            </div>
          </div>
          <CardTitle className='text-2xl font-bold'>WhatsApp POS</CardTitle>
          <CardDescription>Sign in to your business dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='demo@business.com'
                {...register('email')}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className='text-sm text-red-500'>{errors.email.message}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <div className='relative'>
                <Input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter your password'
                  {...register('password')}
                  className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
                />
                <button
                  type='button'
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className='h-4 w-4' />
                  ) : (
                    <Eye className='h-4 w-4' />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className='text-sm text-red-500'>
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type='submit'
              className='w-full bg-green-500 hover:bg-green-600'
              disabled={isPending}
            >
              Sign In
            </Button>
          </form>

          <div className='mt-6 text-center text-sm text-gray-600'>
            Don&apos;t have an account?{' '}
            <Link href='/signup' className='text-blue-600 hover:underline'>
              Sign up for free
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
