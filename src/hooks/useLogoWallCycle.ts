import { useEffect, RefObject } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/**
 * useLogoWallCycle - Osmo-style logo wall with cycling animation
 *
 * Uses data attributes:
 * - data-logo-wall-cycle-init - Main container
 * - data-logo-wall-shuffle="true|false" - Shuffle initial logos
 * - data-logo-wall-list - List wrapper
 * - data-logo-wall-item - Individual logo placeholder
 * - data-logo-wall-target-parent - Parent for target placement
 * - data-logo-wall-target - Animated target element
 */

interface UseLogoWallCycleOptions {
  containerRef: RefObject<HTMLElement | null>
  enabled?: boolean
  loopDelay?: number
  duration?: number
}

export const useLogoWallCycle = ({
  containerRef,
  enabled = true,
  loopDelay = 1.5,
  duration = 0.9,
}: UseLogoWallCycleOptions) => {
  useEffect(() => {
    if (!enabled || !containerRef.current) return

    const roots = containerRef.current.querySelectorAll("[data-logo-wall-cycle-init]")
    const cleanups: (() => void)[] = []

    roots.forEach((root) => {
      const list = root.querySelector("[data-logo-wall-list]")
      if (!list) return

      const items = Array.from(list.querySelectorAll("[data-logo-wall-item]")) as HTMLElement[]
      const shuffleFront = root.getAttribute("data-logo-wall-shuffle") !== "false"

      const originalTargets = items
        .map((item) => item.querySelector("[data-logo-wall-target]"))
        .filter(Boolean) as HTMLElement[]

      let visibleItems: HTMLElement[] = []
      let visibleCount = 0
      let pool: HTMLElement[] = []
      let pattern: number[] = []
      let patternIndex = 0
      let tl: gsap.core.Timeline | null = null

      function isVisible(el: HTMLElement) {
        return window.getComputedStyle(el).display !== "none"
      }

      function shuffleArray<T>(arr: T[]): T[] {
        const a = arr.slice()
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[a[i], a[j]] = [a[j], a[i]]
        }
        return a
      }

      function setup() {
        if (tl) {
          tl.kill()
        }

        visibleItems = items.filter(isVisible)
        visibleCount = visibleItems.length

        pattern = shuffleArray(Array.from({ length: visibleCount }, (_, i) => i))
        patternIndex = 0

        // Remove all injected targets
        items.forEach((item) => {
          item.querySelectorAll("[data-logo-wall-target]").forEach((old) => old.remove())
        })

        pool = originalTargets.map((n) => n.cloneNode(true) as HTMLElement)

        let front: HTMLElement[]
        let rest: HTMLElement[]

        if (shuffleFront) {
          const shuffledAll = shuffleArray(pool)
          front = shuffledAll.slice(0, visibleCount)
          rest = shuffleArray(shuffledAll.slice(visibleCount))
        } else {
          front = pool.slice(0, visibleCount)
          rest = shuffleArray(pool.slice(visibleCount))
        }

        pool = front.concat(rest)

        for (let i = 0; i < visibleCount; i++) {
          const parent =
            visibleItems[i].querySelector("[data-logo-wall-target-parent]") || visibleItems[i]
          const node = pool.shift()
          if (node) parent.appendChild(node)
        }

        tl = gsap.timeline({ repeat: -1, repeatDelay: loopDelay })
        tl.call(swapNext)
        tl.play()
      }

      function swapNext() {
        const nowCount = items.filter(isVisible).length
        if (nowCount !== visibleCount) {
          setup()
          return
        }
        if (!pool.length) return

        const idx = pattern[patternIndex % visibleCount]
        patternIndex++

        const container = visibleItems[idx]
        const parent =
          container.querySelector("[data-logo-wall-target-parent]") ||
          container.querySelector("*:has(> [data-logo-wall-target])") ||
          container

        const existing = parent.querySelectorAll("[data-logo-wall-target]")
        if (existing.length > 1) return

        const current = parent.querySelector("[data-logo-wall-target]")
        const incoming = pool.shift()

        if (!incoming) return

        gsap.set(incoming, { yPercent: 50, autoAlpha: 0 })
        parent.appendChild(incoming)

        if (current) {
          gsap.to(current, {
            yPercent: -50,
            autoAlpha: 0,
            duration,
            ease: "expo.inOut",
            onComplete: () => {
              current.remove()
              pool.push(current as HTMLElement)
            },
          })
        }

        gsap.to(incoming, {
          yPercent: 0,
          autoAlpha: 1,
          duration,
          delay: 0.1,
          ease: "expo.inOut",
        })
      }

      setup()

      const scrollTrigger = ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => tl?.play(),
        onLeave: () => tl?.pause(),
        onEnterBack: () => tl?.play(),
        onLeaveBack: () => tl?.pause(),
      })

      const visibilityHandler = () => {
        if (document.hidden) {
          tl?.pause()
        } else {
          tl?.play()
        }
      }

      document.addEventListener("visibilitychange", visibilityHandler)

      cleanups.push(() => {
        tl?.kill()
        scrollTrigger.kill()
        document.removeEventListener("visibilitychange", visibilityHandler)
      })
    })

    return () => {
      cleanups.forEach((cleanup) => cleanup())
    }
  }, [containerRef, enabled, loopDelay, duration])
}

export default useLogoWallCycle
