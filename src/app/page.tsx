import Link from 'next/link';
import { MessageCircle, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
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
          <p className='text-gray-600 mt-2'>
            Manage your business with WhatsApp integration
          </p>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Link href='/login' className='block'>
            <Button className='w-full bg-green-500 hover:bg-green-600'>
              Sign In
            </Button>
          </Link>
          <Link href='/signup' className='block'>
            <Button variant='outline' className='w-full'>
              Create Account
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
