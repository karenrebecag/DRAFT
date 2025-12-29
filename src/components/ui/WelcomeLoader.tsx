import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import styles from './WelcomeLoader.module.scss';

interface WelcomeLoaderProps {
   words?: string[];
   onComplete?: () => void;
   isContentReady?: boolean;
   minDisplayTime?: number;
}

const DEFAULT_WORDS = [
   'Hola',
   'Hello',
   'Bonjour',
   'Ciao',
   'Olá',
   'Hallå',
   'Guten tag',
];

export const WelcomeLoader = ({
   words = DEFAULT_WORDS,
   onComplete,
   isContentReady = false,
   minDisplayTime = 2500,
}: WelcomeLoaderProps) => {
   const containerRef = useRef<HTMLDivElement>(null);
   const wordsContainerRef = useRef<HTMLDivElement>(null);
   const [currentWord, setCurrentWord] = useState(words[0]);
   const [hasMinTimePassed, setHasMinTimePassed] = useState(false);
   const hasExitedRef = useRef(false);
   const onCompleteRef = useRef(onComplete);

   // Keep onComplete ref updated
   useEffect(() => {
      onCompleteRef.current = onComplete;
   }, [onComplete]);

   // Block scroll while loader is active (without affecting cursor)
   useEffect(() => {
      // Simple overflow hidden - doesn't interfere with cursor positioning
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';

      return () => {
         document.documentElement.style.overflow = '';
         document.body.style.overflow = '';
      };
   }, []);

   // Track minimum display time
   useEffect(() => {
      const timer = setTimeout(() => {
         setHasMinTimePassed(true);
      }, minDisplayTime);

      return () => clearTimeout(timer);
   }, [minDisplayTime]);

   // Trigger exit when Spline is ready AND min time passed
   useEffect(() => {
      if (hasMinTimePassed && isContentReady && !hasExitedRef.current) {
         hasExitedRef.current = true;
         playExitAnimation();
      }
   }, [hasMinTimePassed, isContentReady]);

   const playExitAnimation = useCallback(() => {
      if (!containerRef.current || !wordsContainerRef.current) {
         onCompleteRef.current?.();
         return;
      }

      const tl = gsap.timeline({
         onComplete: () => {
            onCompleteRef.current?.();
         },
      });

      // Fade out words
      tl.to(wordsContainerRef.current, {
         opacity: 0,
         yPercent: -75,
         duration: 0.8,
         ease: 'expo.in',
      });

      // Fade out container
      tl.to(
         containerRef.current,
         {
            autoAlpha: 0,
            duration: 0.6,
            ease: 'power1.inOut',
         },
         '-=0.2'
      );
   }, []);

   // Initialize GSAP animation for word cycling
   useEffect(() => {
      if (!wordsContainerRef.current) return;

      const tl = gsap.timeline();

      // Initial state
      gsap.set(wordsContainerRef.current, {
         yPercent: 50,
         opacity: 0,
      });

      // Animate in
      tl.to(wordsContainerRef.current, {
         opacity: 1,
         yPercent: 0,
         duration: 1,
         ease: 'expo.inOut',
      });

      // Cycle through words continuously
      let wordIndex = 0;
      const cycleWords = () => {
         wordIndex = (wordIndex + 1) % words.length;
         setCurrentWord(words[wordIndex]);
      };

      // Start cycling after initial animation
      tl.call(() => {
         const interval = setInterval(cycleWords, 200);
         // Store interval ID for cleanup
         (tl as unknown as { _intervalId: NodeJS.Timeout })._intervalId = interval;
      });

      return () => {
         tl.kill();
         const intervalId = (tl as unknown as { _intervalId?: NodeJS.Timeout })._intervalId;
         if (intervalId) clearInterval(intervalId);
      };
   }, [words]);

   return (
      <div ref={containerRef} className={styles.loadingContainer}>
         <div className={styles.loadingScreen}>
            <div ref={wordsContainerRef} className={styles.loadingWords}>
               <div className={styles.loadingWordsDot} />
               <p className={styles.loadingWordsWord}>
                  {currentWord}
               </p>
            </div>
         </div>
      </div>
   );
};

export default WelcomeLoader;
