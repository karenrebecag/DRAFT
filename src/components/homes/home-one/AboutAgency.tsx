import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { HighlightText } from "../../ui/HighlightText"
import { ClientMarquee } from "../../ui/ClientMarquee"
import { StackedServiceCards, type ServiceCardData } from "../../ui/StackedServiceCard"
import { useRevealOnScroll } from "../../../hooks/useRevealOnScroll"
import { useScrollProgressNumber } from "../../../hooks/useScrollProgressNumber"
import { useStackingCardsParallax } from "../../../hooks/useStackingCardsParallax"
import TeamSection from "./TeamSection"
import styles from "./AboutAgency.module.scss"

gsap.registerPlugin(ScrollTrigger)

// Mock data for the agency section
const STATS = [
  { number: 150, suffix: "+", label: "Projects Delivered" },
  { number: 12, suffix: "", label: "Years Experience" },
  { number: 98, suffix: "%", label: "Client Retention" },
  { number: 24, suffix: "", label: "Team Members" },
]

// Stacking cards data - Our services with video backgrounds
const SERVICE_CARDS: ServiceCardData[] = [
  {
    id: 1,
    category: "Services",
    number: "01 / 06",
    titleFaded: "webgl",
    titleMain: "Immersive Web Experiences",
    techKey: "webgl",
    colorClass: "isGreen1",
    videoSrc: "https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/armor-3d-object-rotating-loop-2025-12-09-07-19-41-utc.mp4",
    ctaText: "Explore WebGL",
    ctaLink: "/services/webgl",
    ctaTheme: "primary",
  },
  {
    id: 2,
    category: "Services",
    number: "02 / 06",
    titleFaded: "platforms",
    titleMain: "Platforms & Web Applications",
    techKey: "platforms",
    colorClass: "isGreen2",
    ctaText: "Build Platform",
    ctaLink: "/services/platforms",
    ctaTheme: "primary",
  },
  {
    id: 3,
    category: "Services",
    number: "03 / 06",
    titleFaded: "commerce",
    titleMain: "High-Performance E-commerce",
    techKey: "commerce",
    colorClass: "isGreen3",
    ctaText: "Start Selling",
    ctaLink: "/services/commerce",
    ctaTheme: "primary",
  },
  {
    id: 4,
    category: "Services",
    number: "04 / 06",
    titleFaded: "mobile",
    titleMain: "Mobile Apps",
    techKey: "mobile",
    colorClass: "isGreen4",
    videoSrc: "https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/2.-E-Pass-16_9.mp4",
    ctaText: "Go Mobile",
    ctaLink: "/services/mobile",
    ctaTheme: "primary",
  },
  {
    id: 5,
    category: "Services",
    number: "05 / 06",
    titleFaded: "design",
    titleMain: "Product Design & Brand",
    techKey: "design",
    colorClass: "isGreen5",
    ctaText: "Design System",
    ctaLink: "/services/design",
    ctaTheme: "primary",
  },
  {
    id: 6,
    category: "Services",
    number: "06 / 06",
    titleFaded: "devops",
    titleMain: "Operations & Evolution",
    techKey: "devops",
    colorClass: "isGreen6",
    ctaText: "Scale Up",
    ctaLink: "/services/devops",
    ctaTheme: "primary",
  },
]


/**
 * AboutAgency - Editorial-style About section
 * Features:
 * - Osmo reveal pattern for staggered content
 * - Draggable Marquee for capabilities
 * - Stacking Cards Parallax for services
 * - Logo Wall Cycle for clients
 * - Scroll Progress Numbers for stats
 */
// Spline Application type
type SplineApp = {
  load: (url: string) => Promise<void>
  dispose: () => void
  stop?: () => void
  play?: () => void
}

const AboutAgency = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const stackingCardsRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const appRef = useRef<SplineApp | null>(null)
  const [isSplineLoaded, setIsSplineLoaded] = useState(false)

  // Enable animations
  useRevealOnScroll({ containerRef: sectionRef, enabled: true })
  useScrollProgressNumber({ containerRef: sectionRef, enabled: true })
  useStackingCardsParallax({ containerRef: stackingCardsRef, enabled: true, parallaxAmount: 50 })

  // Load Spline scene - simplified like HeroSpline
  useEffect(() => {
    if (!canvasRef.current) return

    let app: SplineApp | null = null

    const loadScene = async () => {
      // Dynamic import with type assertion
      const SplineModule = await import('@splinetool/runtime') as { Application: new (canvas: HTMLCanvasElement) => SplineApp }
      if (!canvasRef.current) return

      app = new SplineModule.Application(canvasRef.current)
      appRef.current = app

      try {
        // TODO: Re-export About.splinecode from Spline with 3D object
        await app.load('/assets/models/Banner.splinecode')
        console.log('✅ About Spline loaded')

        // Debug: log scene info
        console.log('Spline canvas size:', canvasRef.current?.width, canvasRef.current?.height)

        // Try to set transparent background if available
        if (canvasRef.current) {
          const gl = canvasRef.current.getContext('webgl2') || canvasRef.current.getContext('webgl')
          if (gl) {
            gl.clearColor(0, 0, 0, 0) // Transparent background
            console.log('WebGL context found, set transparent clear color')
          }
        }

        setIsSplineLoaded(true)
      } catch (error) {
        console.error('Failed to load About Spline:', error)
      }
    }

    loadScene()

    return () => {
      if (app) {
        app.dispose()
      }
    }
  }, [])

  // Handle visibility changes
  useEffect(() => {
    const app = appRef.current
    if (!app || !isSplineLoaded) return

    const handleVisibilityChange = () => {
      if (document.hidden) {
        app.stop?.()
      } else {
        app.play?.()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [isSplineLoaded])

  return (
    <section ref={sectionRef} id="about-agency" className={styles.aboutAgency}>
      {/* Spline Background - full viewport width */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100vw',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Hero Header - Full width, centered */}
      <div data-reveal-group data-stagger="100" className={styles.heroSection}>
        <span className={styles.label}>About Us</span>
        <h2 className={styles.title}>
          <span className={styles.titleSans}>Design-led</span>
          <span className={styles.titleSerif}>development</span>
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

   

      {/* Client Marquee - Trusted by section */}
      <ClientMarquee
        labelText="Trusted by innovative teams"
        speed={35}
      />

      {/* Stats Row with Animated Numbers */}
      <div
        data-reveal-group
        data-stagger="80"
        data-distance="3em"
        className={styles.statsRow}
      >
        {STATS.map((stat, index) => (
          <div key={index} className={styles.statItem}>
            <span
              data-progress-nr
              data-progress-target={stat.number}
              data-progress-suffix={stat.suffix}
              data-progress-duration="2"
              className={styles.statNumber}
            >
              0{stat.suffix}
            </span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Team Section with Momentum Hover */}
      <TeamSection />

      {/* Stacking Cards Section - Services with Video Backgrounds */}
      <div ref={stackingCardsRef}>
        <StackedServiceCards
          cards={SERVICE_CARDS}
          showVideoControls={false}
        />
      </div>

    </section>
  )
}

export default AboutAgency
