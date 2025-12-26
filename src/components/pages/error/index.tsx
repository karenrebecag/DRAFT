import FooterGlobal from "../../../layouts/footers/FooterGlobal"
import HeaderGlobal from "../../../layouts/headers/HeaderGlobal"
import ErrorArea from "./ErrorArea"

const Error = () => {
   return (
      <>
         <HeaderGlobal />
         <div id="smooth-wrapper">
            <div id="smooth-content">
               <main>
                  <ErrorArea />
               </main>
               <FooterGlobal />
            </div>
         </div>
      </>
   )
}

export default Error
