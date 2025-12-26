import NavMenu from "./Menu/NavMenu"
import { Link } from "react-router-dom"
import { useState } from "react";
import Offcanvas from "./Menu/Offcanvas";
import UseSticky from "../../hooks/UseSticky";

const HeaderFour = () => {

   const { sticky } = UseSticky();
   const [offCanvas, setOffCanvas] = useState<boolean>(false);

   return (
      <>
         <header>
            <div id="header-sticky" className={`td-header__area td-header-sticky-white td-header-spacing td-header-2-wrapper td-header-4-wrapper p-relative z-index-1 ${sticky ? "header-sticky" : ""}`}>
               <div className="container-fluid container-1670">
                  <div className="row align-items-center">
                     <div className="col-xl-3 col-5">
                        <div className="logo">
                           <Link className="logo-1" to="/"><img data-width="96" src="/assets/img/logo/logo-green.png" alt="Logo" /></Link>
                           <Link className="logo-2 d-none" to="/"><img data-width="96" src="/assets/img/logo/logo-grey-2.png" alt="Logo" /></Link>
                        </div>
                     </div>
                     <div className="col-xl-6 d-none d-xl-block">
                        <div className="tdmenu__wrap tdmenu-2-wrap">
                           <nav className="tdmenu__nav">
                              <div className="tdmenu__navbar-wrap tdmenu__main-menu">
                                 <NavMenu />
                              </div>
                           </nav>
                        </div>
                     </div>
                     <div className="col-xl-3 col-7">
                        <div className="td-header-right text-end">
                           <button className="td-header-search search-open-btn">
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M9.00004 17.0001C13.4183 17.0001 17.0001 13.4183 17.0001 9.00004C17.0001 4.58174 13.4183 1 9.00004 1C4.58174 1 1 4.58174 1 9.00004C1 13.4183 4.58174 17.0001 9.00004 17.0001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                 <path d="M19.0004 18.9999L14.6504 14.6499" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                           </button>
                           <Link to="/contact" className="td-btn td-btn-4 td-btn-4-lg d-none d-md-inline-block td-btn-switch-animation ml-15">
                              <span className="d-flex align-items-center justify-content-center">
                                 <span className="btn-text"> Contact Us </span>
                                 <span className="btn-icon">
                                    <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M0.24707 6.57617H15.1436" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
                                       <path d="M9.27734 0C9.27734 3.63501 12.3946 6.57638 16.2471 6.57638" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
                                       <path d="M16.2471 6.57617C12.3946 6.57617 9.27734 9.51754 9.27734 13.1526" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
                                    </svg>
                                 </span>
                                 <span className="btn-icon">
                                    <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M0.24707 6.57617H15.1436" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
                                       <path d="M9.27734 0C9.27734 3.63501 12.3946 6.57638 16.2471 6.57638" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
                                       <path d="M16.2471 6.57617C12.3946 6.57617 9.27734 9.51754 9.27734 13.1526" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
                                    </svg>
                                 </span>
                              </span>
                           </Link>
                           <div className="d-inline-block">
                              <div className="tdmenu-offcanvas-open-btn d-xl-none ml-20 mobile-nav-toggler d-flex align-items-center justify-content-center">
                                 <span className="text mr-5">menu</span>
                                 <div onClick={() => setOffCanvas(true)} className="tdmenu-offcanvas-open-bar">
                                    <span></span>
                                    <span></span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

         </header>
         <Offcanvas offCanvas={offCanvas} setOffCanvas={setOffCanvas} />
      </>
   )
}

export default HeaderFour
