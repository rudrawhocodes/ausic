import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const ThreeDBackground = dynamic(() => import('@/components/3d-background'), { ssr: false });

export default function HeroSection() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <ThreeDBackground />
      <div className="relative z-20 flex flex-col items-center p-4">
        <div className="animate-text-reveal [animation-fill-mode:backwards]">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-primary animate-glow animate-float tracking-wider">
            A.U.S.I.C
          </h1>
          <p className="mt-4 text-xl md:text-3xl font-medium text-foreground/80 max-w-3xl">
            Adani University Startup and Innovation Council
          </p>
          <p className="mt-6 text-md md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Fostering a community of innovators, entrepreneurs, and business leaders.
          </p>
        </div>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild className="btn-animated">
            <Link href="/domains">Explore More</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="btn-animated">
            <Link href="/contact">Join Us</Link>
          </Button>
        </div>
      </div>
      <Link href="/about" className="absolute bottom-10 z-10 animate-bounce" aria-label="Scroll down">
        <ArrowDown className="w-8 h-8 text-primary" />
      </Link>
    </section>
  );
}
