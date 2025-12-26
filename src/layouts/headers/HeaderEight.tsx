import NavMenu from "./Menu/NavMenu"
import { Link } from "react-router-dom"
import { useState } from "react";
import Offcanvas from "./Menu/Offcanvas";
import UseSticky from "../../hooks/UseSticky";


const HeaderEight = () => {

   const { sticky } = UseSticky();
   const [offCanvas, setOffCanvas] = useState<boolean>(false);

   return (
      <>
         <header>
            <div id="header-sticky" className={`td-header__area  td-header-5-wrapper td-header-7-wrapper td-header-showcase p-relative z-index-1 ${sticky ? "header-sticky" : ""}`}>
               <div className="container-fluid container-1750">
                  <div className="row align-items-center">
                     <div className="col-6">
                        <div className="logo">
                           <Link className="logo-1" to="/"><img data-width="96" src="/assets/img/logo/logo-ico-black.png" alt="Logo" /></Link>
                        </div>
                     </div>
                     <div className="col-xl-8 d-none">
                        <div className="tdmenu__wrap tdmenu-2-wrap text-center">
                           <nav className="tdmenu__nav">
                              <div className="tdmenu__navbar-wrap tdmenu__main-menu">
                                 <NavMenu />
                              </div>
                           </nav>
                        </div>
                     </div>
                     <div className="col-6">
                        <div className="td-header-right text-end">
                           <div className="d-inline-block ml-20">
                              <div className="tdmenu-offcanvas-open-btn mobile-nav-toggler  d-flex align-items-center justify-content-center">
                                 <span className="text mr-10">menu</span>
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
            <Offcanvas offCanvas={offCanvas} setOffCanvas={setOffCanvas} />
         </header>
      </>
   )
}

export default HeaderEight
