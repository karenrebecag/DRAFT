import ContactMap from "./ContactMap"
import ContactArea from "./ContactArea"
import ContactBranch from "./ContactBranch"
import Breadcrumb from "./Breadcrumb"
import HeaderGlobal from "../../layouts/headers/HeaderGlobal"
import FooterGlobal from "../../layouts/footers/FooterGlobal"

const Contact = () => {
   return (
      <>
         <HeaderGlobal />
         <div id="smooth-wrapper">
            <div id="smooth-content">
               <main>
                  <Breadcrumb />
                  <ContactMap />
                  <ContactArea />
                  <ContactBranch />
               </main>
               <FooterGlobal />
            </div>
         </div>
      </>
   )
}

export default Contact
