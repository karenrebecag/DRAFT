import {
  LinkedInIcon,
  GitHubIcon,
  DiscordIcon,
  WebflowIcon,
  TikTokIcon,
  InstagramIcon,
} from '@/components/ui/SocialIcons'
import type { SocialLinksProps } from '../types'
import styles from './SocialLinks.module.scss'

interface SocialItem {
  id: string
  href: string
  icon: React.ComponentType
  label: string
}

const socialItems: SocialItem[] = [
  { id: 'linkedin', href: 'https://linkedin.com', icon: LinkedInIcon, label: 'LinkedIn' },
  { id: 'github', href: 'https://github.com', icon: GitHubIcon, label: 'GitHub' },
  { id: 'discord', href: 'https://discord.com', icon: DiscordIcon, label: 'Discord' },
  { id: 'webflow', href: 'https://webflow.com', icon: WebflowIcon, label: 'Webflow' },
  { id: 'tiktok', href: 'https://tiktok.com', icon: TikTokIcon, label: 'TikTok' },
  { id: 'instagram', href: 'https://instagram.com', icon: InstagramIcon, label: 'Instagram' },
]

const SocialLinks = ({
  label = 'Socials',
  className = '',
}: SocialLinksProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.links}>
        {socialItems.map((social) => {
          const Icon = social.icon
          return (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              aria-label={social.label}
            >
              <Icon />
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default SocialLinks
