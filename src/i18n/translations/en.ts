// English translations
import type { Translations } from "./es";

export const en: Translations = {
  // Navigation
  nav: {
    aboutUs: "About Us",
    services: "Services",
    portfolio: "Portfolio",
    blog: "Blog",
  },

  // Header
  header: {
    letsTalk: "Let's Talk",
    search: "Search here...",
    contactUs: "Contact Us",
  },

  // Hero
  hero: {
    titleLine1Prefix: "",
    titleLine1Highlight: "WE BUILD",
    titleLine2: "PRODUCTS",
    titleLine3Prefix: "THAT",
    // Rotating words for the hero - verbs that describe what our products do
    rotatingWords: ["IMPACT", "SCALE", "CONNECT", "LAST", "STAND OUT"],
    sliderWords: ["STUDIO DRAFT", "STUDIO DRAFT", "STUDIO DRAFT", "STUDIO DRAFT"],
    feature1: "COMPLEX SYSTEMS",
    feature2: "CDMX • REMOTE",
    feature3: "END-TO-END PRODUCT",
  },

  // Language selector
  language: {
    es: "Español",
    en: "English",
  },

  // Common
  common: {
    learnMore: "Learn More",
    viewAll: "View All",
    readMore: "Read More",
    close: "Close",
    menu: "Menu",
  },

  // About Section (Home)
  about: {
    subtitle: "WHO WE ARE",
    title: "We craft digital experiences that make people talk.",
    description: "Design and engineering studio at the intersection of art, code, and strategy. From CDMX, we partner with ambitious brands around the world.",
    cta: "LEARN MORE",
  },

  // About Two Section (Home) - Values/Culture
  aboutTwo: {
    subtitle: "//  Our culture",
    title: "Principles that guide",
    titleHighlight: "every project we create",
    description: "We build lasting relationships based on transparency, technical excellence, and passion for the craft.",
    cta: "Meet Our Team",
    // Marquee items - short value titles for vertical scrolling
    marqueeValues: [
      "Real collaboration",
      "Obsession with detail",
      "Craft over templates",
      "Proven quality",
      "Total transparency",
      "Constant innovation",
    ],
    values: {
      value1: {
        number: "01",
        title: "Real collaboration",
        text: "We're not vendors, we're partners. We work side by side with your team, regardless of timezone.",
      },
      value2: {
        number: "02",
        title: "Obsession with detail",
        text: "Every pixel, every interaction, every line of code. Ordinary is not an option.",
      },
      value3: {
        number: "03",
        title: "Craft over templates",
        text: "Bespoke solutions, always. No templates or shortcuts that compromise the vision.",
      },
      value4: {
        number: "04",
        title: "Proven quality",
        text: "Testing, UX research, performance audits. We deliver products, not prototypes.",
      },
    },
  },

  // Services Section
  services: {
    subtitle: "SERVICES",
    title: "What we do",
    cta: "Let's talk",
    stats: {
      projects: "Projects delivered",
      clients: "Active clients",
    },
    items: {
      service1: {
        number: "01",
        title: "Immersive Web Experiences",
        description: "WebGL, WebGPU, Three.js, GLSL shaders, motion systems with GSAP. Strict performance budgets, lazy loading 3D assets, dynamic LOD. Sites scoring 90+ on Core Web Vitals without sacrificing the wow factor.",
        process: "Concept → Technical prototype → WebGL development → Performance tuning → Deploy",
      },
      service2: {
        number: "02",
        title: "Platforms & Web Applications",
        description: "Next.js 14+, Astro, Node.js, NestJS. Headless architecture with Strapi, Payload or Sanity. Hybrid SSR/SSG, edge functions, ISR. Strict TypeScript, testing with Vitest and Playwright.",
        process: "Discovery → UX Research → UI Design → Development → E2E Testing → Deploy",
      },
      service3: {
        number: "03",
        title: "High-Performance E-commerce",
        description: "Shopify Plus with Hydrogen, headless WooCommerce, custom checkout flows. ERP integrations, payment gateways, real-time inventory. Data-driven conversion optimization.",
        process: "Strategy → Conversion UX → Development → API integrations → CRO optimization",
      },
      service4: {
        number: "04",
        title: "Mobile Apps",
        description: "Flutter with Riverpod/Bloc, native Swift with SwiftUI. Offline-first architecture, push notifications, deep linking. CI/CD with Fastlane, TestFlight and Play Console distribution.",
        process: "Discovery → Prototyping → UI/UX → Development → Automated QA → Store launch",
      },
      service5: {
        number: "05",
        title: "Product Design & Brand",
        description: "UX research with real users, Figma wireframing, interactive prototypes. Design systems with tokens, Storybook-documented components. Brand guidelines that scale.",
        process: "Research → Strategy → Visual identity → Prototyping → Design system",
      },
      service6: {
        number: "06",
        title: "Operations & Evolution",
        description: "CI/CD with GitHub Actions, Docker, Kubernetes. Monitoring with Sentry, analytics with Mixpanel/Amplitude. Rigorous A/B testing, feature flags, zero-downtime deploys.",
        process: "Infra setup → Monitoring → A/B testing → Data-driven iteration → Scaling",
      },
    },
  },

  // Footer
  footer: {
    marquee: {
      work: "Work",
      together: "TOGETHER",
    },
    bigTitle: "Entrust design\nto professionals",
    location: {
      title: "Mexico City",
      address: "Mexico —\nCDMX • Remote",
    },
    contact: {
      title: "Say hello!",
      email: "hello@studiodraft.mx",
      phone: "+52 55 1234 5678",
    },
    copyright: "All Rights Reserved.",
  },
};
