import { useEffect, RefObject } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/**
 * useRevealOnScroll - Osmo-style content reveal on scroll
 *
 * Uses data attributes for flexible reveal configuration:
 * - data-reveal-group - Main wrapper to animate direct children
 * - data-reveal-group-nested - Nested group with independent stagger
 * - data-stagger="100" - Delay between animations in ms (default: 100)
 * - data-distance="2em" - Starting offset (default: 2em)
 * - data-start="top 80%" - ScrollTrigger start position
 * - data-ignore="false" - Include nested parent in main reveal
 */

interface UseRevealOnScrollOptions {
  containerRef: RefObject<HTMLElement | null>
  enabled?: boolean
}

export const useRevealOnScroll = ({
  containerRef,
  enabled = true,
}: UseRevealOnScrollOptions) => {
  useEffect(() => {
    if (!enabled || !containerRef.current) return

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    const ctx = gsap.context(() => {
      const groups = containerRef.current?.querySelectorAll("[data-reveal-group]")

      groups?.forEach((groupEl) => {
        const el = groupEl as HTMLElement

        // Config from attributes or defaults
        const groupStaggerSec =
          (parseFloat(el.getAttribute("data-stagger") || "100")) / 1000
        const groupDistance = el.getAttribute("data-distance") || "2em"
        const triggerStart = el.getAttribute("data-start") || "top 80%"

        const animDuration = 0.8
        const animEase = "power4.inOut"

        // Reduced motion: show immediately
        if (prefersReduced) {
          gsap.set(el, { clearProps: "all", y: 0, autoAlpha: 1 })
          return
        }

        // Get direct children
        const directChildren = Array.from(el.children).filter(
          (child) => child.nodeType === 1
        ) as HTMLElement[]

        // If no children, animate the group itself
        if (!directChildren.length) {
          gsap.set(el, { y: groupDistance, autoAlpha: 0 })
          ScrollTrigger.create({
            trigger: el,
            start: triggerStart,
            once: true,
            onEnter: () =>
              gsap.to(el, {
                y: 0,
                autoAlpha: 1,
                duration: animDuration,
                ease: animEase,
                onComplete: () => gsap.set(el, { clearProps: "all" }),
              }),
          })
          return
        }

        // Build animation slots
        interface ItemSlot {
          type: "item"
          el: HTMLElement
        }
        interface NestedSlot {
          type: "nested"
          parentEl: HTMLElement
          nestedEl: HTMLElement
          includeParent: boolean
        }
        type Slot = ItemSlot | NestedSlot

        const slots: Slot[] = []

        directChildren.forEach((child) => {
          const nestedGroup = child.matches("[data-reveal-group-nested]")
            ? child
            : (child.querySelector(":scope [data-reveal-group-nested]") as HTMLElement | null)

          if (nestedGroup) {
            const includeParent =
              child.getAttribute("data-ignore") === "false" ||
              nestedGroup.getAttribute("data-ignore") === "false"
            slots.push({
              type: "nested",
              parentEl: child,
              nestedEl: nestedGroup,
              includeParent,
            })
          } else {
            slots.push({ type: "item", el: child })
          }
        })

        // Initial hidden state
        slots.forEach((slot) => {
          if (slot.type === "item") {
            const isNestedSelf = slot.el.matches("[data-reveal-group-nested]")
            const d = isNestedSelf
              ? groupDistance
              : slot.el.getAttribute("data-distance") || groupDistance
            gsap.set(slot.el, { y: d, autoAlpha: 0 })
          } else {
            if (slot.includeParent) {
              gsap.set(slot.parentEl, { y: groupDistance, autoAlpha: 0 })
            }
            const nestedD =
              slot.nestedEl.getAttribute("data-distance") || groupDistance
            Array.from(slot.nestedEl.children).forEach((target) =>
              gsap.set(target, { y: nestedD, autoAlpha: 0 })
            )
          }
        })

        // Extra safety for nested parents
        slots.forEach((slot) => {
          if (slot.type === "nested" && slot.includeParent) {
            gsap.set(slot.parentEl, { y: groupDistance })
          }
        })

        // Reveal sequence
        ScrollTrigger.create({
          trigger: el,
          start: triggerStart,
          once: true,
          onEnter: () => {
            const tl = gsap.timeline()

            slots.forEach((slot, slotIndex) => {
              const slotTime = slotIndex * groupStaggerSec

              if (slot.type === "item") {
                tl.to(
                  slot.el,
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: animDuration,
                    ease: animEase,
                    onComplete: () => gsap.set(slot.el, { clearProps: "all" }),
                  },
                  slotTime
                )
              } else {
                if (slot.includeParent) {
                  tl.to(
                    slot.parentEl,
                    {
                      y: 0,
                      autoAlpha: 1,
                      duration: animDuration,
                      ease: animEase,
                      onComplete: () =>
                        gsap.set(slot.parentEl, { clearProps: "all" }),
                    },
                    slotTime
                  )
                }

                const nestedMs = parseFloat(
                  slot.nestedEl.getAttribute("data-stagger") || ""
                )
                const nestedStaggerSec = isNaN(nestedMs)
                  ? groupStaggerSec
                  : nestedMs / 1000

                Array.from(slot.nestedEl.children).forEach(
                  (nestedChild, nestedIndex) => {
                    tl.to(
                      nestedChild,
                      {
                        y: 0,
                        autoAlpha: 1,
                        duration: animDuration,
                        ease: animEase,
                        onComplete: () =>
                          gsap.set(nestedChild, { clearProps: "all" }),
                      },
                      slotTime + nestedIndex * nestedStaggerSec
                    )
                  }
                )
              }
            })
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [containerRef, enabled])
}

export default useRevealOnScroll
