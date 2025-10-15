import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
// ThreeDBackground is mounted inside the hero section only
import { PageTransitionProvider } from '@/context/page-transition-context';
import PageLoader from '@/components/page-loader';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'A.U.S.I.C | Adani University',
  description: "Adani University's Official Startup and Innovation Council",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          'min-h-screen bg-black font-sans antialiased',
          inter.variable
        )}
      >
        <PageTransitionProvider>
          <Header />
          <main className="bg-transparent relative z-10">{children}</main>
          <Footer />
          <Toaster />
          <PageLoader />
        </PageTransitionProvider>
      </body>
    </html>
  );
}
