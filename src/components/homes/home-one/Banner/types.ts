export interface BannerProps {
  onLoaded?: () => void
  isLoading?: boolean
}

export interface SplineCanvasProps {
  src: string
  onLoaded?: () => void
}

export interface HeroContentProps {
  isVisible: boolean
}

export interface ScrollDownButtonProps {
  onClick?: () => void
}
