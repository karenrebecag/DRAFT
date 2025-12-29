import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const ScrollProgressBar = () => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressBarWrapRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const lastScrollY = useRef(0);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const progressBar = progressBarRef.current;
    const progressBarWrap = progressBarWrapRef.current;

    if (!progressBar || !progressBarWrap) return;

    // Animate the progress bar as you scroll
    const tween = gsap.to(progressBar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
      },
    });

    scrollTriggerRef.current = ScrollTrigger.getAll().find(
      (st) => st.animation === tween
    ) || null;

    // Detect scroll direction
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Only show when scrolling down and past 50px
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Click listener to scroll to a specific position
    const handleClick = (event: MouseEvent) => {
      const clickX = event.clientX;
      const progress = clickX / progressBarWrap.offsetWidth;
      const scrollPosition = progress * (document.body.scrollHeight - window.innerHeight);

      gsap.to(window, {
        scrollTo: scrollPosition,
        duration: 0.725,
        ease: 'power3.out',
      });
    };

    progressBarWrap.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      progressBarWrap.removeEventListener('click', handleClick);
      scrollTriggerRef.current?.kill();
    };
  }, []);

  return (
    <div
      ref={progressBarWrapRef}
      className="progress-bar-wrap"
      style={{
        zIndex: 9999,
        cursor: 'pointer',
        width: '100%',
        height: '4px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      <div
        ref={progressBarRef}
        className="progress-bar"
        style={{
          transformOrigin: '0%',
          transformStyle: 'preserve-3d',
          background: 'var(--color-primary, #beff01)',
          width: '100%',
          height: '100%',
          transform: 'scale3d(0, 1, 1)',
          boxShadow: '0 0 10px rgba(190, 255, 1, 0.5)',
        }}
      />
    </div>
  );
};

export default ScrollProgressBar;
