import { useEffect, useRef, useCallback } from "react";

/**
 * Utility: Check if device is touch-based
 */
const isTouchDevice = (): boolean => {
  try {
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    let isPrimaryTouch = false;
    try {
      isPrimaryTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    } catch {
      isPrimaryTouch = /iPad|iPhone|iPod/.test(navigator.userAgent);
    }
    const isIPad =
      /iPad/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isSafariDesktop =
      /Safari/.test(navigator.userAgent) &&
      !/Chrome/.test(navigator.userAgent) &&
      !hasTouch &&
      !isIPad;

    if (isSafariDesktop) return false;
    return hasTouch || isPrimaryTouch || isIPad;
  } catch {
    return false;
  }
};

/**
 * Linear interpolation for smooth animations
 */
const lerp = (start: number, end: number, factor: number): number =>
  start + (end - start) * factor;

/**
 * Cursor class that handles all cursor logic
 */
class Cursor {
  private cursorElement: HTMLElement | null = null;
  private textElement: HTMLElement | null = null;
  private currentX = 0;
  private currentY = 0;
  private targetX = 0;
  private targetY = 0;
  private textCurrentX = 0;
  private textCurrentY = 0;
  private textTargetX = 0;
  private textTargetY = 0;
  private rotation = 0;
  private targetRotation = 0;
  private lastX = 0;
  private lastY = 0;
  private isVisible = false;
  private isTextVisible = false;
  private animationFrameId: number | null = null;
  private observer: MutationObserver | null = null;
  private enterHandlers = new WeakMap<Element, () => void>();
  private leaveHandlers = new WeakMap<Element, () => void>();

  constructor(cursorEl: HTMLElement, textEl: HTMLElement) {
    this.cursorElement = cursorEl;
    this.textElement = textEl;
  }

