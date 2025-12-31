import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseHorizontalScrollProps {
   disableBelow?: "mobile" | "mobileLandscape" | "tablet";
}

const useHorizontalScroll = ({ disableBelow = "mobileLandscape" }: UseHorizontalScrollProps = {}) => {
   const wrapperRef = useRef<HTMLElement>(null);
   const tweenRef = useRef<gsap.core.Tween | null>(null);

   useEffect(() => {
      const mm = gsap.matchMedia();

      mm.add(
         {
            isMobile: "(max-width: 479px)",
            isMobileLandscape: "(max-width: 767px)",
            isTablet: "(max-width: 991px)",
            isDesktop: "(min-width: 992px)",
         },
         (context) => {
            const { isMobile, isMobileLandscape, isTablet } = context.conditions as Record<string, boolean>;

            const shouldDisable =
               (disableBelow === "mobile" && isMobile) ||
               (disableBelow === "mobileLandscape" && isMobileLandscape) ||
               (disableBelow === "tablet" && isTablet);

            if (shouldDisable) return;

            const wrapper = wrapperRef.current;
            if (!wrapper) return;

            const panels = gsap.utils.toArray<HTMLElement>("[data-horizontal-panel]", wrapper);
            if (panels.length < 2) return;

            const totalWidth = panels.reduce((acc, panel) => acc + panel.offsetWidth, 0);
            const scrollDistance = totalWidth - window.innerWidth;

            tweenRef.current = gsap.to(panels, {
               x: () => -scrollDistance,
               ease: "none",
               scrollTrigger: {
                  trigger: wrapper,
                  start: "top top",
                  end: () => `+=${scrollDistance}`,
                  scrub: 1,
                  pin: true,
                  anticipatePin: 1,
                  invalidateOnRefresh: true,
               },
            });

            return () => {
               if (tweenRef.current) {
                  tweenRef.current.scrollTrigger?.kill();
                  tweenRef.current.kill();
               }
            };
         }
      );

      return () => mm.revert();
   }, [disableBelow]);

   return { wrapperRef, tweenRef };
};

export default useHorizontalScroll;
