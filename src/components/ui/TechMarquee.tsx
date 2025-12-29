'use client';

import React from 'react';
import styles from './TechMarquee.module.scss';

// Simple Icons CDN - cleaner URLs
const SIMPLEICONS_CDN = 'https://cdn.simpleicons.org';

// Technology definition
interface Tech {
  name: string;
  icon?: string; // Simple Icons slug (e.g., "threedotjs", "nextdotjs")
}

// All technology definitions using Simple Icons
const TECH_REGISTRY: Record<string, Tech> = {
  // WebGL / 3D
  threejs: { name: 'Three.js', icon: 'threedotjs' },
  webgl: { name: 'WebGL', icon: 'webgl' },
  gsap: { name: 'GSAP', icon: 'greensock' },
  glsl: { name: 'GLSL' }, // No icon
  webgpu: { name: 'WebGPU' }, // No icon

  // Platforms / Frameworks
  nextjs: { name: 'Next.js', icon: 'nextdotjs' },
  astro: { name: 'Astro', icon: 'astro' },
  nodejs: { name: 'Node.js', icon: 'nodedotjs' },
  nestjs: { name: 'NestJS', icon: 'nestjs' },
  typescript: { name: 'TypeScript', icon: 'typescript' },
  react: { name: 'React', icon: 'react' },
  vitest: { name: 'Vitest', icon: 'vitest' },
  playwright: { name: 'Playwright', icon: 'playwright' },
  strapi: { name: 'Strapi', icon: 'strapi' },
  sanity: { name: 'Sanity', icon: 'sanity' },

  // E-commerce
  shopify: { name: 'Shopify', icon: 'shopify' },
  woocommerce: { name: 'WooCommerce', icon: 'woocommerce' },
  hydrogen: { name: 'Hydrogen' }, // No icon

  // Mobile
  flutter: { name: 'Flutter', icon: 'flutter' },
  swift: { name: 'Swift', icon: 'swift' },
  swiftui: { name: 'SwiftUI' }, // No icon
  dart: { name: 'Dart', icon: 'dart' },

  // Design
  figma: { name: 'Figma', icon: 'figma' },
  storybook: { name: 'Storybook', icon: 'storybook' },
  sketch: { name: 'Sketch', icon: 'sketch' },

  // DevOps
  docker: { name: 'Docker', icon: 'docker' },
  kubernetes: { name: 'Kubernetes', icon: 'kubernetes' },
  github: { name: 'GitHub', icon: 'github' },
  githubactions: { name: 'GitHub Actions', icon: 'githubactions' },
  sentry: { name: 'Sentry', icon: 'sentry' },
  vercel: { name: 'Vercel', icon: 'vercel' },
  netlify: { name: 'Netlify', icon: 'netlify' },
};

// Service-specific tech stacks
export const SERVICE_TECH_STACKS: Record<string, string[]> = {
  webgl: ['threejs', 'webgl', 'gsap', 'glsl', 'webgpu', 'typescript'],
  platforms: ['nextjs', 'astro', 'nodejs', 'nestjs', 'typescript', 'react', 'vitest', 'playwright', 'sanity'],
  commerce: ['shopify', 'woocommerce', 'hydrogen', 'nextjs', 'typescript', 'vercel'],
  mobile: ['flutter', 'swift', 'swiftui', 'dart', 'typescript', 'figma'],
  design: ['figma', 'storybook', 'sketch', 'react', 'typescript'],
  devops: ['docker', 'kubernetes', 'githubactions', 'sentry', 'vercel', 'netlify'],
};

interface TechItemProps {
  tech: Tech;
}

const TechItem: React.FC<TechItemProps> = ({ tech }) => {
  // If has icon, show only icon (no text)
  // If no icon, show text only (uppercase)
  return (
    <div className={styles.techItem}>
      {tech.icon ? (
        <img
          src={`${SIMPLEICONS_CDN}/${tech.icon}/white`}
          alt={tech.name}
          title={tech.name}
          className={styles.techIcon}
          loading="lazy"
        />
      ) : (
        <span className={styles.textOnly}>{tech.name}</span>
      )}
    </div>
  );
};

interface TechMarqueeProps {
  serviceKey: string;
  className?: string;
}

export const TechMarquee: React.FC<TechMarqueeProps> = ({
  serviceKey,
  className = '',
}) => {
  const techKeys = SERVICE_TECH_STACKS[serviceKey] || [];
  const techs = techKeys.map((key) => TECH_REGISTRY[key]).filter(Boolean);

  if (techs.length === 0) return null;

  return (
    <div className={`${styles.techGrid} ${className}`}>
      {techs.map((tech, index) => (
        <TechItem key={`${tech.name}-${index}`} tech={tech} />
      ))}
    </div>
  );
};

export default TechMarquee;
