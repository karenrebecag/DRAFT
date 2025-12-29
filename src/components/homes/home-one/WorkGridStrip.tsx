import { useState, useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import styles from "./WorkGridStrip.module.scss"

gsap.registerPlugin(ScrollTrigger)

interface Experiment {
   title: string
   medium: string
   description: string
   span: string
}

/**
 * WorkGridStrip - Asymmetric grid section for showcasing work/capabilities
 * Inspired by interface project's WorkSection
 */
const WorkGridStrip = () => {
   const sectionRef = useRef<HTMLElement>(null)
   const headerRef = useRef<HTMLDivElement>(null)
   const gridRef = useRef<HTMLDivElement>(null)

   // Experiments/capabilities data
   const experiments: Experiment[] = [
      {
         title: "Immersive Web",
         medium: "WebGL / Three.js",
         description: "3D experiences, custom shaders, and interactive visualizations that push browser limits.",
         span: "span2x2",
      },
      {
         title: "Product Design",
         medium: "UX Strategy",
         description: "Research-driven interfaces that convert and delight.",
         span: "span1x1",
      },
      {
         title: "Motion Systems",
         medium: "GSAP / Framer",
         description: "Animation frameworks that elevate every interaction without sacrificing performance.",
         span: "span1x2",
      },
      {
         title: "Design Tokens",
         medium: "Systems",
         description: "Scalable design languages that grow with your brand.",
         span: "span1x1",
      },
      {
         title: "Platform Architecture",
         medium: "Full-Stack",
         description: "Next.js, Node.js, serverless. Robust backends that handle real scale.",
         span: "span2x1",
      },
      {
         title: "AI Integration",
         medium: "LLM / ML",
         description: "Intelligent features powered by modern AI capabilities.",
         span: "span1x1",
      },
   ]

   useEffect(() => {
      if (!sectionRef.current || !headerRef.current || !gridRef.current) return

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
                  start: "top 90%",
                  toggleActions: "play none none reverse",
               },
            },
         )

         // Cards stagger animation
         const cards = gridRef.current?.querySelectorAll("article")
         if (cards && cards.length > 0) {
            gsap.set(cards, { y: 60, opacity: 0 })
            gsap.to(cards, {
               y: 0,
               opacity: 1,
               duration: 0.8,
               stagger: 0.1,
               ease: "power3.out",
               scrollTrigger: {
                  trigger: gridRef.current,
                  start: "top 90%",
                  toggleActions: "play none none reverse",
               },
            })
         }
      }, sectionRef)

      return () => ctx.revert()
   }, [])

   return (
      <section ref={sectionRef} id="work-grid" className={styles.workGridStrip}>
         {/* Section header */}
         <div ref={headerRef} className={styles.header}>
            <div className={styles.headerLeft}>
               <span className={styles.label}>03 / CAPABILITIES</span>
               <h2 className={styles.title}>WHAT WE BUILD</h2>
            </div>
            <p className={styles.headerRight}>
               Studies across interface design, engineering systems, and digital craft.
            </p>
         </div>

         {/* Asymmetric grid */}
         <div ref={gridRef} className={styles.grid}>
            {experiments.map((experiment, index) => (
               <WorkCard
                  key={index}
                  experiment={experiment}
                  index={index}
                  persistHover={index === 0}
               />
            ))}
         </div>
      </section>
   )
}

function WorkCard({
   experiment,
   index,
   persistHover = false,
}: {
   experiment: Experiment
   index: number
   persistHover?: boolean
}) {
   const [isHovered, setIsHovered] = useState(false)
   const cardRef = useRef<HTMLElement>(null)
   const [isScrollActive, setIsScrollActive] = useState(false)

   useEffect(() => {
      if (!persistHover || !cardRef.current) return

      const ctx = gsap.context(() => {
         ScrollTrigger.create({
            trigger: cardRef.current,
            start: "top 80%",
            onEnter: () => setIsScrollActive(true),
         })
      }, cardRef)

      return () => ctx.revert()
   }, [persistHover])

   const isActive = isHovered || isScrollActive

   return (
      <article
         ref={cardRef}
         className={`${styles.card} ${styles[experiment.span]} ${isActive ? styles.active : ""}`}
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
      >
         {/* Background layer */}
         <div className={styles.cardBg} />

         {/* Content */}
         <div className={styles.cardContent}>
            <span className={styles.cardMedium}>{experiment.medium}</span>
            <h3 className={styles.cardTitle}>{experiment.title}</h3>
         </div>

         {/* Description - reveals on hover */}
         <div className={styles.cardDescription}>
            <p>{experiment.description}</p>
         </div>

         {/* Index marker */}
         <span className={styles.cardIndex}>
            {String(index + 1).padStart(2, "0")}
         </span>

         {/* Corner accent */}
         <div className={styles.cornerAccent}>
            <div className={styles.cornerLine1} />
            <div className={styles.cornerLine2} />
         </div>
      </article>
   )
}

export default WorkGridStrip
