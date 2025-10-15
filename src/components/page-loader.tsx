'use client';

import { useState, useEffect, useContext } from 'react';
import { PageTransitionContext } from '@/context/page-transition-context';

export default function PageLoader() {
  const { isTransitioning } = useContext(PageTransitionContext);
  const [progress, setProgress] = useState(0);
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTransitioning) {
      setProgress(0);
      setShowTagline(false);

      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 20); // Controls the speed of the loader

      const taglineTimer = setTimeout(() => {
        setShowTagline(true);
      }, 1000); // Time before showing tagline

      return () => {
        clearInterval(interval);
        clearTimeout(taglineTimer);
      };
    }
  }, [isTransitioning]);
  
  if (!isTransitioning) return null;

  return (
    <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center">
      <div className="text-center">
        <div className="typewriter">A.U.S.I.C</div>
      </div>
      <div className="loader-percent">{progress}%</div>
    </div>
  );
}
