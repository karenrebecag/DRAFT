import NavMenu from "./Menu/NavMenu"
import { Link } from "react-router-dom"
import { useState } from "react";
import Offcanvas from "./Menu/Offcanvas";
import OffcanvasTwo from "./Menu/OffcanvasTwo";
import UseSticky from "../../hooks/UseSticky";

const HeaderFive = () => {

   const { sticky } = UseSticky();
   const [offCanvas, setOffCanvas] = useState<boolean>(false);
   const [offCanvas2, setOffCanvas2] = useState<boolean>(false);

   return (
      <>
         <header>
            <div id="header-sticky" className={`td-header__area td-header-spacing td-header-2-wrapper td-header-3-wrapper  td-header-5-wrapper p-relative z-index-1 ${sticky ? "header-sticky" : ""}`}>
               <div className="container-fluid container-1750">
                  <div className="row align-items-center">
                     <div className="col-xl-2 col-4">
                        <div className="logo">
                           <Link className="logo-1" to="/"><img data-width="96" src="/assets/img/logo/logo-black-2.png" alt="Logo" /></Link>
                        </div>
                     </div>
                     <div className="col-xl-8 d-none d-xl-block">
                        <div className="tdmenu__wrap tdmenu-2-wrap text-center">
                           <nav className="tdmenu__nav">
                              <div className="tdmenu__navbar-wrap tdmenu__main-menu">
                                 <NavMenu />
                              </div>
                           </nav>
                        </div>
                     </div>
                     <div className="col-xl-2 col-8">
                        <div className="td-header-right text-end">
                           <div className="d-inline-block ml-20">
                              <div className="tdmenu-offcanvas-open-btn mobile-nav-toggler">
                                 <div onClick={() => setOffCanvas2(true)} className="tdmenu-offcanvas-open-bar d-none d-xl-block">
                                    <span></span>
                                    <span></span>
                                 </div>
                                 <div onClick={() => setOffCanvas(true)} className="tdmenu-offcanvas-open-bar d-block d-xl-none">
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
            <OffcanvasTwo offCanvas={offCanvas2} setOffCanvas={setOffCanvas2} />
         </header>
      </>
   )
}

export default HeaderFive
