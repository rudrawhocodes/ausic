"use client";

import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PageTransitionContext } from '@/context/page-transition-context';

const navLinks = [
  { name: 'About', href: '/about' },
  { name: 'Domains', href: '/domains' },
  { name: 'Events', href: '/events' },
  { name: 'Team', href: '/team' },
  { name: 'Blog', href: '/blog' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
];

const NavLink = ({ href, children, onClick }: { href: string, children: React.ReactNode, onClick: () => void }) => {
  const router = useRouter();
  const { showTransition } = useContext(PageTransitionContext);
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (href !== pathname) {
      // show loader immediately and navigate
      showTransition(2000);
      router.push(href);
    }
    onClick();
  };

  const isActive = pathname === href;

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        "font-medium rounded-md px-3 py-2 transition-colors duration-300 pointer-events-auto z-50",
        isActive ? "text-primary" : "text-foreground/80 hover:text-primary"
      )}
    >
      {children}
    </a>
  );
};


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { startTransition } = useContext(PageTransitionContext);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };
  
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if ('/' !== pathname) {
          e.preventDefault();
          startTransition('/');
      }
  }
  
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-border/20" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Use flex for mobile and a 3-column grid for md+ so nav sits centered */}
        <div className="h-20 flex items-center justify-between md:grid md:grid-cols-3 md:items-center">
          {/* left: logo */}
          <div className="flex items-center">
            <Link href="/" onClick={handleLogoClick} className="text-3xl font-bold text-primary">
              A.U.S.I.C
            </Link>
          </div>

          {/* center: nav (hidden on mobile, centered on md+) */}
          <div className="hidden md:flex md:justify-center">
            <nav className="flex items-center space-x-2">
              {navLinks.map((link) => (
                <NavLink key={link.name} href={link.href} onClick={handleLinkClick}>
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* right: Contact CTA (styled) and mobile menu toggle */}
          <div className="flex items-center justify-end space-x-3">
            <div className="hidden md:block">
              {/* style the Contact link as a CTA button */}
              <NavLink href="/contact" onClick={handleLinkClick}>
                <span className="inline-flex items-center bg-primary text-background px-4 py-2 rounded-md font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all">
                  Join Us
                  <span className="ml-2 transform transition-transform duration-300">&rarr;</span>
                </span>
              </NavLink>
            </div>
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-background/90 backdrop-blur-lg border-t border-border/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                 <NavLink key={link.name} href={link.href} onClick={handleLinkClick}>
                    {link.name}
                 </NavLink>
              ))}
              {/* Join Us removed from mobile menu - use Contact nav item instead */}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
