import Link from 'next/link';
import { AlertCircle, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

export default function NotFound(): React.ReactElement {
  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>
      <Card className='w-full max-w-md text-center'>
        <CardHeader>
          <div className='flex justify-center mb-4'>
            <div className='bg-red-500 p-3 rounded-full'>
              <AlertCircle className='h-8 w-8 text-white' />
            </div>
          </div>
          <CardTitle className='text-2xl font-bold text-gray-800'>
            Page Not Found
          </CardTitle>
          <p className='text-gray-600 mt-2'>
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='text-6xl font-bold text-gray-300'>404</div>
          <div className='space-y-2'>
            <Link href='/' className='block'>
              <Button className='w-full bg-green-500 hover:bg-green-600'>
                <Home className='h-4 w-4 mr-2' />
                Go Home
              </Button>
            </Link>
            <Button
              variant='outline'
              className='w-full'
              onClick={() => window.history.back()}
            >
              <ArrowLeft className='h-4 w-4 mr-2' />
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
