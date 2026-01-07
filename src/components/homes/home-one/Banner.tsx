import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import ButtonPrimary from '../../ui/ButtonPrimary';
import ButtonSecondary from '../../ui/ButtonSecondary';
import SectionHeading from '../../ui/SectionHeading';
import styles from './Banner.module.scss';

interface BannerProps {
   onLoaded?: () => void;
   isLoading?: boolean;
}

const Banner = ({ onLoaded, isLoading = false }: BannerProps) => {
   const canvasRef = useRef<HTMLCanvasElement>(null);
   const appRef = useRef<import('@splinetool/runtime').Application | null>(null);
   const [isLoaded, setIsLoaded] = useState(false);
   const [hasStartedLoading, setHasStartedLoading] = useState(false);
   const [showPlaceholder, setShowPlaceholder] = useState(true);
   const onLoadedRef = useRef(onLoaded);

   // Keep onLoaded ref updated
   useEffect(() => {
      onLoadedRef.current = onLoaded;
   }, [onLoaded]);

   const scrollToNextSection = () => {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
   };

   // Load Spline immediately on mount
   const loadSpline = useCallback(async () => {
      if (!canvasRef.current || hasStartedLoading) return;
      setHasStartedLoading(true);

      try {
         const { Application } = await import('@splinetool/runtime');

         if (!canvasRef.current) {
            onLoadedRef.current?.();
            return;
         }

         const app = new Application(canvasRef.current);
         appRef.current = app;

         await app.load('/assets/models/Banner.splinecode');

         setShowPlaceholder(false);
         setTimeout(() => {
            setIsLoaded(true);
            onLoadedRef.current?.();
         }, 100);
      } catch (error) {
         console.error('Failed to load Spline scene:', error);
         setShowPlaceholder(false);
         // Call onLoaded even on error so loader doesn't get stuck
         onLoadedRef.current?.();
      }
   }, [hasStartedLoading]);

   // Start loading immediately on mount
   useEffect(() => {
      const timer = setTimeout(() => {
         loadSpline();
      }, 300); // Small delay to let React render

      return () => clearTimeout(timer);
   }, [loadSpline]);

   // Pause Spline only when page is hidden (tab in background)
   // We avoid pausing on scroll as app.stop()/play() causes issues
   useEffect(() => {
      const app = appRef.current;
      if (!app || !isLoaded) return;

      const handleVisibilityChange = () => {
         if (document.hidden) {
            app.stop?.();
         } else {
            // When page becomes visible again, reload the scene to ensure it works
            app.play?.();
            // Force a resize to reinitialize the render loop
            if (canvasRef.current) {
               const rect = canvasRef.current.getBoundingClientRect();
               app.setSize?.(rect.width, rect.height);
            }
         }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);
      return () => {
         document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
   }, [isLoaded]);

   // Cleanup on unmount
   useEffect(() => {
      return () => {
         if (appRef.current) {
            appRef.current.dispose();
            appRef.current = null;
         }
      };
   }, []);

   return (
      <div className={`td-hero-area p-relative fix z-index-1 ${styles.splineStrip}`}>
         <div className={styles.container}>
            {/* Static placeholder while Spline loads */}
            {showPlaceholder && (
               <div
                  className={styles.placeholder}
                  style={{
                     position: 'absolute',
                     inset: 0,
                     background: 'radial-gradient(ellipse at center, rgba(163, 230, 53, 0.08) 0%, transparent 70%)',
                     opacity: isLoaded ? 0 : 1,
                     transition: 'opacity 0.8s ease-out',
                     pointerEvents: 'none',
                  }}
               />
            )}

            <canvas
               ref={canvasRef}
               className={styles.canvas}
               style={{
                  opacity: isLoaded ? 1 : 0,
                  transition: 'opacity 0.8s ease-in-out',
               }}
            />

            {/* Hero Content - Only visible after loading */}
            <div
               className={styles.content}
               style={{
                  opacity: isLoading ? 0 : 1,
                  transition: 'opacity 0.5s ease-out',
                  pointerEvents: isLoading ? 'none' : 'auto',
               }}
            >
               <div className={styles.heroInner}>
                  {/* Main Title + Description */}
                  <SectionHeading
                     as="h1"
                     titleLine1="Where High Design Meets"
                     titleLine1Style="arapey"
                     titleLine2="High Performance"
                     titleLine2Style="poppins"
                     description="A premier development studio specializing in high-end UI/UX, motion graphics, and modern tech stacks for global innovators."
                     descriptionMaxWidth="800px"
                     descriptionColor="#999999"
                  />

                  {/* CTA Buttons */}
                  <div className={styles.ctaGroup}>
                     <ButtonPrimary to="/contact">
                        Start a Project
                     </ButtonPrimary>
                     <ButtonSecondary to="/portfolio">
                        Explore Work
                     </ButtonSecondary>
                  </div>

                  {/* Scroll Down Button */}
                  <button
                     onClick={scrollToNextSection}
                     className={styles.scrollDown}
                     aria-label="Scroll down"
                  >
                     <ChevronDown className="w-6 h-6 text-white" />
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Banner;
