'use client';

import { useRouter } from 'next/navigation';
import React, { useState, createContext, useEffect } from 'react';

type PageTransitionContextType = {
  isTransitioning: boolean;
  startTransition: (href: string) => void;
  showTransition: (duration?: number) => void;
};

export const PageTransitionContext = createContext<PageTransitionContextType>({
  isTransitioning: false,
  startTransition: () => {},
  showTransition: () => {},
});

export const PageTransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetPath, setTargetPath] = useState<string | null>(null);
  const router = useRouter();
  const timers = React.useRef<{ pushTimer?: NodeJS.Timeout; hideTimer?: NodeJS.Timeout }>({});

  const startTransition = (href: string) => {
    // Show loader and then push after a short animation window
    setIsTransitioning(true);
    setTargetPath(href);
  };

  const showTransition = (duration = 2200) => {
    // Immediately show loader for a set duration; useful when we push immediately
    setIsTransitioning(true);
    if (timers.current.hideTimer) clearTimeout(timers.current.hideTimer);
    timers.current.hideTimer = setTimeout(() => {
      setIsTransitioning(false);
      timers.current.hideTimer = undefined;
    }, duration);
  };
  
  useEffect(() => {
      if (targetPath !== null && isTransitioning) {
        // If startTransition was used, delay the push so loader animation can play
        if (timers.current.pushTimer) clearTimeout(timers.current.pushTimer);
        timers.current.pushTimer = setTimeout(() => {
            router.push(targetPath as string);
            setTargetPath(null);
            // Keep the loader for a short moment after push to allow page to render
            if (timers.current.hideTimer) clearTimeout(timers.current.hideTimer);
            timers.current.hideTimer = setTimeout(() => setIsTransitioning(false), 200);
            timers.current.pushTimer = undefined;
        }, 2200); // Duration should be slightly more than the loader animation

        return () => {
          if (timers.current.pushTimer) clearTimeout(timers.current.pushTimer);
        };
      }
  }, [targetPath, isTransitioning, router])

  return (
    <PageTransitionContext.Provider value={{ isTransitioning, startTransition, showTransition }}>
      {children}
    </PageTransitionContext.Provider>
  );
};
