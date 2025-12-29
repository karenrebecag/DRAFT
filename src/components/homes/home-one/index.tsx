import { useState, useCallback, useEffect } from "react"
import SplineStrip from "./SplineStrip"
import ScalingMediaStrip from "./ScalingMediaStrip"
import AboutAgency from "./AboutAgency"
import SignalsStrip from "./SignalsStrip"
import Pricing from "./Pricing"
import PortfolioTwo from "./PortfolioTwo"
import Process from "./Process"
import Testimonial from "./Testimonial"
import FeatureTwo from "./FeatureTwo"
import BlogTwo from "./BlogTwo"
import Faq from "./Faq"
import HeaderGlobal from "../../../layouts/headers/HeaderGlobal"
import FooterGlobal from "../../../layouts/footers/FooterGlobal"
import WelcomeLoader from "../../ui/WelcomeLoader"

const HomeOne = () => {
   const [isSplineLoaded, setIsSplineLoaded] = useState(false)
   const [isLoaderVisible, setIsLoaderVisible] = useState(true)

   const handleSplineLoaded = useCallback(() => {
      setIsSplineLoaded(true)
   }, [])

   const handleLoaderComplete = useCallback(() => {
      setIsLoaderVisible(false)
   }, [])

   // Hide cursor during loading
   useEffect(() => {
      if (isLoaderVisible) {
         document.body.classList.add('loading-active')
      } else {
         document.body.classList.remove('loading-active')
      }
      return () => {
         document.body.classList.remove('loading-active')
      }
   }, [isLoaderVisible])

   return (
      <>
         {/* Welcome Loader */}
         {isLoaderVisible && (
            <WelcomeLoader
               isContentReady={isSplineLoaded}
               onComplete={handleLoaderComplete}
               minDisplayTime={2800}
            />
         )}
         {/* Header only visible after loading */}
         {!isLoaderVisible && <HeaderGlobal />}
         <div id="smooth-wrapper">
            {/* Fixed CSS-only dot grid background - zero JS, maximum performance */}
            {/* Base dark background */}
            <div
               aria-hidden="true"
               style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: -3,
                  backgroundColor: 'rgb(8, 8, 8)',
               }}
            />
            {/* Subtle lighting glow effect */}
            <div
               aria-hidden="true"
               style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: -2,
                  pointerEvents: 'none',
                  background: `
                     radial-gradient(68% 68% at 50% 30%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
                     radial-gradient(50% 50% at 30% 20%, rgba(255, 255, 255, 0.02) 0%, transparent 80%),
                     radial-gradient(40% 40% at 70% 25%, rgba(255, 255, 255, 0.015) 0%, transparent 100%)
                  `,
               }}
            />
            {/* Dot grid pattern with radial mask */}
            <div
               aria-hidden="true"
               style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: -1,
                  pointerEvents: 'none',
                  backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                  maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
               }}
            />
            <div id="smooth-content" style={{ position: 'relative', zIndex: 1 }}>
               <main>
                  <SplineStrip onLoaded={handleSplineLoaded} isLoading={isLoaderVisible} />
                  <ScalingMediaStrip />
                  {/* Editorial strips inspired by interface project */}
                  <AboutAgency />
                  <SignalsStrip />
                  {/* Original sections */}
                  <PortfolioTwo />
                  <Process />
                  <Testimonial />
                  <FeatureTwo />
                  <Pricing />
                  <BlogTwo />
                  <Faq />
               </main>
               {/* Footer with parallax effect */}
               <FooterGlobal />
            </div>
         </div>
      </>
   )
}

export default HomeOne
