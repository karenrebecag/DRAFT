import { useEffect, useRef, useState, useCallback } from 'react'
import MethodologyWorkflow from './MethodologyWorkflow'
import styles from './Methodology.module.scss'

const Methodology = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const appRef = useRef<import('@splinetool/runtime').Application | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasStartedLoading, setHasStartedLoading] = useState(false)

  // Load Spline scene
  const loadSpline = useCallback(async () => {
    if (!canvasRef.current || hasStartedLoading) return
    setHasStartedLoading(true)

    try {
      const { Application } = await import('@splinetool/runtime')
      if (!canvasRef.current) return

      const app = new Application(canvasRef.current)
      appRef.current = app

      await app.load('/assets/models/Sphere.splinecode')
      setIsLoaded(true)
    } catch (error) {
      console.error('Failed to load Methodology Spline:', error)
    }
  }, [hasStartedLoading])

  // Lazy load when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadSpline()
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('methodology')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [loadSpline])

  // Handle visibility changes
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
    <section id="methodology" className={styles.strip}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Hero Section */}
          <div className={styles.hero}>
            {/* Section Tag: 03 — Our Methodology */}
            <div className={styles.sectionTag}>
              <span className="poppins-section-tag text-[#808080]">03</span>
              <div className={styles.tagLine} />
              <span className="poppins-section-tag text-[#808080]">Our Methodology</span>
            </div>

            {/* Main Title */}
            <h2 className={styles.title}>
              <span className="poppins-heading-light text-white block">A rigorous approach to</span>
              <span className="arapey-heading-italic text-white block">Digital Engineering</span>
            </h2>

            {/* Description */}
            <p className="poppins-body-light text-[#CACACA] text-center max-w-[1240px] m-0">
              Select a specialized service to explore our dedicated workflow.
            </p>
          </div>

          {/* Spline Sphere Element - Large & Responsive */}
          <div className={styles.splineWrapper}>
            <canvas
              ref={canvasRef}
              className={`${styles.splineCanvas} ${isLoaded ? styles.splineLoaded : ''}`}
            />
          </div>

          {/* Workflow Swiper */}
          <MethodologyWorkflow />

          {/* Visionaries Strip */}
          <div className={styles.visionariesStrip}>
            <span className="poppins-body-light text-white">
              Visionaries in Tech & Design
            </span>
            <div className={styles.visionariesAvatars}>
              <div className={styles.avatar} />
              <div className={styles.avatar} />
              <div className={styles.avatar} />
            </div>
            <span className="poppins-body-light text-white">
              Led by experts with a track record of building disruptive products from the ground up.
            </span>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Methodology
