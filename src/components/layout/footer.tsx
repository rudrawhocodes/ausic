import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const socialLinks = [
  { icon: Github, href: '#' },
  { icon: Linkedin, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: Instagram, href: '#' },
];

export default function Footer() {
  return (
    <footer id="footer" className="bg-background/50 border-t border-border/20 backdrop-blur-sm relative z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
             <Link href="/" className="text-3xl font-bold text-primary">
              A.U.S.I.C
            </Link>
            <p className="text-muted-foreground mt-2">Adani University Startup and Innovation Council</p>
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <Button key={index} variant="ghost" size="icon" asChild>
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  <social.icon className="h-5 w-5 hover:text-primary transition-colors" />
                  <span className="sr-only">Social Media</span>
                </a>
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/20 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} A.U.S.I.C. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
