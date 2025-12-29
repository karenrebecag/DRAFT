import SplineStrip from "./SplineStrip"
import LogoMarquee from "./LogoMarquee"
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
         <LogoMarquee />
         <div id="smooth-wrapper">
            {/* Fixed background grid for all sections */}
            {/* Almost black background */}
            <div
               style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: -2,
                  backgroundColor: 'rgb(8, 8, 8)',
               }}
            />
            <FlickeringGrid
               style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: -1,
                  pointerEvents: 'none',
               }}
               squareSize={4}
               gridGap={6}
               flickerChance={0.3}
               color="rgb(120, 120, 120)"
               hoverColor="rgb(180, 180, 180)"
               maxOpacity={0.08}
               interactive={true}
               mouseRadius={200}
               magnetStrength={0.3}
               revealAnimation={true}
               revealSpeed={0.015}
            />
            <div id="smooth-content" style={{ position: 'relative', zIndex: 1 }}>
               <main>
                  <SplineStrip />
                  {/* <Hero /> */}
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
