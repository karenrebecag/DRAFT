import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
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

const Testimonial = () => {
   return (
      <div className="td-testimonial-area td-btn-trigger td-testimonial-2-wrap pt-155 pb-50">
         <div className="container">
            <div className="row align-items-center mb-20">
               <div className="col-lg-9">
                  <div className="td-service-2-title-wrap mb-40">
                     <span className="td-section-2-subtitle mb-25 d-block">//  Our clients feedback</span>
                     <h2 className="td-section-2-title d-inline-block">What our client say <br /> about <span>our parody</span></h2>
                  </div>
               </div>
               <div className="col-lg-3">
                  <div className="td-testimonial-left mb-40  td-btn-bounce">
                     <img className="mb-20" src="/assets/img/testimonial/user.png" alt="" />
                     <p>More than 25k clients all<br />
                        over the world</p>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-lg-2 order-md-2 order-lg-0 mb-40">
                  <div className="td-testimonial-navigation">
                     <span className="td-testimonial-prev d-inline-block">
                        <svg width="31" height="24" viewBox="0 0 31 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M30.8699 12.2679L0.014612 12.4214" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
                           <path d="M11.5445 0C11.5445 6.63283 6.38111 12 2.56383e-05 12" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
                           <path d="M4.08971e-05 12C6.38112 12 11.5446 17.3671 11.5446 24" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
                        </svg>
                     </span>
                     <span className="td-testimonial-next ml-10 d-inline-block">
                        <svg width="31" height="24" viewBox="0 0 31 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M-0.000234102 12.2679L30.855 12.4214" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
                           <path d="M19.3251 0C19.3251 6.63283 24.4886 12 30.8696 12" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
                           <path d="M30.8696 12C24.4885 12 19.3251 17.3671 19.3251 24" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
                        </svg>
                     </span>
                  </div>
               </div>
               <div className="col-lg-4 order-md-1 order-lg-1">
                  <div className="td-testimonial-thumb mb-40">
                     <img className="w-100 td-rounded-10" src="/assets/img/testimonial/tes-2/thumb.jpg" alt="" />
                  </div>
               </div>
               <div className="col-lg-6 order-md-3">
                  <div className="td-testimonial-slide-content ml-30 mb-40">
                     <Swiper {...setting1} modules={[Navigation]} className="swiper-container td-testimonial-slider mb-120">
                        {testi_data.map((item) => (
                           <SwiperSlide key={item.id} className="swiper-slide">
                              <div className="td-testimonial-slide-content">
                                 <span className="d-block mb-35">
                                    <svg width="100" height="72" viewBox="0 0 100 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M21.4286 41.8731H1V0.99707H41.8571V42.6371L27.9531 70.457H8.76046L22.3231 43.3201L23.0463 41.8731H21.4286Z" stroke="#0A1119" strokeOpacity="0.3" strokeWidth="2" />
                                       <path d="M78.5711 41.8731H58.1426V0.99707H98.9997V42.6371L85.0957 70.457H65.903L79.4656 43.3201L80.1888 41.8731H78.5711Z" stroke="#0A1119" strokeOpacity="0.3" strokeWidth="2" />
                                    </svg>
                                 </span>
                                 <p className="mb-90">{item.desc}</p>
                                 <h6>{item.name}</h6>
                                 <span>{item.designation}</span>
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
