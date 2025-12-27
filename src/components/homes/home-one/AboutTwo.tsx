import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { useI18n } from "../../../i18n"

// Vertical Marquee Component
interface VerticalMarqueeProps {
   children: React.ReactNode
   speed?: number
   className?: string
}

const VerticalMarquee = ({ children, speed = 25, className = "" }: VerticalMarqueeProps) => {
   return (
      <div
         className={`td-vertical-marquee ${className}`}
         style={{ "--duration": `${speed}s` } as React.CSSProperties}
      >
         <div className="td-vertical-marquee-track">
            {children}
         </div>
         <div className="td-vertical-marquee-track" aria-hidden="true">
            {children}
         </div>
      </div>
   )
}

const AboutTwo = () => {
   const { t } = useI18n()
   const marqueeRef = useRef<HTMLDivElement>(null)

   // Dynamic opacity based on distance from center
   useEffect(() => {
      const marqueeContainer = marqueeRef.current
      if (!marqueeContainer) return

      const updateOpacity = () => {
         const items = marqueeContainer.querySelectorAll('.td-marquee-item')
         const containerRect = marqueeContainer.getBoundingClientRect()
         const centerY = containerRect.top + containerRect.height / 2

         items.forEach((item) => {
            const itemRect = item.getBoundingClientRect()
            const itemCenterY = itemRect.top + itemRect.height / 2
            const distance = Math.abs(centerY - itemCenterY)
            const maxDistance = containerRect.height / 2
            const normalizedDistance = Math.min(distance / maxDistance, 1)
            // Items closer to center are more opaque
            const opacity = 1 - normalizedDistance * 0.7
            ;(item as HTMLElement).style.opacity = opacity.toString()
         })
      }

      let animationFrame: number
      const animate = () => {
         updateOpacity()
         animationFrame = requestAnimationFrame(animate)
      }

      animationFrame = requestAnimationFrame(animate)

      return () => cancelAnimationFrame(animationFrame)
   }, [])

   // Get marquee values from translations
   const marqueeValues = t.aboutTwo.marqueeValues as readonly string[]

   return (
      <section className="td-culture-section">
         <div className="container">
            <div className="td-culture-grid">
               {/* Left Content - Header & CTA */}
               <div className="td-culture-content">
                  <span className="td-culture-subtitle">{t.aboutTwo.subtitle}</span>
                  <h2 className="td-culture-title">
                     {t.aboutTwo.title} <span>{t.aboutTwo.titleHighlight}</span>
                  </h2>
                  <p className="td-culture-description">
                     {t.aboutTwo.description}
                  </p>
                  <Link to="/about" className="td-culture-cta">
                     {t.aboutTwo.cta}
                     <i className="fa-solid fa-arrow-right"></i>
                  </Link>
               </div>

               {/* Right Content - Vertical Marquee with Values */}
               <div ref={marqueeRef} className="td-culture-marquee-wrap">
                  <div className="td-culture-marquee-container">
                     {/* Vignette overlays */}
                     <div className="td-marquee-vignette-top"></div>
                     <div className="td-marquee-vignette-bottom"></div>

                     {/* Vertical Marquee */}
                     <VerticalMarquee speed={20}>
                        {marqueeValues.map((value, idx) => (
                           <div key={idx} className="td-marquee-item">
                              {value}
                           </div>
                        ))}
                     </VerticalMarquee>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default AboutTwo
