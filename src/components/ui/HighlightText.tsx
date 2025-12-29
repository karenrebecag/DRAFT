import { useRef, useEffect, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface HighlightTextProps {
   children: ReactNode
   className?: string
   /** Style variant: 'accent' for lime green, 'dark' for glassmorphism dark */
   variant?: "accent" | "dark"
}

/**
 * HighlightText - Animated text highlight effect on scroll
 * Large, impactful highlight that covers the full text block
 * Two variants: 'accent' (lime green) or 'dark' (glassmorphism)
 */
export function HighlightText({
   children,
   className = "",
   variant = "dark"
}: HighlightTextProps) {
   const containerRef = useRef<HTMLSpanElement>(null)
   const highlightRef = useRef<HTMLSpanElement>(null)
   const textRef = useRef<HTMLSpanElement>(null)

   const isDark = variant === "dark"

   useEffect(() => {
      if (!containerRef.current || !highlightRef.current || !textRef.current) return

      const ctx = gsap.context(() => {
         const tl = gsap.timeline({
            scrollTrigger: {
               trigger: containerRef.current,
               start: "top 85%",
               end: "top 10%",
               toggleActions: "play reverse play reverse",
            },
         })

         // Animate highlight in from scaleX 0 to 1
         tl.fromTo(
            highlightRef.current,
            {
               scaleX: 0,
            },
            {
               scaleX: 1,
               duration: 1,
               ease: "power3.out",
            },
         )

         // Animate text color
         tl.fromTo(
            textRef.current,
            {
               color: "inherit",
            },
            {
               color: isDark ? "#fafafa" : "#0a0a0a",
               duration: 0.5,
               ease: "power2.out",
            },
            0.4,
         )
      }, containerRef)

      return () => ctx.revert()
   }, [isDark])

   // Styles based on variant
   const highlightStyles = isDark
      ? {
           background: "rgba(31, 31, 31, 0.85)",
           backdropFilter: "saturate(180%) blur(20px)",
           WebkitBackdropFilter: "saturate(180%) blur(20px)",
           border: "1px solid rgba(255, 255, 255, 0.1)",
           borderRadius: "12px",
           boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        }
      : {
           background: "var(--color-primary, #beff01)",
           borderRadius: "4px",
        }

   return (
      <span
         ref={containerRef}
         className={className}
         style={{
            position: "relative",
            display: "inline-block",
         }}
      >
         <span
            ref={highlightRef}
            style={{
               position: "absolute",
               left: "-0.15em",
               right: "-0.15em",
               top: "-0.1em",
               bottom: "-0.1em",
               transform: "scaleX(0)",
               transformOrigin: "left center",
               zIndex: 0,
               pointerEvents: "none",
               ...highlightStyles,
            }}
         />
         <span
            ref={textRef}
            style={{
               position: "relative",
               zIndex: 1,
               display: "inline-block",
               padding: isDark ? "0.05em 0.1em" : "0",
            }}
         >
            {children}
         </span>
      </span>
   )
}

export default HighlightText
