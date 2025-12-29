// Type definitions for translations
export interface Translations {
  nav: {
    aboutUs: string;
    services: string;
    portfolio: string;
    blog: string;
  };
  header: {
    letsTalk: string;
    search: string;
    contactUs: string;
  };
  hero: {
    titleLine1Prefix: string;
    titleLine1Highlight: string;
    titleLine2: string;
    titleLine3Prefix: string;
    rotatingWords: string[];
    sliderWords: string[];
    feature1: string;
    feature2: string;
    feature3: string;
  };
  language: {
    es: string;
    en: string;
  };
  common: {
    learnMore: string;
    viewAll: string;
    readMore: string;
    close: string;
    menu: string;
  };
  about: {
    subtitle: string;
    title: string;
    description: string;
    cta: string;
  };
  aboutTwo: {
    subtitle: string;
    title: string;
    titleHighlight: string;
    description: string;
    cta: string;
    marqueeValues: string[];
    values: {
      value1: { number: string; title: string; text: string };
      value2: { number: string; title: string; text: string };
      value3: { number: string; title: string; text: string };
      value4: { number: string; title: string; text: string };
    };
  };
  services: {
    subtitle: string;
    title: string;
    cta: string;
    stats: {
      projects: string;
      clients: string;
    };
    items: {
      service1: { number: string; title: string; description: string; process: string };
      service2: { number: string; title: string; description: string; process: string };
      service3: { number: string; title: string; description: string; process: string };
      service4: { number: string; title: string; description: string; process: string };
      service5: { number: string; title: string; description: string; process: string };
      service6: { number: string; title: string; description: string; process: string };
    };
  };
  footer: {
    marquee: {
      work: string;
      together: string;
    };
    bigTitle: string;
    location: {
      title: string;
      address: string;
    };
    contact: {
      title: string;
      email: string;
      phone: string;
    };
    copyright: string;
    pages: string;
    socials: string;
    tagline: string;
  };
}

