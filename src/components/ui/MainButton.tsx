import { useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import styles from './MainButton.module.scss'

export type ButtonTheme = 'dark' | 'light' | 'primary'

interface MainButtonProps {
   children: React.ReactNode
   href?: string
   to?: string
   theme?: ButtonTheme
   onClick?: () => void
   className?: string
   type?: 'button' | 'submit' | 'reset'
   disabled?: boolean
   image?: string
   imageAlt?: string
}

const MainButton = ({
   children,
   href,
   to,
   theme = 'dark',
   onClick,
   className = '',
   type = 'button',
   disabled = false,
   image,
   imageAlt = ''
}: MainButtonProps) => {
   const circleRef = useRef<HTMLDivElement>(null)

   const handleHover = useCallback((event: React.MouseEvent<HTMLElement>) => {
      const button = event.currentTarget
      const buttonRect = button.getBoundingClientRect()

      const buttonWidth = buttonRect.width
      const buttonHeight = buttonRect.height
      const buttonCenterX = buttonRect.left + buttonWidth / 2

      const mouseX = event.clientX
      const mouseY = event.clientY

      const offsetXFromLeft = ((mouseX - buttonRect.left) / buttonWidth) * 100
      const offsetYFromTop = ((mouseY - buttonRect.top) / buttonHeight) * 100

      let offsetXFromCenter = ((mouseX - buttonCenterX) / (buttonWidth / 2)) * 50
      offsetXFromCenter = Math.abs(offsetXFromCenter)

      if (circleRef.current) {
         circleRef.current.style.left = `${offsetXFromLeft.toFixed(1)}%`
         circleRef.current.style.top = `${offsetYFromTop.toFixed(1)}%`
         circleRef.current.style.width = `${115 + offsetXFromCenter * 2}%`
      }
   }, [])

   const buttonContent = (
      <>
         <div className={styles.bg} />
         <div className={styles.circleWrap}>
            <div ref={circleRef} className={styles.circle}>
               <div className={styles.before100} />
            </div>
         </div>
         {image && (
            <div className={styles.image}>
               <img src={image} alt={imageAlt} className={styles.img} loading="eager" />
            </div>
         )}
         <div className={styles.text}>
            <span className={styles.textP}>{children}</span>
         </div>
      </>
   )

   const buttonClasses = `${styles.btn} ${styles[theme]} ${className}`.trim()

   // External link
   if (href) {
      return (
         <a
            href={href}
            className={buttonClasses}
            onMouseEnter={handleHover}
            onMouseMove={handleHover}
            onMouseLeave={handleHover}
            target="_blank"
            rel="noopener noreferrer"
         >
            {buttonContent}
         </a>
      )
   }

   // Internal link (React Router)
   if (to) {
      return (
         <Link
            to={to}
            className={buttonClasses}
            onMouseEnter={handleHover}
            onMouseMove={handleHover}
            onMouseLeave={handleHover}
            onClick={onClick}
         >
            {buttonContent}
         </Link>
      )
   }

   // Button element
   return (
      <button
         type={type}
         className={buttonClasses}
         onClick={onClick}
         disabled={disabled}
         onMouseEnter={handleHover}
         onMouseMove={handleHover}
         onMouseLeave={handleHover}
      >
         {buttonContent}
      </button>
   )
}

export default MainButton
