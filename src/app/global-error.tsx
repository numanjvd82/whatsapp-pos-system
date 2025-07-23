'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): React.JSX.Element {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error);
  }, [error]);

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>
      <Card className='w-full max-w-md text-center'>
        <CardHeader>
          <div className='flex justify-center mb-4'>
            <div className='bg-red-500 p-3 rounded-full'>
              <AlertTriangle className='h-8 w-8 text-white' />
            </div>
          </div>
          <CardTitle className='text-2xl font-bold text-gray-800'>
            Something went wrong
          </CardTitle>
          <p className='text-gray-600 mt-2'>
            An unexpected error occurred. Please try again.
          </p>
        </CardHeader>
        <CardContent className='space-y-4'>
          {process.env.NODE_ENV === 'development' && (
            <div className='text-left p-4 bg-red-50 rounded-lg border border-red-200'>
              <p className='text-sm font-mono text-red-800'>{error.message}</p>
              {error.digest && (
                <p className='text-xs text-red-600 mt-1'>
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}

          <div className='space-y-2'>
            <Button
              onClick={reset}
              className='w-full bg-green-500 hover:bg-green-600'
            >
              <RefreshCw className='h-4 w-4 mr-2' />
              Try Again
            </Button>
            <Button
              variant='outline'
              className='w-full'
              onClick={() => (window.location.href = '/')}
            >
              <Home className='h-4 w-4 mr-2' />
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
