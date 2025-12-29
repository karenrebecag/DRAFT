'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WireframeMarqueeProps {
  words: readonly string[];
  speed?: number;
  className?: string;
}

export const WireframeMarquee: React.FC<WireframeMarqueeProps> = ({
  words,
  speed = 50,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  // Duplicate words for seamless loop
  const duplicatedWords = [...words, ...words, ...words];

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // Get track width for seamless loop
    const trackWidth = track.scrollWidth / 3;

    // Create infinite scroll animation
    animationRef.current = gsap.to(track, {
      x: -trackWidth,
      duration: trackWidth / speed,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % trackWidth),
      },
    });

    // Parallax effect - inverse scroll speed
    gsap.to(container, {
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      },
      y: -100,
      ease: 'none',
    });

    return () => {
      animationRef.current?.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill();
      });
    };
  }, [speed]);

  // Slow down on hover
  useEffect(() => {
    if (!animationRef.current) return;
    gsap.to(animationRef.current, {
      timeScale: isHovered ? 0.3 : 1,
      duration: 0.5,
      ease: 'power2.out',
    });
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      className={`wireframe-marquee-container ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        cursor: 'default',
      }}
    >
      <div
        ref={trackRef}
        className="wireframe-marquee-track"
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          willChange: 'transform',
        }}
      >
        {duplicatedWords.map((word, i) => (
          <WireframeText
            key={i}
            text={word}
            isHovered={isHovered}
            index={i}
          />
        ))}
      </div>

      <style>{`
        .wireframe-marquee-container {
          padding: 20px 0;
        }

        .wireframe-text {
          font-family: var(--td-ff-inter-tight, 'Inter Tight'), sans-serif;
          font-weight: 900;
          font-size: clamp(150px, 25vw, 400px);
          color: var(--td-theme-primary, #a3e635);
          margin-right: 60px;
          display: inline-block;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          line-height: 1;
        }

        .wireframe-text-solid {
          -webkit-text-stroke: 0px transparent;
        }

        .wireframe-text-wireframe {
          color: transparent;
          -webkit-text-stroke: 2px var(--td-theme-primary, #a3e635);
          text-shadow:
            0 0 20px rgba(163, 230, 53, 0.3),
            0 0 40px rgba(163, 230, 53, 0.1);
        }

        /* Grid overlay effect for wireframe mode */
        .wireframe-text-wireframe::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 8px,
              rgba(163, 230, 53, 0.03) 8px,
              rgba(163, 230, 53, 0.03) 9px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 8px,
              rgba(163, 230, 53, 0.03) 8px,
              rgba(163, 230, 53, 0.03) 9px
            );
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .wireframe-marquee-container:hover .wireframe-text-wireframe::before {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .wireframe-text {
            font-size: clamp(100px, 20vw, 200px);
            margin-right: 30px;
          }
          .wireframe-text-wireframe {
            -webkit-text-stroke: 1.5px var(--td-theme-primary, #a3e635);
          }
        }
      `}</style>
    </div>
  );
};

// Individual text component with staggered wireframe effect
const WireframeText: React.FC<{
  text: string;
  isHovered: boolean;
  index: number;
}> = ({ text, isHovered, index }) => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Staggered transition based on index
    const delay = (index % 6) * 0.05;

    if (isHovered) {
      gsap.to(textRef.current, {
        delay,
        duration: 0.4,
        ease: 'power2.out',
        onStart: () => {
          textRef.current?.classList.add('wireframe-text-wireframe');
          textRef.current?.classList.remove('wireframe-text-solid');
        },
      });
    } else {
      gsap.to(textRef.current, {
        delay,
        duration: 0.4,
        ease: 'power2.out',
        onStart: () => {
          textRef.current?.classList.remove('wireframe-text-wireframe');
          textRef.current?.classList.add('wireframe-text-solid');
        },
      });
    }
  }, [isHovered, index]);

  return (
    <span
      ref={textRef}
      className="wireframe-text wireframe-text-solid"
    >
      {text}
    </span>
  );
};

export default WireframeMarquee;