  init() {
    if (isTouchDevice()) {
      return;
    }

    document.body.classList.add("custom-cursor-active");

    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseenter", this.show);
    document.addEventListener("mouseleave", this.hide);

    this.addHoverEffects();

    this.observer = new MutationObserver(() => {
      this.addHoverEffects();
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    this.update();
  }

  private handleMouseMove = (e: MouseEvent) => {
    this.targetX = e.clientX;
    this.targetY = e.clientY;
    this.textTargetX = e.clientX + 20;
    this.textTargetY = e.clientY - 30;

    const deltaX = e.clientX - this.lastX;
    const deltaY = e.clientY - this.lastY;
    const velocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (velocity > 2) {
      this.targetRotation = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 135;
    }

    this.lastX = e.clientX;
    this.lastY = e.clientY;

    if (!this.isVisible) {
      this.show();
    }
  };

  private show = () => {
    if (this.cursorElement) {
      this.cursorElement.style.opacity = "1";
      this.isVisible = true;
    }
  };

  private hide = () => {
    if (this.cursorElement) {
      this.cursorElement.style.opacity = "0";
      this.isVisible = false;
    }
    this.hideText();
  };

  private showText = (text: string) => {
    if (this.textElement) {
      const textContent = this.textElement.querySelector(".cursor-text-content");
      if (textContent) {
        textContent.textContent = text;
      }
      this.textElement.setAttribute("data-text-visible", "true");
      this.isTextVisible = true;
    }
    if (this.cursorElement) {
      this.cursorElement.setAttribute("data-hover", "true");
    }
  };

  private hideText = () => {
    if (this.textElement) {
      this.textElement.setAttribute("data-text-visible", "false");
      this.isTextVisible = false;
    }
    if (this.cursorElement) {
      this.cursorElement.setAttribute("data-hover", "false");
    }
  };

  private update = () => {
    this.currentX = lerp(this.currentX, this.targetX, 0.15);
    this.currentY = lerp(this.currentY, this.targetY, 0.15);
    this.textCurrentX = lerp(this.textCurrentX, this.textTargetX, 0.12);
    this.textCurrentY = lerp(this.textCurrentY, this.textTargetY, 0.12);
    this.rotation = lerp(this.rotation, this.targetRotation, 0.1);

    if (this.cursorElement) {
      this.cursorElement.style.transform = `translate(${this.currentX}px, ${this.currentY}px) translate(-50%, -50%) rotate(${this.rotation}deg)`;
    }

    if (this.textElement && this.isTextVisible) {
      this.textElement.style.transform = `translate(${this.textCurrentX}px, ${this.textCurrentY}px) translate(-50%, -50%)`;
    }

    this.animationFrameId = requestAnimationFrame(this.update);
  };

  private getHoverText = (element: Element): string => {
    // Check for custom data attribute first
    const customText = element.getAttribute("data-cursor-text");
    if (customText) return customText;

    const tagName = element.tagName.toLowerCase();
    const href = element.getAttribute("href");

    // Links
    if (tagName === "a") {
      if (href?.startsWith("mailto:")) return "Email";
      if (href?.startsWith("tel:")) return "Call";
      if (href?.startsWith("#")) return "Scroll";
      if (element.getAttribute("target") === "_blank") return "Open";
      return "Visit";
    }

    // Buttons
    if (tagName === "button" || element.getAttribute("role") === "button") {
      if (element.getAttribute("type") === "submit") return "Send";
      return "Click";
    }

    // Form elements
    if (["input", "textarea", "select"].includes(tagName)) {
      return "Type";
    }

    // Images in galleries
    if (tagName === "img" && element.closest("[data-gallery], .gallery, .lightbox")) {
      return "View";
    }

    // Video elements
    if (tagName === "video" || element.closest(".video-wrapper, .video-play")) {
      return "Play";
    }

    // Portfolio/Project items
    if (element.closest(".portfolio-item, .project-item, .work-item")) {
      return "View Project";
    }

    // Swiper/Slider navigation
    if (element.closest(".swiper-button-next, .swiper-button-prev")) {
      return "Navigate";
    }

    return "Click";
  };

  private addHoverEffects = () => {
    const interactiveSelectors = [
      "a",
      "button",
      '[role="button"]',
      "input",
      "textarea",
      "select",
      ".clickable",
      "[data-cursor]",
      ".swiper-slide",
      ".portfolio-item",
      ".project-item",
      ".work-item",
      ".blog-item",
      ".service-item",
      ".video-play",
      ".btn",
      ".td-btn",
    ];

    const elements = document.querySelectorAll(interactiveSelectors.join(", "));

    elements.forEach((element) => {
      if (this.enterHandlers.has(element)) return;

      const hoverText = this.getHoverText(element);

      const enterHandler = () => this.showText(hoverText);
      const leaveHandler = () => this.hideText();

      this.enterHandlers.set(element, enterHandler);
      this.leaveHandlers.set(element, leaveHandler);

      element.addEventListener("mouseenter", enterHandler);
      element.addEventListener("mouseleave", leaveHandler);
    });
  };

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    if (this.observer) {
      this.observer.disconnect();
    }

    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseenter", this.show);
    document.removeEventListener("mouseleave", this.hide);
    document.body.classList.remove("custom-cursor-active");
  }
}

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cursorInstance = useRef<Cursor | null>(null);

  const initCursor = useCallback(() => {
    if (cursorRef.current && textRef.current && !cursorInstance.current) {
      cursorInstance.current = new Cursor(cursorRef.current, textRef.current);
      cursorInstance.current.init();
    }
  }, []);

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(initCursor, 100);

    return () => {
      clearTimeout(timer);
      if (cursorInstance.current) {
        cursorInstance.current.destroy();
        cursorInstance.current = null;
      }
    };
  }, [initCursor]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && isTouchDevice()) {
    return null;
  }

  return (
    <>
      {/* Custom Cursor SVG */}
      <div ref={cursorRef} className="custom-cursor" data-hover="false">
        <svg
          className="cursor-icon"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="cursor-path"
            d="M5.5 3.21V20.79C5.5 21.85 6.78 22.41 7.54 21.65L11.93 17.26C12.09 17.1 12.3 17.01 12.52 17.01H18.5C19.56 17.01 20.12 15.73 19.36 14.97L6.36 1.97C5.6 1.21 4.32 1.77 4.32 2.83L5.5 3.21Z"
            fill="#1b1e15"
            stroke="#FCFCFC"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Cursor Text Label */}
      <div ref={textRef} className="cursor-text" data-text-visible="false">
        <span className="cursor-text-content">Click</span>
      </div>
    </>
  );
};

export default CustomCursor;
