import NavMenu from "./Menu/NavMenu"
import { Link } from "react-router-dom"
import { useState } from "react";
import Offcanvas from "./Menu/Offcanvas";
import HeaderSearch from "./Menu/HeaderSearch";
import UseSticky from "../../hooks/UseSticky";

const HeaderSix = () => {

   const { sticky } = UseSticky();
   const [offCanvas, setOffCanvas] = useState<boolean>(false);
   const [isSearch, setIsSearch] = useState<boolean>(false);

   return (
      <>
         <header>
            <div id="header-sticky" className={`td-header__area td-header-sticky-white td-header-spacing td-header-6-wrapper p-relative z-index-1 ${sticky ? "header-sticky" : ""}`}>
               <div className="container container-1750">
                  <div className="row align-items-center">
                     <div className="col-lg-4 col-md-4 col-sm-4 col-5">
                        <div className="tdmenu__wrap">
                           <div className="tdmenu-offcanvas-open-btn mobile-nav-toggler d-flex align-items-center justify-content-center">
                              <span className="text mr-5">menu</span>
                              <div onClick={() => setOffCanvas(true)} className="tdmenu-offcanvas-open-bar">
                                 <span></span>
                                 <span></span>
                              </div>
                           </div>
                           <nav className="tdmenu__nav d-none">
                              <div className="tdmenu__navbar-wrap tdmenu__main-menu">
                                 <NavMenu />
                              </div>
                           </nav>
                        </div>
                     </div>
                     <div className="col-lg-4 col-md-4 col-sm-4 col-5">
                        <div className="logo text-center">
                           <Link className="logo-1" to="/"><img data-width="96" src="/assets/img/logo/logo-white-2.png" alt="Logo" /></Link>
                           <Link className="logo-2 d-none" to="/"><img data-width="96" src="/assets/img/logo/logo-grey-2.png" alt="Logo" /></Link>
                        </div>
                     </div>
                     <div className="col-lg-4 col-md-4 col-sm-4 col-2">
                        <div className="td-header-right text-end">
                           <button onClick={() => setIsSearch(true)} className="td-header-search search-open-btn">
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M9.00004 17.0001C13.4183 17.0001 17.0001 13.4183 17.0001 9.00004C17.0001 4.58174 13.4183 1 9.00004 1C4.58174 1 1 4.58174 1 9.00004C1 13.4183 4.58174 17.0001 9.00004 17.0001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                 <path d="M19.0004 18.9999L14.6504 14.6499" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                           </button>
                           <Link to="/contact" className="td-btn td-btn-lg d-none d-md-inline-block td-btn-switch-animation ml-10">
                              <span className="d-flex align-items-center justify-content-center">
                                 <span className="btn-text"> Contact Us </span>
                                 <span className="btn-icon"><i className="fa-sharp fa-solid fa-angle-right"></i></span>
                                 <span className="btn-icon"><i className="fa-sharp fa-solid fa-angle-right"></i></span>
                              </span>
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </header>
         <Offcanvas offCanvas={offCanvas} setOffCanvas={setOffCanvas} />
         <HeaderSearch isSearch={isSearch} setIsSearch={setIsSearch} />
      </>
   )
}

export default HeaderSix
