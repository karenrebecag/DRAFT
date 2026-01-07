import React from 'react'
import { useCountUp } from '../../hooks/useCountUp'
import styles from './StatCounter.module.scss'

interface StatCounterProps {
  /** Target number to count to */
  value: number
  /** Suffix (e.g., '+', '%', 'm') */
  suffix?: string
  /** Prefix (e.g., '$') */
  prefix?: string
  /** Label text below the number */
  label: string
  /** Animation duration in seconds */
  duration?: number
}

const StatCounter: React.FC<StatCounterProps> = ({
  value,
  suffix = '',
  prefix = '',
  label,
  duration = 2,
}) => {
  const { displayValue, containerRef } = useCountUp({
    end: value,
    suffix,
    prefix,
    duration,
    ease: 'power2.out',
  })

  return (
    <div ref={containerRef} className={styles.stat}>
      <div className={`${styles.value} arapey-heading-italic`}>
        {displayValue}
      </div>
      <div className={styles.labelRow}>
        <span className={styles.dot} />
        <span className={styles.label}>{label}</span>
      </div>
      <div className={styles.divider} />
    </div>
  )
}

export default StatCounter
