import { useEffect, RefObject } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/**
 * useStackingCardsParallax - Osmo-style stacking cards with parallax
 *
 * Uses data attributes:
 * - data-stacking-cards-item - Each card to stack
 * - data-stacking-cards-img - Optional image to animate
 * - data-stacking-cards-content - Optional content to fade
 */

interface UseStackingCardsParallaxOptions {
  containerRef: RefObject<HTMLElement | null>
  enabled?: boolean
  parallaxAmount?: number
}

export const useStackingCardsParallax = ({
  containerRef,
  enabled = true,
  parallaxAmount = 50,
}: UseStackingCardsParallaxOptions) => {
  useEffect(() => {
    if (!enabled || !containerRef.current) return

    const cards = containerRef.current.querySelectorAll("[data-stacking-cards-item]")

    if (cards.length < 2) return

    const triggers: ScrollTrigger[] = []

    cards.forEach((card, i) => {
      // Skip the first card
      if (i === 0) return

      // Target the previous card
      const previousCard = cards[i - 1] as HTMLElement
      if (!previousCard) return

      // Find elements inside the previous card to animate
      const previousCardImage = previousCard.querySelector("[data-stacking-cards-img]")
      const previousCardContent = previousCard.querySelector("[data-stacking-cards-content]")

      const tl = gsap.timeline({
        defaults: {
          ease: "none",
          duration: 1,
        },
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "top top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      })

      // Main card parallax
      tl.fromTo(previousCard, { yPercent: 0 }, { yPercent: parallaxAmount })

      // Optional: animate image
      if (previousCardImage) {
        tl.fromTo(
          previousCardImage,
          { rotate: 0, yPercent: 0, scale: 1 },
          { rotate: -5, yPercent: -25, scale: 0.95 },
          "<"
        )
      }

      // Optional: fade out content
      if (previousCardContent) {
        tl.fromTo(previousCardContent, { autoAlpha: 1 }, { autoAlpha: 0.3 }, "<")
      }

      if (tl.scrollTrigger) {
        triggers.push(tl.scrollTrigger)
      }
    })

    return () => {
      triggers.forEach((trigger) => trigger.kill())
    }
  }, [containerRef, enabled, parallaxAmount])
}

export default useStackingCardsParallax
