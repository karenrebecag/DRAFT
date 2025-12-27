import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

const feature_data: string[] = [
   "Lifetime Membership", "Premium Customer Support", "Free 30 Minute call", "Strategic Roadmapping", "Collaborative Ideation", "Premium Customer Support", "Collaborative Ideation", "Premium Customer Support",
   "Lifetime Membership", "Premium Customer Support", "Free 30 Minute call", "Strategic Roadmapping", "Collaborative Ideation", "Premium Customer Support", "Collaborative Ideation", "Premium Customer Support",
];

const setting = {
   loop: true,
   freeMode: true,
   slidesPerView: 'auto' as const,
   spaceBetween: 75,
   centeredSlides: true,
   allowTouchMove: false,
   speed: 8000,
   autoplay: {
      delay: 1,
      disableOnInteraction: true,
   },
};

const Feature = () => {
   return (
      <div className="td-feature-area fix">
         <div className="fix">
            <img data-speed=".9" className="w-100" src="/assets/img/bigimage/thumb.jpg" alt="" />
         </div>
         <div className="td-feature-slide-wrap td-feature-2-spacing">
            <Swiper {...setting} modules={[Autoplay]} onSwiper={(swiper) => {
               swiper.wrapperEl.classList.add("slide-transition");
            }} className="swiper-container td-feature-2-slider">
               {feature_data.map((item, i) => (
                  <SwiperSlide key={i} className="swiper-slide">
                     <div className="td-feature-2-item">
                        <span><svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M8.59856 1C6.19234 1 4.63215 2.61519 2.78697 3.20392C2.03671 3.4433 1.66158 3.56299 1.50976 3.73172C1.35794 3.90044 1.31349 4.147 1.22458 4.64011C0.273147 9.9168 2.35272 14.7952 7.31223 16.694C7.84511 16.898 8.11154 17 8.60119 17C9.09083 17 9.35725 16.898 9.89009 16.694C14.8493 14.7952 16.9269 9.91678 15.9752 4.6401C15.8862 4.14691 15.8417 3.90032 15.6899 3.73159C15.5381 3.56286 15.1629 3.44324 14.4127 3.20399C12.5668 2.61532 11.0049 1 8.59856 1Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                           <path d="M8.60107 5L8.60107 6.6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        </span>
                        <span>{item} </span>
                     </div>
                  </SwiperSlide>
               ))}
            </Swiper>
         </div>
      </div>
   )
}

export default Feature
