import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Link } from "react-router-dom";

interface DataType {
   id: number;
   thumb: string;
   year: string;
   title: string;
}

const portfolio_data: DataType[] = [
   {
      id: 1,
      thumb: "/assets/img/portfolio/2/thumb.jpg",
      year: "2024",
      title: "Colyfate tent",
   },
   {
      id: 2,
      thumb: "/assets/img/portfolio/2/thumb-2.jpg",
      year: "2024",
      title: "Colyfate tent",
   },
   {
      id: 3,
      thumb: "/assets/img/portfolio/2/thumb-3.jpg",
      year: "2024",
      title: "Colyfate tent",
   },
   {
      id: 4,
      thumb: "/assets/img/portfolio/2/thumb-4.jpg",
      year: "2024",
      title: "Colyfate tent",
   },
   {
      id: 5,
      thumb: "/assets/img/portfolio/2/thumb-5.jpg",
      year: "2024",
      title: "Colyfate tent",
   },
   {
      id: 6,
      thumb: "/assets/img/portfolio/2/thumb-6.jpg",
      year: "2024",
      title: "Colyfate tent",
   },
   {
      id: 7,
      thumb: "/assets/img/portfolio/2/thumb-7.jpg",
      year: "2024",
      title: "Colyfate tent",
   },
   {
      id: 8,
      thumb: "/assets/img/portfolio/2/thumb-8.jpg",
      year: "2024",
      title: "Colyfate tent",
   },
];

const portfolio_data2: DataType[] = [
   {
      id: 1,
      thumb: "/assets/img/portfolio/2/thumb-7.jpg",
      year: "2024",
      title: "Colyfate tent",
   },
   {
      id: 2,
      thumb: "/assets/img/portfolio/2/thumb-8.jpg",
      year: "2024",
      title: "Colyfate tent",
   },
   {
      id: 3,
      thumb: "/assets/img/portfolio/2/thumb.jpg",
      year: "2024",
      title: "Colyfate tent",
   },
   {
      id: 4,
      thumb: "/assets/img/portfolio/2/thumb-2.jpg",
      year: "2024",
      title: "Colyfate tent",
   },
   {
      id: 5,
      thumb: "/assets/img/portfolio/2/thumb-3.jpg",
      year: "2024",
      title: "Colyfate tent",
   },
   {
      id: 6,
      thumb: "/assets/img/portfolio/2/thumb-4.jpg",
      year: "2024",
      title: "Colyfate tent",
   },
   {
      id: 7,
      thumb: "/assets/img/portfolio/2/thumb-5.jpg",
      year: "2024",
      title: "Colyfate tent",
   },
   {
      id: 8,
      thumb: "/assets/img/portfolio/2/thumb-6.jpg",
      year: "2024",
      title: "Colyfate tent",
   },
];

const setting = {
   loop: true,
   freeMode: true,
   slidesPerView: 'auto' as const,
   spaceBetween: 15,
   centeredSlides: true,
   allowTouchMove: false,
   speed: 6000,
   autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
   },
};

const setting2 = {
   loop: true,
   freeMode: true,
   slidesPerView: 'auto' as const,
   spaceBetween: 15,
   centeredSlides: true,
   allowTouchMove: false,
   speed: 6000,
   autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
   },
};

const Portfolio = () => {
   return (
      <div className="td-portfolio-area pt-125 bg-white">
         <h2 className="td-portfolio-2-bigtitle td-split-text td-split-in-right">Work</h2>
         <div className="td-portfolio-2-slider-wrap mb-10">
            <Swiper {...setting} modules={[Autoplay]} onSwiper={(swiper) => {
               swiper.wrapperEl.classList.add("slide-transition");
            }} className="swiper-container td-portfolio-2-slider">
               {portfolio_data.map((item) => (
                  <SwiperSlide key={item.id} className="swiper-slide">
                     <div className="td-portfolio-2-item p-relative">
                        <div className="td-portfolio-2-thumb fix">
                           <img src={item.thumb} alt="" />
                        </div>
                        <div className="td-portfolio-2-content">
                           <div className="dates mb-10">
                              <span>{item.year}</span>
                              <span className="dot"></span>
                              <span>Parody</span>
                           </div>
                           <Link className="title" to="/portfolio-details">{item.title}</Link>
                        </div>
                     </div>
                  </SwiperSlide>
               ))}
            </Swiper>
         </div>
         <div className="td-portfolio-2-slider-wrap">
            <Swiper {...setting2} modules={[Autoplay]} onSwiper={(swiper) => {
               swiper.wrapperEl.classList.add("slide-transition");
            }} className="swiper-container td-portfolio-2-slider-2" dir="rtl">
               {portfolio_data2.map((item) => (
                  <SwiperSlide key={item.id} className="swiper-slide">
                     <div className="td-portfolio-2-item p-relative">
                        <div className="td-portfolio-2-thumb fix">
                           <img src={item.thumb} alt="" />
                        </div>
                        <div className="td-portfolio-2-content">
                           <div className="dates mb-10">
                              <span>{item.year}</span>
                              <span className="dot"></span>
                              <span>Parody</span>
                           </div>
                           <Link className="title" to="/portfolio-details">{item.title}</Link>
                        </div>
                     </div>
                  </SwiperSlide>
               ))}
            </Swiper>
         </div>
      </div>
   )
}

export default Portfolio
