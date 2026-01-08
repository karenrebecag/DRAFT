import { useRef } from 'react'
import { useI18n } from '@/i18n'
import useNavigation from '@/hooks/useNavigation'
import useScrollVisibility from '@/hooks/useScrollVisibility'
import ButtonPrimary from '@/components/ui/ButtonPrimary'
import { headerNavItems } from '@/data/MenuData'
import {
  MenuToggle,
  Logo,
  NavMenu,
  LanguageSelector,
  SocialLinks,
  ContactBanner,
} from './components'
import type { NavItemData } from './types'
import styles from './HeaderGlobal.module.scss'

const HeaderGlobal = () => {
  const { t } = useI18n()
  const { isOpen, toggle, close } = useNavigation()
  const navRef = useRef<HTMLDivElement>(null)

  // Hide header on scroll down, show on scroll up (disabled when menu is open)
  useScrollVisibility(navRef, { disabled: isOpen })

  // Transform nav items with translations
  const navItems: NavItemData[] = headerNavItems.map((item) => ({
    id: item.id,
    title: (t.nav as Record<string, string>)[item.titleKey] || item.titleKey,
    link: item.link,
  }))

  return (
    <nav
      data-navigation-status={isOpen ? 'active' : 'not-active'}
      className={styles.navigation}
    >
      {/* Dark overlay */}
      <div className={styles.darkBg} onClick={close} />

      {/* Centered Navigation */}
      <div ref={navRef} className={styles.centeredNav}>
        {/* Background */}
        <div className={styles.navBg} />

        {/* Header Bar */}
        <div className={styles.navHeader}>
          <MenuToggle isOpen={isOpen} onToggle={toggle} label={t.common.menu} />
          <Logo onClick={close} />
          <ButtonPrimary to="/contact" className={styles.contactBtn}>
            Go
          </ButtonPrimary>
        </div>

        {/* Expandable Content */}
        <div className={styles.navContent}>
          <div className={styles.navInner}>
            {/* Navigation Links */}
            <NavMenu items={navItems} onItemClick={close} />

            {/* Bottom Section: Language + Socials */}
            <div className={styles.bottomSection}>
              <LanguageSelector />
              <SocialLinks />
            </div>

            {/* Contact Banner */}
            <ContactBanner
              text={t.header.letsTalk}
              link="/contact"
              onClick={close}
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default HeaderGlobal
