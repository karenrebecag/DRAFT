import AboutArea from "./AboutArea"
import TeamDetails from "./TeamDetails"
import Feature from "./Feature"
import Awards from "./Awards"
import HeaderGlobal from "../../../layouts/headers/HeaderGlobal"
import Testimonial from "../../common/Testimonial"
import FooterGlobal from "../../../layouts/footers/FooterGlobal"

const About = () => {
   return (
      <>
         <HeaderGlobal />
         <div id="smooth-wrapper">
            <div id="smooth-content">
               <main>
                  <AboutArea />
                  <TeamDetails />
                  <Testimonial />
                  <Feature />
                  <Awards />
               </main>
               <FooterGlobal />
            </div>
         </div>
      </>
   )
}

export default About
