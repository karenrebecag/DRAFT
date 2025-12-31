import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

// Register GSAP plugins (without ScrollSmoother)
gsap.registerPlugin(ScrollTrigger, SplitText);
gsap.config({ nullTargetWarn: false });

// Export Lenis instance for external access (e.g., anchor scrolling)
let lenisInstance: Lenis | null = null;

export const getLenis = () => lenisInstance;

export const scrollToAnchor = (
   target: string,
   options?: {
      offset?: number;
      duration?: number;
      easing?: (x: number) => number;
   }
) => {
   if (!lenisInstance) return;

   const defaultEasing = (x: number) =>
      x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;

   lenisInstance.scrollTo(target, {
      offset: options?.offset ?? 0,
      duration: options?.duration ?? 1.2,
      easing: options?.easing ?? defaultEasing,
   });
};

const useLenisSmoother = () => {
   const lenisRef = useRef<Lenis | null>(null);

   useEffect(() => {
      if (typeof window === "undefined") return;

      // Initialize Lenis
      const lenis = new Lenis({
         lerp: 0.1, // Controls smoothness (0.1 = smooth, 1 = instant)
         smoothWheel: true,
         syncTouch: true,
      });

      lenisRef.current = lenis;
      lenisInstance = lenis;

      // Integrate Lenis with GSAP ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => {
         lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);

      // Setup anchor links with data-anchor-target attribute
      const initScrollToAnchor = () => {
         document.querySelectorAll<HTMLElement>("[data-anchor-target]").forEach((element) => {
            const handler = (e: Event) => {
               e.preventDefault();
               const target = element.getAttribute("data-anchor-target");
               if (target) {
                  scrollToAnchor(target);
               }
            };
            element.addEventListener("click", handler);
            element.setAttribute("data-anchor-initialized", "true");
         });
      };

      initScrollToAnchor();

      // SplitText animation (preserved from original)
      const headline = document.querySelector(".split-text");
      let split: SplitText | null = null;

      if (headline) {
         split = new SplitText(headline, { type: "lines", linesClass: "split-line" });

         gsap.from(split.lines, {
            opacity: 0,
            y: 50,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: { trigger: headline, start: "top 80%" },
         });
      }

      // Cleanup
      return () => {
         if (split) split.revert();
         ScrollTrigger.getAll().forEach((t) => t.kill());
         gsap.ticker.remove((time) => lenis.raf(time * 1000));
         lenis.destroy();
         lenisInstance = null;
      };
   }, []);

   return lenisRef;
};

export default useLenisSmoother;
