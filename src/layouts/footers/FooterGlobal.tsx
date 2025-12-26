import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

interface DataType {
   id: number;
   title: string;
   class?: string;
}

const contact_slider: DataType[] = [
   { id: 1, title: "Work" },
   { id: 2, title: "TOGETHER", class: "yellows" },
   { id: 3, title: "Work" },
   { id: 4, title: "TOGETHER", class: "yellows" },
   { id: 5, title: "Work" },
   { id: 6, title: "TOGETHER", class: "yellows" },
   { id: 7, title: "Work" },
   { id: 8, title: "TOGETHER", class: "yellows" },
   { id: 9, title: "Work" },
   { id: 10, title: "TOGETHER", class: "yellows" },
   { id: 11, title: "Work" },
   { id: 12, title: "TOGETHER", class: "yellows" },
];

const setting = {
   loop: true,
   freeMode: true,
   slidesPerView: 'auto' as const,
   spaceBetween: 30,
   centeredSlides: true,
   allowTouchMove: false,
   speed: 30000,
   autoplay: {
      delay: 1,
      disableOnInteraction: true,
   },
};

const FooterGlobal = () => {
   return (
      <footer>
         {/* Contact Section */}
         <div className="td-contact-area td-contact-2-wrap pt-85 fix pb-50">
            <div className="td-contact-7-text-slider">
               <div className="td-contact-7-text-btn text-center pt-30">
                  <Link to="/contact">
                     <img className="td-live-anim-spin" src="/assets/img/contact/text.png" alt="" />
                     <span className="icon">
                        <svg width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M7.07031 22.0708L21.2124 7.92867" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                           <path d="M21.2124 22.0713V7.9292H7.07031" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                     </span>
                  </Link>
               </div>
               <Swiper {...setting} modules={[Autoplay]} onSwiper={(swiper) => {
                  swiper.wrapperEl.classList.add("slide-transition");
               }} className="swiper-container td-contact-7-slide-active">
                  {contact_slider.map((item) => (
                     <SwiperSlide key={item.id} className="swiper-slide">
                        <h2 className={`td-contact-7-slide-text ${item.class}`}>{item.title}</h2>
                     </SwiperSlide>
                  ))}
               </Swiper>
            </div>
         </div>

         {/* Footer Section */}
         <div className="td-footer-area td-footer-2-wrap">
            <div className="container">
               <div className="row">
                  <div className="col-lg-6 mb-30">
                     <div className="td-footer-3-widget">
                        <h2 className="td-footer-2-bigtitle">Entrust design<br /> to professionals</h2>
                     </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 mb-30">
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
                  <div className="col-lg-3 col-md-6 col-sm-6 mb-30">
                     <div className="td-footer-3-widget">
                        <h4 className="td-footer-3-title mb-15">Say hello!</h4>
                        <Link className="links links-3 d-block mb-5" to="#">helloparody@mail.com</Link>
                        <Link className="links-2" to="tel:+1234567890">+123 456 7890</Link>
                     </div>
                  </div>
               </div>
            </div>
            <div className="container">
               <div className="td-footer-2-border mt-60">
                  <div className="row align-items-center">
                     <div className="col-lg-8">
                        <div className="td-footer-3-menu mb-10">
                           <ul>
                              <li><Link to="/portfolio">Project</Link></li>
                              <li><Link to="/service">What we do</Link></li>
                              <li><Link to="/about">About</Link></li>
                              <li><Link to="/blog">Blog</Link></li>
                              <li><Link to="/contact">Contact</Link></li>
                           </ul>
                        </div>
                     </div>
                     <div className="col-lg-4">
                        <div className="td-footer-3-copyright text-lg-end mb-10">
                           <p>© 2025 <Link to="/">Parody.</Link> All Rights Reserved.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </footer>
   )
}

export default FooterGlobal
