'use client';

import { useRef, useEffect } from 'react';
import styles from './BunnyBackgroundVideo.module.scss';

export interface BunnyBackgroundVideoProps {
  src: string;
  placeholder?: string;
  autoplay?: boolean;
  lazy?: boolean;
  showControls?: boolean;
  className?: string;
  borderRadius?: string;
}

export const BunnyBackgroundVideo: React.FC<BunnyBackgroundVideoProps> = ({
  src,
  placeholder,
  autoplay = true,
  lazy = false,
  showControls = false,
  className = '',
  borderRadius = '1.5em',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<any>(null);
  const ioRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const player = containerRef.current;
    const video = videoRef.current;
    if (!player || !video || !src) return;

    // Reset video
    try { video.pause(); } catch (_) {}
    try { video.removeAttribute('src'); video.load(); } catch (_) {}

    // Attribute helpers
    const setStatus = (s: string) => {
      if (player.getAttribute('data-player-status') !== s) {
        player.setAttribute('data-player-status', s);
      }
    };
    const setActivated = (v: boolean) => {
      player.setAttribute('data-player-activated', v ? 'true' : 'false');
    };

    if (!player.hasAttribute('data-player-activated')) setActivated(false);

    // Flags
    let pendingPlay = false;
    let isAttached = false;
    let lastPauseBy = ''; // 'io' | 'manual' | ''

    // Setup video attributes
    if (autoplay) {
      video.muted = true;
      video.loop = true;
    }
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.playsInline = true;
    if ('disableRemotePlayback' in video) {
      (video as any).disableRemotePlayback = true;
    }
    video.autoplay = false;

    // Detect HLS support
    const isHLS = src.includes('.m3u8');
    const isSafariNative = !!video.canPlayType('application/vnd.apple.mpegurl');

    // Safe play helper
    const safePlay = () => {
      const p = video.play();
      if (p && typeof p.then === 'function') {
        p.catch(() => {});
      }
    };

    // Ready status guard
    const readyIfIdle = () => {
      if (!pendingPlay &&
          player.getAttribute('data-player-activated') !== 'true' &&
          player.getAttribute('data-player-status') === 'idle') {
        setStatus('ready');
      }
    };

    // Attach media once
    const attachMediaOnce = async () => {
      if (isAttached) return;
      isAttached = true;

      if (hlsRef.current) {
        try { hlsRef.current.destroy(); } catch (_) {}
        hlsRef.current = null;
      }

      if (isHLS && !isSafariNative) {
        // Use hls.js for non-Safari browsers
        try {
          const Hls = (await import('hls.js')).default;
          if (Hls.isSupported()) {
            const hls = new Hls({ maxBufferLength: 10 });
            hls.attachMedia(video);
            hls.on(Hls.Events.MEDIA_ATTACHED, () => {
              hls.loadSource(src);
            });
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              readyIfIdle();
            });
            hlsRef.current = hls;
          } else {
            video.src = src;
          }
        } catch (err) {
          console.error('Failed to load hls.js:', err);
          video.src = src;
        }
      } else {
        // Safari native HLS or regular video
        video.preload = lazy ? 'none' : 'auto';
        video.src = src;
        video.addEventListener('loadedmetadata', readyIfIdle, { once: true });
      }
    };

    // Toggle play/pause
    const togglePlay = () => {
      if (video.paused || video.ended) {
        if (lazy && !isAttached) attachMediaOnce();
        pendingPlay = true;
        lastPauseBy = '';
        setStatus('loading');
        safePlay();
      } else {
        lastPauseBy = 'manual';
        video.pause();
      }
    };

    // Media event handlers
    const handlePlay = () => { setActivated(true); setStatus('playing'); };
    const handlePlaying = () => { pendingPlay = false; setStatus('playing'); };
    const handlePause = () => { pendingPlay = false; setStatus('paused'); };
    const handleWaiting = () => { setStatus('loading'); };
    const handleCanPlay = () => { readyIfIdle(); };
    const handleEnded = () => { pendingPlay = false; setStatus('paused'); setActivated(false); };

    video.addEventListener('play', handlePlay);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('pause', handlePause);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('ended', handleEnded);

    // Control click handler
    const handleControlClick = (e: Event) => {
      const btn = (e.target as HTMLElement).closest('[data-player-control]');
      if (!btn || !player.contains(btn)) return;
      const type = btn.getAttribute('data-player-control');
      if (type === 'play' || type === 'pause' || type === 'playpause') togglePlay();
    };
    player.addEventListener('click', handleControlClick);

    // Initialize based on lazy mode
    if (lazy) {
      video.preload = 'none';
    } else {
      attachMediaOnce();
    }

    // IntersectionObserver for autoplay
    if (autoplay) {
      if (ioRef.current) {
        try { ioRef.current.disconnect(); } catch (_) {}
      }

      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const inView = entry.isIntersecting && entry.intersectionRatio > 0;
          if (inView) {
            if (lazy && !isAttached) attachMediaOnce();
            if ((lastPauseBy === 'io') || (video.paused && lastPauseBy !== 'manual')) {
              setStatus('loading');
              if (video.paused) togglePlay();
              lastPauseBy = '';
            }
          } else {
            if (!video.paused && !video.ended) {
              lastPauseBy = 'io';
              video.pause();
            }
          }
        });
      }, { threshold: 0.1 });

      io.observe(player);
      ioRef.current = io;
    }

    // Cleanup
    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('ended', handleEnded);
      player.removeEventListener('click', handleControlClick);

      if (ioRef.current) {
        ioRef.current.disconnect();
        ioRef.current = null;
      }
      if (hlsRef.current) {
        try { hlsRef.current.destroy(); } catch (_) {}
        hlsRef.current = null;
      }
    };
  }, [src, autoplay, lazy]);

  return (
    <div
      ref={containerRef}
      className={`${styles.bunnyBg} ${className}`}
      style={{ borderRadius }}
      data-bunny-background-init=""
      data-player-status="idle"
      data-player-activated="false"
      data-player-src={src}
      data-player-lazy={lazy ? 'true' : 'false'}
      data-player-autoplay={autoplay ? 'true' : 'false'}
    >
      <video
        ref={videoRef}
        className={styles.video}
        preload={lazy ? 'none' : 'auto'}
        width={1920}
        height={1080}
        playsInline
        muted
      />

      {placeholder && (
        <img
          src={placeholder}
          loading="lazy"
          className={styles.placeholder}
          alt=""
        />
      )}

      <div className={styles.loading}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className={styles.loadingSvg}
          fill="none"
        >
          <path
            fill="currentColor"
            d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              dur="1s"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>

      {showControls && (
        <div data-player-control="playpause" className={styles.playpause}>
          <div className={styles.btn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              viewBox="0 0 24 24"
              fill="none"
              className={styles.pauseSvg}
            >
              <path d="M16 5V19" stroke="currentColor" strokeWidth="3" strokeMiterlimit="10" />
              <path d="M8 5V19" stroke="currentColor" strokeWidth="3" strokeMiterlimit="10" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              viewBox="0 0 24 24"
              fill="none"
              className={styles.playSvg}
            >
              <path
                d="M6 12V5.01109C6 4.05131 7.03685 3.4496 7.87017 3.92579L14 7.42855L20.1007 10.9147C20.9405 11.3945 20.9405 12.6054 20.1007 13.0853L14 16.5714L7.87017 20.0742C7.03685 20.5503 6 19.9486 6 18.9889V12Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default BunnyBackgroundVideo;
