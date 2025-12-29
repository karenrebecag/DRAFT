"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import "./MorphingTextReveal.css"

interface MorphingTextRevealProps {
  texts: string[]
  className?: string
  interval?: number
  glitchOnHover?: boolean
}

export function MorphingTextReveal({
  texts,
  className,
  interval = 3000,
  glitchOnHover = true,
}: MorphingTextRevealProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const morphToNext = useCallback(() => {
    if (isAnimating) return

    setIsAnimating(true)
    const currentText = texts[currentIndex]
    const nextIndex = (currentIndex + 1) % texts.length
    const nextText = texts[nextIndex]

    // Determine the longer text for animation
    const maxLength = Math.max(currentText.length, nextText.length)

    // Animate character by character
    let step = 0
    const animateStep = () => {
      if (step <= maxLength) {
        let newText = ""

        for (let i = 0; i < maxLength; i++) {
          if (i < step) {
            // Show next character
            newText += nextText[i] || ""
          } else if (i < currentText.length) {
            // Show current character with random glitch
            const shouldGlitch = Math.random() > 0.7
            newText += shouldGlitch ? getRandomChar() : currentText[i]
          }
        }

        setDisplayText(newText)
        step++
        setTimeout(animateStep, 80)
      } else {
        setDisplayText(nextText)
        setCurrentIndex(nextIndex)
        setIsAnimating(false)
      }
    }

    animateStep()
  }, [currentIndex, texts, isAnimating])

  const getRandomChar = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
    return chars[Math.floor(Math.random() * chars.length)]
  }

  useEffect(() => {
    if (texts.length === 0) return
    setDisplayText(texts[0])
  }, [texts])

  useEffect(() => {
    if (texts.length <= 1) return

    const timer = setInterval(morphToNext, interval)
    return () => clearInterval(timer)
  }, [morphToNext, interval, texts.length])

  const handleMouseEnter = () => {
    if (glitchOnHover) {
      setIsHovered(true)
      setTimeout(() => setIsHovered(false), 300)
    }
  }

  if (texts.length === 0) return null

  return (
    <span className={cn("morphing-text-reveal", className)} onMouseEnter={handleMouseEnter}>
      <span
        className={cn(
          "morphing-text-content",
          isHovered && glitchOnHover && "glitch-effect",
        )}
      >
        {displayText.split("").map((char, index) => (
          <span
            key={`${currentIndex}-${index}`}
            className={cn("morphing-char", isAnimating && "morph-char")}
            style={{
              animationDelay: `${index * 35}ms`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </span>
  )
}

export default MorphingTextReveal
