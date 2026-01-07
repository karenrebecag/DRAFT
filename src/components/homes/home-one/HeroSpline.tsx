import { useEffect, useRef } from 'react';
import { Application } from '@splinetool/runtime';
import { ChevronDown } from 'lucide-react';
import ButtonPrimary from '../../ui/ButtonPrimary';
import ButtonSecondary from '../../ui/ButtonSecondary';

const HeroSpline = () => {
   const canvasRef = useRef<HTMLCanvasElement>(null);

   useEffect(() => {
      if (!canvasRef.current) return;

      const app = new Application(canvasRef.current);
      app.load('/assets/models/Banner.splinecode');

      return () => {
         app.dispose();
      };
   }, []);

   const scrollToNextSection = () => {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
   };

   return (
      <div
         className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center"
         style={{
            background: 'linear-gradient(205deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.05) 20%, rgba(0, 0, 0, 0.05) 63%, rgba(0, 0, 0, 0.10) 100%), black',
         }}
      >
         {/* Spline Background */}
         <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full z-0 pointer-events-none"
         />

         {/* Content Container */}
         <div className="relative z-10 flex flex-col items-center justify-end gap-[260px] px-[74px] py-[135px] max-w-[1600px] w-full min-h-screen">

            {/* Main Content */}
            <div className="flex flex-col items-center gap-[70px]">

               {/* Title Section */}
               <div className="max-w-[1240px] text-center">
                  <h1>
                     <span className="arapey-heading-italic text-white block">
                        Where High Design Meets
                     </span>
                     <span className="poppins-heading-light text-white block">
                        High Performance
                     </span>
                  </h1>
               </div>

               {/* Description */}
               <p className="poppins-body-light text-[#999999] max-w-[1240px] text-center">
                  A premier development studio specializing in high-end UI/UX, motion graphics, and modern tech stacks for global innovators.
               </p>

               {/* Buttons */}
               <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-[940px] px-4 sm:px-[150px]">
                  <ButtonPrimary
                     to="/contact"
                     className="flex-1 w-full sm:w-auto min-w-[200px]"
                  >
                     Start a Project
                  </ButtonPrimary>
                  <ButtonSecondary
                     to="/portfolio"
                     className="flex-1 w-full sm:w-auto min-w-[200px]"
                  >
                     Explore Work
                  </ButtonSecondary>
               </div>
            </div>

            {/* Scroll Down Button */}
            <button
               onClick={scrollToNextSection}
               className="flex items-center justify-center p-2 rounded-[15px] transition-transform hover:scale-105"
               style={{
                  background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.06) 100%)',
               }}
               aria-label="Scroll down"
            >
               <ChevronDown className="w-6 h-6 text-white" />
            </button>
         </div>
      </div>
   )
}

export default HeroSpline
