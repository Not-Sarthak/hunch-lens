"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TokenizeCastForm from "../forms/tokenize-cast";

interface Particle {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
}

const MarketBanner = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createParticles = (canvas: HTMLCanvasElement) => {
    const particlesArray: Particle[] = [];
    const numberOfParticles = 40;

    for (let i = 0; i < numberOfParticles; i++) {
      const radius = Math.random() * 1 + 0.5;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const dx = (Math.random() - 0.5) * 0.5;
      const dy = (Math.random() - 0.5) * 0.5;

      particlesArray.push({
        x,
        y,
        dx,
        dy,
        radius,
      });
    }

    return particlesArray;
  };

  const animate = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.current.forEach((particle) => {
      particle.x += particle.dx;
      particle.y += particle.dy;

      if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#737373";
      ctx.fill();
    });

    animationFrameId.current = requestAnimationFrame(() =>
      animate(canvas, ctx)
    );
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      const container = canvas.parentElement;
      if (!container) return;

      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;

      particles.current = createParticles(canvas);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    particles.current = createParticles(canvas);

    animate(canvas, ctx);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-[#16151A] px-10 py-8 border border-[#1C1C1F]">
      <div className="absolute -top-20 right-4 rounded-full w-[156px] h-[156px] bg-gradient-to-b from-[#6FDBB5] to-[#2A5547] blur-[50px]" />
      <div className="absolute -bottom-24 left-0 rounded-full w-[156px] h-[156px] bg-[#2A5547] blur-[50px]" />

      <canvas ref={canvasRef} className="absolute inset-0" />

      <div className="relative z-10 max-w-2xl">
        <div className="text-white text-2xl font-normal font-helvetica leading-normal">
          Create markets for banger casts
        </div>
        <div className="text-[#737373] text-base font-normal font-helvetica leading-tight flex flex-col pt-2">
          <span>Don't wait for popular casts to be tokenised.</span>
          <span>Tokenise them yourself and raise the bar!</span>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex pt-4 items-center text-base font-medium text-[#6FDBB5] hover:text-[#5BC49E] transition-colors hover:underline"
        >
          Tokenise a cast
        </button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 bg-opacity-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="bg-[#111015] rounded-lg border-[#1e1e21] border-[1px] shadow-lg p-6 max-w-lg w-full relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <TokenizeCastForm closeModal={() => setIsModalOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MarketBanner;
