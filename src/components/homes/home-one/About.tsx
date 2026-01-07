import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ServicesSlider from './ServicesSlider'
import styles from './About.module.scss'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { number: 150, suffix: '+', label: 'Projects Delivered' },
  { number: 12, suffix: '', label: 'Years Experience' },
  { number: 98, suffix: '%', label: 'Client Retention' },
  { number: 24, suffix: '', label: 'Team Members' },
]

const About = () => {
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


        {/* Content */}
        <div className={styles.content}>
          {/* Hero Section */}
          <div className={styles.hero}>
            {/* Section Tag: 02 — About Us */}
            <div className={styles.sectionTag}>
              <span className="poppins-section-tag text-[#808080]">02</span>
              <div className={styles.tagLine} />
              <span className="poppins-section-tag text-[#808080]">About Us</span>
            </div>

            {/* Main Title */}
            <h2 className={styles.title}>
              <span className="poppins-heading-light text-white block">Engineering Digital Excellence</span>
              <span className="arapey-heading-italic text-white block">Designing Human Experiences.</span>
            </h2>

            {/* Description */}
            <p className="poppins-body-light text-[#CACACA] text-center max-w-[1240px] m-0">
              Based in Mexico City and operating worldwide, we are a specialized studio dedicated to architecting high-performance digital products. From bespoke MVPs to massive, scalable ecosystems, we combine rigorous engineering with cutting-edge aesthetics.
            </p>
          </div>

          {/* Curved Services Marquee */}
          <ServicesSlider />

        </div>
      </div>
    </section>
  )
}

export default About
