import { useEffect } from 'react'
import useSpline from '@/hooks/useSpline'
import type { SplineCanvasProps } from '../types'
import styles from './SplineCanvas.module.scss'

const SplineCanvas = ({ src, onLoaded }: SplineCanvasProps) => {
  const { canvasRef, isLoaded, error } = useSpline(src)

  // Notify parent when loaded OR on error (so UI doesn't get stuck)
  useEffect(() => {
    if (isLoaded || error) {
      onLoaded?.()
    }
  }, [isLoaded, error, onLoaded])

  return (
    <>
      {/* Placeholder gradient while loading */}
      <div
        className={styles.placeholder}
        style={{ opacity: isLoaded ? 0 : 1 }}
        aria-hidden="true"
      />

      {/* Spline canvas */}
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        style={{ opacity: isLoaded ? 1 : 0 }}
      />
    </>
  )
}

export default SplineCanvas
