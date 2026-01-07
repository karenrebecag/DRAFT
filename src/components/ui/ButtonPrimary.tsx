import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import styles from './ButtonPrimary.module.scss'

interface ButtonPrimaryProps {
   children: React.ReactNode
   href?: string
   to?: string
   onClick?: () => void
   className?: string
   type?: 'button' | 'submit' | 'reset'
   disabled?: boolean
   icon?: React.ReactNode
   showIcon?: boolean
}

const ButtonPrimary = ({
   children,
   href,
   to,
   onClick,
   className = '',
   type = 'button',
   disabled = false,
   icon,
   showIcon = true,
}: ButtonPrimaryProps) => {
   const iconElement = showIcon && (
      icon || <ArrowUpRight className={styles.icon} strokeWidth={2} />
   )

   const content = (
      <>
         <span>{children}</span>
         {iconElement}
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
         >
            {content}
         </a>
      )
   }

   // Internal link (React Router)
   if (to) {
      return (
         <Link to={to} className={buttonClass} onClick={onClick}>
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
      >
         {content}
      </button>
   )
}

export default ButtonPrimary
