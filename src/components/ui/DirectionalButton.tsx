'use client';

import React, { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './DirectionalButton.module.scss';

export type ButtonTheme = 'dark' | 'light' | 'primary';

export interface DirectionalButtonProps {
  /** Button text */
  children: React.ReactNode;
  /** Link destination */
  href?: string;
  /** Button theme variant */
  theme?: ButtonTheme;
  /** Optional image URL (shown as circle on left) */
  image?: string;
  /** Image alt text */
  imageAlt?: string;
  /** Additional class name */
  className?: string;
  /** Click handler (for non-link buttons) */
  onClick?: () => void;
  /** External link (opens in new tab) */
  external?: boolean;
}

export const DirectionalButton: React.FC<DirectionalButtonProps> = ({
  children,
  href,
  theme = 'dark',
  image,
  imageAlt = '',
  className = '',
  onClick,
  external = false,
}) => {
  const circleRef = useRef<HTMLDivElement>(null);

  const handleHover = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const button = event.currentTarget;
    const buttonRect = button.getBoundingClientRect();

    const buttonWidth = buttonRect.width;
    const buttonHeight = buttonRect.height;
    const buttonCenterX = buttonRect.left + buttonWidth / 2;

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Offset from top-left corner in percentage
    const offsetXFromLeft = ((mouseX - buttonRect.left) / buttonWidth) * 100;
    const offsetYFromTop = ((mouseY - buttonRect.top) / buttonHeight) * 100;

    // Offset from center in percentage (absolute)
    const offsetXFromCenter = Math.abs(((mouseX - buttonCenterX) / (buttonWidth / 2)) * 50);

    // Update circle position and size
    if (circleRef.current) {
      circleRef.current.style.left = `${offsetXFromLeft.toFixed(1)}%`;
      circleRef.current.style.top = `${offsetYFromTop.toFixed(1)}%`;
      circleRef.current.style.width = `${115 + offsetXFromCenter * 2}%`;
    }
  }, []);

  const content = (
    <>
      <div className={styles.bg} />
      <div className={styles.circleWrap}>
        <div ref={circleRef} className={styles.circle}>
          <div className={styles.before100} />
        </div>
      </div>
      {image && (
        <div className={styles.image}>
          <img src={image} alt={imageAlt} className={styles.imgFounder} loading="eager" />
        </div>
      )}
      <div className={styles.text}>
        <span className={styles.textP}>{children}</span>
      </div>
    </>
  );

  const commonProps = {
    className: `${styles.btn} ${className}`,
    'data-theme': theme,
    onMouseEnter: handleHover,
    onMouseMove: handleHover,
  };

  // External link
  if (href && external) {
    return (
      <a
        {...commonProps}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  // Internal link
  if (href) {
    return (
      <Link {...commonProps} to={href}>
        {content}
      </Link>
    );
  }

  // Button (no link)
  return (
    <button {...commonProps} onClick={onClick} type="button">
      {content}
    </button>
  );
};

export default DirectionalButton;
