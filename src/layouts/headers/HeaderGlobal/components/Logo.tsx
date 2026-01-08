import { Link } from 'react-router-dom'
import { AnimatedText } from '@/hooks/useCharacterStagger'
import type { LogoProps } from '../types'
import styles from './Logo.module.scss'

const Logo = ({ onClick, className = '' }: LogoProps) => {
  return (
    <Link to="/" className={`${styles.logo} ${className}`} onClick={onClick}>
      <AnimatedText className={styles.draft}>DRAFT</AnimatedText>
      <AnimatedText className={styles.studio}>STUDIO</AnimatedText>
    </Link>
  )
}

export default Logo
