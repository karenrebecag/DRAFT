import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import styles from './ScalingMediaStrip.module.scss';
import { BunnyBackgroundVideo } from '@/components/ui/BunnyBackgroundVideo';

gsap.registerPlugin(ScrollTrigger, Flip);

const ScalingMediaStrip = () => {
   const containerRef = useRef<HTMLDivElement>(null);
   const targetRef = useRef<HTMLDivElement>(null);
   const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
   const timelineRef = useRef<gsap.core.Timeline | null>(null);

   // Initialize GSAP Flip animation
   useLayoutEffect(() => {
      const wrappers = wrapperRefs.current.filter(Boolean) as HTMLDivElement[];
      const target = targetRef.current;

      if (wrappers.length < 2 || !target) return;

      const createTimeline = () => {
         // Kill existing timeline if any
         if (timelineRef.current) {
            timelineRef.current.kill();
            gsap.set(target, { clearProps: 'all' });
         }

         // Create new timeline with ScrollTrigger
         const tl = gsap.timeline({
            scrollTrigger: {
               trigger: wrappers[0],
               start: 'center center',
               endTrigger: wrappers[wrappers.length - 1],
               end: 'center center',
               scrub: 0.25,
               // markers: true, // Uncomment for debugging
            },
         });

         // Loop through each wrapper to create flip animations
         wrappers.forEach((element, index) => {
            const nextIndex = index + 1;
            if (nextIndex < wrappers.length) {
               const nextWrapper = wrappers[nextIndex];

               // Calculate vertical center positions relative to the document
               const nextRect = nextWrapper.getBoundingClientRect();
               const thisRect = element.getBoundingClientRect();
               const nextDistance = nextRect.top + window.pageYOffset + nextWrapper.offsetHeight / 2;
               const thisDistance = thisRect.top + window.pageYOffset + element.offsetHeight / 2;
               const offset = nextDistance - thisDistance;

               // Add the Flip.fit tween to the timeline
               tl.add(
                  Flip.fit(target, nextWrapper, {
                     duration: offset,
                     ease: 'none',
                  })
               );
            }
         });

         timelineRef.current = tl;
      };

      // Create timeline after layout paint
      createTimeline();

      // Resize handler with debounce
      let resizeTimer: ReturnType<typeof setTimeout>;
      const handleResize = () => {
         clearTimeout(resizeTimer);
         resizeTimer = setTimeout(() => {
            createTimeline();
         }, 100);
      };

      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
         clearTimeout(resizeTimer);
         if (timelineRef.current) {
            timelineRef.current.kill();
         }
      };
   }, []);

   return (
      <div ref={containerRef} className={styles.wrapper}>
         {/* Header Section with Small Box */}
         <section className={styles.headerSection}>
            {/* Small Box - Starting position */}
            <div
               className={styles.smallBox}
               ref={(el) => { wrapperRefs.current[0] = el; }}
            >
               <div className={styles.aspectRatio} />
               <div className={styles.mediaWrapper}>
                  {/* Target element - the scaling media */}
                  <div ref={targetRef} className={styles.media}>
                     <BunnyBackgroundVideo
                        src="https://vz-516d9498-38c.b-cdn.net/83ae40e8-5c82-41f0-b7bb-3a967b4dbbc6/playlist.m3u8"
                        className={styles.video}
                        borderRadius="1em"
                        autoplay
                     />
                     {/* Decorative SVG overlay */}
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        viewBox="0 0 138 138"
                        fill="none"
                        className={styles.svg}
                     >
                        <path
                           d="M81.7432 46.534C79.5777 48.6995 75.875 47.1659 75.875 44.1034V0.25H62.125V51.8124C62.125 57.5079 57.5079 62.1249 51.8125 62.1249H0.25V75.8749H44.1034C47.1659 75.8749 48.6996 79.5776 46.5341 81.7431L16.0136 112.263L25.7364 121.986L56.2569 91.466C58.416 89.3069 62.1031 90.825 62.125 93.8693V137.75H75.8751L75.875 86.1874C75.875 80.492 80.4921 75.8749 86.1875 75.8749H137.75V62.1249H93.8692C90.8339 62.1031 89.3157 58.4375 91.4469 56.2759L91.4659 56.2569L121.986 25.7363L112.264 16.0137L81.7432 46.534Z"
                           fill="currentColor"
                        />
                     </svg>
                  </div>
               </div>
            </div>
         </section>

         {/* Video Section with Big Box */}
         <section className={styles.videoSection}>
            {/* Big Box - Ending position */}
            <div
               className={styles.bigBox}
               ref={(el) => { wrapperRefs.current[1] = el; }}
            >
               <div className={styles.aspectRatio} />
               <div className={styles.mediaWrapper}>
                  {/* Background Video */}
                  <BunnyBackgroundVideo
                     src="https://vz-516d9498-38c.b-cdn.net/83ae40e8-5c82-41f0-b7bb-3a967b4dbbc6/playlist.m3u8"
                     className={styles.bgVideo}
                     borderRadius="1em"
                     autoplay
                  />
               </div>
            </div>
         </section>
      </div>
   );
};

export default ScalingMediaStrip;
