import { Link, useLocation } from "react-router-dom"
import { useState, useEffect, useCallback, useRef } from "react"
import gsap from "gsap"
import { useI18n, type LanguageCode } from "../../i18n"
import styles from "./HeaderGlobal.module.scss"

// Navigation items
const getNavItems = (t: ReturnType<typeof useI18n>["t"]) => [
   { id: 1, title: t.nav.home || "Home", link: "/" },
   { id: 2, title: t.nav.aboutUs, link: "/about" },
   { id: 3, title: t.nav.services, link: "/service" },
   { id: 4, title: t.nav.portfolio, link: "/portfolio" },
   { id: 5, title: t.nav.blog, link: "/blog" },
]

// Menu Icon SVG
const MenuIcon = () => (
   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 12H21" stroke="currentColor" strokeMiterlimit="10" />
      <path d="M3 6H21" stroke="currentColor" strokeMiterlimit="10" />
      <path d="M3 18H21" stroke="currentColor" strokeMiterlimit="10" />
   </svg>
)

// Contact/Send Icon SVG
const SendIcon = () => (
   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 2L11 13" stroke="currentColor" strokeMiterlimit="10" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeMiterlimit="10" />
   </svg>
)

const HeaderGlobal = () => {
   const { t, locale, setLocale, languages } = useI18n()
   const location = useLocation()

   const [isNavOpen, setIsNavOpen] = useState<boolean>(false)
   const [lastScrollY, setLastScrollY] = useState<number>(0)
   const navItemsRef = useRef<HTMLDivElement[]>([])
   const centeredNavRef = useRef<HTMLDivElement>(null)

   const navItems = getNavItems(t)

   // Check if current route matches
   const isActiveRoute = (link: string) => {
      if (link === '/') return location.pathname === '/'
      return location.pathname.startsWith(link)
   }

   // Handle navigation toggle
   const toggleNav = useCallback(() => {
      setIsNavOpen(prev => !prev)
   }, [])

   // Close navigation
   const closeNav = useCallback(() => {
      setIsNavOpen(false)
   }, [])

   // Animate header show/hide
   const animateHeader = useCallback((show: boolean) => {
      if (!centeredNavRef.current) return

      gsap.to(centeredNavRef.current, {
         y: show ? 0 : -120,
         opacity: show ? 1 : 0,
         duration: 0.4,
         ease: "power3.out"
      })
   }, [])

   // Handle scroll - hide on scroll down, show on scroll up
   const handleScroll = useCallback(() => {
      // Don't hide when nav menu is open
      if (isNavOpen) return

      const currentScrollY = window.scrollY

      // Always show at top
      if (currentScrollY < 50) {
         animateHeader(true)
         setLastScrollY(currentScrollY)
         return
      }

      // Scrolling down - hide header
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
         animateHeader(false)
      } else {
         // Scrolling up - show header
         animateHeader(true)
      }

      setLastScrollY(currentScrollY)
   }, [lastScrollY, animateHeader, isNavOpen])

   // Scroll listener
   useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
   }, [handleScroll])

   // Handle ESC key
   useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
         if (e.key === 'Escape' && isNavOpen) {
            closeNav()
         }
      }
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
   }, [isNavOpen, closeNav])

   // Apply stagger delay to nav items
   useEffect(() => {
      navItemsRef.current.forEach((item, index) => {
         if (item) {
            item.style.transitionDelay = `${index * 0.05}s`
         }
      })
   }, [])

   // Handle language change
   const handleLangSelect = (langCode: LanguageCode) => {
      setLocale(langCode)
   }

   return (
      <nav
         data-navigation-status={isNavOpen ? "active" : "not-active"}
         className={styles.navigation}
      >
         {/* Dark overlay */}
         <div
            className={styles.darkBg}
            onClick={closeNav}
         />

         {/* Centered Navigation */}
         <div ref={centeredNavRef} className={styles.centeredNav}>
            {/* Background */}
            <div className={styles.navBg} />

            {/* Header Bar */}
            <div className={styles.navHeader}>
               {/* Menu Toggle */}
               <button
                  className={styles.menuToggle}
                  onClick={toggleNav}
                  aria-label={t.common.menu}
               >
                  <div className={styles.toggleBar} />
                  <div className={styles.toggleBar} />
               </button>

               {/* Logo */}
               <Link to="/" className={styles.logo} onClick={closeNav}>
                  <span>DRAFT STUDIO</span>
               </Link>

               {/* Contact Button */}
               <Link to="/contact" className={styles.contactBtn} onClick={closeNav}>
                  <SendIcon />
               </Link>
            </div>

            {/* Expandable Content */}
            <div className={styles.navContent}>
               <div className={styles.navInner}>
                  {/* Navigation Links */}
                  <ul className={styles.navList}>
                     {navItems.map((item, index) => (
                        <div
                           key={item.id}
                           className={styles.navItem}
                           ref={el => { if (el) navItemsRef.current[index] = el }}
                        >
                           <Link
                              to={item.link}
                              className={`${styles.navLink} ${isActiveRoute(item.link) ? styles.active : ''}`}
                              onClick={closeNav}
                           >
                              <p className={styles.navText}>{item.title}</p>
                           </Link>
                        </div>
                     ))}
                  </ul>

                  {/* Language Selector */}
                  <div
                     className={styles.langSection}
                     ref={el => { if (el) navItemsRef.current[navItems.length] = el }}
                  >
                     <div className={styles.langButtons}>
                        {languages.map((lang) => (
                           <button
                              key={lang.code}
                              className={`${styles.langBtn} ${lang.code === locale ? styles.active : ''}`}
                              onClick={() => handleLangSelect(lang.code)}
                           >
                              {lang.code.toUpperCase()}
                           </button>
                        ))}
                     </div>
                  </div>

                  {/* Contact Banner with Marquee */}
                  <div
                     className={styles.bannerWrapper}
                     ref={el => { if (el) navItemsRef.current[navItems.length + 1] = el }}
                  >
                     <Link to="/contact" className={styles.banner} onClick={closeNav}>
                        <div className={styles.bannerRow}>
                           <div className={styles.bannerTrack}>
                              {[...Array(5)].map((_, i) => (
                                 <div key={i} className={styles.bannerItem}>
                                    <p className={styles.bannerText}>{t.header.letsTalk}</p>
                                 </div>
                              ))}
                           </div>
                           <div className={styles.bannerTrack} aria-hidden="true">
                              {[...Array(5)].map((_, i) => (
                                 <div key={i} className={styles.bannerItem}>
                                    <p className={styles.bannerText}>{t.header.letsTalk}</p>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </Link>
                  </div>
               </div>
            </div>

         </div>
      </nav>
   )
}

export default HeaderGlobal
