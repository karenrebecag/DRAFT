import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Observer } from "gsap/Observer"
import styles from "./SignalsStrip.module.scss"

gsap.registerPlugin(ScrollTrigger, Observer)

interface Signal {
   date: string
   title: string
   note: string
   tag: string
}

/**
 * SignalsStrip - Draggable Marquee Cards Section
 * Features infinite loop with drag-to-change-direction behavior
 * Based on GSAP Observer for smooth drag interactions
 */
const SignalsStrip = () => {
   const sectionRef = useRef<HTMLElement>(null)
   const headerRef = useRef<HTMLDivElement>(null)
   const wrapperRef = useRef<HTMLDivElement>(null)
   const collectionRef = useRef<HTMLDivElement>(null)
   const listRef = useRef<HTMLDivElement>(null)

   // Signals data - agency updates/capabilities
   const signals: Signal[] = [
      {
         date: "2025.01",
         title: "WebGL & 3D",
         note: "Immersive experiences with Three.js, WebGPU, and custom GLSL shaders. Performance-first approach.",
         tag: "Capability",
      },
      {
         date: "2025.01",
         title: "Design Systems",
         note: "Scalable component libraries with Storybook, design tokens, and automated documentation.",
         tag: "Methodology",
      },
      {
         date: "2024.12",
         title: "AI Integration",
         note: "LLM-powered features, intelligent chatbots, and AI-assisted workflows for modern products.",
         tag: "Innovation",
      },
      {
         date: "2024.11",
         title: "Motion Design",
         note: "GSAP, Framer Motion, and Lottie animations that elevate user experience without sacrificing performance.",
         tag: "Craft",
      },
      {
         date: "2024.10",
         title: "Headless CMS",
         note: "Strapi, Sanity, or Payload integrations for content-driven platforms with full flexibility.",
         tag: "Architecture",
      },
   ]

   // Marquee configuration
   const MARQUEE_CONFIG = {
      duration: 25,       // Base duration for one full cycle
      multiplier: 35,     // Max speed multiplier on drag
      sensitivity: 0.008, // Drag sensitivity
      direction: "left" as "left" | "right",
   }

   useEffect(() => {
      if (!sectionRef.current || !headerRef.current) return

      const ctx = gsap.context(() => {
         // Header slide in from left
         gsap.fromTo(
            headerRef.current,
            { x: -60, opacity: 0 },
            {
               x: 0,
               opacity: 1,
               duration: 1,
               ease: "power3.out",
               scrollTrigger: {
                  trigger: headerRef.current,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
               },
            },
         )
      }, sectionRef)

      return () => ctx.revert()
   }, [])

   // Draggable Marquee initialization
   useEffect(() => {
      const wrapper = wrapperRef.current
      const collection = collectionRef.current
      const list = listRef.current

      if (!wrapper || !collection || !list) return

      const wrapperWidth = wrapper.getBoundingClientRect().width
      const listWidth = list.scrollWidth || list.getBoundingClientRect().width

      if (!wrapperWidth || !listWidth) return

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
         duration: MARQUEE_CONFIG.duration,
         ease: "none",
         repeat: -1,
         onReverseComplete: () => { marqueeLoop.progress(1) },
         modifiers: {
            x: (x: string) => wrapX(parseFloat(x)) + "px",
         },
      })

      // Direction and time scale state
      const baseDirection = MARQUEE_CONFIG.direction === "right" ? -1 : 1
      const timeScale = { value: baseDirection }

      if (baseDirection < 0) marqueeLoop.progress(1)

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
            let velocityTimeScale = observerEvent.velocityX * -MARQUEE_CONFIG.sensitivity

            velocityTimeScale = gsap.utils.clamp(
               -MARQUEE_CONFIG.multiplier,
               MARQUEE_CONFIG.multiplier,
               velocityTimeScale
            )

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

      return () => {
         marqueeLoop.kill()
         marqueeObserver.kill()
         scrollTriggerInstance.kill()
         // Remove cloned elements
         const clones = collection.querySelectorAll("[data-draggable-marquee-clone]")
         clones.forEach((clone) => clone.remove())
      }
   }, [])

   return (
      <section ref={sectionRef} id="signals" className={styles.signalsStrip}>
         {/* Section header */}
         <div ref={headerRef} className={styles.header}>
            <span className={styles.label}>02 / SIGNALS</span>
            <h2 className={styles.title}>WHAT WE BRING</h2>
            <p className={styles.subtitle}>
               Capabilities and methodologies that power every project we deliver.
            </p>
         </div>

         {/* Draggable Marquee Container */}
         <div
            ref={wrapperRef}
            className={styles.marqueeWrapper}
            data-direction="left"
         >
            <div ref={collectionRef} className={styles.marqueeCollection}>
               <div ref={listRef} className={styles.marqueeList}>
                  {signals.map((signal, index) => (
                     <SignalCard key={index} signal={signal} index={index} />
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
      </section>
   )
}

function SignalCard({ signal, index }: { signal: Signal; index: number }) {
   return (
      <article className={styles.card} draggable={false}>
         {/* Card content */}
         <div className={styles.cardInner}>
            {/* Top torn edge effect */}
            <div className={styles.tornEdge} />

            {/* Issue number - editorial style */}
            <div className={styles.cardHeader}>
               <span className={styles.cardNumber}>
                  No. {String(index + 1).padStart(2, "0")}
               </span>
               <time className={styles.cardDate}>{signal.date}</time>
            </div>

            {/* Tag */}
            <span className={styles.cardTag}>{signal.tag}</span>

            {/* Title */}
            <h3 className={styles.cardTitle}>{signal.title}</h3>

            {/* Divider line */}
            <div className={styles.cardDivider} />

            {/* Description */}
            <p className={styles.cardDescription}>{signal.note}</p>

            {/* Corner fold effect */}
            <div className={styles.cornerFold}>
               <div className={styles.cornerFoldInner} />
            </div>
         </div>

         {/* Shadow/depth layer */}
         <div className={styles.cardShadow} />
      </article>
   )
}

export default SignalsStrip
