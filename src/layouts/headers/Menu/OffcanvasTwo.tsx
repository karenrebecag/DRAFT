import { Link } from "react-router-dom"

interface MobileSidebarProps {
   offCanvas: boolean;
   setOffCanvas: (offCanvas: boolean) => void;
}

const OffcanvasTwo = ({ offCanvas, setOffCanvas }: MobileSidebarProps) => {

   return (
      <div className={offCanvas ? "mobile-menu-visible" : ""}>
         <div className="tdmobile__menu td-menu-large">
            <nav className="tdmobile__menu-box">
               <div onClick={() => setOffCanvas(false)} className="close-btn"><i className="fa-solid fa-xmark"></i></div>
               <div className="nav-logo">
                  <Link to="/"><img data-width="96" src="/assets/img/logo/logo-black.png" alt="logo" /></Link>
               </div>
               <div className="tdmobile__search">
                  <form onSubmit={(e) => e.preventDefault()}>
                     <input type="text" placeholder="Search here..." />
                     <button><i className="fas fa-search"></i></button>
                  </form>
               </div>
               <div className="offCanvas__side-info mb-30 ml-25 mr-25">
                  <div className="contact-list mb-30">
                     <h4>Office Address</h4>
                     <p>123/A, Miranda City Likaoli <br /> Prikano, Dope</p>
                  </div>
                  <div className="contact-list mb-30">
                     <h4>Phone Number</h4>
                     <p>+0989 7876 9865 9</p>
                     <p>+(090) 8765 86543 85</p>
                  </div>
                  <div className="contact-list mb-30">
                     <h4>Email Address</h4>
                     <p>info@example.com</p>
                     <p>example.mail@hum.com</p>
                  </div>
               </div>
               <div className="mt-30 ml-25 mr-25">
                  <Link to="/contact" className="td-btn td-btn-menu-black w-100 d-inline-block td-btn-switch-animation ml-10">
                     <span className="d-flex align-items-center justify-content-center">
                        <span className="btn-text"> Contact Us </span>
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

export default OffcanvasTwo
