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
  width?: number;
  height?: number;
  className?: string;
  maxOpacity?: number;
  style?: React.CSSProperties;
}

export const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = "rgb(0, 0, 0)",
  width,
  height,
  className,
  maxOpacity = 0.3,
  style,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse color once
  const rgbColor = useMemo(() => {
    if (typeof window === "undefined") return { r: 0, g: 0, b: 0 };
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d");
    if (!ctx) return { r: 0, g: 0, b: 0 };
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return { r, g, b };
  }, [color]);

  const setupCanvas = useCallback((canvas: HTMLCanvasElement, w: number, h: number) => {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const cols = Math.floor(w / (squareSize + gridGap));
    const rows = Math.floor(h / (squareSize + gridGap));
    const total = cols * rows;

    // Pre-allocate arrays
    const opacities = new Float32Array(total);
    for (let i = 0; i < total; i++) {
      opacities[i] = Math.random() * maxOpacity;
    }

    return { cols, rows, opacities, dpr };
  }, [squareSize, gridGap, maxOpacity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const w = width || container.clientWidth;
    const h = height || container.clientHeight;
    let grid = setupCanvas(canvas, w, h);

    let animationId: number;
    let lastFrame = 0;
    const frameInterval = 1000 / 30; // 30 FPS cap

    // Pre-calculate cell size
    const cellSize = squareSize + gridGap;

    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate);

      // Throttle to 30fps
      if (time - lastFrame < frameInterval) return;
      lastFrame = time;

      const { rows, opacities, dpr } = grid;
      const scaledCell = cellSize * dpr;
      const scaledSize = squareSize * dpr;

      // Only update ~30% of squares per frame (based on flickerChance)
      const updateCount = Math.floor(opacities.length * flickerChance * 0.5);

      for (let u = 0; u < updateCount; u++) {
        const i = Math.floor(Math.random() * opacities.length);
        const newOpacity = Math.random() * maxOpacity;
        const oldOpacity = opacities[i];

        // Only redraw if opacity changed significantly
        if (Math.abs(newOpacity - oldOpacity) > 0.02) {
          opacities[i] = newOpacity;

          const col = Math.floor(i / rows);
          const row = i % rows;
          const x = col * scaledCell;
          const y = row * scaledCell;

          // Clear and redraw just this square
          ctx.clearRect(x, y, scaledSize, scaledSize);
          ctx.fillStyle = `rgba(${rgbColor.r},${rgbColor.g},${rgbColor.b},${newOpacity})`;
          ctx.fillRect(x, y, scaledSize, scaledSize);
        }
      }
    };

    // Initial full draw
    const drawFull = () => {
      const { cols, rows, opacities, dpr } = grid;
      const scaledCell = cellSize * dpr;
      const scaledSize = squareSize * dpr;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const opacity = opacities[i * rows + j];
          ctx.fillStyle = `rgba(${rgbColor.r},${rgbColor.g},${rgbColor.b},${opacity})`;
          ctx.fillRect(i * scaledCell, j * scaledCell, scaledSize, scaledSize);
        }
      }
    };

    drawFull();

    // Intersection Observer - only animate when visible
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

    // Resize handler
    const resizeObserver = new ResizeObserver(() => {
      const newW = width || container.clientWidth;
      const newH = height || container.clientHeight;
      grid = setupCanvas(canvas, newW, newH);
      drawFull();
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, [setupCanvas, rgbColor, squareSize, gridGap, flickerChance, maxOpacity, width, height]);

  return (
    <div ref={containerRef} className={`w-full h-full ${className || ''}`} style={style}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
      />
    </div>
  );
};
