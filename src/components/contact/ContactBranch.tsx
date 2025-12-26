import { Link } from "react-router-dom"

const ContactBranch = () => {
   return (
      <div className="td-contact-branch-area pb-140">
         <div className="container">
            <div className="row">
               <div className="col-12">
                  <div className="text-center  wow fadeInUp" data-wow-delay=".5s" data-wow-duration="1s">
                     <h2 className="td-section-page-title mb-105">Our Branch <span>Offices</span></h2>
                  </div>
               </div>
               <div className="col-12">
                  <div className="td-contact-branch-item td-contact-branch-border  wow fadeInUp" data-wow-delay=".5s" data-wow-duration="1s">
                     <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6">
                           <h3 className="td-contact-branch-name mb-20">France</h3>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                           <div className="td-contact-branch-thumb mb-20">
                              <img className="w-100 td-rounded-10" src="/assets/img/contact/thumb.jpg" alt="" />
                           </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                           <div className="td-contact-branch-lucation ml-40 mb-20">
                              <h5 className="td-contact-branch-lucation-title">Base Create</h5>
                              <Link className="lucation mb-110" to="#">Base Creative, 43 Appleton
                                 Lane, 3287 Hamilton</Link>
                              <Link className="map" to="#">Google Maps</Link>
                           </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                           <div className="td-contact-branch-number ml-40 mb-20">
                              <Link className="mb-30" to="tel:(+91)76001726">(+91) 76001726</Link>
                              <Link className="link" to="mailto:Hello@contact.com">Hello@contact.com</Link>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="td-contact-branch-item wow fadeInUp" data-wow-delay=".7s" data-wow-duration="1s">
                     <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6">
                           <h3 className="td-contact-branch-name mb-20">Italy</h3>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                           <div className="td-contact-branch-thumb mb-20">
                              <img className="w-100 td-rounded-10" src="/assets/img/contact/thumb-2.jpg" alt="" />
                           </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                           <div className="td-contact-branch-lucation ml-40 mb-20">
                              <h5 className="td-contact-branch-lucation-title">Base Create</h5>
                              <Link className="lucation mb-110" to="#">Base Creative, 43 Appleton
                                 Lane, 3287 Hamilton</Link>
                              <Link className="map" to="#">Google Maps</Link>
                           </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                           <div className="td-contact-branch-number ml-40 mb-20">
                              <Link className="mb-30" to="tel:(+91)76001726">(+91) 76001726</Link>
                              <Link className="link" to="mailto:Hello@contact.com">Hello@contact.com</Link>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ContactBranch
