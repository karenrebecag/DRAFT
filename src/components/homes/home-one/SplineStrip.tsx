import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Application } from '@splinetool/runtime';
import { useI18n } from '../../../i18n';
import { MorphingTextReveal } from '../../ui/MorphingTextReveal';
import { HeroUnderline } from '../../ui/HeroUnderline';
import styles from './SplineStrip.module.scss';

const SplineStrip = () => {
   const { t } = useI18n();
   const canvasRef = useRef<HTMLCanvasElement>(null);
   const { ref: heroRef, inView } = useInView({
      threshold: 0.3,
      triggerOnce: false,
   });

   useEffect(() => {
      if (!canvasRef.current) return;

      const app = new Application(canvasRef.current);
      app.load('/assets/models/Banner.splinecode');

      return () => {
         app.dispose();
      };
   }, []);

   return (
      <div className={`td-hero-area p-relative fix z-index-1 ${styles.splineStrip}`}>
         <div className={styles.container}>
            <canvas ref={canvasRef} className={styles.canvas} />
            <div className={styles.overlay} />

            {/* Hero Content - Absolutely Centered */}
            <div className={styles.content}>
               <div className="container">
                  <div className="row justify-content-center">
                     <div className="col-lg-10">
                        <div className="td-hero-content">
                           <div ref={heroRef} className="td-hero-title text-center wow fadeInUp" data-wow-delay=".5s" data-wow-duration="1s">
                              <h2 className="title" style={{ lineHeight: 1.1, whiteSpace: 'nowrap', fontWeight: 600 }}>
                                 {t.hero.titleLine1Prefix && <span>{t.hero.titleLine1Prefix} </span>}
                                 <HeroUnderline
                                    isActive={inView}
                                    strokeColor="var(--color-primary)"
                                    strokeWidth={10}
                                    top="40%"
                                    className="d-none d-md-block"
                                 >
                                    {t.hero.titleLine1Highlight}
                                 </HeroUnderline>
                                 <span className="d-md-none">{t.hero.titleLine1Highlight}</span>
                              </h2>
                              <h2 className="title mb-0" style={{ marginTop: 'clamp(-5px, -1.5vw, -30px)', lineHeight: 1.1, fontWeight: 600 }}>
                                 {t.hero.titleLine2}
                              </h2>
                              <h2 className="title" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.25em', whiteSpace: 'nowrap', marginTop: 'clamp(0px, -0.5vw, -15px)', lineHeight: 1.1, fontWeight: 600 }}>
                                 <span>{t.hero.titleLine3Prefix}</span>
                                 <MorphingTextReveal texts={[...t.hero.rotatingWords]} interval={3000} glitchOnHover={true} />
                              </h2>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

            
            </div>
         </div>
      </div>
   );
};

export default SplineStrip;
