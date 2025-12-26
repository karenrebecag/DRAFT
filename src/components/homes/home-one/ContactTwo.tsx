import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

interface DataType {
   id: number;
   title: string;
   class?: string;
}

const contact_slider: DataType[] = [
   {
      id: 1,
      title: "Work",
   },
   {
      id: 2,
      title: "TOGETHER",
      class: "yellows",
   },
   {
      id: 3,
      title: "Work",
   },
   {
      id: 4,
      title: "TOGETHER",
      class: "yellows",
   },
   {
      id: 5,
      title: "Work",
   },
   {
      id: 6,
      title: "TOGETHER",
      class: "yellows",
   },
   {
      id: 7,
      title: "Work",
   },
   {
      id: 8,
      title: "TOGETHER",
      class: "yellows",
   },
   {
      id: 9,
      title: "Work",
   },
   {
      id: 10,
      title: "TOGETHER",
      class: "yellows",
   },
   {
      id: 11,
      title: "Work",
   },
   {
      id: 12,
      title: "TOGETHER",
      class: "yellows",
   },
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

const Contact = () => {
   return (
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
   )
}

export default Contact
