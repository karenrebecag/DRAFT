import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Observer } from "gsap/Observer"
import { HighlightText } from "../../ui/HighlightText"
import { TechMarquee } from "../../ui/TechMarquee"
import { useRevealOnScroll } from "../../../hooks/useRevealOnScroll"
import { useScrollProgressNumber } from "../../../hooks/useScrollProgressNumber"
import { useStackingCardsParallax } from "../../../hooks/useStackingCardsParallax"
import styles from "./AboutAgency.module.scss"

gsap.registerPlugin(ScrollTrigger, Observer)

// Mock data for the agency section
const STATS = [
  { number: 150, suffix: "+", label: "Projects Delivered" },
  { number: 12, suffix: "", label: "Years Experience" },
  { number: 98, suffix: "%", label: "Client Retention" },
  { number: 24, suffix: "", label: "Team Members" },
]

// Capability cards for the draggable marquee
const CAPABILITY_CARDS = [
  {
    icon: "✦",
    title: "WebGL & 3D",
    description: "Immersive experiences with Three.js and WebGPU",
    tag: "Capability",
  },
  {
    icon: "◈",
    title: "Design Systems",
    description: "Scalable component libraries with design tokens",
    tag: "Methodology",
  },
  {
    icon: "⬡",
    title: "AI Integration",
    description: "LLM-powered features and intelligent workflows",
    tag: "Innovation",
  },
  {
    icon: "◉",
    title: "Motion Design",
    description: "GSAP and Framer Motion animations",
    tag: "Craft",
  },
  {
    icon: "⬢",
    title: "Headless CMS",
    description: "Strapi, Sanity, or Payload integrations",
    tag: "Architecture",
  },
  {
    icon: "✧",
    title: "Performance",
    description: "Core Web Vitals optimization at scale",
    tag: "Engineering",
  },
]

// Stacking cards data - Our services (from i18n)
const SERVICE_CARDS = [
  {
    id: 1,
    category: "Services",
    number: "01 / 06",
    titleFaded: "webgl",
    titleMain: "Immersive Web Experiences",
    techKey: "webgl",
    colorClass: "isGreen1",
  },
  {
    id: 2,
    category: "Services",
    number: "02 / 06",
    titleFaded: "platforms",
    titleMain: "Platforms & Web Applications",
    techKey: "platforms",
    colorClass: "isGreen2",
  },
  {
    id: 3,
    category: "Services",
    number: "03 / 06",
    titleFaded: "commerce",
    titleMain: "High-Performance E-commerce",
    techKey: "commerce",
    colorClass: "isGreen3",
  },
  {
    id: 4,
    category: "Services",
    number: "04 / 06",
    titleFaded: "mobile",
    titleMain: "Mobile Apps",
    techKey: "mobile",
    colorClass: "isGreen4",
  },
  {
    id: 5,
    category: "Services",
    number: "05 / 06",
    titleFaded: "design",
    titleMain: "Product Design & Brand",
    techKey: "design",
    colorClass: "isGreen5",
  },
  {
    id: 6,
    category: "Services",
    number: "06 / 06",
    titleFaded: "devops",
    titleMain: "Operations & Evolution",
    techKey: "devops",
    colorClass: "isGreen6",
  },
]

