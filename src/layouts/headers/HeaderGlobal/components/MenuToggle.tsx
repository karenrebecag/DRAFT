import type { MenuToggleProps } from '../types'
import styles from './MenuToggle.module.scss'

const MenuToggle = ({ isOpen, onToggle, label = 'Menu' }: MenuToggleProps) => {
  return (
    <button
      className={styles.toggle}
      onClick={onToggle}
      aria-label={label}
      aria-expanded={isOpen}
    >
      <div className={styles.bar} />
      <div className={styles.bar} />
    </button>
  )
}

export default MenuToggle
