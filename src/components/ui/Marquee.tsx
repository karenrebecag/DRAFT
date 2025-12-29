'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Marquee.module.scss';

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  children,
  speed = 40,
  direction = 'left',
  pauseOnHover = true,
  className = '',
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Get track width for seamless loop
    const trackWidth = track.scrollWidth / 2;

    // Create infinite scroll animation
    animationRef.current = gsap.to(track, {
      x: direction === 'left' ? -trackWidth : trackWidth,
      duration: trackWidth / speed,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => {
          const parsed = parseFloat(x);
          if (direction === 'left') {
            return parsed % trackWidth;
          } else {
            return (parsed % trackWidth) - trackWidth;
          }
        }),
      },
    });

    return () => {
      animationRef.current?.kill();
    };
  }, [speed, direction]);

  const handleMouseEnter = () => {
    if (!pauseOnHover || !animationRef.current) return;
    gsap.to(animationRef.current, {
      timeScale: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!pauseOnHover || !animationRef.current) return;
    gsap.to(animationRef.current, {
      timeScale: 1,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  return (
    <div
      className={`${styles.marquee} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={trackRef} className={styles.track}>
        {children}
        {children}
      </div>
    </div>
  );
};

export default Marquee;
