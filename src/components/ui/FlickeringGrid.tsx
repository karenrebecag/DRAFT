'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";

export interface FlickeringGridProps {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  hoverColor?: string;
  width?: number;
  height?: number;
  className?: string;
  maxOpacity?: number;
  style?: React.CSSProperties;
  interactive?: boolean;
  mouseRadius?: number;
  magnetStrength?: number;
  revealAnimation?: boolean;
  revealSpeed?: number;
}

interface DotState {
  baseX: number;
  baseY: number;
  currentX: number;
  currentY: number;
  baseOpacity: number;
  currentOpacity: number;
  dirty: boolean;
  distFromCenter: number;
  revealed: boolean;
}

// Parse color once at module level for common colors
const colorCache = new Map<string, { r: number; g: number; b: number }>();

export const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = "rgb(0, 0, 0)",
  hoverColor = "rgb(163, 230, 53)",
  width,
  height,
  className,
  maxOpacity = 0.3,
  style,
  interactive = true,
  mouseRadius = 150,
  magnetStrength = 0.4,
  revealAnimation = false,
  revealSpeed = 0.012,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const dotsRef = useRef<DotState[]>([]);
  const gridInfoRef = useRef({ cols: 0, rows: 0, cellSize: 0 });
  const isVisibleRef = useRef(true);
  const animationIdRef = useRef<number>(0);

  const parseColor = useCallback((colorStr: string) => {
    if (colorCache.has(colorStr)) return colorCache.get(colorStr)!;

    if (typeof window === "undefined") return { r: 0, g: 0, b: 0 };
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d");
    if (!ctx) return { r: 0, g: 0, b: 0 };
    ctx.fillStyle = colorStr;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    const result = { r, g, b };
    colorCache.set(colorStr, result);
    return result;
  }, []);

  const baseColor = useMemo(() => parseColor(color), [color, parseColor]);
  const targetHoverColor = useMemo(() => parseColor(hoverColor), [hoverColor, parseColor]);

  const setupCanvas = useCallback((canvas: HTMLCanvasElement, w: number, h: number) => {
    // Use DPR of 1 for performance (no retina scaling)
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const cellSize = squareSize + gridGap;
    const cols = Math.floor(w / cellSize);
    const rows = Math.floor(h / cellSize);

    const centerX = w / 2;
    const centerY = h / 2;

    const dots: DotState[] = [];
    let maxDist = 0;

    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        const baseX = col * cellSize;
        const baseY = row * cellSize;
        const baseOpacity = Math.random() * maxOpacity;

        const dx = baseX - centerX;
        const dy = baseY - centerY;
        const distFromCenter = Math.sqrt(dx * dx + dy * dy);
        maxDist = Math.max(maxDist, distFromCenter);

        dots.push({
          baseX,
          baseY,
          currentX: baseX,
          currentY: baseY,
          baseOpacity,
          currentOpacity: revealAnimation ? 0 : baseOpacity,
          dirty: true,
          distFromCenter,
          revealed: !revealAnimation,
        });
      }
    }

    // Normalize distances
    const invMaxDist = 1 / maxDist;
    for (let i = 0; i < dots.length; i++) {
      dots[i].distFromCenter = dots[i].distFromCenter * invMaxDist + Math.random() * 0.15;
    }

    dotsRef.current = dots;
    gridInfoRef.current = { cols, rows, cellSize };

    return { cols, rows };
  }, [squareSize, gridGap, maxOpacity, revealAnimation]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const w = width || container.clientWidth;
    const h = height || container.clientHeight;
    setupCanvas(canvas, w, h);

    let lastFrame = 0;
    let revealProgress = 0;
    let frameCount = 0;

    // Throttled mouse handler - 30fps max
    let lastMouseUpdate = 0;
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisibleRef.current) return;

      const now = performance.now();
      if (now - lastMouseUpdate < 33) return;
      lastMouseUpdate = now;

      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    if (interactive) {
      canvas.addEventListener("mousemove", handleMouseMove, { passive: true });
      canvas.addEventListener("mouseleave", handleMouseLeave);
    }

    // Draw all dots
    const drawAll = () => {
      const dots = dotsRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        if (dot.currentOpacity < 0.01) continue;

        ctx.fillStyle = `rgba(${baseColor.r},${baseColor.g},${baseColor.b},${dot.currentOpacity})`;
        ctx.fillRect(dot.currentX, dot.currentY, squareSize, squareSize);
        dot.dirty = false;
      }
    };

    drawAll();

    const animate = (time: number) => {
      if (!isVisibleRef.current) {
        animationIdRef.current = requestAnimationFrame(animate);
        return;
      }

      // Adaptive framerate: 20fps idle, 30fps when interactive
      const frameInterval = mouseRef.current.active ? 33 : 50;
      if (time - lastFrame < frameInterval) {
        animationIdRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrame = time;
      frameCount++;

      const dots = dotsRef.current;
      const mouse = mouseRef.current;
      const { cellSize, cols, rows } = gridInfoRef.current;

      // Radial reveal animation
      if (revealAnimation && revealProgress < 1.5) {
        revealProgress += revealSpeed;

        for (let i = 0; i < dots.length; i++) {
          const dot = dots[i];
          if (!dot.revealed && dot.distFromCenter < revealProgress) {
            dot.revealed = true;
            dot.currentOpacity = Math.min(dot.baseOpacity * 2.5, 0.6);
            dot.dirty = true;
          }

          if (dot.revealed && dot.currentOpacity > dot.baseOpacity) {
            dot.currentOpacity += (dot.baseOpacity - dot.currentOpacity) * 0.1;
            dot.dirty = true;
          }
        }
      }

      // Random flickering - very reduced (every 3rd frame, fewer dots)
      if (frameCount % 3 === 0 && Math.random() < 0.4) {
        const flickerCount = Math.max(1, Math.floor(dots.length * flickerChance * 0.05));
        for (let u = 0; u < flickerCount; u++) {
          const i = Math.floor(Math.random() * dots.length);
          const dot = dots[i];
          const newOpacity = Math.random() * maxOpacity;
          if (Math.abs(newOpacity - dot.baseOpacity) > 0.05) {
            dot.baseOpacity = newOpacity;
            dot.currentOpacity = newOpacity;
            dot.dirty = true;
          }
        }
      }

      // Mouse interaction - simplified
      if (interactive && mouse.active) {
        const minCol = Math.max(0, Math.floor((mouse.x - mouseRadius) / cellSize));
        const maxCol = Math.min(cols - 1, Math.ceil((mouse.x + mouseRadius) / cellSize));
        const minRow = Math.max(0, Math.floor((mouse.y - mouseRadius) / cellSize));
        const maxRow = Math.min(rows - 1, Math.ceil((mouse.y + mouseRadius) / cellSize));

        const radiusSq = mouseRadius * mouseRadius;

        for (let col = minCol; col <= maxCol; col++) {
          for (let row = minRow; row <= maxRow; row++) {
            const idx = col * rows + row;
            const dot = dots[idx];
            if (!dot) continue;

            const dx = mouse.x - dot.baseX;
            const dy = mouse.y - dot.baseY;
            const distSq = dx * dx + dy * dy;

            if (distSq < radiusSq) {
              const distance = Math.sqrt(distSq);
              const influence = 1 - (distance / mouseRadius);
              const easeInfluence = influence * influence;

              const pullStrength = magnetStrength * easeInfluence * 15;
              const targetX = dot.baseX + (dx / distance) * pullStrength;
              const targetY = dot.baseY + (dy / distance) * pullStrength;
              const targetOpacity = Math.min(0.8, dot.baseOpacity + easeInfluence * 0.5);

              dot.currentX += (targetX - dot.currentX) * 0.15;
              dot.currentY += (targetY - dot.currentY) * 0.15;
              dot.currentOpacity += (targetOpacity - dot.currentOpacity) * 0.15;
              dot.dirty = true;
            } else if (dot.currentX !== dot.baseX || dot.currentY !== dot.baseY) {
              // Return to base
              dot.currentX += (dot.baseX - dot.currentX) * 0.08;
              dot.currentY += (dot.baseY - dot.currentY) * 0.08;
              dot.currentOpacity += (dot.baseOpacity - dot.currentOpacity) * 0.08;

              if (Math.abs(dot.currentX - dot.baseX) < 0.5 && Math.abs(dot.currentY - dot.baseY) < 0.5) {
                dot.currentX = dot.baseX;
                dot.currentY = dot.baseY;
                dot.currentOpacity = dot.baseOpacity;
              }
              dot.dirty = true;
            }
          }
        }
      }

      // Check if any dot needs redraw
      let needsRedraw = false;
      for (let i = 0; i < dots.length; i++) {
        if (dots[i].dirty) {
          needsRedraw = true;
          break;
        }
      }

      if (needsRedraw) {
        drawAll();
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    // Visibility observer - pause when not visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    animationIdRef.current = requestAnimationFrame(animate);

    // Debounced resize
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newW = width || container.clientWidth;
        const newH = height || container.clientHeight;
        setupCanvas(canvas, newW, newH);
        drawAll();
      }, 100);
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationIdRef.current);
      observer.disconnect();
      resizeObserver.disconnect();
      clearTimeout(resizeTimeout);
      if (interactive) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [setupCanvas, baseColor, targetHoverColor, squareSize, flickerChance, maxOpacity, width, height, interactive, mouseRadius, magnetStrength, revealAnimation, revealSpeed]);

  return (
    <div ref={containerRef} className={`w-full h-full ${className || ''}`} style={style}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
};
