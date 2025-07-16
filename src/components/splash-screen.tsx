import { MessageCircle, ShoppingCart, Loader2 } from 'lucide-react';

export default function SplashScreen() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center'>
      <div className='text-center space-y-8'>
        <div className='flex justify-center items-center gap-4'>
          <div className='bg-green-500 p-4 rounded-2xl shadow-lg animate-pulse'>
            <MessageCircle className='h-12 w-12 text-white' />
          </div>
          <div className='bg-blue-500 p-4 rounded-2xl shadow-lg animate-pulse'>
            <ShoppingCart className='h-12 w-12 text-white' />
          </div>
        </div>

        <div className='space-y-2'>
          <h1 className='text-4xl font-bold text-gray-800'>WhatsApp POS</h1>
          <p className='text-gray-600 text-lg'>
            Manage your business with WhatsApp integration
          </p>
        </div>

        <div className='flex justify-center'>
          <Loader2 className='h-8 w-8 animate-spin text-green-500' />
        </div>

        <p className='text-sm text-gray-500'>Loading your dashboard...</p>
      </div>
    </div>
  );
}
