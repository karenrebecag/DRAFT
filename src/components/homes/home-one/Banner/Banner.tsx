import { useState, useCallback } from 'react'
import { SplineCanvas, HeroContent } from './components'
import type { BannerProps } from './types'
import styles from './Banner.module.scss'

const SPLINE_MODEL = '/assets/models/Banner.splinecode'

const Banner = ({ onLoaded, isLoading = false }: BannerProps) => {
  const [isSplineLoaded, setIsSplineLoaded] = useState(false)

  const handleSplineLoaded = useCallback(() => {
    setIsSplineLoaded(true)
    onLoaded?.()
  }, [onLoaded])

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* 3D Background */}
        <SplineCanvas src={SPLINE_MODEL} onLoaded={handleSplineLoaded} />

        {/* Hero Content */}
        <HeroContent isVisible={!isLoading && isSplineLoaded} />
      </div>
    </section>
  )
}

export default Banner
