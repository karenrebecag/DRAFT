import { Link } from "react-router-dom"
import MobileMenu from "./MobileMenu";
import { useI18n } from "../../../i18n";

interface MobileSidebarProps {
   offCanvas: boolean;
   setOffCanvas: (offCanvas: boolean) => void;
}

const Offcanvas = ({ offCanvas, setOffCanvas }: MobileSidebarProps) => {
   const { t } = useI18n();

   return (
      <div className={offCanvas ? "mobile-menu-visible" : ""}>
         <div className="tdmobile__menu td-menu-large">
            <nav className="tdmobile__menu-box">
               <div
                  onClick={() => setOffCanvas(false)}
                  className="close-btn"
                  aria-label={t.common.close}
               >
                  <i className="fa-solid fa-xmark"></i>
               </div>
               <div className="nav-logo">
                  <Link to="/" onClick={() => setOffCanvas(false)}>
                     <span style={{
                        fontFamily: "var(--td-ff-glitz, 'Glitz'), sans-serif",
                        fontSize: '24px',
                        fontWeight: 900,
                        letterSpacing: '0.02em',
                        textTransform: 'uppercase' as const,
                        color: 'var(--color-dark, #1c1d1f)'
                     }}>
                        DRAFT
                     </span>
                  </Link>
               </div>
               <div className="tdmobile__search">
                  <form onSubmit={(e) => e.preventDefault()}>
                     <input type="text" placeholder={t.header.search} />
                     <button><i className="fas fa-search"></i></button>
                  </form>
               </div>
               <div className="tdmobile__menu-outer">
                  <MobileMenu />
               </div>
               <div className="mt-30 ml-25 mr-25">
                  <Link
                     to="/contact"
                     className="td-btn td-btn-menu-black w-100 d-inline-block td-btn-switch-animation ml-10"
                     onClick={() => setOffCanvas(false)}
                  >
                     <span className="d-flex align-items-center justify-content-center">
                        <span className="btn-text">{t.header.contactUs}</span>
                        <span className="btn-icon"><i className="fa-sharp fa-solid fa-angle-right"></i></span>
                        <span className="btn-icon"><i className="fa-sharp fa-solid fa-angle-right"></i></span>
                     </span>
                  </Link>
               </div>
               <div className="social-links">
                  <ul className="list-wrap">
                     <li><Link to="#"><i className="fab fa-facebook-f"></i></Link></li>
                     <li><Link to="#"><i className="fab fa-twitter"></i></Link></li>
                     <li><Link to="#"><i className="fab fa-instagram"></i></Link></li>
                     <li><Link to="#"><i className="fab fa-linkedin-in"></i></Link></li>
                     <li><Link to="#"><i className="fab fa-youtube"></i></Link></li>
                  </ul>
               </div>
            </nav>
         </div>
         <div onClick={() => setOffCanvas(false)} className="tdmobile__menu-backdrop"></div>
      </div>
   )
}

export default Offcanvas
