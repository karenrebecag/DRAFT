import { Link } from "react-router-dom"
import { useState, useEffect, useCallback, useRef } from "react"
import gsap from "gsap"
import Offcanvas from "./Menu/Offcanvas"
import menu_data from "../../data/MenuData"
import styles from "./HeaderGlobal.module.scss"

// Language options (starting with Spanish and English, more to come)
const languages = [
   { code: 'es', name: 'Español' },
   { code: 'en', name: 'English' },
   // Future languages:
   // { code: 'hi', name: 'Hindi' },
   // { code: 'ja', name: 'Japanese' },
   // { code: 'zh', name: 'Mandarin' },
]

const HeaderGlobal = () => {
   const [offCanvas, setOffCanvas] = useState<boolean>(false)
   const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
   const [langDropdownOpen, setLangDropdownOpen] = useState<boolean>(false)
   const [currentLang, setCurrentLang] = useState(languages[0]) // Spanish as default
   const [lastScrollY, setLastScrollY] = useState<number>(0)

   const headerRef = useRef<HTMLElement>(null)
   const dropdownRefs = useRef<Map<number, HTMLUListElement>>(new Map())
   const arrowRefs = useRef<Map<number, HTMLSpanElement>>(new Map())
   const langDropdownRef = useRef<HTMLUListElement>(null)
   const langArrowRef = useRef<HTMLSpanElement>(null)

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

   // Dropdown animation with GSAP
   const animateDropdown = useCallback((id: number, show: boolean) => {
      const dropdown = dropdownRefs.current.get(id)
      const arrow = arrowRefs.current.get(id)

      if (dropdown) {
         if (show) {
            gsap.set(dropdown, { visibility: "visible", pointerEvents: "auto" })
            gsap.fromTo(dropdown,
               { opacity: 0, y: -10, scale: 0.95 },
               { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "power2.out" }
            )
         } else {
            gsap.to(dropdown, {
               opacity: 0,
               y: -10,
               scale: 0.95,
               duration: 0.2,
               ease: "power2.in",
               onComplete: () => {
                  gsap.set(dropdown, { visibility: "hidden", pointerEvents: "none" })
               }
            })
         }
      }

      if (arrow) {
         gsap.to(arrow, {
            rotation: show ? 180 : 0,
            duration: 0.25,
            ease: "power2.out"
         })
      }
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
         // Close any open dropdown
         if (activeDropdown !== null) {
            animateDropdown(activeDropdown, false)
            setActiveDropdown(null)
         }
      } else {
         // Scrolling up - show header
         animateHeader(true)
      }

      setLastScrollY(currentScrollY)
   }, [lastScrollY, animateHeader, animateDropdown, activeDropdown])

   useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
   }, [handleScroll])

   // Handle dropdown toggle
   const handleDropdownEnter = (id: number) => {
      if (activeDropdown !== null && activeDropdown !== id) {
         animateDropdown(activeDropdown, false)
      }
      setActiveDropdown(id)
      animateDropdown(id, true)
   }

   const handleDropdownLeave = (id: number) => {
      if (activeDropdown === id) {
         animateDropdown(id, false)
         setActiveDropdown(null)
      }
   }

   // Set refs
   const setDropdownRef = (id: number, el: HTMLUListElement | null) => {
      if (el) dropdownRefs.current.set(id, el)
   }

   const setArrowRef = (id: number, el: HTMLSpanElement | null) => {
      if (el) arrowRefs.current.set(id, el)
   }

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

   const handleLangSelect = (lang: typeof languages[0]) => {
      setCurrentLang(lang)
      setLangDropdownOpen(false)
      animateLangDropdown(false)
      // TODO: Implement actual language change logic
   }

   return (
      <>
         <header ref={headerRef} className={styles.header}>
            <nav className={styles.nav}>
               {/* Logo */}
               <Link to="/" className={styles.logo}>
                  <span>Parody</span>
               </Link>

               {/* Desktop Menu */}
               <ul className={styles.menuList}>
                  {menu_data.map((item) => (
                     <li
                        key={item.id}
                        className={`${styles.menuItem} ${item.has_dropdown ? styles.hasDropdown : ''}`}
                        onMouseEnter={() => item.has_dropdown && handleDropdownEnter(item.id)}
                        onMouseLeave={() => item.has_dropdown && handleDropdownLeave(item.id)}
                     >
                        {item.has_dropdown ? (
                           <span className={styles.menuLink}>
                              {item.title}
                              <span
                                 ref={(el) => setArrowRef(item.id, el)}
                                 className={styles.dropdownArrow}
                              />
                           </span>
                        ) : (
                           <Link to={item.link} className={styles.menuLink}>
                              {item.title}
                           </Link>
                        )}

                        {item.has_dropdown && item.sub_menus && (
                           <ul
                              ref={(el) => setDropdownRef(item.id, el)}
                              className={styles.dropdown}
                           >
                              {item.sub_menus.map((sub, index) => (
                                 <li key={index}>
                                    <Link to={sub.link}>{sub.title}</Link>
                                 </li>
                              ))}
                           </ul>
                        )}
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
                     >
                        <i className="fa-solid fa-globe"></i>
                        <span>{currentLang.code.toUpperCase()}</span>
                        <span ref={langArrowRef} className={styles.langArrow} />
                     </button>
                     <ul
                        ref={langDropdownRef}
                        className={`${styles.langDropdown} ${langDropdownOpen ? styles.active : ''}`}
                     >
                        {languages.map((lang) => (
                           <li key={lang.code}>
                              <button onClick={() => handleLangSelect(lang)}>
                                 <span>{lang.name}</span>
                              </button>
                           </li>
                        ))}
                     </ul>
                  </div>

                  <Link to="/contact" className={styles.ctaButton}>
                     Let's Talk
                     <i className="fa-solid fa-arrow-right"></i>
                  </Link>

                  {/* Mobile Menu Toggle */}
                  <button
                     onClick={() => setOffCanvas(true)}
                     className={`${styles.menuToggle} ${offCanvas ? styles.active : ''}`}
                     aria-label="Open menu"
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
