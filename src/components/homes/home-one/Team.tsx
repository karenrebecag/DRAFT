import SectionHeading from '../../ui/SectionHeading'
import ButtonPrimary from '../../ui/ButtonPrimary'
import styles from './Team.module.scss'

const Team = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <SectionHeading
          sectionNumber="05"
          sectionLabel="Our Team"
          titleLine1="A Collective of"
          titleLine1Style="poppins"
          titleLine2="Global Talent."
          titleLine2Style="arapey"
          description="We bridge the gap between imagination and execution. Our team of product engineers, creative developers, and design researchers collaborate from Mexico City and beyond to architect digital products that redefine industry standards."
          descriptionMaxWidth="1200px"
          descriptionColor="#1B1B1B"
          align="center"
        />

        {/* Team Cards Placeholder - Special component will be created later */}
        <div className={styles.teamCardsPlaceholder}>
          {/* Team member cards will be implemented as a special component */}
        </div>

        {/* CTA Button */}
        <ButtonPrimary to="/team" variant="inverted">
          Meet the Minds
        </ButtonPrimary>
      </div>
    </section>
  )
}

export default Team
