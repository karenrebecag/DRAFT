import type { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import useLenisSmoother from "../hooks/useLenisSmoother";
import useImageRevealAnimation from "../hooks/useImageRevealAnimation";
import useSplitTextTitleAnim from "../hooks/useSplitTextTitleAnim";
import useSplitTextBgAnim from "../hooks/useSplitTextBgAnim";
import ScrollToTop from "../components/common/ScrollToTop";
import CustomCursor from "../components/common/CustomCursor";
import "lenis/dist/lenis.css";

type WrapperProps = {
  children: ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  // Lenis smooth scroll with GSAP ScrollTrigger integration
  useLenisSmoother();
  useImageRevealAnimation();
  useSplitTextTitleAnim();
  useSplitTextBgAnim();

  return (
    <>
      {children}
      <ScrollToTop />
      <CustomCursor />
      <ToastContainer position="top-center" />
    </>
  );
};

export default Wrapper;
