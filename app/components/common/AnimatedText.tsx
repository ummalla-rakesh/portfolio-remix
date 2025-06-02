import React, { useEffect, useRef, useState } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  element?: keyof JSX.IntrinsicElements;
  delay?: number;
  duration?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className,
  element = 'span',
  delay = 0,
  duration = 0.05,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return; // Ensure this runs only on the client

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const characters = text.split('');

  // Create the element dynamically
  const Component = element as React.ElementType;

  return (
    <Component
      ref={textRef}
      className={'inline-block' + (className ? ` ${className}` : '')}
      aria-label={text}
    >
      {characters.map((char, index) => (
        <span
          key={`char-${index}`}
          className={`inline-block transition-transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
          style={{
            transitionDelay: `${delay + index * duration}s`,
            transitionDuration: '0.5s',
            transitionProperty: 'transform, opacity',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </Component>
  );
};

export default AnimatedText;
