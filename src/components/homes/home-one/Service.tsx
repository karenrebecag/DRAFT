import { useState } from "react"
import { Link } from "react-router-dom"
import { useI18n } from "../../../i18n"

const Service = () => {
   const { t } = useI18n()
   const [activeId, setActiveId] = useState<string>("1")

   const franieBase: React.CSSProperties = { fontFamily: "'Franie', sans-serif" }
   const franieSemiBold: React.CSSProperties = { ...franieBase, fontWeight: 600 }
   const franieRegular: React.CSSProperties = { ...franieBase, fontWeight: 400 }
   const franieLight: React.CSSProperties = { ...franieBase, fontWeight: 200 }

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
                     <span style={{ ...franieLight, fontSize: '14px', letterSpacing: '0.1em', color: 'var(--color-gray)' }}>
                        // {t.services.subtitle}
                     </span>
                     <h2 className="td-section-title td-text-invert mt-10 mb-0" style={franieSemiBold}>
                        {t.services.title}
                     </h2>
                  </div>
                  <div className="td-btn-group">
                     <Link className="td-btn-circle" to="/contact">
                        <i className="fa-solid fa-arrow-right"></i>
                     </Link>
                     <Link className="td-btn-2 td-btn-primary" to="/contact" style={franieSemiBold}>
                        {t.services.cta}
                     </Link>
                     <Link className="td-btn-circle" to="/contact">
                        <i className="fa-solid fa-arrow-right"></i>
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
                                 borderBottom: '1px solid rgba(0,0,0,0.1)',
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
                                       ...franieLight,
                                       fontSize: '12px',
                                       color: isActive ? 'var(--color-primary)' : 'var(--color-gray)',
                                       minWidth: '24px',
                                       transition: 'color 0.3s ease',
                                    }}
                                 >
                                    {service.number}
                                 </span>
                                 <h3
                                    style={{
                                       ...franieSemiBold,
                                       fontSize: 'clamp(24px, 4vw, 42px)',
                                       margin: 0,
                                       textTransform: 'uppercase',
                                       color: isActive ? 'var(--color-black)' : 'var(--color-black-lighter)',
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
                                       color: isActive ? 'var(--color-primary)' : 'var(--color-gray)',
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
                                       ...franieRegular,
                                       fontSize: '15px',
                                       lineHeight: 1.7,
                                       color: 'var(--color-gray-700)',
                                       maxWidth: '700px',
                                       margin: '0 0 12px 0',
                                    }}
                                 >
                                    {service.description}
                                 </p>
                                 <span
                                    style={{
                                       ...franieLight,
                                       fontSize: '13px',
                                       color: 'var(--color-gray)',
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
