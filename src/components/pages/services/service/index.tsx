import FooterGlobal from "../../../../layouts/footers/FooterGlobal"
import HeaderGlobal from "../../../../layouts/headers/HeaderGlobal"
import BreadcrumbTwo from "../../../common/BreadcrumbTwo"
import Brand from "../../../common/Brand"
import ServiceArea from "./ServiceArea"
import ServiceItem from "./ServiceItem"

const Service = () => {
   return (
      <>
         <HeaderGlobal />
         <div id="smooth-wrapper">
            <div id="smooth-content">
               <main>
                  <BreadcrumbTwo sub_title="BEST SERVICE PROVIDE"
                     title={<>Experience  <br /> The <span>Best Service </span></>}
                     desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse  varius enim in eros elementum Duis cursus, mi quis viverra  ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
                  />
                  <ServiceArea />
                  <ServiceItem />
                  <Brand style={true} />
               </main>
               <FooterGlobal />
            </div>
         </div>
      </>
   )
}

export default Service
