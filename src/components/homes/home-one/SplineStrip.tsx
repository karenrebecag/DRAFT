import { useEffect, useRef, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { useI18n } from '../../../i18n';
import { MorphingTextReveal } from '../../ui/MorphingTextReveal';
import { AIPromptBox } from '../../ui/AIPromptBox';
import styles from './SplineStrip.module.scss';

interface SplineStripProps {
   onLoaded?: () => void;
   isLoading?: boolean;
}

const SplineStrip = ({ onLoaded, isLoading = false }: SplineStripProps) => {
   const { t } = useI18n();
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

   const { ref: heroRef } = useInView({
      threshold: 0.3,
      triggerOnce: false,
   });

   const handleAISend = (message: string, files?: File[]) => {
      console.log('AI Message:', message);
      console.log('AI Files:', files);
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
            <div className={styles.overlay} />

            {/* Hero Content - Only visible after loading */}
            <div
               className={styles.content}
               style={{
                  opacity: isLoading ? 0 : 1,
                  transition: 'opacity 0.5s ease-out',
                  pointerEvents: isLoading ? 'none' : 'auto',
               }}
            >
               <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
                  <div ref={heroRef} className={styles.heroInner}>
                     {/* Subtitle Badge */}
                     <span className={styles.badge}>
                        {t.hero.feature2}
                     </span>

                     {/* Main Title - Artistic Font Combo */}
                     <h1 className={styles.title}>
                        <span className={styles.titleSans}>{t.hero.titleLine1Highlight}</span>
                        <span className={styles.titleSerif}>{t.hero.titleLine2}</span>
                        <span className={styles.rotatingLine}>
                           <span className={styles.prefix}>{t.hero.titleLine3Prefix}</span>
                           <MorphingTextReveal
                              texts={[...t.hero.rotatingWords]}
                              interval={3000}
                              glitchOnHover={true}
                              className={styles.rotatingWord}
                           />
                        </span>
                     </h1>

                     {/* AI Prompt Box - Hidden during loading */}
                     {!isLoading && (
                        <AIPromptBox
                           onSend={handleAISend}
                           placeholder="Pregúntale a nuestra IA..."
                           className={styles.aiPromptBox}
                        />
                     )}

                     {/* CTA Buttons */}
                     <div className={styles.ctaGroup}>
                        <Link to="/contact" className={styles.ctaPrimary}>
                           {t.header.letsTalk}
                        </Link>
                        <a href="#about" className={styles.ctaSecondary}>
                           <span>{t.about.cta}</span>
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                           >
                              <path d="m6 9 6 6 6-6" />
                           </svg>
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default SplineStrip;
