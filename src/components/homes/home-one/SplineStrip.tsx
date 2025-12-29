import { useEffect, useRef, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { useI18n } from '../../../i18n';
import { MorphingTextReveal } from '../../ui/MorphingTextReveal';
import { AIPromptBox } from '../../ui/AIPromptBox';
import styles from './SplineStrip.module.scss';

const SplineStrip = () => {
   const { t } = useI18n();
   const canvasRef = useRef<HTMLCanvasElement>(null);
   const appRef = useRef<import('@splinetool/runtime').Application | null>(null);
   const [isLoaded, setIsLoaded] = useState(false);
   const [hasStartedLoading, setHasStartedLoading] = useState(false);

   // Observe visibility for lazy loading and pause/resume
   const { ref: containerRef, inView } = useInView({
      threshold: 0.1,
      triggerOnce: false,
   });

   const { ref: heroRef } = useInView({
      threshold: 0.3,
      triggerOnce: false,
   });

   const handleAISend = (message: string, files?: File[]) => {
      // TODO: Connect to AI service
      console.log('AI Message:', message);
      console.log('AI Files:', files);
   };

   // Lazy load Spline only when visible
   const loadSpline = useCallback(async () => {
      if (!canvasRef.current || hasStartedLoading) return;
      setHasStartedLoading(true);

      try {
         const { Application } = await import('@splinetool/runtime');
         const app = new Application(canvasRef.current);
         appRef.current = app;

         await app.load('/assets/models/Banner.splinecode');
         setIsLoaded(true);
      } catch (error) {
         console.error('Failed to load Spline scene:', error);
      }
   }, [hasStartedLoading]);

   // Load when first visible
   useEffect(() => {
      if (inView && !hasStartedLoading) {
         loadSpline();
      }
   }, [inView, loadSpline, hasStartedLoading]);

   // Cleanup on unmount
   useEffect(() => {
      return () => {
         if (appRef.current) {
            appRef.current.dispose();
         }
      };
   }, []);

   return (
      <div ref={containerRef} className={`td-hero-area p-relative fix z-index-1 ${styles.splineStrip}`}>
         <div className={styles.container}>
            <canvas
               ref={canvasRef}
               className={styles.canvas}
               style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
            />
            <div className={styles.overlay} />

            {/* Hero Content - Artistic Typography Layout */}
            <div className={styles.content}>
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


                     
                     {/* AI Prompt Box */}
                     <AIPromptBox
                        onSend={handleAISend}
                        placeholder="Pregúntale a nuestra IA..."
                        className={styles.aiPromptBox}
                     />


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
