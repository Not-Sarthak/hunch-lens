import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import HowItWorksSection from "../landing/how-it-works";
import LandingVisuals from "../landing/landing-visuals";
import BackgroundCircle from "../landing/background-circle";

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
    ctx.fillStyle = `rgba(111, 219, 181, ${this.alpha})`;
    ctx.fill();
    ctx.shadowBlur = 15;
    ctx.shadowColor = "rgba(111, 219, 181, 0.5)";
  }
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const setCanvasSize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const particles: Particle[] = Array.from(
      { length: 400 },
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
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10"
    />
  );
};

const AnimatedContent: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center h-80"
    >
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-gradient-to-b from-[#6FDBB5] to-[#45A176] text-5xl font-light text-transparent bg-clip-text w-1/2 text-center"
      >
        Let AI spot viral content before everyone else
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.75 }}
        className="text-[#737373] w-[228px] leading-tight mt-4 text-center text-lg font-normal"
      >
        Turn social engagement into profit while you sleep.
      </motion.p>
    </motion.div>
  );
};

const LandingPageSection: React.FC = () => {
  return (
    <>
      <ParticleBackground />
      <BackgroundCircle />
      <div className="relative max-w-landing border-x border-b rounded-b-2xl border-[#1E1E21] min-h-screen bg-[#111015] bg-opacity-95">
        <AnimatedContent />
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="grid place-items-center"
        >
          <LandingVisuals />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.25 }}
        >
          <HowItWorksSection />
        </motion.div>
      </div>
    </>
  );
};

export default LandingPageSection;
