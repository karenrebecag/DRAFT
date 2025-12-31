'use client';

import React from 'react';
import { BunnyBackgroundVideo } from './BunnyBackgroundVideo';
import { TechMarquee } from './TechMarquee';
import { DirectionalButton, type ButtonTheme } from './DirectionalButton';
import styles from './StackedServiceCard.module.scss';

export interface ServiceCardData {
  id: number;
  category: string;
  number: string;
  titleFaded: string;
  titleMain: string;
  techKey: string;
  colorClass: string;
  /** Video source URL (HLS .m3u8 or regular mp4/webm) */
  videoSrc?: string;
  /** Placeholder image for video */
  videoPlaceholder?: string;
  /** CTA button text */
  ctaText?: string;
  /** CTA button link */
  ctaLink?: string;
  /** CTA button theme */
  ctaTheme?: ButtonTheme;
}

export interface StackedServiceCardProps {
  card: ServiceCardData;
  /** Show play/pause controls on the video */
  showVideoControls?: boolean;
  /** Additional class name */
  className?: string;
}

export const StackedServiceCard: React.FC<StackedServiceCardProps> = ({
  card,
  showVideoControls = false,
  className = '',
}) => {
  const hasVideo = !!card.videoSrc;

  return (
    <div
      data-stacking-cards-item
      className={`${styles.stackingCardsItem} ${styles[card.colorClass]} ${className}`}
    >
      {/* Background Video */}
      {hasVideo && (
        <BunnyBackgroundVideo
          src={card.videoSrc!}
          placeholder={card.videoPlaceholder}
          autoplay={true}
          showControls={showVideoControls}
          borderRadius="1.5em 1.5em 0 0"
          className={styles.videoBackground}
          preloadStrategy="auto"
        />
      )}

      {/* Video overlay for better text readability */}
      {hasVideo && <div className={styles.videoOverlay} />}

      {/* Top bar */}
      <div className={styles.stackingCardsItemTop}>
        <span className={styles.stackingCardTopSpan}>{card.category}</span>
        <span className={styles.stackingCardTopSpan}>{card.number}</span>
      </div>

      {/* Content */}
      <div data-stacking-cards-content className={styles.stackingCardsContent}>
        <h2 className={styles.stackingCardsItemH}>
          <span className={styles.stackingCardHeadingFaded}>{card.titleFaded}</span>
          <span className={styles.stackingCardHeadingMain}>{card.titleMain}</span>
        </h2>
        <TechMarquee serviceKey={card.techKey} />

        {/* CTA Button */}
        {card.ctaText && (
          <div
            className={styles.ctaWrapper}
            style={{ marginTop: '2em', position: 'relative', zIndex: 10 }}
          >
            <DirectionalButton
              href={card.ctaLink || '/contact'}
              theme={card.ctaTheme || 'primary'}
            >
              {card.ctaText}
            </DirectionalButton>
          </div>
        )}
      </div>
    </div>
  );
};

export interface StackedServiceCardsProps {
  cards: ServiceCardData[];
  /** Show play/pause controls on videos */
  showVideoControls?: boolean;
  /** Additional class name for the container */
  className?: string;
}

/**
 * StackedServiceCards - Container for stacking service cards with parallax
 * Use with useStackingCardsParallax hook for animations
 */
export const StackedServiceCards: React.FC<StackedServiceCardsProps> = ({
  cards,
  showVideoControls = false,
  className = '',
}) => {
  return (
    <div className={`${styles.stackingCardsCollection} ${className}`}>
      <div className={styles.stackingCardsList}>
        {cards.map((card) => (
          <StackedServiceCard
            key={card.id}
            card={card}
            showVideoControls={showVideoControls}
          />
        ))}
      </div>
    </div>
  );
};

export default StackedServiceCard;
