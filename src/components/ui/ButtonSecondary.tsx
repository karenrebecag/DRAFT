import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { AnimatedText } from '@/hooks/useCharacterStagger'
import styles from './ButtonSecondary.module.scss'

interface ButtonSecondaryProps {
   children: string
   href?: string
   to?: string
   onClick?: () => void
   className?: string
   type?: 'button' | 'submit' | 'reset'
   disabled?: boolean
   showIcon?: boolean
}

const ButtonSecondary = ({
   children,
   href,
   to,
   onClick,
   className = '',
   type = 'button',
   disabled = false,
   showIcon = true,
}: ButtonSecondaryProps) => {
   const content = (
      <>
         <div className={styles.bg} />
         <AnimatedText className={styles.text}>{children}</AnimatedText>
         {showIcon && <ArrowUpRight className={styles.icon} strokeWidth={2} />}
      </>
   )

   const buttonClass = `${styles.button} ${className}`.trim()

   // External link
   if (href) {
      return (
         <a
            href={href}
            className={buttonClass}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={children}
         >
            {content}
         </a>
      )
   }

   // Internal link (React Router)
   if (to) {
      return (
         <Link to={to} className={buttonClass} onClick={onClick} aria-label={children}>
            {content}
         </Link>
      )
   }

   // Button element
   return (
      <button
         type={type}
         className={buttonClass}
         onClick={onClick}
         disabled={disabled}
         aria-label={children}
      >
         {content}
      </button>
   )
}

export default ButtonSecondary
