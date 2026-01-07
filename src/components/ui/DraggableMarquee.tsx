import React from 'react'
import { useDraggableMarquee } from '../../hooks/useDraggableMarquee'
import styles from './DraggableMarquee.module.scss'

interface DraggableMarqueeProps {
  /** Initial direction: 'left' or 'right' */
  direction?: 'left' | 'right'
  /** Duration in seconds for one full loop (default: 20) */
  duration?: number
  /** Max speed multiplier when dragging (default: 35) */
  multiplier?: number
  /** Drag sensitivity (default: 0.01) */
  sensitivity?: number
  /** Content to render in marquee */
  children: React.ReactNode
  /** Additional class for wrapper */
  className?: string
}

const DraggableMarquee: React.FC<DraggableMarqueeProps> = ({
  direction = 'left',
  duration = 20,
  multiplier = 35,
  sensitivity = 0.01,
  children,
  className = '',
}) => {
  const { wrapperRef, collectionRef, listRef } = useDraggableMarquee({
    direction,
    duration,
    multiplier,
    sensitivity,
  })

  return (
    <div
      ref={wrapperRef}
      className={`${styles.marquee} ${className}`}
      data-direction={direction}
    >
      <div ref={collectionRef} className={styles.collection}>
        <div ref={listRef} className={styles.list}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default DraggableMarquee
