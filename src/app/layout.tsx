import React from 'react';
import type { Metadata } from 'next';
import { Open_Sans, Roboto } from 'next/font/google';
import './globals.css';
import { TRPCProvider } from '@/components/providers/trpc-provider';
import { Toaster } from '@/components/ui/sonner';
import AuthProvider from '@/components/providers/AuthProvider';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
});

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'WhatsApp POS System',
  description: 'A modern POS system built with tRPC, TypeScript, and Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang='en'>
      <body className={`${roboto.variable} ${openSans.variable} antialiased`}>
        <TRPCProvider>
          <AuthProvider>{children}</AuthProvider>
        </TRPCProvider>
        <Toaster />
      </body>
    </html>
  );
}
