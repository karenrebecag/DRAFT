import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { ContactBannerProps } from '../types'
import styles from './ContactBanner.module.scss'

const MARQUEE_ITEMS = 5

const ContactBanner = ({ text, link, onClick }: ContactBannerProps) => {
  return (
    <div className={styles.wrapper}>
      <Link to={link} className={styles.banner} onClick={onClick}>
        <div className={styles.row}>
          <div className={styles.track}>
            {[...Array(MARQUEE_ITEMS)].map((_, i) => (
              <div key={i} className={styles.item}>
                <ArrowUpRight className={styles.icon} />
                <p className={styles.text}>{text}</p>
              </div>
            ))}
          </div>
          <div className={styles.track} aria-hidden="true">
            {[...Array(MARQUEE_ITEMS)].map((_, i) => (
              <div key={i} className={styles.item}>
                <ArrowUpRight className={styles.icon} />
                <p className={styles.text}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ContactBanner
