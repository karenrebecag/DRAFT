import { useLayoutEffect } from "react"
import gsap from "gsap"
import SplitText from "gsap/SplitText"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(SplitText, ScrollTrigger)

/**
 * useMaskedTextReveal - Masked line reveal animation on scroll
 *
 * Targets elements with [data-split="lines"] attribute.
 * Creates a mask effect where lines slide up from below.
 */

const useMaskedTextReveal = () => {
  useLayoutEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('[data-split="lines"]')
      if (!elements.length) return

      // Check for reduced motion preference
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches

      const ctx = gsap.context(() => {
        elements.forEach((el) => {
          const element = el as HTMLElement

          // Make element visible
          element.style.visibility = "visible"

          if (prefersReduced) return

          // Create SplitText instance with mask
          const split = SplitText.create(element, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
          })

          // Animate lines with ScrollTrigger
          gsap.from(split.lines, {
            duration: 1,
            yPercent: 100,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              once: true,
            },
          })
        })
      })

      return () => ctx.revert()
    }, 100)

    return () => clearTimeout(timer)
  }, [])
}

export default useMaskedTextReveal
