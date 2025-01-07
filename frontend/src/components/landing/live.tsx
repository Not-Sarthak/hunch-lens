import { ConnectKitButton } from "connectkit";
import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

class ParticleImpl implements Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  private targetAlpha: number;

  constructor(private canvas: HTMLCanvasElement) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.2;
    this.vy = (Math.random() - 0.5) * 0.2;
    this.radius = Math.random() * 1.5;
    this.alpha = 0;
    this.targetAlpha = Math.random() * 0.5 + 0.2;
  }

  update(): void {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha += (this.targetAlpha - this.alpha) * 0.02;

    if (this.x < 0 || this.x > this.canvas.width) this.vx = -this.vx;
    if (this.y < 0 || this.y > this.canvas.height) this.vy = -this.vy;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
    ctx.fill();
    ctx.shadowBlur = 15;
    ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
  }
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const setCanvasSize = () => {
      if (canvas && container) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
      }
    };

    setCanvasSize();
    const resizeObserver = new ResizeObserver(setCanvasSize);
    resizeObserver.observe(container);

    const particles: Particle[] = Array.from(
      { length: 35 },
      () => new ParticleImpl(canvas)
    );

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute top-0 right-0 z-0 w-1/2 h-full opacity-50"
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />
    </div>
  );
};

const Live = () => {
  return (
    <div className="flex items-center justify-between mx-6 mb-6 border border-[#1c1c1f] bg-[#111014] px-9 py-7 rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.24)] relative isolate overflow-hidden">
      <div className="z-10 flex items-center justify-between w-full">
        <h1 className="text-3xl font-light">Now live on Lens</h1>
        <ConnectKitButton />
      </div>
      <ParticleBackground />
      <div className="h-40 w-48 bg-[#6FDBB5] absolute -top-32 right-40 blur-[50px] z-[-1]" />
      <div className="h-12 w-12 bg-[#6FDBB5] absolute -bottom-16 left-8 blur-[50px] z-[-1]" />
    </div>
  );
};

export default Live;
