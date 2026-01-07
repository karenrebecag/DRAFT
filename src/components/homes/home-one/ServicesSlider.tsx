import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import CrystalCard from '../../ui/CrystalCard';
import styles from './ServicesSlider.module.scss';

// Register GSAP plugins
gsap.registerPlugin(Observer);

// Curved Marquee Configuration
const MARQUEE_SPEED = 80; // Pixels per second
const DRAG_MULTIPLIER = 35; // Max speed multiplier when dragging
const DRAG_SENSITIVITY = 0.006; // Lower = smoother drag feel

// Arc/Curve Configuration
const ARC_WIDTH = 1800; // Total width of the arc path
const ARC_HEIGHT = 280; // How much the arc curves down at edges (increased for visible fan effect)
const CARD_SPACING = 520; // Distance between card centers along the arc
const MAX_ROTATION = 25; // Max rotation at edges (degrees)

// Services data - 7 items for optimal flick effect
const services = [
  {
    id: 1,
    image: 'https://pub-3ed7c563bcaa4c7c8ed703c87bbc1631.r2.dev/15%204.webp',
    badge: 'Systems & Research',
    title: 'Design Systems',
    description: 'Atomic design libraries and rigorous UX documentation to ensure pixel-perfect consistency and scalability across every digital touchpoint.',
  },
  {
    id: 2,
    image: 'https://pub-3ed7c563bcaa4c7c8ed703c87bbc1631.r2.dev/15%204.webp',
    badge: 'Web & Native Apps',
    title: 'Product Engineering',
    description: 'Bespoke web and mobile applications built for global scale, performance, and long-term maintainability.',
  },
  {
    id: 3,
    image: 'https://pub-3ed7c563bcaa4c7c8ed703c87bbc1631.r2.dev/15%204-1.webp',
    badge: 'Immersive Experiences',
    title: 'WEBGL & Interactive',
    description: 'Pushing the boundaries of the browser with high-fidelity 3D models, custom shaders, and fluid motion that captivate users instantly.',
  },
  {
    id: 4,
    image: 'https://pub-3ed7c563bcaa4c7c8ed703c87bbc1631.r2.dev/15%204-2.webp',
    badge: 'Headless & Shopify',
    title: 'Advanced E-Commerce',
    description: 'High-performance shopping ecosystems using Shopify Hydrogen and headless architectures designed for maximum conversion and speed.',
  },
  {
    id: 5,
    image: 'https://pub-3ed7c563bcaa4c7c8ed703c87bbc1631.r2.dev/15%204-3.webp',
    badge: 'AI & Intelligent Ops',
    title: 'Agents Automation',
    description: 'Integrating custom AI agents and intelligent workflows to automate complex business logic and streamline your internal operations.',
  },
  {
    id: 6,
    image: 'https://pub-3ed7c563bcaa4c7c8ed703c87bbc1631.r2.dev/15%204-1.webp',
    badge: 'Brand & Identity',
    title: 'Creative Direction',
    description: 'Strategic brand positioning and visual identity systems that communicate your unique value and resonate with your target audience.',
  },
  {
    id: 7,
    image: 'https://pub-3ed7c563bcaa4c7c8ed703c87bbc1631.r2.dev/15%204-2.webp',
    badge: 'Growth & Analytics',
    title: 'Performance Marketing',
    description: 'Data-driven marketing strategies and conversion optimization to maximize ROI and accelerate sustainable business growth.',
  },
];

const ServicesSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const progressRef = useRef({ value: 0 });
  const marqueeRef = useRef<gsap.core.Tween | null>(null);
  const timeScaleRef = useRef({ value: 1 });
  const observerRef = useRef<Observer | null>(null);

  const total = services.length;
  const totalLength = total * CARD_SPACING; // Total loop length

  // Calculate position on arc curve - simplified direct calculation
  // X is the horizontal position, Y and rotation derived from X
  const getArcPosition = useCallback((xPos: number) => {
    // Normalize X to -1 to 1 range (center = 0)
    const normalizedX = xPos / (ARC_WIDTH / 2);
    const clampedX = Math.max(-1, Math.min(1, normalizedX));

    // Parabolic Y: center at 0, edges drop down by ARC_HEIGHT
    const y = ARC_HEIGHT * clampedX * clampedX;

    // Rotation: proportional to X position (tilt outward at edges)
    const rotation = clampedX * MAX_ROTATION;

    return { x: xPos, y, rotation };
  }, []);

  // Update all cards based on current progress
  const updateCards = useCallback((progress: number) => {
    const cards = cardsRef.current;

    cards.forEach((card, i) => {
      if (!card) return;

      // Calculate this card's position along the infinite loop
      const cardOffset = i * CARD_SPACING;
      const rawPosition = (cardOffset - progress + totalLength * 10) % totalLength;

      // Convert to X position centered on screen (0 = center)
      // Position wraps from 0 to totalLength, center should be at totalLength/2
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
  }, [total, totalLength, getArcPosition]);

  // Apply current timeScale to marquee
  const applyTimeScale = useCallback(() => {
    if (marqueeRef.current) {
      marqueeRef.current.timeScale(timeScaleRef.current.value);
    }
  }, []);

  // Initialize on mount
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Calculate duration based on speed
    const duration = totalLength / MARQUEE_SPEED;

    // Initial card positions
    updateCards(0);
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
  }, [totalLength, updateCards, applyTimeScale]);

  return (
    <section className={styles.servicesSection}>
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
                  image={service.image}
                  badge={service.badge}
                  title={service.title}
                  description={service.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSlider;
