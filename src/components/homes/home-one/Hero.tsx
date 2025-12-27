import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useInView } from 'react-intersection-observer';
import { useI18n } from '../../../i18n';
import { LoopingWords } from '../../ui/LoopingWords';
import { HeroUnderline } from '../../ui/HeroUnderline';
import { FlickeringGrid } from '../../ui/FlickeringGrid';

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

const Hero = () => {
   const { t } = useI18n();
   const { ref: heroRef, inView } = useInView({
      threshold: 0.3,
      triggerOnce: false,
   });

   return (
      <div className="td-hero-area td-hero-spacing p-relative fix z-index-1" style={{ overflow: 'hidden', backgroundColor: '#ffffff' }}>
         <FlickeringGrid
            className="p-absolute"
            style={{ position: 'absolute', inset: 0, zIndex: 0 }}
            squareSize={4}
            gridGap={6}
            flickerChance={0.3}
            color="rgb(100, 100, 100)"
            maxOpacity={0.1}
         />
         <div className="container" style={{ position: 'relative', zIndex: 3 }}>
            <div className="row justify-content-center">
               <div className="col-lg-10">
                  <div className="td-hero-content">
                     <div ref={heroRef} className="td-hero-title text-center wow fadeInUp" data-wow-delay=".5s" data-wow-duration="1s" style={{ position: 'relative' }}>
                    
                      

                        <h2 className="title" style={{ position: 'relative', zIndex: 1, lineHeight: 1.1, whiteSpace: 'nowrap' }}>
                           {t.hero.titleLine1Prefix && <span>{t.hero.titleLine1Prefix} </span>}
                           <HeroUnderline
                              isActive={inView}
                              strokeColor="var(--color-primary, #beff01)"
                              strokeWidth={10}
                              top="40%"
                              className="d-none d-md-block"
                           >
                              {t.hero.titleLine1Highlight}
                           </HeroUnderline>
                           <span className="d-md-none">{t.hero.titleLine1Highlight}</span>
                        </h2>
                        <h2 className="title mb-0" style={{ position: 'relative', marginTop: 'clamp(-5px, -1.5vw, -30px)', zIndex: 1, lineHeight: 1.1 }}>
                           {t.hero.titleLine2}
                        </h2>
                        <h2 className="title" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.25em', whiteSpace: 'nowrap', position: 'relative', zIndex: 1, marginTop: 'clamp(0px, -0.5vw, -15px)', lineHeight: 1.1 }}>
                           <span>{t.hero.titleLine3Prefix}</span>
                           <LoopingWords words={[...t.hero.rotatingWords]} />
                        </h2>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="td-hero-text-slide  wow fadeInUp" data-wow-delay=".7s" data-wow-duration="1s" style={{ position: 'relative', zIndex: 2 }}>
            <div className="container-fluid">
               <div className="row">
                  <Swiper {...setting} modules={[Autoplay]} onSwiper={(swiper) => {
                     swiper.wrapperEl.classList.add("slide-transition");
                  }} className="swiper-container td-hero-text-slide-active">
                     {t.hero.sliderWords.map((item, i) => (
                        <SwiperSlide key={i} className="swiper-slide">
                           <div>
                              <h2 className="td-hero-bigtext">{item}</h2>
                           </div>
                        </SwiperSlide>
                     ))}
                  </Swiper>
               </div>
            </div>
         </div>
         <div className="pb-60" style={{ position: 'relative', zIndex: 2 }}>
            <div className="container">
               <div className="row">
                  <div className="col-12">
                     <div className="td-hero-feature">
                        <ul>
                           <li>
                              <span>
                                 <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24.1129 11.043C21.8064 11.043 19.2903 12.7204 13.2097 12.8952C17.4731 8.59678 20.5833 8.14248 22.2607 6.46506C22.6452 6.08065 22.8199 5.62635 22.8199 5.24194C22.8199 4.19355 21.8064 3.21506 20.828 3.21506C20.3737 3.21506 19.8495 3.38979 19.465 3.7742C17.8575 5.41667 17.2285 8.35215 13.1048 12.7903C13.0699 6.70968 14.957 4.12366 14.957 1.85215C14.957 0.594087 14.0134 0 13 0C12.0564 0 11.043 0.594087 11.043 1.8871C11.043 4.12366 12.7204 6.70968 12.8952 12.7903C8.7715 8.42205 8.21236 5.41667 6.56989 3.7742C6.15054 3.38979 5.69624 3.18011 5.24193 3.18011C4.12366 3.18011 3.18011 4.19355 3.18011 5.24194C3.18011 5.62635 3.35484 6.08065 3.73925 6.46506C5.41667 8.21237 8.52688 8.59678 12.7903 12.8952C6.74462 12.7204 4.22849 11.043 1.95699 11.043C0.663978 11.043 0 12.0565 0 13.0699C0 14.0134 0.594086 14.957 1.85215 14.957C4.22849 14.957 6.74462 13.0699 12.8253 13.0699C8.35215 17.2285 5.41667 17.8575 3.77419 19.4651C3.38978 19.8495 3.18011 20.3737 3.18011 20.828C3.18011 21.8763 4.19355 22.8199 5.24193 22.8199C5.62634 22.8199 6.08064 22.6452 6.46505 22.2608C8.14247 20.5833 8.59677 17.4731 12.8952 13.2097C12.7204 19.2903 11.043 21.8065 11.043 24.1129C11.043 25.4059 12.0564 26 13 26C14.0134 26 14.957 25.4059 14.957 24.1479C14.957 21.8065 13.0699 19.2903 13.1048 13.2097C17.4032 17.4731 17.8575 20.5833 19.5349 22.2608C19.9194 22.6452 20.3737 22.8199 20.7581 22.8199C21.8064 22.8199 22.7849 21.8065 22.7849 20.828C22.7849 20.3737 22.6102 19.8495 22.2258 19.4651C20.5833 17.8575 17.6478 17.2285 13.1747 13.0699C19.2903 13.0699 21.8064 14.957 24.1478 14.957C25.4059 14.957 26 14.0134 26 13C26 12.0565 25.4059 11.043 24.1129 11.043Z" fill="#1C1D1F" />
                                 </svg>
                              </span>{t.hero.feature1}
                           </li>
                           <li className="td-border"></li>
                           <li>
                              <span>
                                 <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24.1129 11.043C21.8064 11.043 19.2903 12.7204 13.2097 12.8952C17.4731 8.59678 20.5833 8.14248 22.2607 6.46506C22.6452 6.08065 22.8199 5.62635 22.8199 5.24194C22.8199 4.19355 21.8064 3.21506 20.828 3.21506C20.3737 3.21506 19.8495 3.38979 19.465 3.7742C17.8575 5.41667 17.2285 8.35215 13.1048 12.7903C13.0699 6.70968 14.957 4.12366 14.957 1.85215C14.957 0.594087 14.0134 0 13 0C12.0564 0 11.043 0.594087 11.043 1.8871C11.043 4.12366 12.7204 6.70968 12.8952 12.7903C8.7715 8.42205 8.21236 5.41667 6.56989 3.7742C6.15054 3.38979 5.69624 3.18011 5.24193 3.18011C4.12366 3.18011 3.18011 4.19355 3.18011 5.24194C3.18011 5.62635 3.35484 6.08065 3.73925 6.46506C5.41667 8.21237 8.52688 8.59678 12.7903 12.8952C6.74462 12.7204 4.22849 11.043 1.95699 11.043C0.663978 11.043 0 12.0565 0 13.0699C0 14.0134 0.594086 14.957 1.85215 14.957C4.22849 14.957 6.74462 13.0699 12.8253 13.0699C8.35215 17.2285 5.41667 17.8575 3.77419 19.4651C3.38978 19.8495 3.18011 20.3737 3.18011 20.828C3.18011 21.8763 4.19355 22.8199 5.24193 22.8199C5.62634 22.8199 6.08064 22.6452 6.46505 22.2608C8.14247 20.5833 8.59677 17.4731 12.8952 13.2097C12.7204 19.2903 11.043 21.8065 11.043 24.1129C11.043 25.4059 12.0564 26 13 26C14.0134 26 14.957 25.4059 14.957 24.1479C14.957 21.8065 13.0699 19.2903 13.1048 13.2097C17.4032 17.4731 17.8575 20.5833 19.5349 22.2608C19.9194 22.6452 20.3737 22.8199 20.7581 22.8199C21.8064 22.8199 22.7849 21.8065 22.7849 20.828C22.7849 20.3737 22.6102 19.8495 22.2258 19.4651C20.5833 17.8575 17.6478 17.2285 13.1747 13.0699C19.2903 13.0699 21.8064 14.957 24.1478 14.957C25.4059 14.957 26 14.0134 26 13C26 12.0565 25.4059 11.043 24.1129 11.043Z" fill="#1C1D1F" />
                                 </svg>
                              </span>{t.hero.feature2}
                           </li>
                           <li className="td-border"></li>
                           <li>
                              <span>
                                 <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24.1129 11.043C21.8064 11.043 19.2903 12.7204 13.2097 12.8952C17.4731 8.59678 20.5833 8.14248 22.2607 6.46506C22.6452 6.08065 22.8199 5.62635 22.8199 5.24194C22.8199 4.19355 21.8064 3.21506 20.828 3.21506C20.3737 3.21506 19.8495 3.38979 19.465 3.7742C17.8575 5.41667 17.2285 8.35215 13.1048 12.7903C13.0699 6.70968 14.957 4.12366 14.957 1.85215C14.957 0.594087 14.0134 0 13 0C12.0564 0 11.043 0.594087 11.043 1.8871C11.043 4.12366 12.7204 6.70968 12.8952 12.7903C8.7715 8.42205 8.21236 5.41667 6.56989 3.7742C6.15054 3.38979 5.69624 3.18011 5.24193 3.18011C4.12366 3.18011 3.18011 4.19355 3.18011 5.24194C3.18011 5.62635 3.35484 6.08065 3.73925 6.46506C5.41667 8.21237 8.52688 8.59678 12.7903 12.8952C6.74462 12.7204 4.22849 11.043 1.95699 11.043C0.663978 11.043 0 12.0565 0 13.0699C0 14.0134 0.594086 14.957 1.85215 14.957C4.22849 14.957 6.74462 13.0699 12.8253 13.0699C8.35215 17.2285 5.41667 17.8575 3.77419 19.4651C3.38978 19.8495 3.18011 20.3737 3.18011 20.828C3.18011 21.8763 4.19355 22.8199 5.24193 22.8199C5.62634 22.8199 6.08064 22.6452 6.46505 22.2608C8.14247 20.5833 8.59677 17.4731 12.8952 13.2097C12.7204 19.2903 11.043 21.8065 11.043 24.1129C11.043 25.4059 12.0564 26 13 26C14.0134 26 14.957 25.4059 14.957 24.1479C14.957 21.8065 13.0699 19.2903 13.1048 13.2097C17.4032 17.4731 17.8575 20.5833 19.5349 22.2608C19.9194 22.6452 20.3737 22.8199 20.7581 22.8199C21.8064 22.8199 22.7849 21.8065 22.7849 20.828C22.7849 20.3737 22.6102 19.8495 22.2258 19.4651C20.5833 17.8575 17.6478 17.2285 13.1747 13.0699C19.2903 13.0699 21.8064 14.957 24.1478 14.957C25.4059 14.957 26 14.0134 26 13C26 12.0565 25.4059 11.043 24.1129 11.043Z" fill="#1C1D1F" />
                                 </svg>
                              </span>{t.hero.feature3}
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="container container-1680" style={{ position: 'relative', zIndex: 2 }}>
            <div className="row">
               <div className="col-12">
                  <div className="td-hero-bottom-thumb">
                     <img data-speed="0.6" className="w-100 round-2" src="/assets/img/hero/bg-thumb.jpg" alt="" />
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Hero
