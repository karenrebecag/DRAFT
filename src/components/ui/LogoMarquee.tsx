import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './LogoMarquee.module.scss';

gsap.registerPlugin(ScrollTrigger);

// Store last direction globally so it persists
let lastScrollDirection = 1;

// Company logos - monochrome SVGs
const logos = [
  { name: 'Vercel', svg: <svg viewBox="0 0 76 65" fill="currentColor"><path d="M37.5274 0L75.0548 65H0L37.5274 0Z" /></svg> },
  { name: 'Stripe', svg: <svg viewBox="0 0 60 25" fill="currentColor"><path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.02 1.04-.06 1.48zm-4.57-5.9c-1.35 0-2.26 1.04-2.5 2.88h5c-.08-1.84-.91-2.88-2.5-2.88z" /></svg> },
  { name: 'Figma', svg: <svg viewBox="0 0 38 57" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" /><path fillRule="evenodd" clipRule="evenodd" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" /><path fillRule="evenodd" clipRule="evenodd" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" /><path fillRule="evenodd" clipRule="evenodd" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" /><path fillRule="evenodd" clipRule="evenodd" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" /></svg> },
  { name: 'Linear', svg: <svg viewBox="0 0 100 100" fill="currentColor"><path d="M1.22541 61.5228c-.2225-.9485.90748-1.5459 1.59638-.857L39.3342 97.1782c.6889.6889.0915 1.8189-.857 1.5765C20.0515 94.4522 5.54779 79.9484 1.22541 61.5228ZM.00189135 46.8891c-.01764973.2833.08887215.5589.29482065.7648L52.3503 99.7056c.2059.2059.4815.3126.7648.2948 1.3569-.0842 2.6916-.2359 3.9995-.4517.4199-.0694.7958-.347.9969-.7342.201-.3872.2169-.8455.0415-1.2479L9.56614 3.04585c-.17544-.40241-.51618-.70866-.92966-.83665-1.3082-.40482-2.64639-.73977-4.01006-1.00063-.41529-.07935-.84547.01489-1.17918.2599-.33371.24501-.54053.61434-.56678 1.01234-.09231 1.4086-.12228 2.8314-.08751 4.26578.00981.40443-.1357.79838-.40616 1.09998L.31506 10.9669C.113521 11.1909-.00213 11.4865 0 11.793l.00189135 35.0961Z"/></svg> },
  { name: 'Notion', svg: <svg viewBox="0 0 100 100" fill="currentColor"><path d="M6.017 4.313l55.333-4.087c6.797-.583 8.543-.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277-1.553 6.807-6.99 7.193L24.467 99.967c-4.08.193-6.023-.39-8.16-3.113L3.3 79.94c-2.333-3.113-3.3-5.443-3.3-8.167V11.113c0-3.497 1.553-6.413 6.017-6.8z"/></svg> },
  { name: 'Spotify', svg: <svg viewBox="0 0 168 168" fill="currentColor"><path d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"/></svg> },
  { name: 'Slack', svg: <svg viewBox="0 0 127 127" fill="currentColor"><path d="M27.2 80a13.63 13.63 0 0 1-13.6 13.6 13.63 13.63 0 0 1-13.6-13.6 13.63 13.63 0 0 1 13.6-13.6h13.6zm6.8 0a13.63 13.63 0 0 1 13.6-13.6 13.63 13.63 0 0 1 13.6 13.6v34a13.63 13.63 0 0 1-13.6 13.6A13.63 13.63 0 0 1 34 114z"/><path d="M47.6 27.2a13.63 13.63 0 0 1-13.6-13.6A13.63 13.63 0 0 1 47.6 0a13.63 13.63 0 0 1 13.6 13.6v13.6zm0 6.8a13.63 13.63 0 0 1 13.6 13.6 13.63 13.63 0 0 1-13.6 13.6H13.6A13.63 13.63 0 0 1 0 47.6 13.63 13.63 0 0 1 13.6 34z"/><path d="M100 47.6a13.63 13.63 0 0 1 13.6-13.6 13.63 13.63 0 0 1 13.6 13.6 13.63 13.63 0 0 1-13.6 13.6H100zm-6.8 0a13.63 13.63 0 0 1-13.6 13.6 13.63 13.63 0 0 1-13.6-13.6V13.6A13.63 13.63 0 0 1 79.6 0a13.63 13.63 0 0 1 13.6 13.6z"/><path d="M79.6 100a13.63 13.63 0 0 1 13.6 13.6 13.63 13.63 0 0 1-13.6 13.6 13.63 13.63 0 0 1-13.6-13.6V100zm0-6.8a13.63 13.63 0 0 1-13.6-13.6 13.63 13.63 0 0 1 13.6-13.6h34a13.63 13.63 0 0 1 13.6 13.6 13.63 13.63 0 0 1-13.6 13.6z"/></svg> },
  { name: 'Framer', svg: <svg viewBox="0 0 14 21" fill="currentColor"><path d="M0 0h14v7H7zm0 7h7l7 7H7v7l-7-7z" /></svg> },
  { name: 'Shopify', svg: <svg viewBox="0 0 109 124" fill="currentColor"><path d="M74.7 14.8s-1.4.4-3.7 1.1c-.4-1.3-1-2.8-1.8-4.4-2.6-5-6.5-7.7-11.1-7.7-.3 0-.6 0-1 .1-.1-.2-.3-.3-.4-.5-2-2.2-4.6-3.2-7.7-3.1-6 .2-12 4.5-16.8 12.2-3.4 5.4-6 12.2-6.7 17.5-6.9 2.1-11.7 3.6-11.8 3.7-3.5 1.1-3.6 1.2-4 4.5-.3 2.5-9.5 73.4-9.5 73.4l75.6 13.1V14.6c-.4 0-.8.1-1.1.2z"/></svg> },
  { name: 'GitHub', svg: <svg viewBox="0 0 98 96" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/></svg> },
];

interface LogoMarqueeProps {
  className?: string;
  speed?: number;
  scrollSpeed?: number;
  direction?: 'left' | 'right';
}

const LogoMarquee = ({
  className = '',
  speed = 30,
  scrollSpeed = 5,
  direction = 'left',
}: LogoMarqueeProps) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const collectionsRef = useRef<HTMLDivElement[]>([]);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  // Update animation direction based on last scroll
  const updateDirection = useCallback((scrollDir: number) => {
    if (!animationRef.current) return;
    const directionMultiplier = direction === 'right' ? 1 : -1;
    // When scrolling down (1), go left (-1); when scrolling up (-1), go right (1)
    const currentDirection = scrollDir === 1 ? -directionMultiplier : directionMultiplier;
    animationRef.current.timeScale(currentDirection);
    lastScrollDirection = scrollDir;
  }, [direction]);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const scrollContainer = scrollRef.current;
    if (!marquee || !scrollContainer) return;

    const directionMultiplier = direction === 'right' ? 1 : -1;
    const speedMultiplier = window.innerWidth < 479 ? 0.25 : window.innerWidth < 991 ? 0.5 : 1;
    const marqueeSpeed = speed * speedMultiplier;

    // Set scroll container styles - reduced effect
    scrollContainer.style.marginLeft = `${scrollSpeed * -1}%`;
    scrollContainer.style.width = `${(scrollSpeed * 2) + 100}%`;

    // Get all collection items
    const collections = collectionsRef.current.filter(Boolean);
    if (collections.length === 0) return;

    // GSAP animation for marquee content
    const animation = gsap.to(collections, {
      xPercent: -100,
      repeat: -1,
      duration: marqueeSpeed,
      ease: 'linear',
    }).totalProgress(0.5);

    animationRef.current = animation;

    // Initialize in correct direction based on last scroll direction
    gsap.set(collections, { xPercent: directionMultiplier === 1 ? 100 : -100 });
    // Use last scroll direction to set initial animation direction
    const initialDirection = lastScrollDirection === 1 ? -directionMultiplier : directionMultiplier;
    animation.timeScale(initialDirection);
    animation.play();

    // Set initial status
    marquee.setAttribute('data-marquee-status', lastScrollDirection === 1 ? 'normal' : 'inverted');

    // ScrollTrigger for direction change - persists last direction
    const scrollTrigger = ScrollTrigger.create({
      trigger: marquee,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        // Only update when actually scrolling (velocity check)
        if (Math.abs(self.getVelocity()) > 10) {
          const scrollDir = self.direction;
          const isInverted = scrollDir === 1;
          const currentDirection = isInverted ? -directionMultiplier : directionMultiplier;
          animation.timeScale(currentDirection);
          marquee.setAttribute('data-marquee-status', isInverted ? 'normal' : 'inverted');
          lastScrollDirection = scrollDir;
        }
      },
    });

    // Extra speed effect on scroll - reduced values
    const scrollStart = directionMultiplier === -1 ? scrollSpeed : -scrollSpeed;
    const scrollEnd = -scrollStart;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: marquee,
        start: '0% 100%',
        end: '100% 0%',
        scrub: 0.5, // Smoother scrub
      },
    });

    tl.fromTo(scrollContainer, { x: `${scrollStart}vw` }, { x: `${scrollEnd}vw`, ease: 'none' });

    return () => {
      animation.kill();
      scrollTrigger.kill();
      tl.kill();
      animationRef.current = null;
    };
  }, [speed, scrollSpeed, direction, updateDirection]);

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) collectionsRef.current[index] = el;
  };

  return (
    <section className={`${styles.logoMarqueeSection} ${className}`}>
      <div
        ref={marqueeRef}
        className={styles.marquee}
        data-marquee-direction={direction}
        data-marquee-status="normal"
      >
        <div ref={scrollRef} className={styles.marqueeScroll}>
          {/* Original */}
          <div ref={(el) => addToRefs(el, 0)} className={styles.marqueeCollection}>
            {logos.map((logo, i) => (
              <div key={`logo-${i}`} className={styles.logoItem} title={logo.name}>
                {logo.svg}
              </div>
            ))}
          </div>
          {/* Duplicate 1 */}
          <div ref={(el) => addToRefs(el, 1)} className={styles.marqueeCollection}>
            {logos.map((logo, i) => (
              <div key={`logo-dup1-${i}`} className={styles.logoItem} title={logo.name}>
                {logo.svg}
              </div>
            ))}
          </div>
          {/* Duplicate 2 */}
          <div ref={(el) => addToRefs(el, 2)} className={styles.marqueeCollection}>
            {logos.map((logo, i) => (
              <div key={`logo-dup2-${i}`} className={styles.logoItem} title={logo.name}>
                {logo.svg}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
