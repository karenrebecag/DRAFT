import { useRef } from 'react'
import { StackedServiceCards, type ServiceCardData } from '../../ui/StackedServiceCard'
import { useStackingCardsParallax } from '../../../hooks/useStackingCardsParallax'
// import TeamSection from './TeamSection'

const SERVICE_CARDS: ServiceCardData[] = [
  {
    id: 1,
    category: 'Services',
    number: '01 / 06',
    titleFaded: 'webgl',
    titleMain: 'Immersive Web Experiences',
    techKey: 'webgl',
    colorClass: 'isGreen1',
    videoSrc: 'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/armor-3d-object-rotating-loop-2025-12-09-07-19-41-utc.mp4',
    videoPlaceholder: undefined,
  },
  {
    id: 2,
    category: 'Services',
    number: '02 / 06',
    titleFaded: 'platforms',
    titleMain: 'Platforms & Web Applications',
    techKey: 'platforms',
    colorClass: 'isGreen2',
    videoSrc: undefined,
    videoPlaceholder: undefined,
  },
  {
    id: 3,
    category: 'Services',
    number: '03 / 06',
    titleFaded: 'commerce',
    titleMain: 'High-Performance E-commerce',
    techKey: 'commerce',
    colorClass: 'isGreen3',
    videoSrc: undefined,
    videoPlaceholder: undefined,
  },
  {
    id: 4,
    category: 'Services',
    number: '04 / 06',
    titleFaded: 'mobile',
    titleMain: 'Mobile Apps',
    techKey: 'mobile',
    colorClass: 'isGreen4',
    videoSrc: 'https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/2.-E-Pass-16_9.mp4',
    videoPlaceholder: undefined,
  },
  {
    id: 5,
    category: 'Services',
    number: '05 / 06',
    titleFaded: 'design',
    titleMain: 'Product Design & Brand',
    techKey: 'design',
    colorClass: 'isGreen5',
    videoSrc: undefined,
    videoPlaceholder: undefined,
  },
  {
    id: 6,
    category: 'Services',
    number: '06 / 06',
    titleFaded: 'devops',
    titleMain: 'Operations & Evolution',
    techKey: 'devops',
    colorClass: 'isGreen6',
    videoSrc: undefined,
    videoPlaceholder: undefined,
  },
]

const ServicesStrip = () => {
  const stackingCardsRef = useRef<HTMLDivElement>(null)

  useStackingCardsParallax({
    containerRef: stackingCardsRef,
    enabled: true,
    parallaxAmount: 50
  })

  return (
    <section id="services">
      {/* Team Section - Commented out */}
      {/* <TeamSection /> */}

      {/* Stacking Cards - Services */}
      <div ref={stackingCardsRef}>
        <StackedServiceCards
          cards={SERVICE_CARDS}
          showVideoControls={false}
        />
      </div>
    </section>
  )
}

export default ServicesStrip
