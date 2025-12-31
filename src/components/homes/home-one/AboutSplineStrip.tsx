import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HighlightText } from '../../ui/HighlightText'
import { ClientMarquee } from '../../ui/ClientMarquee'
import styles from './AboutSplineStrip.module.scss'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { number: 150, suffix: '+', label: 'Projects Delivered' },
  { number: 12, suffix: '', label: 'Years Experience' },
  { number: 98, suffix: '%', label: 'Client Retention' },
  { number: 24, suffix: '', label: 'Team Members' },
]

const AboutSplineStrip = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const appRef = useRef<import('@splinetool/runtime').Application | null>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasStartedLoading, setHasStartedLoading] = useState(false)

  // Load Spline
  const loadSpline = useCallback(async () => {
    if (!canvasRef.current || hasStartedLoading) return
    setHasStartedLoading(true)

    try {
      const { Application } = await import('@splinetool/runtime')
      if (!canvasRef.current) return

      const app = new Application(canvasRef.current)
      appRef.current = app

      await app.load('/assets/models/About.splinecode')
      console.log('About Spline loaded')

      setTimeout(() => {
        setIsLoaded(true)
      }, 100)
    } catch (error) {
      console.error('Failed to load About Spline:', error)
    }
  }, [hasStartedLoading])

  // Start loading on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      loadSpline()
    }, 300)
    return () => clearTimeout(timer)
  }, [loadSpline])

  // Scroll Progress Number Animation (Osmo pattern)
  useEffect(() => {
    if (!statsRef.current) return

    const counters = { values: STATS.map(() => 0) }

    const trigger = ScrollTrigger.create({
      trigger: statsRef.current,
      start: 'top 80%',
      end: 'top 20%',
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress
        STATS.forEach((stat, index) => {
          const value = Math.round(stat.number * progress)
          const el = numberRefs.current[index]
          if (el) {
            el.textContent = `${value}${stat.suffix}`
          }
        })
      },
    })

    return () => {
      trigger.kill()
    }
  }, [])

  // Pause on visibility change
  useEffect(() => {
    const app = appRef.current
    if (!app || !isLoaded) return

    const handleVisibilityChange = () => {
      if (document.hidden) {
        app.stop?.()
      } else {
        app.play?.()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [isLoaded])

  // Cleanup
  useEffect(() => {
    return () => {
      if (appRef.current) {
        appRef.current.dispose()
        appRef.current = null
      }
    }
  }, [])

  return (
    <section id="about-agency" className={styles.strip}>
      <div className={styles.container}>
        {/* Spline Canvas Background - Interactive */}
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
            pointerEvents: 'auto',
          }}
        />

        {/* Content */}
        <div className={styles.content}>
          {/* Hero Section */}
          <div className={styles.hero}>
            <span className={styles.label}>About Us</span>
            <h2 className={styles.title}>
              <span className={styles.titleRow}>
                <span className={styles.titleSans}>Design-led</span>
                <span className={styles.titleSerif}>development</span>
              </span>
              <span className={styles.titleLine}>
                <span className={styles.titlePrefix}>for</span>
                <HighlightText>modern digital products</HighlightText>
              </span>
            </h2>
            <p className={styles.subtitle}>
              We're a development studio that designs and builds custom digital products,
              combining visual criteria, solid frontend, and architectures built to scale.
            </p>
          </div>

          {/* Client Marquee */}
          <div className={styles.marqueeWrapper}>
            <ClientMarquee labelText="Trusted by innovative teams" speed={35} />
          </div>

          {/* Stats Row */}
          <div ref={statsRef} className={styles.statsRow}>
            {STATS.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <span
                  ref={(el) => { numberRefs.current[index] = el }}
                  className={styles.statNumber}
                >
                  0{stat.suffix}
                </span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSplineStrip
