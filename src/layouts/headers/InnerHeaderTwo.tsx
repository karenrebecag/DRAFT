import NavMenu from "./Menu/NavMenu"
import { Link } from "react-router-dom"
import { useState } from "react";
import Offcanvas from "./Menu/Offcanvas";
import UseSticky from "../../hooks/UseSticky";

const InnerHeaderTwo = () => {

   const { sticky } = UseSticky();
   const [offCanvas, setOffCanvas] = useState<boolean>(false);

   return (
      <>
         <header>

            <div id="header-sticky" className={`td-header__area td-header-sticky-white td-header-spacing td-header-blog td-header-5-wrapper td-header-about-wrapper p-relative z-index-1 ${sticky ? "header-sticky" : ""}`}>
               <div className="container-fluid container-1710">
                  <div className="row align-items-center">
                     <div className="col-xxl-2 col-xl-2 col-4">
                        <div className="logo">
                           <Link className="logo-1" to="/"><img data-width="96" src="/assets/img/logo/logo-transparent.png" alt="Logo" /></Link>
                           <Link className="logo-2 d-none" to="/"><img data-width="96" src="/assets/img/logo/logo-grey-2.png" alt="Logo" /></Link>
                        </div>
                     </div>
                     <div className="col-xxl-8 col-xl-7 d-none d-xl-block">
                        <div className="tdmenu__wrap tdmenu-2-wrap text-center">
                           <nav className="tdmenu__nav">
                              <div className="tdmenu__navbar-wrap tdmenu__main-menu">
                                 <NavMenu />
                              </div>
                           </nav>
                        </div>
                     </div>
                     <div className="col-xxl-2 col-xl-3 col-8">
                        <div className="td-header-right text-end">
                           <Link className="td-btn-12" to="/contact">Let’s Talk</Link>
                           <div className="d-inline-block ml-10">
                              <div className="tdmenu-offcanvas-open-btn mobile-nav-toggler">
                                 <div onClick={() => setOffCanvas(true)} className="tdmenu-offcanvas-open-bar d-inline-block">
                                    <span></span>
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

export default InnerHeaderTwo
