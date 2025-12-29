import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { useI18n } from "../../../i18n"

const About = () => {
   const { t } = useI18n()

   return (
      <div className="td-about-area" style={{ paddingTop: '60px' }}>
         <div className="container">
            <div className="row">
               <div className="col-lg-4">
                  <div className="td-about-left mb-30">
                     <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, color: '#fff' }}>{t.about.subtitle}</span>
                     <div className="td-about-left-thumb ml-60 fix td-rounded-10" style={{ position: 'relative', width: '100%', aspectRatio: '1/1', overflow: 'hidden' }}>
                        <img
                           src="/assets/img/about/thumb.jpg"
                           alt="About DRAFT Studio"
                           style={{
                              width: '100%',
                              height: '100%',
                              borderRadius: '10px',
                              objectFit: 'cover',
                              display: 'block'
                           }}
                        />
                     </div>
                  </div>
               </div>
               <div className="col-lg-8">
                  <div className="td-about-content mb-30">
                     <h2 className="td-about-title mb-30" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 600 }}>{t.about.title}</h2>
                     <p className="mb-45" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400 }}>{t.about.description}</p>
                     <div className="td-btn-group mb-35">
                        <Link className="td-btn-circle" to="/about">
                           <ArrowRight size={16} />
                        </Link>
                        <Link className="td-btn-2 td-btn-primary" to="/about" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 600 }}>{t.about.cta}</Link>
                        <Link className="td-btn-circle" to="/about">
                           <ArrowRight size={16} />
                        </Link>
                     </div>
                     <div className="td-about-thumb-wrap d-flex align-items-center justify-content-end">
                        <div className="mr-150 td-about-shape">
                           <img className="td-live-anim-spin" src="/assets/img/about/shape.png" alt="" />
                        </div>
                        <div className="td-about-thumb fix td-rounded-10">
                           <img data-speed=".9" src="/assets/img/about/thumb-2.jpg" alt="" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default About
