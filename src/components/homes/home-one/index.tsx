import Hero from "./Hero"
import About from "./About"
import AboutTwo from "./AboutTwo"
import Service from "./Service"
import Pricing from "./Pricing"
import PortfolioTwo from "./PortfolioTwo"
import Process from "./Process"
import Testimonial from "./Testimonial"
import FeatureTwo from "./FeatureTwo"
import BlogTwo from "./BlogTwo"
import Faq from "./Faq"
import HeaderGlobal from "../../../layouts/headers/HeaderGlobal"
import FooterGlobal from "../../../layouts/footers/FooterGlobal"

const HomeOne = () => {
   return (
      <>
         <HeaderGlobal />
         <div id="smooth-wrapper">
            <div id="smooth-content">
               <main>
                  <Hero />
                  <AboutTwo />
                  <About />
                  <Service />
                 
                  <PortfolioTwo />
                  <Process />
                  <Testimonial />
                  <FeatureTwo />
                   <Pricing />
                  <BlogTwo />
                  <Faq />
               </main>
               <FooterGlobal />
            </div>
         </div>
      </>
   )
}

export default HomeOne
