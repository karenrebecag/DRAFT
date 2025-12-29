import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Application } from '@splinetool/runtime';
import { useI18n } from '../../../i18n';
import { MorphingTextReveal } from '../../ui/MorphingTextReveal';
import { HeroUnderline } from '../../ui/HeroUnderline';

const HeroSpline = () => {
   const { t } = useI18n();
   const { ref: heroRef, inView } = useInView({
      threshold: 0.3,
      triggerOnce: false,
   });
   const canvasRef = useRef<HTMLCanvasElement>(null);

   useEffect(() => {
      if (!canvasRef.current) return;

      const app = new Application(canvasRef.current);
      app.load('/assets/models/Banner.splinecode');

      return () => {
         app.dispose();
      };
   }, []);

   return (
      <div className="td-hero-area td-hero-spacing p-relative fix z-index-1" style={{ overflow: 'hidden', minHeight: '100vh' }}>
         {/* Spline Background */}
         <canvas
            ref={canvasRef}
            style={{
               position: 'absolute',
               top: 0,
               left: 0,
               width: '100%',
               height: '100%',
               zIndex: 0,
               pointerEvents: 'auto',
            }}
         />

         <div className="container" style={{ position: 'relative', zIndex: 3 }}>
            <div className="row justify-content-center">
               <div className="col-lg-10">
                  <div className="td-hero-content">
                     <div ref={heroRef} className="td-hero-title text-center wow fadeInUp" data-wow-delay=".5s" data-wow-duration="1s" style={{ position: 'relative' }}>



                        <h2 className="title" style={{ position: 'relative', zIndex: 1, lineHeight: 1.1, whiteSpace: 'nowrap', fontWeight: 600 }}>
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
                        <h2 className="title mb-0" style={{ position: 'relative', marginTop: 'clamp(-5px, -1.5vw, -30px)', zIndex: 1, lineHeight: 1.1, fontWeight: 600 }}>
                           {t.hero.titleLine2}
                        </h2>
                        <h2 className="title" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.25em', whiteSpace: 'nowrap', position: 'relative', zIndex: 1, marginTop: 'clamp(0px, -0.5vw, -15px)', lineHeight: 1.1, fontWeight: 600 }}>
                           <span>{t.hero.titleLine3Prefix}</span>
                           <MorphingTextReveal texts={[...t.hero.rotatingWords]} interval={3000} glitchOnHover={true} />
                        </h2>
                     </div>
                  </div>
               </div>
            </div>
         </div>

       
         <div className="container container-1680" style={{ position: 'relative', zIndex: 2 }}>
            <div className="row">
               <div className="col-12">
                  <div className="td-hero-bottom-thumb">
                     <img data-speed="0.6" className="w-100 round-2" src="/assets/img/hero/bg-thumb.jpg" alt="" />
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default HeroSpline
