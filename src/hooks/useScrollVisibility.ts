import { useState, useEffect, useCallback, useRef } from 'react'
import gsap from 'gsap'

interface UseScrollVisibilityOptions {
  threshold?: number
  topThreshold?: number
  disabled?: boolean
}

export const useScrollVisibility = (
  elementRef: React.RefObject<HTMLElement | null>,
  options: UseScrollVisibilityOptions = {}
) => {
  const { threshold = 100, topThreshold = 50, disabled = false } = options
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)

  const animateVisibility = useCallback(
    (show: boolean) => {
      if (!elementRef.current) return

      gsap.to(elementRef.current, {
        y: show ? 0 : -120,
        opacity: show ? 1 : 0,
        duration: 0.4,
        ease: 'power3.out',
      })

      setIsVisible(show)
    },
    [elementRef]
  )

  const handleScroll = useCallback(() => {
    if (disabled) return

    const currentScrollY = window.scrollY

    // Always show at top
    if (currentScrollY < topThreshold) {
      animateVisibility(true)
      lastScrollY.current = currentScrollY
      return
    }

    // Scrolling down - hide
    if (currentScrollY > lastScrollY.current && currentScrollY > threshold) {
      animateVisibility(false)
    } else {
      // Scrolling up - show
      animateVisibility(true)
    }

    lastScrollY.current = currentScrollY
  }, [disabled, topThreshold, threshold, animateVisibility])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return { isVisible, animateVisibility }
}

export default useScrollVisibility
