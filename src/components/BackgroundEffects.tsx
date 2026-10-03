import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  maxOpacity: number;
  pulseSpeed: number;
  pulseOffset: number;
  isHeart: boolean;
}

export function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with smooth lerp tracking
    let targetX = width / 2;
    let targetY = height / 2;
    let currentX = width / 2;
    let currentY = height / 2;
    let isMouseActive = false;

    const handlePointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      isMouseActive = true;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      if (!isMouseActive) {
        targetX = width / 2;
        targetY = height / 2;
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // Create romantic background particles
    const particleCount = Math.min(40, Math.floor(width / 15));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.8,
        speedY: -(Math.random() * 0.4 + 0.15),
        speedX: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.5 + 0.1,
        maxOpacity: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulseOffset: Math.random() * Math.PI * 2,
        isHeart: i % 8 === 0, // A few subtle floating heart silhouettes
      });
    }

    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, s: number, opacity: number) => {
      c.save();
      c.translate(x, y);
      c.beginPath();
      const scale = s * 0.8;
      c.moveTo(0, 0);
      c.bezierCurveTo(-scale, -scale, -scale * 2, scale * 0.5, 0, scale * 2);
      c.bezierCurveTo(scale * 2, scale * 0.5, scale, -scale, 0, 0);
      c.fillStyle = `rgba(244, 63, 94, ${opacity * 0.7})`;
      c.shadowColor = 'rgba(225, 29, 72, 0.4)';
      c.shadowBlur = 8;
      c.fill();
      c.restore();
    };

    let tick = 0;
    const render = () => {
      tick++;

      // Smooth lerp mouse following for cinematic radial glow
      currentX += (targetX - currentX) * 0.075;
      currentY += (targetY - currentY) * 0.075;

      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(650px circle at ${currentX.toFixed(1)}px ${currentY.toFixed(1)}px, rgba(225, 29, 72, 0.13), rgba(245, 158, 11, 0.04) 40%, transparent 75%)`;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;

        // Wrap around
        if (p.y < -20) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        // Opacity oscillation
        const currentOpacity = Math.max(
          0.05,
          Math.sin(tick * p.pulseSpeed + p.pulseOffset) * (p.maxOpacity * 0.4) + (p.maxOpacity * 0.6)
        );

        if (p.isHeart) {
          drawHeart(ctx, p.x, p.y, p.size * 2, currentOpacity);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          // Crimson and warm gold sparkles
          if (i % 3 === 0) {
            ctx.fillStyle = `rgba(251, 191, 36, ${currentOpacity * 0.75})`;
            ctx.shadowColor = 'rgba(245, 158, 11, 0.5)';
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
            ctx.shadowColor = 'rgba(225, 29, 72, 0.4)';
          }
          ctx.shadowBlur = 6;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Cinematic subtle dark gradient background */}
      <div className="absolute inset-0 bg-[#080808]" />

      {/* Atmospheric deep crimson base ambient glow blob */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[650px] h-[420px] sm:h-[650px] rounded-full blur-[130px] opacity-25 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(225, 29, 72, 0.35) 0%, rgba(190, 18, 60, 0.15) 50%, transparent 70%)'
        }}
      />

      {/* Atmospheric subtle warm gold center glow */}
      <div 
        className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] rounded-full blur-[120px] opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(217, 119, 6, 0.25) 0%, rgba(180, 83, 9, 0.08) 50%, transparent 70%)'
        }}
      />

      {/* Dynamic interactive mouse-following glowing radial gradient */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out will-change-[background]"
      />

      {/* Subtle vignette border */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_0%,rgba(0,0,0,0.65)_100%]" />

      {/* Floating particles canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
