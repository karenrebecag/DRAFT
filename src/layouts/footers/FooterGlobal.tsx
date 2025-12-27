import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { FlickeringGrid } from '../../components/ui/FlickeringGrid';
import { useI18n } from '../../i18n';
import styles from './FooterGlobal.module.scss';

// Navigation structure matching HeaderGlobal
const getNavItems = (t: ReturnType<typeof useI18n>["t"]) => [
   { id: 1, title: t.nav.aboutUs, link: "/about" },
   { id: 2, title: t.nav.services, link: "/service" },
   { id: 3, title: t.nav.portfolio, link: "/portfolio" },
   { id: 4, title: t.nav.blog, link: "/blog" },
];

// Generate marquee slider items from translations
const getMarqueeItems = (t: ReturnType<typeof useI18n>["t"]) => [
   { id: 1, title: t.footer.marquee.work },
   { id: 2, title: t.footer.marquee.together, class: "yellows" },
   { id: 3, title: t.footer.marquee.work },
   { id: 4, title: t.footer.marquee.together, class: "yellows" },
   { id: 5, title: t.footer.marquee.work },
   { id: 6, title: t.footer.marquee.together, class: "yellows" },
   { id: 7, title: t.footer.marquee.work },
   { id: 8, title: t.footer.marquee.together, class: "yellows" },
   { id: 9, title: t.footer.marquee.work },
   { id: 10, title: t.footer.marquee.together, class: "yellows" },
   { id: 11, title: t.footer.marquee.work },
   { id: 12, title: t.footer.marquee.together, class: "yellows" },
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

// Spacer component to be placed inside smooth-content
export const FooterSpacer = () => (
   <div
      className={styles.footerSpacer}
      aria-hidden="true"
   />
);

const FooterGlobal = () => {
   const { t } = useI18n();
   const navItems = getNavItems(t);
   const marqueeItems = getMarqueeItems(t);

   return (
      <footer className={styles.stickyFooter}>
         <FlickeringGrid
            className="p-absolute"
            style={{ position: 'absolute', inset: 0, zIndex: 0 }}
            squareSize={4}
            gridGap={6}
            flickerChance={0.3}
            color="rgb(60, 60, 60)"
            maxOpacity={0.15}
         />
         <div className={styles.footerContent}>
            {/* Contact Section */}
            <div className="td-contact-area td-contact-2-wrap pt-85 fix pb-50">
               <div className="td-contact-7-text-slider">
                  <div className="td-contact-7-text-btn text-center pt-30">
                     <Link to="/contact">
                        <img className="td-live-anim-spin" src="/assets/img/contact/text.png" alt="" />
                        <span className="icon">
                           <svg width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M7.07031 22.0708L21.2124 7.92867" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M21.2124 22.0713V7.9292H7.07031" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                           </svg>
                        </span>
                     </Link>
                  </div>
                  <Swiper {...setting} modules={[Autoplay]} onSwiper={(swiper) => {
                     swiper.wrapperEl.classList.add("slide-transition");
                  }} className="swiper-container td-contact-7-slide-active">
                     {marqueeItems.map((item) => (
                        <SwiperSlide key={item.id} className="swiper-slide">
                           <h2 className={`td-contact-7-slide-text ${item.class || ''}`}>{item.title}</h2>
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
                           <h2 className="td-footer-2-bigtitle">{t.footer.bigTitle.split('\n').map((line, i) => (
                              <span key={i}>{line}{i === 0 && <br />}</span>
                           ))}</h2>
                        </div>
                     </div>
                     <div className="col-lg-3 col-md-6 col-sm-6 mb-30">
                        <div className="td-footer-3-widget">
                           <h4 className="td-footer-3-title mb-15">{t.footer.location.title}</h4>
                           <span className="links mb-40 d-inline-block">{t.footer.location.address.split('\n').map((line, i) => (
                              <span key={i}>{line}{i === 0 && <br />}</span>
                           ))}</span>
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
                           <h4 className="td-footer-3-title mb-15">{t.footer.contact.title}</h4>
                           <Link className="links links-3 d-block mb-5" to={`mailto:${t.footer.contact.email}`}>{t.footer.contact.email}</Link>
                           <Link className="links-2" to={`tel:${t.footer.contact.phone.replace(/\s/g, '')}`}>{t.footer.contact.phone}</Link>
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
                                 {navItems.map((item) => (
                                    <li key={item.id}><Link to={item.link}>{item.title}</Link></li>
                                 ))}
                                 <li><Link to="/contact">{t.header.contactUs}</Link></li>
                              </ul>
                           </div>
                        </div>
                        <div className="col-lg-4">
                           <div className="td-footer-3-copyright text-lg-end mb-10">
                              <p>&copy; 2025 <Link to="/">STUDIO DRAFT.</Link> {t.footer.copyright}</p>
                           </div>
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
