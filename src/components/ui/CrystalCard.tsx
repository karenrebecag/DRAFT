import React, { useRef, useCallback } from 'react';
import styles from './CrystalCard.module.scss';

interface CrystalCardProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  // Service card props
  image?: string;
  badge?: string;
  category?: string;
  title?: string;
  description?: string;
}

const CrystalCard: React.FC<CrystalCardProps> = ({
  children,
  className = '',
  style,
  onClick,
  image,
  badge,
  category,
  title,
  description,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isServiceCard = image || badge || title;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize to -0.5 to 0.5
    const centerX = (x / rect.width) - 0.5;
    const centerY = (y / rect.height) - 0.5;

    // Update CSS variables
    card.style.setProperty('--mouse-x', String(centerX));
    card.style.setProperty('--mouse-y', String(centerY));
    card.style.setProperty('--x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--y', `${(y / rect.height) * 100}%`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;

    card.style.setProperty('--mouse-x', '0');
    card.style.setProperty('--mouse-y', '0');
  }, []);

  return (
    <div className={styles.cardWrapper}>
      <div
        ref={cardRef}
        className={`${styles.crystalCard} ${className}`}
        style={style}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Gooey blobs */}
        <div className={styles.blobContainer}>
          <div className={`${styles.blob} ${styles.blobRight}`} />
          <div className={`${styles.blob} ${styles.blobLeft}`} />
        </div>

        {/* Inner stroke */}
        <div className={styles.innerStroke} />

        {/* Dynamic shine layer */}
        <div className={styles.shine} />

        {/* Content */}
        <div className={styles.content}>
          {isServiceCard ? (
            <>
              {/* Service Image */}
              {image && (
                <div className={styles.imageWrapper}>
                  <img
                    src={image}
                    alt={title || ''}
                    className={styles.image}
                    draggable={false}
                  />
                </div>
              )}

              {/* Service Info */}
              <div className={styles.serviceInfo}>
                {badge && <div className={styles.badge}>{badge}</div>}
                {category && <span className={styles.category}>{category}</span>}
                {title && <h3 className={styles.title}>{title}</h3>}
                {description && <p className={styles.description}>{description}</p>}
              </div>
            </>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
};

export default CrystalCard;
