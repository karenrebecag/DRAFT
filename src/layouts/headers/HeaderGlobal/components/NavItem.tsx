import { Link } from 'react-router-dom'
import { AnimatedText } from '@/hooks/useCharacterStagger'
import type { NavItemProps } from '../types'
import styles from './NavItem.module.scss'

const NavItem = ({ item, isActive, onClick, index = 0 }: NavItemProps) => {
  return (
    <div
      className={styles.item}
      style={{ transitionDelay: `${index * 0.05}s` }}
    >
      <Link
        to={item.link}
        className={`${styles.link} ${isActive ? styles.active : ''}`}
        onClick={onClick}
      >
        <AnimatedText className={styles.text}>{item.title}</AnimatedText>
      </Link>
    </div>
  )
}

export default NavItem
