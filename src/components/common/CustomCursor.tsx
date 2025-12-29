import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const isTouchDevice = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isPrimaryTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    return hasTouch || isPrimaryTouch;
  } catch {
    return false;
  }
};

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const [isTouch] = useState(() => isTouchDevice());

  useEffect(() => {
    if (isTouch || !cursorRef.current) return;

    const cursor = cursorRef.current;

    // Add class to hide native cursor
    document.body.classList.add("custom-cursor-active");

    // Set initial position off-screen
    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: -100,
      y: -100
    });

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY };

      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out",
        overwrite: "auto"
      });
    };

    // Mouse enter/leave document
    const handleMouseEnter = () => {
      gsap.to(cursor, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [isTouch]);

  if (isTouch) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="cursor"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: '#fff',
        pointerEvents: 'none',
        zIndex: 99999,
        mixBlendMode: 'difference',
      }}
    />
  );
};

export default CustomCursor;
