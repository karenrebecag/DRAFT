import { useEffect, useRef, useState, useCallback } from 'react'

interface UseSplineOptions {
  autoLoad?: boolean
  loadDelay?: number
}

interface UseSplineReturn {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  isLoaded: boolean
  isLoading: boolean
  error: Error | null
  load: () => Promise<void>
}

export const useSpline = (
  src: string,
  options: UseSplineOptions = {}
): UseSplineReturn => {
  const { autoLoad = true, loadDelay = 300 } = options

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const appRef = useRef<import('@splinetool/runtime').Application | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const load = useCallback(async () => {
    if (!canvasRef.current || isLoading || isLoaded) return

    setIsLoading(true)
    setError(null)

    try {
      const { Application } = await import('@splinetool/runtime')

      if (!canvasRef.current) {
        setIsLoading(false)
        return
      }

      const app = new Application(canvasRef.current)
      appRef.current = app

      await app.load(src)

      setIsLoaded(true)
    } catch (err) {
      console.error('Failed to load Spline scene:', err)
      setError(err instanceof Error ? err : new Error('Failed to load Spline'))
    } finally {
      setIsLoading(false)
    }
  }, [src, isLoading, isLoaded])

  // Auto-load on mount if enabled
  useEffect(() => {
    if (!autoLoad) return

    const timer = setTimeout(() => {
      load()
    }, loadDelay)

    return () => clearTimeout(timer)
  }, [autoLoad, loadDelay, load])

  // Handle visibility changes (pause when tab is hidden)
  useEffect(() => {
    const app = appRef.current
    if (!app || !isLoaded) return

    const handleVisibilityChange = () => {
      if (document.hidden) {
        app.stop?.()
      } else {
        app.play?.()
        // Force resize to reinitialize render loop
        if (canvasRef.current) {
          const rect = canvasRef.current.getBoundingClientRect()
          app.setSize?.(rect.width, rect.height)
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isLoaded])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (appRef.current) {
        appRef.current.dispose()
        appRef.current = null
      }
    }
  }, [])

  return {
    canvasRef,
    isLoaded,
    isLoading,
    error,
    load,
  }
}

export default useSpline
