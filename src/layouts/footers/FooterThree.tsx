import { Link } from "react-router-dom"

const FooterThree = () => {

   return (
      <>
         <footer>
            <div className="td-footer-area pt-110 pb-15 td-footer-3-bg">
               <div className="container">
                  <div className="row">
                     <div className="col-lg-6 mb-30">
                        <div className="td-footer-3-widget">
                           <h2 className="td-footer-3-bigtitle">Entrust design<br /> to <span>professionals</span></h2>
                        </div>
                     </div>
                     <div className="col-lg-3 col-md-6 mb-30">
                        <div className="td-footer-3-widget">
                           <h4 className="td-footer-3-title mb-15">London</h4>
                           <Link className="links mb-40 d-inline-block" to="#">Germany —<br /> 785 15h Street, Office 478<br /> Berlin, De 81566</Link>
                           <div className="td-footer-3-social">
                              <Link to="#"><i className="fa-brands fa-facebook-f"></i></Link>
                              <Link to="#">
                                 <svg width="13" height="13" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.33161 6.77486L15.1688 0H13.7856L8.71722 5.8826L4.66907 0H0L6.12155 8.89546L0 16H1.38336L6.73581 9.78785L11.0109 16H15.68L9.33148 6.77486H9.33187H9.33161ZM7.43696 8.97374L6.81669 8.088L1.88171 1.03969H4.00634L7.98902 6.72789L8.60929 7.61362L13.7863 15.0074H11.6616L7.43709 8.974V8.97361L7.43696 8.97374Z" fill="currentColor" />
                                 </svg>
                              </Link>
                              <Link to="#"><i className="fa-brands fa-linkedin-in"></i></Link>
                              <Link to="#"><i className="fa-brands fa-instagram"></i></Link>
                           </div>
                        </div>
                     </div>
                     <div className="col-lg-3 col-md-6 mb-30">
                        <div className="td-footer-3-widget">
                           <h4 className="td-footer-3-title mb-15">Say hello!</h4>
                           <Link className="links links-3 d-block mb-5" to="#">helloparody@mail.com</Link>
                           <Link className="links-2" to="tel:+1234567890">+123 456 7890</Link>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="container-fluid">
                  <div className="row">
                     <div className="col-lg-12">
                        <div className="text-center pt-20">
                           <h2 className="td-footer-3-middle-title">Parody studio</h2>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="container">
                  <div className="row">
                     <div className="col-lg-8">
                        <div className="td-footer-3-menu mb-30">
                           <ul>
                              <li><Link to="#">Project </Link></li>
                              <li><Link to="#">What we do</Link></li>
                              <li><Link to="#">About</Link></li>
                              <li><Link to="#">Blog</Link></li>
                              <li><Link to="#">Contact</Link></li>
                           </ul>
                        </div>
                     </div>
                     <div className="col-lg-4">
                        <div className="td-footer-3-copyright mb-30">
                           <p>© 2025 <Link to="#">Parody.</Link> All Rights Reserved.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </footer>
      </>
   )
}

export default FooterThree
