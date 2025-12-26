import NavMenu from "./Menu/NavMenu"
import { Link } from "react-router-dom"
import { useState } from "react";
import Offcanvas from "./Menu/Offcanvas";
import UseSticky from "../../hooks/UseSticky";

const HeaderTwo = () => {

   const { sticky } = UseSticky();
   const [offCanvas, setOffCanvas] = useState<boolean>(false);

   return (
      <>
         <header>
            <div id="header-sticky" className={`td-header__area td-header-sticky-white td-header-spacing td-header-2-wrapper p-relative z-index-1 ${sticky ? "header-sticky" : ""}`}>
               <div className="container">
                  <div className="row align-items-center">
                     <div className="col-xl-2 col-4">
                        <div className="logo">
                           <Link className="logo-1" to="/"><img data-width="96" src="/assets/img/logo/logo-yellow.png" alt="Logo" /></Link>
                           <Link className="logo-2 d-none" to="/"><img data-width="96" src="/assets/img/logo/logo-grey-2.png" alt="Logo" /></Link>
                        </div>
                     </div>
                     <div className="col-xl-7 d-none d-xl-block">
                        <div className="tdmenu__wrap tdmenu-2-wrap">
                           <nav className="tdmenu__nav">
                              <div className="tdmenu__navbar-wrap tdmenu__main-menu">
                                 <NavMenu />
                              </div>
                           </nav>
                        </div>
                     </div>
                     <div className="col-xl-3 col-8">
                        <div className="td-header-right td-header-2-right text-end">
                           <div className="d-none d-md-inline-block">
                              <Link to="/contact" className="td-header-2-btn ml-10">
                                 <span className="icon">
                                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M15.7767 7.47384C15.9198 7.62604 16 7.8316 16 8.04582C16 8.26004 15.9198 8.4656 15.7767 8.61781L8.92138 15.8429C8.77516 15.9903 8.58094 16.0729 8.37867 16.0737C8.27759 16.0732 8.17746 16.0529 8.08351 16.0134C7.94489 15.9522 7.8266 15.8488 7.74358 15.7167C7.66056 15.5845 7.61651 15.4294 7.61698 15.2709V8.84861H0.761697C0.559684 8.84861 0.365942 8.76404 0.223096 8.61348C0.0802502 8.46292 0 8.25874 0 8.04582C0 7.83291 0.0802502 7.62871 0.223096 7.47817C0.365942 7.32761 0.559684 7.24304 0.761697 7.24304H7.61698V0.820711C7.61651 0.662221 7.66056 0.507129 7.74358 0.374983C7.8266 0.242834 7.94489 0.139545 8.08351 0.0781301C8.2242 0.0202932 8.37756 0.00562 8.52585 0.0358103C8.67412 0.065999 8.81125 0.139818 8.92138 0.248724L15.7767 7.47384Z" fill="currentColor" />
                                    </svg>
                                 </span>
                                 <span>Talk With Us</span>
                              </Link>
                           </div>
                           <div className="d-inline-block">
                              <div className="tdmenu-offcanvas-open-btn ml-20 d-xl-none mobile-nav-toggler d-flex align-items-center justify-content-center">
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

export default HeaderTwo
