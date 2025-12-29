import { Link, useLocation } from "react-router-dom"
import { useState, useEffect, useCallback, useRef } from "react"
import gsap from "gsap"
import { Globe, ArrowRight } from "lucide-react"
import Offcanvas from "./Menu/Offcanvas"
import { useI18n, type LanguageCode } from "../../i18n"
import styles from "./HeaderGlobal.module.scss"

// Navigation structure with translation keys
const getNavItems = (t: ReturnType<typeof useI18n>["t"]) => [
   {
      id: 1,
      title: t.nav.aboutUs,
      link: "/about",
   },
   {
      id: 2,
      title: t.nav.services,
      link: "/service",
   },
   {
      id: 3,
      title: t.nav.portfolio,
      link: "/portfolio",
   },
   {
      id: 4,
      title: t.nav.blog,
      link: "/blog",
   },
]

const HeaderGlobal = () => {
   const { t, locale, setLocale, languages, currentLanguage } = useI18n()
   const location = useLocation()

   const [offCanvas, setOffCanvas] = useState<boolean>(false)
   const [langDropdownOpen, setLangDropdownOpen] = useState<boolean>(false)
   const [lastScrollY, setLastScrollY] = useState<number>(0)

   const headerRef = useRef<HTMLElement>(null)
   const langDropdownRef = useRef<HTMLUListElement>(null)
   const langArrowRef = useRef<HTMLSpanElement>(null)

   // Get navigation items with current translations
   const navItems = getNavItems(t)

   // Check if current route matches a link
   const isActiveRoute = (link: string) => {
      if (link === '/') {
         return location.pathname === '/'
      }
      return location.pathname.startsWith(link)
   }

   // Header show/hide animation with GSAP
   const animateHeader = useCallback((show: boolean) => {
      if (!headerRef.current) return

      gsap.to(headerRef.current, {
         y: show ? 0 : -100,
         opacity: show ? 1 : 0,
         duration: 0.4,
         ease: "power3.out"
      })
   }, [])

   // Handle scroll
   const handleScroll = useCallback(() => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 50) {
         animateHeader(true)
         setLastScrollY(currentScrollY)
         return
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
         // Scrolling down - hide header
         animateHeader(false)
      } else {
         // Scrolling up - show header
         animateHeader(true)
      }

      setLastScrollY(currentScrollY)
   }, [lastScrollY, animateHeader])

   useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
   }, [handleScroll])

   // Language dropdown animation
   const animateLangDropdown = useCallback((show: boolean) => {
      if (langDropdownRef.current) {
         if (show) {
            gsap.set(langDropdownRef.current, { visibility: "visible", pointerEvents: "auto" })
            gsap.fromTo(langDropdownRef.current,
               { opacity: 0, y: -10, scale: 0.95 },
               { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "power2.out" }
            )
         } else {
            gsap.to(langDropdownRef.current, {
               opacity: 0,
               y: -10,
               scale: 0.95,
               duration: 0.2,
               ease: "power2.in",
               onComplete: () => {
                  gsap.set(langDropdownRef.current, { visibility: "hidden", pointerEvents: "none" })
               }
            })
         }
      }

      if (langArrowRef.current) {
         gsap.to(langArrowRef.current, {
            rotation: show ? 180 : 0,
            duration: 0.25,
            ease: "power2.out"
         })
      }
   }, [])

   const handleLangToggle = () => {
      const newState = !langDropdownOpen
      setLangDropdownOpen(newState)
      animateLangDropdown(newState)
   }

   const handleLangSelect = (langCode: LanguageCode) => {
      setLocale(langCode)
      setLangDropdownOpen(false)
      animateLangDropdown(false)
   }

   return (
      <>
         <header ref={headerRef} className={styles.header}>
            <nav className={styles.nav}>
               {/* Logo - links to home */}
               <Link to="/" className={styles.logo}>
                  <span>DRAFT</span>
               </Link>

               {/* Desktop Menu */}
               <ul className={styles.menuList}>
                  {navItems.map((item) => (
                     <li key={item.id} className={styles.menuItem}>
                        <Link
                           to={item.link}
                           className={`${styles.menuLink} ${isActiveRoute(item.link) ? styles.active : ''}`}
                        >
                           {item.title}
                        </Link>
                     </li>
                  ))}
               </ul>

               {/* Actions */}
               <div className={styles.actions}>
                  {/* Language Selector */}
                  <div
                     className={styles.langSelector}
                     onMouseLeave={() => {
                        if (langDropdownOpen) {
                           setLangDropdownOpen(false)
                           animateLangDropdown(false)
                        }
                     }}
                  >
                     <button
                        className={styles.langButton}
                        onClick={handleLangToggle}
                        onMouseEnter={() => {
                           if (!langDropdownOpen) {
                              setLangDropdownOpen(true)
                              animateLangDropdown(true)
                           }
                        }}
                        aria-label={`${t.common.menu}: ${currentLanguage.name}`}
                     >
                        <Globe size={16} />
                        <span>{locale.toUpperCase()}</span>
                        <span ref={langArrowRef} className={styles.langArrow} />
                     </button>
                     <ul
                        ref={langDropdownRef}
                        className={`${styles.langDropdown} ${langDropdownOpen ? styles.active : ''}`}
                     >
                        {languages.map((lang) => (
                           <li key={lang.code}>
                              <button
                                 onClick={() => handleLangSelect(lang.code)}
                                 aria-current={lang.code === locale ? "true" : undefined}
                              >
                                 <span>{lang.name}</span>
                              </button>
                           </li>
                        ))}
                     </ul>
                  </div>

                  <Link to="/contact" className={styles.ctaButton}>
                     {t.header.letsTalk}
                     <ArrowRight size={16} />
                  </Link>

                  {/* Mobile Menu Toggle */}
                  <button
                     onClick={() => setOffCanvas(true)}
                     className={`${styles.menuToggle} ${offCanvas ? styles.active : ''}`}
                     aria-label={t.common.menu}
                  >
                     <span></span>
                     <span></span>
                     <span></span>
                  </button>
               </div>
            </nav>
         </header>

         {/* Mobile Offcanvas Menu */}
         <Offcanvas offCanvas={offCanvas} setOffCanvas={setOffCanvas} />
      </>
   )
}

export default HeaderGlobal
