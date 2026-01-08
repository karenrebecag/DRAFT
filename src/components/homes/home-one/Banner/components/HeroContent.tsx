import ButtonPrimary from '@/components/ui/ButtonPrimary'
import ButtonSecondary from '@/components/ui/ButtonSecondary'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollDownButton from './ScrollDownButton'
import type { HeroContentProps } from '../types'
import styles from './HeroContent.module.scss'

const HeroContent = ({ isVisible }: HeroContentProps) => {
  return (
    <div
      className={styles.content}
      style={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      <div className={styles.inner}>
        {/* Main Title + Description */}
        <SectionHeading
          as="h1"
          titleLine1="Where High Design Meets"
          titleLine1Style="arapey"
          titleLine2="High Performance"
          titleLine2Style="poppins"
          description="A premier development studio specializing in high-end UI/UX, motion graphics, and modern tech stacks for global innovators."
          descriptionMaxWidth="800px"
          descriptionColor="#999999"
        />

        {/* CTA Buttons */}
        <div className={styles.ctaGroup}>
          <ButtonPrimary to="/contact">Start a Project</ButtonPrimary>
          <ButtonSecondary to="/portfolio">Explore Work</ButtonSecondary>
        </div>

        {/* Scroll Down */}
        <ScrollDownButton />
      </div>
    </div>
  )
}

export default HeroContent
