import FooterGlobal from "../../../layouts/footers/FooterGlobal"
import HeaderGlobal from "../../../layouts/headers/HeaderGlobal"
import BreadCrumb from "./BreadCrumb"
import PortfolioDetailsArea from "./PortfolioDetailsArea"
import PortfolioThumbArea from "./PortfolioThumbArea"
import PortfolioVisualIdentity from "./PortfolioVisualIdentity"

const PortfolioDetails = () => {
   return (
      <>
         <HeaderGlobal />
         <div id="smooth-wrapper">
            <div id="smooth-content">
               <main>
                  <BreadCrumb />
                  <PortfolioDetailsArea />
                  <PortfolioThumbArea />
                  <PortfolioVisualIdentity />
               </main>
               <FooterGlobal />
            </div>
         </div>
      </>
   )
}

export default PortfolioDetails
