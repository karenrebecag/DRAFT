import { useRef, type ReactNode } from 'react'
import styles from './MomentumCard.module.scss'

interface MomentumCardProps {
  image: string
  imageAlt: string
  children: ReactNode
  onHover: (e: React.MouseEvent, target: HTMLElement | null) => void
  className?: string
  aspectRatio?: number
}

const MomentumCard = ({
  image,
  imageAlt,
  children,
  onHover,
  className = '',
  aspectRatio = 150,
}: MomentumCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className={`${styles.cardWrap} ${className}`}
      data-momentum-hover-element
      onMouseEnter={(e) => onHover(e, cardRef.current)}
    >
      <div ref={cardRef} className={styles.card} data-momentum-hover-target>
        <div
          className={styles.cardBefore}
          style={{ paddingTop: `${aspectRatio}%` }}
        />
        <img
          src={image}
          loading="eager"
          alt={imageAlt}
          className={styles.cardImage}
        />
        <div className={styles.cardContent}>{children}</div>
      </div>
    </div>
  )
}

export default MomentumCard