const PRINCIPLES = [
  {
    number: "01",
    title: "We believe in",
    highlight: "collaboration",
    description:
      "Every project starts with deep understanding. We work alongside you, not just for you. True partnership means shared ownership of both challenges and victories.",
  },
  {
    number: "02",
    title: "Obsessed with",
    highlight: "craft",
    description:
      "Details matter. The spacing, the timing, the subtle interactions—these small things create the difference between good and exceptional. We sweat the details so you don't have to.",
  },
  {
    number: "03",
    title: "Driven by",
    highlight: "results",
    description:
      "Beautiful design that doesn't convert is just decoration. We measure success by the impact we create for your business, not just the awards on our shelf.",
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
const AboutAgency = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const stackingCardsRef = useRef<HTMLDivElement>(null)
  const marqueeWrapperRef = useRef<HTMLDivElement>(null)
  const marqueeCollectionRef = useRef<HTMLDivElement>(null)
  const marqueeListRef = useRef<HTMLDivElement>(null)

  // Enable animations
  useRevealOnScroll({ containerRef: sectionRef, enabled: true })
  useScrollProgressNumber({ containerRef: sectionRef, enabled: true })
  useStackingCardsParallax({ containerRef: stackingCardsRef, enabled: true, parallaxAmount: 50 })

  // Draggable Marquee initialization
  useEffect(() => {
    const wrapper = marqueeWrapperRef.current
    const collection = marqueeCollectionRef.current
    const list = marqueeListRef.current

    if (!wrapper || !collection || !list) return

    // Wait for DOM to be ready
    const initMarquee = () => {
      const wrapperWidth = wrapper.getBoundingClientRect().width
      const listWidth = list.scrollWidth || list.getBoundingClientRect().width

      if (!wrapperWidth || !listWidth) return null

      // Clone lists to fill viewport for seamless loop
      const minRequiredWidth = wrapperWidth + listWidth + 2
      while (collection.scrollWidth < minRequiredWidth) {
        const listClone = list.cloneNode(true) as HTMLElement
        listClone.setAttribute("data-draggable-marquee-clone", "")
        listClone.setAttribute("aria-hidden", "true")
        collection.appendChild(listClone)
      }

      const wrapX = gsap.utils.wrap(-listWidth, 0)

      gsap.set(collection, { x: 0 })

      // Create the marquee animation loop
      const marqueeLoop = gsap.to(collection, {
        x: -listWidth,
        duration: 30,
        ease: "none",
        repeat: -1,
        onReverseComplete: () => { marqueeLoop.progress(1) },
        modifiers: {
          x: (x: string) => wrapX(parseFloat(x)) + "px",
        },
      })

      const timeScale = { value: 1 }

      const applyTimeScale = () => {
        marqueeLoop.timeScale(timeScale.value)
        wrapper.setAttribute("data-direction", timeScale.value < 0 ? "right" : "left")
      }

      applyTimeScale()

      // Drag observer for directional control
      const marqueeObserver = Observer.create({
        target: wrapper,
        type: "pointer,touch",
        preventDefault: true,
        debounce: false,
        onChangeX: (observerEvent) => {
          let velocityTimeScale = observerEvent.velocityX * -0.008
          velocityTimeScale = gsap.utils.clamp(-35, 35, velocityTimeScale)

          gsap.killTweensOf(timeScale)

          const restingDirection = velocityTimeScale < 0 ? -1 : 1

          gsap.timeline({ onUpdate: applyTimeScale })
            .to(timeScale, { value: velocityTimeScale, duration: 0.1, overwrite: true })
            .to(timeScale, { value: restingDirection, duration: 1.0 })
        },
      })

      // ScrollTrigger to pause/resume when out of view
      const scrollTriggerInstance = ScrollTrigger.create({
        trigger: wrapper,
        start: "top bottom",
        end: "bottom top",
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

      return { marqueeLoop, marqueeObserver, scrollTriggerInstance }
    }

    // Small delay to ensure DOM is ready
    const timeout = setTimeout(() => {
      const instances = initMarquee()
      if (!instances) return

      // Store cleanup function
      ;(wrapper as any).__marqueeCleanup = () => {
        instances.marqueeLoop.kill()
        instances.marqueeObserver.kill()
        instances.scrollTriggerInstance.kill()
        const clones = collection.querySelectorAll("[data-draggable-marquee-clone]")
        clones.forEach((clone) => clone.remove())
      }
    }, 100)

    return () => {
      clearTimeout(timeout)
      const cleanup = (wrapper as any).__marqueeCleanup
      if (cleanup) cleanup()
    }
  }, [])

  return (
    <section ref={sectionRef} id="about-agency" className={styles.aboutAgency}>
      {/* Hero Header with Image */}
      <div className={styles.heroRow}>
        <div data-reveal-group data-stagger="120" className={styles.header}>
          <span className={styles.label}>About Us</span>
          <h2 className={styles.title}>
            We craft digital experiences that{" "}
            <HighlightText>move people</HighlightText>
          </h2>
          <p className={styles.subtitle}>
            Draft Studio is a design-driven digital agency specializing in brand
            identity, web experiences, and creative technology. We partner with
            ambitious brands to build products that stand out.
          </p>
        </div>

        {/* Hero Image */}
        <div className={styles.heroImageWrapper}>
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"
            alt="Abstract 3D shapes"
            className={styles.heroImage}
          />
        </div>
      </div>

      {/* Nav Strip */}
      <div className={styles.navStrip}>
        <div className={styles.navStripBg} />
      </div>

      {/* Draggable Marquee - Capabilities */}
      <div
        ref={marqueeWrapperRef}
        className={styles.marqueeWrapper}
        data-direction="left"
      >
        <div ref={marqueeCollectionRef} className={styles.marqueeCollection}>
          <div ref={marqueeListRef} className={styles.marqueeList}>
            {CAPABILITY_CARDS.map((card, index) => (
              <article key={index} className={styles.marqueeCard} draggable={false}>
                <div className={styles.marqueeCardInner}>
                  <span className={styles.marqueeCardIcon}>{card.icon}</span>
                  <span className={styles.marqueeCardTag}>{card.tag}</span>
                  <h3 className={styles.marqueeCardTitle}>{card.title}</h3>
                  <p className={styles.marqueeCardDesc}>{card.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Drag hint */}
      <div className={styles.dragHint}>
        <span className={styles.dragHintText}>Drag to explore</span>
        <svg className={styles.dragHintIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M7 16l5 5 5-5M17 8l-5-5-5 5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

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

      {/* Stacking Cards Section - Services */}
      <div ref={stackingCardsRef} className={styles.stackingCardsCollection}>
        <div className={styles.stackingCardsList}>
          {SERVICE_CARDS.map((card) => (
            <div
              key={card.id}
              data-stacking-cards-item
              className={`${styles.stackingCardsItem} ${styles[card.colorClass]}`}
            >
              {/* Top bar */}
              <div className={styles.stackingCardsItemTop}>
                <span className={styles.stackingCardTopSpan}>{card.category}</span>
                <span className={styles.stackingCardTopSpan}>{card.number}</span>
              </div>

              {/* Content */}
              <div data-stacking-cards-content className={styles.stackingCardsContent}>
                <h2 className={styles.stackingCardsItemH}>
                  <span className={styles.stackingCardHeadingFaded}>{card.titleFaded}</span>
                  <br />
                  {card.titleMain}
                </h2>
                <TechMarquee serviceKey={card.techKey} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Principles Section */}
      <div className={styles.principlesSection}>
        <div
          data-reveal-group
          data-stagger="80"
          className={styles.principlesHeader}
        >
          <span className={styles.label}>Our Philosophy</span>
          <h3 className={styles.sectionTitle}>
            Principles that guide our work
          </h3>
        </div>

        <div className={styles.principlesGrid}>
          {PRINCIPLES.map((principle, index) => (
            <div
              key={index}
              data-reveal-group
              data-stagger="100"
              data-distance="2.5em"
              className={styles.principleCard}
            >
              <span className={styles.principleNumber}>{principle.number}</span>
              <h4 className={styles.principleTitle}>
                {principle.title}{" "}
                <HighlightText>{principle.highlight}</HighlightText>
              </h4>
              <p className={styles.principleDescription}>
                {principle.description}
              </p>
              <div className={styles.principleLine} />
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

export default AboutAgency
