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
    const numberOfParticles = 120;

    for (let i = 0; i < numberOfParticles; i++) {
      const radius = Math.random() * 1 + 0.5;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const dx = (Math.random() - 0.5) * 0.5;
      const dy = (Math.random() - 0.5) * 0.5;

      particlesArray.push({ x, y, dx, dy, radius });
    }

    return particlesArray;
  };

  const animate = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
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

    animationFrameId.current = requestAnimationFrame(() => animate(canvas, ctx));
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

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-[#111015] p-4 sm:p-6 md:p-8 py-6 border border-[#1C1C1F]">
      <div className="absolute -top-28 right-0 rounded-full w-[156px] h-[156px] bg-[#6FDBB5] blur-[50px]" />
      <div className="absolute -bottom-32 left-0 rounded-full w-[156px] h-[156px] bg-[#6FDBB5] blur-[50px]" />
      
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-50"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center justify-center max-w-2xl mx-auto text-center">
        <div className="text-xl sm:text-2xl font-normal leading-normal text-white font-helvetica">
          Create markets for banger posts
        </div>
        <div className="flex flex-col items-center justify-center pt-2 text-sm sm:text-base font-light leading-tight text-white/50 font-helvetica">
          <span>Don't wait for popular posts to be tokenised.</span>
          <span>Tokenise them yourself and raise the bar!</span>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-3 py-1.5 pt-2 mt-4 text-sm font-light text-black transition-colors bg-white rounded-md hover:bg-gray-100"
        >
          Tokenise a post
        </button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 h-screen z-50 flex items-center justify-center bg-opacity-50 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="bg-[#111015] rounded-lg border-[#1e1e21] border-[1px] shadow-lg p-4 sm:p-6 m-4 sm:m-0 max-w-lg w-full relative"
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