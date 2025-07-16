'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  MessageCircle,
  ShoppingCart,
  Loader2,
  Eye,
  EyeOff,
} from 'lucide-react';
import { z } from 'zod';

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
import { api } from '@/utils/api';
import { signUpSchema } from '@/schemas/auth.schema';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const { isPending, mutateAsync: createUser } = api.auth.signUp.useMutation({
    onSuccess: (data) => {
      console.log('Sign up successful:', data);
      toast.success('Account created successfully!');
      reset();
      router.push('/login');
    },
    onError: (error) => {
      console.error('Sign up error:', error.message);
      toast.error(error.message || 'Failed to create account');
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await createUser(data);
    } catch (error) {
      // Error handling is done in the onError callback
      console.error('Submit error:', error);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
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
          <CardDescription>Create your business account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                type='text'
                placeholder='Enter your full name'
                {...register('name')}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className='text-sm text-red-500'>{errors.name.message}</p>
              )}
            </div>

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
              <Label htmlFor='businessName'>Business Name</Label>
              <Input
                id='businessName'
                type='text'
                placeholder='Enter your business name'
                {...register('businessName')}
                className={errors.businessName ? 'border-red-500' : ''}
              />
              {errors.businessName && (
                <p className='text-sm text-red-500'>
                  {errors.businessName.message}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='phone'>Phone Number</Label>
              <Input
                id='phone'
                type='tel'
                placeholder='03001234567'
                {...register('phone')}
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && (
                <p className='text-sm text-red-500'>{errors.phone.message}</p>
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

            <div className='space-y-2'>
              <Label htmlFor='confirmPassword'>Confirm Password</Label>
              <div className='relative'>
                <Input
                  id='confirmPassword'
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder='Confirm your password'
                  {...register('confirmPassword')}
                  className={
                    errors.confirmPassword ? 'border-red-500 pr-10' : 'pr-10'
                  }
                />
                <button
                  type='button'
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className='h-4 w-4' />
                  ) : (
                    <Eye className='h-4 w-4' />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className='text-sm text-red-500'>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {errors.root && (
              <p className='text-sm text-red-500'>{errors.root.message}</p>
            )}

            <Button
              type='submit'
              className='w-full bg-green-500 hover:bg-green-600'
              disabled={isPending}
            >
              {isPending ? (
                <div className='flex items-center gap-2'>
                  <Loader2 className='h-4 w-4 animate-spin' />
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          <div className='mt-6 text-center text-sm text-gray-600'>
            Already have an account?{' '}
            <Link href='/login' className='text-blue-600 hover:underline'>
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
