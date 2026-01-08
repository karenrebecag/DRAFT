import { ChevronDown } from 'lucide-react'
import type { ScrollDownButtonProps } from '../types'
import styles from './ScrollDownButton.module.scss'

const scrollToNextSection = () => {
  window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
}

const ScrollDownButton = ({ onClick }: ScrollDownButtonProps) => {
  const handleClick = onClick || scrollToNextSection

  return (
    <button
      onClick={handleClick}
      className={styles.button}
      aria-label="Scroll down"
    >
      <ChevronDown className={styles.icon} />
    </button>
  )
}

export default ScrollDownButton
