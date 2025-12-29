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
import FooterGlobal, { FooterSpacer } from "../../../layouts/footers/FooterGlobal"
import { FlickeringGrid } from "../../ui/FlickeringGrid"

const HomeOne = () => {
   return (
      <>
         <HeaderGlobal />
         <div id="smooth-wrapper">
            {/* Fixed background grid for all sections */}
            <FlickeringGrid
               style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 0,
                  pointerEvents: 'none',
               }}
               squareSize={4}
               gridGap={6}
               flickerChance={0.3}
               color="rgb(120, 120, 120)"
               maxOpacity={0.07}
            />
            <div id="smooth-content">
               <main>
                  <Hero />
                  <About />
                  <AboutTwo />
                  <Service />
                  <PortfolioTwo />
                  <Process />
                  <Testimonial />
                  <FeatureTwo />
                  <Pricing />
                  <BlogTwo />
                  <Faq />
               </main>
               {/* FooterSpacer creates transparent space to reveal sticky footer */}
               <FooterSpacer />
            </div>
         </div>
         {/* Footer is outside smooth-content, fixed at bottom with z-index: -1 */}
         <FooterGlobal />
      </>
   )
}

export default HomeOne
