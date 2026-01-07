import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Observer } from 'gsap/Observer'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(Observer, ScrollTrigger)

interface DraggableMarqueeOptions {
  /** Initial direction: 'left' or 'right' */
  direction?: 'left' | 'right'
  /** Duration in seconds for one full loop (default: 20) */
  duration?: number
  /** Max speed multiplier when dragging (default: 35) */
  multiplier?: number
  /** Drag sensitivity - higher = more responsive (default: 0.01) */
  sensitivity?: number
}

export function useDraggableMarquee(options: DraggableMarqueeOptions = {}) {
  const {
    direction = 'left',
    duration = 20,
    multiplier = 35,
    sensitivity = 0.01,
  } = options

  const wrapperRef = useRef<HTMLDivElement>(null)
  const collectionRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const initializedRef = useRef(false)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const collection = collectionRef.current
    const list = listRef.current

    if (!wrapper || !collection || !list || initializedRef.current) return

    // Check for reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const wrapperWidth = wrapper.getBoundingClientRect().width
    const listWidth = list.scrollWidth || list.getBoundingClientRect().width

    if (!wrapperWidth || !listWidth) return

    // Clone lists to fill viewport for seamless loop
    const minRequiredWidth = wrapperWidth + listWidth + 2
    while (collection.scrollWidth < minRequiredWidth) {
      const listClone = list.cloneNode(true) as HTMLElement
      listClone.setAttribute('data-marquee-clone', '')
      listClone.setAttribute('aria-hidden', 'true')
      collection.appendChild(listClone)
    }

    const wrapX = gsap.utils.wrap(-listWidth, 0)

    gsap.set(collection, { x: 0 })

    const marqueeLoop = gsap.to(collection, {
      x: -listWidth,
      duration,
      ease: 'none',
      repeat: -1,
      onReverseComplete: () => marqueeLoop.progress(1),
      modifiers: {
        x: (x) => wrapX(parseFloat(x)) + 'px',
      },
    })

    // Set initial direction
    const baseDirection = direction === 'right' ? -1 : 1
    const timeScale = { value: baseDirection }

    if (baseDirection < 0) marqueeLoop.progress(1)

    function applyTimeScale() {
      marqueeLoop.timeScale(timeScale.value)
      wrapper?.setAttribute('data-direction', timeScale.value < 0 ? 'right' : 'left')
    }

    applyTimeScale()

    // Drag observer
    const marqueeObserver = Observer.create({
      target: wrapper,
      type: 'pointer,touch',
      preventDefault: true,
      debounce: false,
      onChangeX: (observerEvent) => {
        let velocityTimeScale = observerEvent.velocityX * -sensitivity
        velocityTimeScale = gsap.utils.clamp(-multiplier, multiplier, velocityTimeScale)

        gsap.killTweensOf(timeScale)

        const restingDirection = velocityTimeScale < 0 ? -1 : 1

        gsap.timeline({ onUpdate: applyTimeScale })
          .to(timeScale, { value: velocityTimeScale, duration: 0.1, overwrite: true })
          .to(timeScale, { value: restingDirection, duration: 1.0 })
      },
    })

    // Pause when out of view
    const scrollTrigger = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => {
        marqueeLoop.resume()
        applyTimeScale()
        marqueeObserver.enable()
      },
      onEnterBack: () => {
        marqueeLoop.resume()
        applyTimeScale()
        marqueeObserver.enable()
      },
      onLeave: () => {
        marqueeLoop.pause()
        marqueeObserver.disable()
      },
      onLeaveBack: () => {
        marqueeLoop.pause()
        marqueeObserver.disable()
      },
    })

    initializedRef.current = true

    return () => {
      marqueeLoop.kill()
      marqueeObserver.kill()
      scrollTrigger.kill()
      // Remove clones
      collection.querySelectorAll('[data-marquee-clone]').forEach((clone) => clone.remove())
      initializedRef.current = false
    }
  }, [direction, duration, multiplier, sensitivity])

  return { wrapperRef, collectionRef, listRef }
}
