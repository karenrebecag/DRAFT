import { useEffect, RefObject } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/**
 * useScrollProgressNumber - Animate numbers on scroll
 *
 * Uses data attributes:
 * - data-progress-nr - Element to animate
 * - data-progress-target - Target number to animate to
 * - data-progress-suffix - Optional suffix (like "+", "%", etc.)
 * - data-progress-duration - Animation duration in seconds (default: 2)
 */

interface UseScrollProgressNumberOptions {
  containerRef: RefObject<HTMLElement | null>
  enabled?: boolean
}

export const useScrollProgressNumber = ({
  containerRef,
  enabled = true,
}: UseScrollProgressNumberOptions) => {
  useEffect(() => {
    if (!enabled || !containerRef.current) return

    const elements = containerRef.current.querySelectorAll("[data-progress-nr]")
    const triggers: ScrollTrigger[] = []

    elements.forEach((el) => {
      const element = el as HTMLElement
      const targetStr = element.getAttribute("data-progress-target") || "100"
      const suffix = element.getAttribute("data-progress-suffix") || ""
      const duration = parseFloat(element.getAttribute("data-progress-duration") || "2")

      // Parse target number (handle "150+" format)
      const target = parseInt(targetStr.replace(/[^0-9]/g, ""), 10)

      // Set initial value
      element.textContent = "0" + suffix

      const counter = { value: 0 }

      const trigger = ScrollTrigger.create({
        trigger: element,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(counter, {
            value: target,
            duration,
            ease: "power2.out",
            onUpdate: () => {
              element.textContent = Math.round(counter.value).toString() + suffix
            },
          })
        },
      })

      triggers.push(trigger)
    })

    return () => {
      triggers.forEach((trigger) => trigger.kill())
    }
  }, [containerRef, enabled])
}

export default useScrollProgressNumber
