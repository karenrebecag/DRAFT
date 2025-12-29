import { useState, useEffect, useCallback } from "react";
import { ArrowUp } from "lucide-react";
import UseSticky from "../../hooks/UseSticky";

const ScrollToTop = () => {

   const { sticky }: { sticky: boolean } = UseSticky();
   const [showScroll, setShowScroll] = useState(false);

   const checkScrollTop = useCallback(() => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const distanceFromBottom = documentHeight - (scrollTop + windowHeight);

      // Show only when near bottom (within 300px of the end)
      if (distanceFromBottom < 300 && !showScroll) {
         setShowScroll(true);
      } else if (distanceFromBottom >= 300 && showScroll) {
         setShowScroll(false);
      }
   }, [showScroll]);

   const scrollTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
   };

   useEffect(() => {
      window.addEventListener("scroll", checkScrollTop);
      return () => window.removeEventListener("scroll", checkScrollTop);
   }, [checkScrollTop]);

   return (
      <button
         onClick={scrollTop}
         className={`scroll__top scroll-to-target ${sticky && showScroll ? "open" : ""}`}
         data-target="html"
      >
         <ArrowUp size={18} />
      </button>
   );
};

export default ScrollToTop;