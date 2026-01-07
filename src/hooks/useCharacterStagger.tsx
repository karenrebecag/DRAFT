import { useEffect, useRef } from 'react'

const OFFSET_INCREMENT = 0.01 // Transition offset increment in seconds

export function useCharacterStagger<T extends HTMLElement>() {
   const ref = useRef<T>(null)
   const initialized = useRef(false)

   useEffect(() => {
      const element = ref.current
      if (!element || initialized.current) return

      const text = element.textContent || ''
      element.innerHTML = ''

      ;[...text].forEach((char, index) => {
         const span = document.createElement('span')
         span.textContent = char
         span.style.transitionDelay = `${index * OFFSET_INCREMENT}s`

         // Handle spaces explicitly
         if (char === ' ') {
            span.style.whiteSpace = 'pre'
         }

         element.appendChild(span)
      })

      initialized.current = true
   }, [])

   return ref
}

// Component version for more control
interface AnimatedTextProps {
   children: string
   className?: string
}

export function AnimatedText({ children, className }: AnimatedTextProps) {
   const ref = useCharacterStagger<HTMLSpanElement>()

   return (
      <span ref={ref} data-animate-chars className={className}>
         {children}
      </span>
   )
}
