import FooterGlobal from "../../../../layouts/footers/FooterGlobal"
import HeaderGlobal from "../../../../layouts/headers/HeaderGlobal"
import Faq from "./Faq"
import ServiceDetailsArea from "./ServiceDetailsArea"
import ServiceProcess from "./ServiceProcess"
import ServiceReplace from "./ServiceReplace"

const ServiceDetails = () => {
   return (
      <>
         <HeaderGlobal />
         <div id="smooth-wrapper">
            <div id="smooth-content">
               <main>
                  <ServiceDetailsArea />
                  <ServiceProcess />
                  <Faq style={false} />
                  <ServiceReplace />
               </main>
               <FooterGlobal />
            </div>
         </div>
      </>
   )
}

export default ServiceDetails
