import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { useI18n } from "../../../i18n"

const Service = () => {
   const { t } = useI18n()
   const [activeId, setActiveId] = useState<string>("1")

   const interTightBase: React.CSSProperties = { fontFamily: "'Inter Tight', sans-serif" }
   const interTightSemiBold: React.CSSProperties = { ...interTightBase, fontWeight: 600 }
   const interTightRegular: React.CSSProperties = { ...interTightBase, fontWeight: 400 }
   const interTightLight: React.CSSProperties = { ...interTightBase, fontWeight: 200 }

   const services = [
      { id: "1", ...t.services.items.service1 },
      { id: "2", ...t.services.items.service2 },
      { id: "3", ...t.services.items.service3 },
      { id: "4", ...t.services.items.service4 },
      { id: "5", ...t.services.items.service5 },
      { id: "6", ...t.services.items.service6 },
   ]

   const toggleAccordion = (id: string) => {
      setActiveId(activeId === id ? "" : id)
   }

   return (
      <div className="td-service-area pb-120 pt-120">
         <div className="container">
            {/* Header */}
            <div className="row mb-60">
               <div className="col-12 d-flex justify-content-between align-items-center flex-wrap gap-4">
                  <div>
                     <span style={{ ...interTightLight, fontSize: '14px', letterSpacing: '0.1em', color: '#fff' }}>
                        // {t.services.subtitle}
                     </span>
                     <h2 className="td-section-title td-text-invert mt-10 mb-0" style={interTightSemiBold}>
                        {t.services.title}
                     </h2>
                  </div>
                  <div className="td-btn-group">
                     <Link className="td-btn-circle" to="/contact">
                        <ArrowRight size={16} />
                     </Link>
                     <Link className="td-btn-2 td-btn-primary" to="/contact" style={interTightSemiBold}>
                        {t.services.cta}
                     </Link>
                     <Link className="td-btn-circle" to="/contact">
                        <ArrowRight size={16} />
                     </Link>
                  </div>
               </div>
            </div>

            {/* Accordion Services */}
            <div className="row">
               <div className="col-12">
                  <div className="services-accordion">
                     {services.map((service) => {
                        const isActive = activeId === service.id
                        return (
                           <div
                              key={service.id}
                              className="service-accordion-item"
                              style={{
                                 borderBottom: '1px solid rgba(255,255,255,0.15)',
                                 cursor: 'pointer',
                              }}
                              onClick={() => toggleAccordion(service.id)}
                           >
                              {/* Trigger */}
                              <div
                                 className="service-accordion-trigger d-flex align-items-center"
                                 style={{
                                    padding: '28px 0',
                                    gap: '24px',
                                    transition: 'all 0.3s ease',
                                 }}
                              >
                                 <span
                                    style={{
                                       ...interTightLight,
                                       fontSize: '12px',
                                       color: isActive ? 'var(--color-primary)' : 'rgba(255,255,255,0.6)',
                                       minWidth: '24px',
                                       transition: 'color 0.3s ease',
                                    }}
                                 >
                                    {service.number}
                                 </span>
                                 <h3
                                    style={{
                                       ...interTightSemiBold,
                                       fontSize: 'clamp(24px, 4vw, 42px)',
                                       margin: 0,
                                       textTransform: 'uppercase',
                                       color: isActive ? '#fff' : 'rgba(255,255,255,0.7)',
                                       transition: 'color 0.3s ease',
                                       flex: 1,
                                    }}
                                 >
                                    {service.title}
                                 </h3>
                                 <span
                                    style={{
                                       transform: isActive ? 'rotate(45deg)' : 'rotate(0deg)',
                                       transition: 'transform 0.3s ease',
                                       fontSize: '24px',
                                       color: isActive ? 'var(--color-primary)' : 'rgba(255,255,255,0.6)',
                                    }}
                                 >
                                    +
                                 </span>
                              </div>

                              {/* Content */}
                              <div
                                 className="service-accordion-content"
                                 style={{
                                    maxHeight: isActive ? '300px' : '0',
                                    overflow: 'hidden',
                                    transition: 'max-height 0.4s ease, padding 0.3s ease',
                                    paddingLeft: '48px',
                                    paddingBottom: isActive ? '32px' : '0',
                                 }}
                              >
                                 <p
                                    style={{
                                       ...interTightRegular,
                                       fontSize: '15px',
                                       lineHeight: 1.7,
                                       color: 'rgba(255,255,255,0.85)',
                                       maxWidth: '700px',
                                       margin: '0 0 12px 0',
                                    }}
                                 >
                                    {service.description}
                                 </p>
                                 <span
                                    style={{
                                       ...interTightLight,
                                       fontSize: '13px',
                                       color: 'rgba(255,255,255,0.6)',
                                    }}
                                 >
                                    {service.process}
                                 </span>
                              </div>
                           </div>
                        )
                     })}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Service