// Spanish translations (default language)
export const es: Translations = {
  // Navigation
  nav: {
    aboutUs: "Sobre Nosotros",
    services: "Servicios",
    portfolio: "Portafolio",
    blog: "Blog",
  },

  // Header
  header: {
    letsTalk: "Hablemos",
    search: "Buscar aquí...",
    contactUs: "Contáctanos",
  },

  // Hero
  hero: {
    titleLine1Prefix: "",
    titleLine1Highlight: "CONSTRUIMOS",
    titleLine2: "PRODUCTOS",
    titleLine3Prefix: "QUE",
    // Rotating words for the hero - verbs that describe what our products do
    rotatingWords: ["IMPACTAN", "ESCALAN", "CONECTAN", "PERDURAN", "DESTACAN"],
    sliderWords: ["STUDIO DRAFT", "STUDIO DRAFT", "STUDIO DRAFT", "STUDIO DRAFT"],
    feature1: "SISTEMAS COMPLEJOS",
    feature2: "CDMX • REMOTO",
    feature3: "PRODUCTO INTEGRAL",
  },

  // Language selector
  language: {
    es: "Español",
    en: "English",
  },

  // Common
  common: {
    learnMore: "Saber más",
    viewAll: "Ver todo",
    readMore: "Leer más",
    close: "Cerrar",
    menu: "Menú",
  },

  // About Section (Home)
  about: {
    subtitle: "QUIÉNES SOMOS",
    title: "Creamos experiencias digitales que hacen que la gente hable.",
    description: "Studio de diseño e ingeniería en la intersección de arte, código y estrategia. Desde CDMX, colaboramos con marcas ambiciosas alrededor del mundo.",
    cta: "CONOCER MÁS",
  },

  // About Two Section (Home) - Values/Culture
  aboutTwo: {
    subtitle: "//  Nuestra cultura",
    title: "Principios que guían",
    titleHighlight: "cada proyecto que creamos",
    description: "Construimos relaciones duraderas basadas en transparencia, excelencia técnica y pasión por el craft.",
    cta: "Conoce Nuestro Equipo",
    // Marquee items - short value titles for vertical scrolling
    marqueeValues: [
      "Colaboración real",
      "Obsesión por el detalle",
      "Craft sobre templates",
      "Calidad comprobada",
      "Transparencia total",
      "Innovación constante",
    ],
    values: {
      value1: {
        number: "01",
        title: "Colaboración real",
        text: "No somos proveedores, somos partners. Trabajamos codo a codo con tu equipo, sin importar la zona horaria.",
      },
      value2: {
        number: "02",
        title: "Obsesión por el detalle",
        text: "Cada pixel, cada interacción, cada línea de código. Lo ordinario no es opción.",
      },
      value3: {
        number: "03",
        title: "Craft sobre templates",
        text: "Soluciones a medida, siempre. Nada de plantillas ni atajos que comprometan la visión.",
      },
      value4: {
        number: "04",
        title: "Calidad comprobada",
        text: "Testing, UX research, performance audits. Entregamos productos, no prototipos.",
      },
    },
  },

  // Services Section
  services: {
    subtitle: "SERVICIOS",
    title: "Lo que hacemos",
    cta: "Hablemos",
    stats: {
      projects: "Proyectos entregados",
      clients: "Clientes activos",
    },
    items: {
      service1: {
        number: "01",
        title: "Experiencias Web Inmersivas",
        description: "WebGL, WebGPU, Three.js, GLSL shaders, motion systems con GSAP. Performance budgets estrictos, lazy loading de assets 3D, LOD dinámico. Sitios que puntúan 90+ en Core Web Vitals sin sacrificar el wow factor.",
        process: "Concepto → Prototipo técnico → Desarrollo WebGL → Performance tuning → Deploy",
      },
      service2: {
        number: "02",
        title: "Plataformas y Aplicaciones Web",
        description: "Next.js 14+, Astro, Node.js, NestJS. Arquitectura headless con Strapi, Payload o Sanity. SSR/SSG híbrido, edge functions, ISR. TypeScript estricto, testing con Vitest y Playwright.",
        process: "Discovery → UX Research → UI Design → Desarrollo → Testing E2E → Deploy",
      },
      service3: {
        number: "03",
        title: "E-commerce de Alto Rendimiento",
        description: "Shopify Plus con Hydrogen, WooCommerce headless, custom checkout flows. Integraciones con ERPs, pasarelas de pago, inventario en tiempo real. Optimización de conversión basada en datos.",
        process: "Estrategia → UX de conversión → Desarrollo → Integraciones API → Optimización CRO",
      },
      service4: {
        number: "04",
        title: "Apps Móviles",
        description: "Flutter con Riverpod/Bloc, Swift nativo con SwiftUI. Offline-first architecture, push notifications, deep linking. CI/CD con Fastlane, distribución TestFlight y Play Console.",
        process: "Discovery → Prototyping → UI/UX → Development → QA automatizado → Store launch",
      },
      service5: {
        number: "05",
        title: "Diseño de Producto y Brand",
        description: "UX research con usuarios reales, wireframing en Figma, prototipos interactivos. Design systems con tokens, componentes documentados en Storybook. Brand guidelines que escalan.",
        process: "Research → Estrategia → Visual identity → Prototyping → Design system",
      },
      service6: {
        number: "06",
        title: "Operaciones y Evolución",
        description: "CI/CD con GitHub Actions, Docker, Kubernetes. Monitoring con Sentry, analytics con Mixpanel/Amplitude. A/B testing riguroso, feature flags, deploys sin downtime.",
        process: "Setup infra → Monitoring → A/B testing → Iteración data-driven → Escalado",
      },
    },
  },

  // Footer
  footer: {
    marquee: {
      work: "Colabora",
      together: "CON NOSOTROS",
    },
    bigTitle: "Confía el diseño\na profesionales",
    location: {
      title: "Ciudad de México",
      address: "México —\nCDMX • Remoto",
    },
    contact: {
      title: "¡Hola!",
      email: "hola@studiodraft.mx",
      phone: "+52 55 1234 5678",
    },
    copyright: "Todos los derechos reservados.",
    pages: "Páginas",
    socials: "Redes",
    tagline: "No somos un studio típico",
  },
};
