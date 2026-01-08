import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'

interface MomentumHoverConfig {
  xyMultiplier?: number
  rotationMultiplier?: number
  inertiaResistance?: number
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

export const useMomentumHover = (config: MomentumHoverConfig = {}) => {
  const {
    xyMultiplier = 30,
    rotationMultiplier = 20,
    inertiaResistance = 200,
  } = config

  const containerRef = useRef<HTMLElement>(null)
  const prevPos = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    // Only enable on devices with fine pointer (mouse)
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return
    }

    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId.current) return

      rafId.current = requestAnimationFrame(() => {
        velocity.current.x = e.clientX - prevPos.current.x
        velocity.current.y = e.clientY - prevPos.current.y
        prevPos.current.x = e.clientX
        prevPos.current.y = e.clientY
        rafId.current = null
      })
    }

    container.addEventListener('mousemove', handleMouseMove)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [])

  const handleHover = useCallback(
    (e: React.MouseEvent, target: HTMLElement | null) => {
      if (!target) return

      // Get element dimensions
      const rect = target.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const offsetX = e.clientX - centerX
      const offsetY = e.clientY - centerY

      // Check if InertiaPlugin is available (GSAP plugins registered globally)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!(gsap as any).plugins?.inertia) {
        // Fallback: simple animation without inertia
        gsap.to(target, {
          x: clamp(velocity.current.x * 2, -50, 50),
          y: clamp(velocity.current.y * 2, -50, 50),
          rotation: clamp(
            (offsetX * velocity.current.y - offsetY * velocity.current.x) / 100,
            -15,
            15
          ),
          duration: 0.6,
          ease: 'power3.out',
        })

        gsap.to(target, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 1.2,
          delay: 0.1,
          ease: 'elastic.out(1, 0.5)',
        })
        return
      }

      // Calculate raw torque
      const rawTorque =
        offsetX * velocity.current.y - offsetY * velocity.current.x

      // Normalize torque
      const leverDist = Math.hypot(offsetX, offsetY) || 1
      const angularForce = rawTorque / leverDist

      // Calculate and clamp velocities
      const velocityX = clamp(velocity.current.x * xyMultiplier, -1080, 1080)
      const velocityY = clamp(velocity.current.y * xyMultiplier, -1080, 1080)
      const rotationVelocity = clamp(
        angularForce * rotationMultiplier,
        -60,
        60
      )

      // Apply GSAP inertia tween
      gsap.to(target, {
        inertia: {
          x: { velocity: velocityX, end: 0 },
          y: { velocity: velocityY, end: 0 },
          rotation: { velocity: rotationVelocity, end: 0 },
          resistance: inertiaResistance,
        },
      })
    },
    [xyMultiplier, rotationMultiplier, inertiaResistance]
  )

  return {
    containerRef,
    handleHover,
  }
}

export default useMomentumHover
