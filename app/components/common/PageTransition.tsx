import React, { useEffect, useState } from 'react';
import { useLocation } from '@remix-run/react';
import { cn } from '~/lib/utils';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className,
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedChildren, setDisplayedChildren] = useState(children);
  const location = useLocation();

  useEffect(() => {
    // Start exit animation
    setIsTransitioning(true);

    const timeout = setTimeout(() => {
      // Update children
      setDisplayedChildren(children);
      // Start enter animation
      setIsTransitioning(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [location.pathname, children]);

  return (
    <div
      className={cn(
        'w-full transition-opacity duration-300 ease-in-out',
        isTransitioning ? 'opacity-0' : 'opacity-100',
        className
      )}
    >
      {displayedChildren}
    </div>
  );
};

export default PageTransition;
