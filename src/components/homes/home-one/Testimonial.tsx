import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import type { JSX } from "react";

interface DataType {
   id: number;
   name: string;
   designation: string;
   desc: JSX.Element;
}

const testi_data: DataType[] = [
   {
      id: 1,
      name: "David Backhum",
      designation: "Designer",
      desc: (<>We are excited for our work and how it positively impacts clients. With  over 12 years of experience we have been constantly providing solutions. We are committed to deliver unique digital media solutions from web  design</>),
   },
   {
      id: 2,
      name: "David Backhum",
      designation: "Designer",
      desc: (<>We are excited for our work and how it positively impacts clients. With  over 12 years of experience we have been constantly providing solutions. We are committed to deliver unique digital media solutions from web  design</>),
   },
   {
      id: 3,
      name: "David Backhum",
      designation: "Designer",
      desc: (<>We are excited for our work and how it positively impacts clients. With  over 12 years of experience we have been constantly providing solutions. We are committed to deliver unique digital media solutions from web  design</>),
   },
];

const brand_data: string[] = [
   "/assets/img/brand/logo-1.png",
   "/assets/img/brand/logo-2.png",
   "/assets/img/brand/logo-3.png",
   "/assets/img/brand/logo-4.png",
   "/assets/img/brand/logo-5.png",
   "/assets/img/brand/logo-3.png",
];

const setting1 = {
   slidesPerView: 1,
   speed: 700,
   spaceBetween: 30,
   loop: true,
   navigation: {
      nextEl: ".td-testimonial-next",
      prevEl: ".td-testimonial-prev",
   },
};

const setting2 = {
   loop: true,
   freeMode: true,
   slidesPerView: 'auto' as const,
   spaceBetween: 30,
   centeredSlides: true,
   allowTouchMove: false,
   speed: 9000,
   autoplay: {
      delay: 1,
      disableOnInteraction: true,
   },
};

const Testimonial = () => {
   return (
      <div className="td-testimonial-area grey-bg-2 pt-155 pb-120">
         <div className="container">
            <div className="row">
               <div className="col-lg-3 col-md-4">
                  <div className="td-testimonial-left mb-40 wow fadeInLeft" data-wow-delay=".3s" data-wow-duration="1s">
                     <span className="td-section-subtitle mb-185 d-inline-block">CLIENTS FEEDBACK</span>
                     <img className="mb-20" src="/assets/img/testimonial/user.png" alt="" />
                     <p>More than 25k clients all<br />
                        over the world</p>
                  </div>
               </div>
               <div className="col-lg-9 col-md-8">
                  <div className="td-testimonial-content ml-80 mb-50 wow fadeInRight" data-wow-delay=".3s" data-wow-duration="1s">
                     <h2 className="td-testimonial-title mb-65 td-text-invert">What Our Clients<br /> <span>Say About Us</span></h2>
                     <div className="row">
                        <div className="col-lg-4">
                           <div className="td-testimonial-thumb mb-40">
                              <img className="w-100 td-rounded-10" src="/assets/img/testimonial/thumb.jpg" alt="" />
                           </div>
                        </div>
                        <div className="col-lg-8">
                           <div className="td-testimonial-slide-content ml-25 mb-40">
                              <Swiper {...setting1} modules={[Navigation]} className="swiper-container td-testimonial-slider mb-120">
                                 {testi_data.map((item) => (
                                    <SwiperSlide key={item.id} className="swiper-slide">
                                       <div className="td-testimonial-slide-content">
                                          <p className="mb-40">{item.desc}</p>
                                          <h6>{item.name}</h6>
                                          <span>{item.designation}</span>
                                       </div>
                                    </SwiperSlide>
                                 ))}
                              </Swiper>
                              <div className="td-testimonial-navigation mb-30">
                                 <span className="td-testimonial-prev d-inline-block">
                                    <svg width="31" height="24" viewBox="0 0 31 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M30.8699 12.2679L0.014612 12.4214" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
                                       <path d="M11.5445 0C11.5445 6.63283 6.38111 12 2.56383e-05 12" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
                                       <path d="M4.08971e-05 12C6.38112 12 11.5446 17.3671 11.5446 24" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
                                    </svg>
                                 </span>
                                 <span className="td-testimonial-next ml-15 d-inline-block">
                                    <svg width="31" height="24" viewBox="0 0 31 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M-0.000234102 12.2679L30.855 12.4214" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
                                       <path d="M19.3251 0C19.3251 6.63283 24.4886 12 30.8696 12" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
                                       <path d="M30.8696 12C24.4885 12 19.3251 17.3671 19.3251 24" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
                                    </svg>
                                 </span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-12">
                  <div className="td-brand-wrap">
                     <Swiper {...setting2} modules={[Autoplay]} onSwiper={(swiper) => {
                        swiper.wrapperEl.classList.add("slide-transition");
                     }} className="swiper-container td-brand-slide-active">
                        {brand_data.map((brand, i) => (
                           <SwiperSlide key={i} className="swiper-slide">
                              <div className="td-brand-item">
                                 <img src={brand} alt="" />
                              </div>
                           </SwiperSlide>
                        ))}
                     </Swiper>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Testimonial
