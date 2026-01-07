import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './SectionHeading.module.scss'

gsap.registerPlugin(ScrollTrigger)

interface SectionHeadingProps {
  // Section tag (optional - hero sections may not have it)
  sectionNumber?: string
  sectionLabel?: string

  // Title (2 lines)
  titleLine1: string
  titleLine1Style?: 'poppins' | 'arapey'
  titleLine2: string
  titleLine2Style?: 'poppins' | 'arapey'

  // Description (optional)
  description?: string
  descriptionMaxWidth?: string // e.g. "800px" or "1240px"
  descriptionColor?: string // e.g. "#999999" or "#CACACA"

  // Heading level for accessibility
  as?: 'h1' | 'h2' | 'h3'

  // Animation (default: true)
  animate?: boolean

  // Alignment (default: center)
  align?: 'center' | 'left' | 'right'

  // Custom class
  className?: string
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  sectionNumber,
  sectionLabel,
  titleLine1,
  titleLine1Style = 'poppins',
  titleLine2,
  titleLine2Style = 'arapey',
  description,
  descriptionMaxWidth = '1240px',
  descriptionColor = '#CACACA',
  as: Tag = 'h2',
  animate = true,
  align = 'center',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionTagRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  const getLineClass = (style: 'poppins' | 'arapey') => {
    return style === 'arapey'
      ? 'arapey-heading-italic text-white block'
      : 'poppins-heading-light text-white block'
  }

  const hasSectionTag = sectionNumber || sectionLabel

  // Scroll-triggered entrance animation
  useEffect(() => {
    if (!animate || !containerRef.current) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReduced) return

    const elements: HTMLElement[] = []
    if (sectionTagRef.current) elements.push(sectionTagRef.current)
    if (titleRef.current) elements.push(titleRef.current)

    if (!elements.length) return

    // Set initial state
    gsap.set(elements, { y: 40, autoAlpha: 0 })

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(elements, {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            onComplete: () => {
              elements.forEach((el) => gsap.set(el, { clearProps: 'all' }))
            },
          })
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [animate])

  const alignClass = align !== 'center' ? styles[`align${align.charAt(0).toUpperCase() + align.slice(1)}`] : ''

  return (
    <div ref={containerRef} className={`${styles.heading} ${alignClass} ${className}`}>
      {/* Section Tag */}
      {hasSectionTag && (
        <div ref={sectionTagRef} className={styles.sectionTag}>
          {sectionNumber && (
            <span className="poppins-section-tag text-[#808080]">
              {sectionNumber}
            </span>
          )}
          <div className={styles.tagLine} />
          {sectionLabel && (
            <span className="poppins-section-tag text-[#808080]">
              {sectionLabel}
            </span>
          )}
        </div>
      )}

      {/* Title */}
      <Tag ref={titleRef as React.RefObject<HTMLHeadingElement>} className={styles.title}>
        <span className={getLineClass(titleLine1Style)}>{titleLine1}</span>
        <span className={getLineClass(titleLine2Style)}>{titleLine2}</span>
      </Tag>

      {/* Description with masked text reveal */}
      {description && (
        <p
          className={`${styles.description} poppins-body-light`}
          style={{
            maxWidth: descriptionMaxWidth,
            color: descriptionColor,
          }}
          data-split={animate ? 'lines' : undefined}
        >
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionHeading
