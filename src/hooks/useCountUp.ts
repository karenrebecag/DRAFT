import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'

interface UseCountUpOptions {
  /** Target number to count to */
  end: number
  /** Duration in seconds (default: 2) */
  duration?: number
  /** Suffix to append (e.g., '+', '%', 'm') */
  suffix?: string
  /** Prefix to prepend (e.g., '$') */
  prefix?: string
  /** Decimal places (default: 0) */
  decimals?: number
  /** Easing function (default: 'power2.out') */
  ease?: string
}

export function useCountUp(options: UseCountUpOptions) {
  const {
    end,
    duration = 2,
    suffix = '',
    prefix = '',
    decimals = 0,
    ease = 'power2.out',
  } = options

  const [displayValue, setDisplayValue] = useState(`${prefix}0${suffix}`)
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)
  const animationRef = useRef<gsap.core.Tween | null>(null)

  const animate = useCallback(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true

    const counter = { value: 0 }

    animationRef.current = gsap.to(counter, {
      value: end,
      duration,
      ease,
      onUpdate: () => {
        const formatted = decimals > 0
          ? counter.value.toFixed(decimals)
          : Math.round(counter.value).toString()
        setDisplayValue(`${prefix}${formatted}${suffix}`)
      },
    })
  }, [end, duration, ease, decimals, prefix, suffix])

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      setDisplayValue(`${prefix}${end.toFixed(decimals)}${suffix}`)
      return
    }

    // Use IntersectionObserver for more reliable triggering
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            animate()
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (animationRef.current) {
        animationRef.current.kill()
      }
    }
  }, [end, duration, suffix, prefix, decimals, ease, animate])

  return { displayValue, containerRef }
}
