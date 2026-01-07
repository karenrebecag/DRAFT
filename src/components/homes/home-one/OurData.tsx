import { useEffect, useRef, useState, useCallback } from 'react'
import SectionHeading from '../../ui/SectionHeading'
import StatCounter from '../../ui/StatCounter'
import LogoMarquee from '../../ui/LogoMarquee'
import ButtonSecondary from '../../ui/ButtonSecondary'
import styles from './OurData.module.scss'

const stats = [
  { value: 86, suffix: '+', label: 'Products Launched' },
  { value: 98, suffix: '%', label: 'Client Retention' },
  { value: 12, suffix: 'm', label: 'Revenue Generated' },
  { value: 223, suffix: 'm', label: 'Global Deployment' },
]

const OurData = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const appRef = useRef<import('@splinetool/runtime').Application | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasStartedLoading, setHasStartedLoading] = useState(false)

  // Load Spline Globe
  const loadSpline = useCallback(async () => {
    if (!canvasRef.current || hasStartedLoading) return
    setHasStartedLoading(true)

    try {
      const { Application } = await import('@splinetool/runtime')
      if (!canvasRef.current) return

      const app = new Application(canvasRef.current)
      appRef.current = app

      await app.load('/assets/models/Globe.splinecode')
      console.log('Globe Spline loaded')

      setTimeout(() => {
        setIsLoaded(true)
      }, 100)
    } catch (error) {
      console.error('Failed to load Globe Spline:', error)
    }
  }, [hasStartedLoading])

  // Start loading on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      loadSpline()
    }, 300)
    return () => clearTimeout(timer)
  }, [loadSpline])

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
    <section className={styles.section}>
      {/* Spline Globe Background */}
      <div className={styles.globeWrapper}>
        <canvas
          ref={canvasRef}
          className={`${styles.globeCanvas} ${isLoaded ? styles.loaded : ''}`}
        />
      </div>

      {/* Ambient glow */}
      <div className={styles.ambientGlow} />

      <div className={styles.container}>
        {/* Header */}
        <SectionHeading
          sectionNumber="04"
          sectionLabel="Our Data"
          titleLine1="Measurable Impact,"
          titleLine1Style="poppins"
          titleLine2="Engineered to Scale."
          titleLine2Style="arapey"
          description="We leverage data-driven strategies and technical precision to ensure every product we architect delivers tangible business growth for our global partners."
          descriptionMaxWidth="1100px"
          align="center"
        />

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          {stats.map((stat) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              duration={2.5}
            />
          ))}
        </div>

        {/* Logo Marquee */}
        <div className={styles.logoMarqueeWrapper}>
          <LogoMarquee speed={40} scrollSpeed={3} transparent />
        </div>

        {/* CTA Button */}
        <ButtonSecondary to="/case-studies">
          View Case Studies
        </ButtonSecondary>
      </div>
    </section>
  )
}

export default OurData
