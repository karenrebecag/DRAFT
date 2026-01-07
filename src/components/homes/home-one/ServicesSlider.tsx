import { useEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CrystalCard from '../../ui/CrystalCard';
import ButtonPrimary from '../../ui/ButtonPrimary';
import styles from './ServicesSlider.module.scss';

// Register GSAP plugins
gsap.registerPlugin(Observer, ScrollTrigger);

// Curved Marquee Configuration
const MARQUEE_SPEED = 80; // Pixels per second
const DRAG_MULTIPLIER = 35; // Max speed multiplier when dragging
const DRAG_SENSITIVITY = 0.006; // Lower = smoother drag feel

// Arc/Curve Configuration - Desktop defaults
const ARC_WIDTH_DESKTOP = 1400;
const ARC_HEIGHT_DESKTOP = 220;
const CARD_SPACING_DESKTOP = 420;
const MAX_ROTATION_DESKTOP = 22;

// Arc/Curve Configuration - Mobile (tighter spacing)
const ARC_WIDTH_MOBILE = 900;
const ARC_HEIGHT_MOBILE = 140;
const CARD_SPACING_MOBILE = 280;
const MAX_ROTATION_MOBILE = 18;

// Services data - 5 items with unique Spline models
const services = [
  {
    id: 1,
    splineModel: '/assets/models/Coin.splinecode',
    badge: 'Systems & Research',
    title: 'Design Systems',
    description: 'Atomic design libraries and rigorous UX documentation to ensure pixel-perfect consistency and scalability across every digital touchpoint.',
  },
  {
    id: 2,
    splineModel: '/assets/models/Cube.splinecode',
    badge: 'Web & Native Apps',
    title: 'Product Engineering',
    description: 'Bespoke web and mobile applications built for global scale, performance, and long-term maintainability.',
  },
  {
    id: 3,
    splineModel: '/assets/models/Helix.splinecode',
    badge: 'Immersive Experiences',
    title: 'WEBGL & Interactive',
    description: 'Pushing the boundaries of the browser with high-fidelity 3D models, custom shaders, and fluid motion that captivate users instantly.',
  },
  {
    id: 4,
    splineModel: '/assets/models/Rings.splinecode',
    badge: 'Headless & Shopify',
    title: 'Advanced E-Commerce',
    description: 'High-performance shopping ecosystems using Shopify Hydrogen and headless architectures designed for maximum conversion and speed.',
  },
  {
    id: 5,
    splineModel: '/assets/models/Pyramid.splinecode',
    badge: 'AI & Intelligent Ops',
    title: 'Agents Automation',
    description: 'Integrating custom AI agents and intelligent workflows to automate complex business logic and streamline your internal operations.',
  },
];

const ServicesSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const progressRef = useRef({ value: 0 });
  const marqueeRef = useRef<gsap.core.Tween | null>(null);
  const timeScaleRef = useRef({ value: 1 });
  const observerRef = useRef<Observer | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive arc configuration
  const ARC_WIDTH = isMobile ? ARC_WIDTH_MOBILE : ARC_WIDTH_DESKTOP;
  const ARC_HEIGHT = isMobile ? ARC_HEIGHT_MOBILE : ARC_HEIGHT_DESKTOP;
  const CARD_SPACING = isMobile ? CARD_SPACING_MOBILE : CARD_SPACING_DESKTOP;
  const MAX_ROTATION = isMobile ? MAX_ROTATION_MOBILE : MAX_ROTATION_DESKTOP;

  const total = services.length;
  const totalLength = total * CARD_SPACING;

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate position on arc curve
  const getArcPosition = useCallback((xPos: number) => {
    const normalizedX = xPos / (ARC_WIDTH / 2);
    const clampedX = Math.max(-1, Math.min(1, normalizedX));
    const y = ARC_HEIGHT * clampedX * clampedX;
    const rotation = clampedX * MAX_ROTATION;
    return { x: xPos, y, rotation };
  }, [ARC_WIDTH, ARC_HEIGHT, MAX_ROTATION]);

  // Update all cards based on current progress
  const updateCards = useCallback((progress: number) => {
    const cards = cardsRef.current;

    cards.forEach((card, i) => {
      if (!card) return;

      // Calculate this card's position along the infinite loop
      const cardOffset = i * CARD_SPACING;
      const rawPosition = (cardOffset - progress + totalLength * 10) % totalLength;

      // Convert to X position centered on screen (0 = center)
      let xPos = rawPosition - (totalLength / 2);

      // Wrap around for seamless loop
      if (xPos > totalLength / 2) xPos -= totalLength;
      if (xPos < -totalLength / 2) xPos += totalLength;

      // Get arc position (y and rotation based on x)
      const point = getArcPosition(xPos);

      // Calculate visibility based on x position
      const absX = Math.abs(xPos);
      const distanceFromCenter = Math.min(1, absX / (ARC_WIDTH / 2));
      const isVisible = absX < (ARC_WIDTH / 2 + 100);

      // Scale: smaller at edges for depth effect
      const scale = Math.max(0.82, 1 - distanceFromCenter * 0.18);

      // Opacity: fade at edges
      const opacity = isVisible ? Math.max(0, 1 - Math.pow(distanceFromCenter, 1.5) * 0.5) : 0;

      // Z-index: center on top
      const z = Math.round(10 - distanceFromCenter * 5);

      card.style.zIndex = String(Math.max(1, z));

      gsap.set(card, {
        x: point.x,
        y: point.y,
        rotation: point.rotation,
        scale: scale,
        opacity: opacity,
        visibility: opacity > 0.01 ? 'visible' : 'hidden',
      });

      // Update status attribute for CSS styling
      let status = 'hidden';
      if (distanceFromCenter < 0.15) status = 'active';
      else if (distanceFromCenter < 0.4) status = xPos > 0 ? '2-after' : '2-before';
      else if (distanceFromCenter < 0.7) status = xPos > 0 ? '3-after' : '3-before';
      card.setAttribute('data-flick-cards-item-status', status);
    });
  }, [total, totalLength, getArcPosition, CARD_SPACING, ARC_WIDTH]);

  // Apply current timeScale to marquee
  const applyTimeScale = useCallback(() => {
    if (marqueeRef.current) {
      marqueeRef.current.timeScale(timeScaleRef.current.value);
    }
  }, []);

  // Scroll-triggered entrance animation for individual cards
  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards.length || hasEntered) return;

    // Position cards in their final arc positions first
    updateCards(0);

    // Store the final opacity values that the marquee calculated
    const finalOpacities: number[] = [];
    cards.forEach((card, i) => {
      if (card) {
        // Get the computed opacity from updateCards
        const computedStyle = card.style.opacity;
        finalOpacities[i] = parseFloat(computedStyle) || 1;

        // Now hide cards for entrance animation
        gsap.set(card, {
          yPercent: 30,
          opacity: 0,
          visibility: 'visible',
        });
      }
    });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        // Staggered entrance animation - slide up from bottom
        const tl = gsap.timeline({
          onComplete: () => {
            setHasEntered(true);
          },
        });

        cards.forEach((card, index) => {
          if (!card) return;
          tl.to(
            card,
            {
              yPercent: 0,
              opacity: finalOpacities[index], // Use the correct final opacity
              duration: 0.8,
              ease: 'power4.out',
            },
            index * 0.1 // Stagger timing
          );
        });
      },
    });

    return () => trigger.kill();
  }, [hasEntered, updateCards]);

  // Initialize marquee only after entrance animation
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || !hasEntered) return;

    // Calculate duration based on speed
    const duration = totalLength / MARQUEE_SPEED;

    slider.setAttribute('data-flick-drag-status', 'grab');

    // Create the main marquee animation - animates progress through total loop length
    marqueeRef.current = gsap.to(progressRef.current, {
      value: totalLength,
      duration: duration,
      ease: 'none',
      repeat: -1,
      onUpdate: () => {
        updateCards(progressRef.current.value % totalLength);
      },
    });

    // Create Observer for smooth drag interaction
    observerRef.current = Observer.create({
      target: slider,
      type: 'pointer,touch',
      preventDefault: true,
      dragMinimum: 3,
      onPress: () => {
        slider.setAttribute('data-flick-drag-status', 'grabbing');
      },
      onRelease: () => {
        slider.setAttribute('data-flick-drag-status', 'grab');
      },
      onChangeX: (self) => {
        // Convert velocity to timeScale change
        let velocityScale = self.velocityX * -DRAG_SENSITIVITY;
        velocityScale = gsap.utils.clamp(-DRAG_MULTIPLIER, DRAG_MULTIPLIER, velocityScale);

        // Kill any ongoing timeScale tweens
        gsap.killTweensOf(timeScaleRef.current);

        // Smooth transition: spike to velocity, then ease back to base speed
        gsap.timeline({ onUpdate: applyTimeScale })
          .to(timeScaleRef.current, {
            value: velocityScale,
            duration: 0.08,
            ease: 'none',
            overwrite: true,
          })
          .to(timeScaleRef.current, {
            value: 1, // Return to normal forward speed
            duration: 1.5,
            ease: 'power2.out',
          });
      },
    });

    return () => {
      if (marqueeRef.current) marqueeRef.current.kill();
      if (observerRef.current) observerRef.current.kill();
    };
  }, [hasEntered, totalLength, updateCards, applyTimeScale]);

  return (
    <section ref={sectionRef} className={styles.servicesSection}>
      <div
        ref={sliderRef}
        data-flick-cards-init=""
        className={styles.flickGroup}
        role="region"
        aria-roledescription="carousel"
        aria-label="Services Slider"
      >
        {/* Relative object for sizing */}
        <div className={styles.relativeObject}>
          <div className={styles.relativeObjectBefore} />
        </div>

        {/* Collection container */}
        <div data-flick-cards-collection="" className={styles.collection}>
          <div
            ref={listRef}
            data-flick-cards-list=""
            className={styles.list}
          >
            {services.map((service, index) => (
              <div
                key={service.id}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                data-flick-cards-item=""
                data-flick-cards-item-status=""
                className={styles.item}
              >
                {/* Crystal Card with hover effect preserved */}
                <CrystalCard
                  splineModel={service.splineModel}
                  badge={service.badge}
                  title={service.title}
                  description={service.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className={styles.ctaWrapper}>
        <ButtonPrimary to="/services">
          Read More
        </ButtonPrimary>
      </div>
    </section>
  );
};

export default ServicesSlider;
