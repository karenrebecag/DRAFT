import SectionHeading from '../../ui/SectionHeading'
import ButtonPrimary from '../../ui/ButtonPrimary'
import MomentumCard from '../../ui/MomentumCard'
import VerifiedBadge from '../../ui/VerifiedBadge'
import useMomentumHover from '../../../hooks/useMomentumHover'
import team_data from '../../../data/TeamData'
import styles from './Team.module.scss'

// Filter team members for home_1
const teamMembers = team_data.filter((member) => member.page === 'home_1')

const Team = () => {
  const { containerRef, handleHover } = useMomentumHover()

  return (
    <section
      ref={containerRef as React.RefObject<HTMLElement>}
      className={styles.section}
      data-momentum-hover-init
    >
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

        {/* Team Cards */}
        <div className={styles.teamCollection}>
          <div className={styles.teamList}>
            {teamMembers.map((member) => (
              <div key={member.id} className={styles.teamItem}>
                <MomentumCard
                  image={member.thumb}
                  imageAlt={`${member.name}, ${member.designation}`}
                  onHover={handleHover}
                >
                  <div className={styles.cardName}>
                    <h3 className={styles.cardH3}>{member.name}</h3>
                    {member.verified && (
                      <VerifiedBadge className={styles.checkSvg} />
                    )}
                  </div>
                  <p className={styles.cardJobTitle}>{member.designation}</p>
                </MomentumCard>
              </div>
            ))}
          </div>
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
