import FooterGlobal from "../../../layouts/footers/FooterGlobal"
import HeaderGlobal from "../../../layouts/headers/HeaderGlobal"
import BreadCrumbOne from "../../common/BreadCrumbOne"
import PortfolioArea from "./PortfolioArea"

const PortfolioTwo = () => {
   return (
      <>
         <HeaderGlobal />
         <div id="smooth-wrapper">
            <div id="smooth-content">
               <main>
                  <BreadCrumbOne sub_title="LATEST PORTFOLIO"
                     title={<>Classic <span>grid</span></>}
                  />
                  <PortfolioArea />
               </main>
               <FooterGlobal />
            </div>
         </div>
      </>
   )
}

export default PortfolioTwo
