import { useRef, useEffect } from "react"
import gsap from "gsap-trial"
import { InertiaPlugin } from "gsap-trial/InertiaPlugin"
import styles from "./TeamSection.module.scss"

gsap.registerPlugin(InertiaPlugin)

// Team data
const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Karen",
    role: "Founder & Creative Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  },
  {
    id: 2,
    name: "Alex",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    id: 3,
    name: "Sofia",
    role: "Product Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  },
  {
    id: 4,
    name: "Marcus",
    role: "Full Stack Engineer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  },
]

// Verified badge SVG component
const VerifiedBadge = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    viewBox="0 0 24 24"
    fill="none"
    className={styles.checkSvg}
  >
    <path
      d="M13.06 3.06005L14.56 4.56005C14.8411 4.84143 15.2224 4.9997 15.62 5.00005H17.5C17.8979 5.00005 18.2794 5.15808 18.5607 5.43939C18.842 5.72069 19 6.10222 19 6.50005V8.38005C19.0004 8.77774 19.1587 9.15901 19.44 9.44005L20.94 10.94C21.0803 11.0786 21.1917 11.2437 21.2677 11.4257C21.3438 11.6076 21.3829 11.8028 21.3829 12C21.3829 12.1972 21.3438 12.3925 21.2677 12.5744C21.1917 12.7564 21.0803 12.9215 20.94 13.06L19.44 14.56C19.1587 14.8411 19.0004 15.2224 19 15.62V17.5C19 17.8979 18.842 18.2794 18.5607 18.5607C18.2794 18.842 17.8979 19 17.5 19H15.62C15.2224 19.0004 14.8411 19.1587 14.56 19.44L13.06 20.94C12.9215 21.0803 12.7564 21.1917 12.5744 21.2677C12.3925 21.3438 12.1972 21.3829 12 21.3829C11.8028 21.3829 11.6076 21.3438 11.4257 21.2677C11.2437 21.1917 11.0786 21.0803 10.94 20.94L9.44005 19.44C9.15901 19.1587 8.77774 19.0004 8.38005 19H6.50005C6.10222 19 5.72069 18.842 5.43939 18.5607C5.15808 18.2794 5.00005 17.8979 5.00005 17.5V15.62C4.9997 15.2224 4.84143 14.8411 4.56005 14.56L3.06005 13.06C2.91976 12.9215 2.80837 12.7564 2.73235 12.5744C2.65633 12.3925 2.61719 12.1972 2.61719 12C2.61719 11.8028 2.65633 11.6076 2.73235 11.4257C2.80837 11.2437 2.91976 11.0786 3.06005 10.94L4.56005 9.44005C4.84143 9.15901 4.9997 8.77774 5.00005 8.38005V6.50005C5.00005 6.10222 5.15808 5.72069 5.43939 5.43939C5.72069 5.15808 6.10222 5.00005 6.50005 5.00005H8.38005C8.77774 4.9997 9.15901 4.84143 9.44005 4.56005L10.94 3.06005C11.0786 2.91976 11.2437 2.80837 11.4257 2.73235C11.6076 2.65633 11.8028 2.61719 12 2.61719C12.1972 2.61719 12.3925 2.65633 12.5744 2.73235C12.7564 2.80837 12.9215 2.91976 13.06 3.06005Z"
      fill="var(--color-primary, #ecf6d2)"
    />
    <path
      d="M8.5 11.5L11 14L15 10"
      stroke="black"
      strokeWidth="1.5"
      strokeMiterlimit="10"
    />
  </svg>
)

const TeamSection = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return

    // Check if device supports hover
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return
    }

    // Configuration - exactly as original
    const xyMultiplier = 30
    const rotationMultiplier = 20
    const inertiaResistance = 200

    // Clamp functions
    const clampXY = gsap.utils.clamp(-1080, 1080)
    const clampRot = gsap.utils.clamp(-60, 60)

    let prevX = 0
    let prevY = 0
    let velX = 0
    let velY = 0
    let rafId: number | null = null

    // Track pointer velocity (throttled to RAF)
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        velX = e.clientX - prevX
        velY = e.clientY - prevY
        prevX = e.clientX
        prevY = e.clientY
        rafId = null
      })
    }

    root.addEventListener("mousemove", handleMouseMove)

    // Attach hover inertia to each element
    const elements = root.querySelectorAll("[data-momentum-hover-element]")
    const handleMouseEnter = (el: Element) => (e: Event) => {
      const mouseEvent = e as MouseEvent
      const target = el.querySelector("[data-momentum-hover-target]") as HTMLElement
      if (!target) return

      // Compute offset from center to pointer
      const { left, top, width, height } = target.getBoundingClientRect()
      const centerX = left + width / 2
      const centerY = top + height / 2
      const offsetX = mouseEvent.clientX - centerX
      const offsetY = mouseEvent.clientY - centerY

      // Compute raw torque (px²/frame)
      const rawTorque = offsetX * velY - offsetY * velX

      // Normalize torque so rotation ∝ pointer speed (deg/sec)
      const leverDist = Math.hypot(offsetX, offsetY) || 1
      const angularForce = rawTorque / leverDist

      // Calculate and clamp velocities
      const velocityX = clampXY(velX * xyMultiplier)
      const velocityY = clampXY(velY * xyMultiplier)
      const rotationVelocity = clampRot(angularForce * rotationMultiplier)

      // Apply GSAP inertia tween - exactly as original
      gsap.to(target, {
        inertia: {
          x: { velocity: velocityX, end: 0 },
          y: { velocity: velocityY, end: 0 },
          rotation: { velocity: rotationVelocity, end: 0 },
          resistance: inertiaResistance,
        },
      })
    }

    const handlers: Array<{ el: Element; handler: (e: Event) => void }> = []
    elements.forEach((el) => {
      const handler = handleMouseEnter(el)
      el.addEventListener("mouseenter", handler)
      handlers.push({ el, handler })
    })

    return () => {
      root.removeEventListener("mousemove", handleMouseMove)
      handlers.forEach(({ el, handler }) => {
        el.removeEventListener("mouseenter", handler)
      })
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      data-momentum-hover-init=""
      className={styles.teamSection}
    >
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.label}>Our Team</span>
          <h2 className={styles.title}>The people behind the pixels</h2>
          <p className={styles.subtitle}>
            A small, focused team with big ambitions. We work together to deliver
            exceptional results.
          </p>
        </div>

        {/* Team Grid */}
        <div className={styles.teamList}>
          {TEAM_MEMBERS.map((member) => (
            <div key={member.id} className={styles.teamItem}>
              <div data-momentum-hover-element="" className={styles.cardWrap}>
                <div data-momentum-hover-target="" className={styles.card}>
                  <div className={styles.cardBefore} />
                  <img
                    src={member.image}
                    loading="eager"
                    alt={`${member.name}, ${member.role}`}
                    className={styles.cardImage}
                  />
                  <div className={styles.cardContent}>
                    <div className={styles.cardName}>
                      <h3 className={styles.cardH3}>{member.name}</h3>
                      <VerifiedBadge />
                    </div>
                    <p className={styles.cardRole}>{member.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamSection
