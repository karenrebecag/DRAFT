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
}

interface DotState {
  baseX: number;
  baseY: number;
  currentX: number;
  currentY: number;
  baseOpacity: number;
  currentOpacity: number;
  currentR: number;
  currentG: number;
  currentB: number;
  dirty: boolean;
  col: number;
  row: number;
}

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
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false, lastX: -1000, lastY: -1000 });
  const dotsRef = useRef<DotState[]>([]);
  const gridInfoRef = useRef({ cols: 0, rows: 0, dpr: 1, cellSize: 0 });
  const affectedDotsRef = useRef<Set<number>>(new Set());

  const parseColor = useCallback((colorStr: string) => {
    if (typeof window === "undefined") return { r: 0, g: 0, b: 0 };
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d");
    if (!ctx) return { r: 0, g: 0, b: 0 };
    ctx.fillStyle = colorStr;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return { r, g, b };
  }, []);

  const baseColor = useMemo(() => parseColor(color), [color, parseColor]);
  const targetHoverColor = useMemo(() => parseColor(hoverColor), [hoverColor, parseColor]);

  const setupCanvas = useCallback((canvas: HTMLCanvasElement, w: number, h: number) => {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const cellSize = squareSize + gridGap;
    const cols = Math.floor(w / cellSize);
    const rows = Math.floor(h / cellSize);

    const dots: DotState[] = [];
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        const baseX = col * cellSize * dpr;
        const baseY = row * cellSize * dpr;
        const baseOpacity = Math.random() * maxOpacity;
        dots.push({
          baseX,
          baseY,
          currentX: baseX,
          currentY: baseY,
          baseOpacity,
          currentOpacity: baseOpacity,
          currentR: baseColor.r,
          currentG: baseColor.g,
          currentB: baseColor.b,
          dirty: true,
          col,
          row,
        });
      }
    }

    dotsRef.current = dots;
    gridInfoRef.current = { cols, rows, dpr, cellSize: cellSize * dpr };
    affectedDotsRef.current.clear();

    return { cols, rows, dpr };
  }, [squareSize, gridGap, maxOpacity, baseColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const w = width || container.clientWidth;
    const h = height || container.clientHeight;
    setupCanvas(canvas, w, h);

    let animationId: number;
    let lastFrame = 0;
    let mouseMoving = false;
    let mouseStillFrames = 0;

    const scaledSize = squareSize * gridInfoRef.current.dpr;

    // Throttled mouse handler
    let lastMouseUpdate = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMouseUpdate < 16) return; // ~60fps max for mouse
      lastMouseUpdate = now;

      const rect = canvas.getBoundingClientRect();
      const newX = (e.clientX - rect.left) * gridInfoRef.current.dpr;
      const newY = (e.clientY - rect.top) * gridInfoRef.current.dpr;

      mouseRef.current = {
        x: newX,
        y: newY,
        active: true,
        lastX: mouseRef.current.x,
        lastY: mouseRef.current.y,
      };
      mouseMoving = true;
      mouseStillFrames = 0;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseMoving = false;
    };

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      document.addEventListener("mouseleave", handleMouseLeave);
    }

    // Get dots in radius using spatial lookup
    const getDotsInRadius = (mx: number, my: number, radius: number): number[] => {
      const { cols, rows, cellSize } = gridInfoRef.current;
      const indices: number[] = [];

      const minCol = Math.max(0, Math.floor((mx - radius) / cellSize));
      const maxCol = Math.min(cols - 1, Math.ceil((mx + radius) / cellSize));
      const minRow = Math.max(0, Math.floor((my - radius) / cellSize));
      const maxRow = Math.min(rows - 1, Math.ceil((my + radius) / cellSize));

      for (let col = minCol; col <= maxCol; col++) {
        for (let row = minRow; row <= maxRow; row++) {
          indices.push(col * rows + row);
        }
      }
      return indices;
    };

    // Initial full draw
    const drawFull = () => {
      const dots = dotsRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach((dot) => {
        ctx.fillStyle = `rgba(${dot.currentR},${dot.currentG},${dot.currentB},${dot.currentOpacity})`;
        ctx.fillRect(dot.currentX, dot.currentY, scaledSize, scaledSize);
        dot.dirty = false;
      });
    };

    drawFull();

    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate);

      // Adaptive framerate: 60fps when mouse moving, 30fps when still
      const frameInterval = mouseMoving ? 16.67 : 33.33;
      if (time - lastFrame < frameInterval) return;
      lastFrame = time;

      const { dpr } = gridInfoRef.current;
      const dots = dotsRef.current;
      const mouse = mouseRef.current;
      const scaledRadius = mouseRadius * dpr;
      const affected = affectedDotsRef.current;

      // Track if mouse stopped moving
      if (mouseMoving) {
        mouseStillFrames++;
        if (mouseStillFrames > 5) mouseMoving = false;
      }

      // Random flickering - reduced frequency
      if (Math.random() < 0.3) {
        const flickerCount = Math.floor(dots.length * flickerChance * 0.15);
        for (let u = 0; u < flickerCount; u++) {
          const i = Math.floor(Math.random() * dots.length);
          const dot = dots[i];
          const newOpacity = Math.random() * maxOpacity;
          if (Math.abs(newOpacity - dot.baseOpacity) > 0.03) {
            dot.baseOpacity = newOpacity;
            if (!affected.has(i)) {
              dot.currentOpacity = newOpacity;
              dot.dirty = true;
            }
          }
        }
      }

      // Get previously affected dots that need to animate back
      const previouslyAffected = new Set(affected);
      affected.clear();

      // Only process dots near mouse
      if (interactive && mouse.active) {
        const nearbyIndices = getDotsInRadius(mouse.x, mouse.y, scaledRadius);

        for (const i of nearbyIndices) {
          const dot = dots[i];
          if (!dot) continue;

          const dx = mouse.x - dot.baseX;
          const dy = mouse.y - dot.baseY;
          const distSq = dx * dx + dy * dy;
          const radiusSq = scaledRadius * scaledRadius;

          if (distSq < radiusSq) {
            affected.add(i);
            const distance = Math.sqrt(distSq);
            const influence = 1 - (distance / scaledRadius);
            const easeInfluence = influence * influence;

            const pullStrength = magnetStrength * easeInfluence * 20 * dpr;
            const targetX = dot.baseX + (dx / distance) * pullStrength;
            const targetY = dot.baseY + (dy / distance) * pullStrength;
            const targetOpacity = Math.min(1, dot.baseOpacity + easeInfluence * 0.7);
            const targetR = baseColor.r + (targetHoverColor.r - baseColor.r) * easeInfluence;
            const targetG = baseColor.g + (targetHoverColor.g - baseColor.g) * easeInfluence;
            const targetB = baseColor.b + (targetHoverColor.b - baseColor.b) * easeInfluence;

            const lerpSpeed = 0.2;
            dot.currentX += (targetX - dot.currentX) * lerpSpeed;
            dot.currentY += (targetY - dot.currentY) * lerpSpeed;
            dot.currentOpacity += (targetOpacity - dot.currentOpacity) * lerpSpeed;
            dot.currentR += (targetR - dot.currentR) * lerpSpeed;
            dot.currentG += (targetG - dot.currentG) * lerpSpeed;
            dot.currentB += (targetB - dot.currentB) * lerpSpeed;
            dot.dirty = true;
          }
        }
      }

      // Animate previously affected dots back to base
      for (const i of previouslyAffected) {
        if (affected.has(i)) continue;
        const dot = dots[i];

        const lerpSpeed = 0.1;
        const threshold = 0.01;

        const dX = Math.abs(dot.currentX - dot.baseX);
        const dY = Math.abs(dot.currentY - dot.baseY);
        const dO = Math.abs(dot.currentOpacity - dot.baseOpacity);
        const dR = Math.abs(dot.currentR - baseColor.r);

        if (dX > threshold || dY > threshold || dO > threshold || dR > threshold) {
          dot.currentX += (dot.baseX - dot.currentX) * lerpSpeed;
          dot.currentY += (dot.baseY - dot.currentY) * lerpSpeed;
          dot.currentOpacity += (dot.baseOpacity - dot.currentOpacity) * lerpSpeed;
          dot.currentR += (baseColor.r - dot.currentR) * lerpSpeed;
          dot.currentG += (baseColor.g - dot.currentG) * lerpSpeed;
          dot.currentB += (baseColor.b - dot.currentB) * lerpSpeed;
          dot.dirty = true;
          affected.add(i); // Keep tracking until settled
        }
      }

      // Only redraw dirty dots
      let hasGlow = false;
      dots.forEach((dot) => {
        if (!dot.dirty) return;

        // Clear previous position
        ctx.clearRect(
          dot.currentX - 20,
          dot.currentY - 20,
          scaledSize + 40,
          scaledSize + 40
        );
      });

      // Redraw dirty dots and their neighbors that might have been cleared
      const dirtySet = new Set<number>();
      dots.forEach((dot, i) => {
        if (dot.dirty) {
          dirtySet.add(i);
          // Add neighbors
          const { rows } = gridInfoRef.current;
          if (i > 0) dirtySet.add(i - 1);
          if (i < dots.length - 1) dirtySet.add(i + 1);
          if (i >= rows) dirtySet.add(i - rows);
          if (i < dots.length - rows) dirtySet.add(i + rows);
        }
      });

      for (const i of dirtySet) {
        const dot = dots[i];
        if (!dot) continue;

        const glowIntensity = (dot.currentOpacity - dot.baseOpacity) / 0.7;
        if (glowIntensity > 0.15) {
          ctx.shadowBlur = glowIntensity * 12;
          ctx.shadowColor = `rgba(${Math.round(dot.currentR)},${Math.round(dot.currentG)},${Math.round(dot.currentB)},${glowIntensity * 0.4})`;
          hasGlow = true;
        } else if (hasGlow) {
          ctx.shadowBlur = 0;
          hasGlow = false;
        }

        ctx.fillStyle = `rgba(${Math.round(dot.currentR)},${Math.round(dot.currentG)},${Math.round(dot.currentB)},${dot.currentOpacity})`;
        ctx.fillRect(dot.currentX, dot.currentY, scaledSize, scaledSize);
        dot.dirty = false;
      }

      if (hasGlow) ctx.shadowBlur = 0;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animationId = requestAnimationFrame(animate);
        } else {
          cancelAnimationFrame(animationId);
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const resizeObserver = new ResizeObserver(() => {
      const newW = width || container.clientWidth;
      const newH = height || container.clientHeight;
      setupCanvas(canvas, newW, newH);
      drawFull();
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      resizeObserver.disconnect();
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [setupCanvas, baseColor, targetHoverColor, squareSize, gridGap, flickerChance, maxOpacity, width, height, interactive, mouseRadius, magnetStrength]);

  return (
    <div ref={containerRef} className={`w-full h-full ${className || ''}`} style={style}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
      />
    </div>
  );
};
