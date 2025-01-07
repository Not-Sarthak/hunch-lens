import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
}

const RepScore = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>();

  const createParticles = (canvas: HTMLCanvasElement) => {
    const particlesArray: Particle[] = [];
    const numberOfParticles = 40;

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
    <div className="relative w-full overflow-hidden rounded-2xl bg-[#16151A] px-6 py-8 border border-[#1C1C1F] mt-8 flex items-center justify-between">
      <div className="absolute -top-28 -right-20 rounded-full w-[200px] h-[200px] bg-gradient-to-b from-[#6FDBB5] to-[#2A5547] blur-[50px]" />
      <div className="absolute -bottom-36 -left-4 rounded-full w-[156px] h-[156px] bg-[#2A5547] blur-[50px]" />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="relative z-10 max-w-2xl">
        <div className="text-xl font-medium leading-normal text-white font-helvetica">
          Your Reputation Score
        </div>
        <div className="text-[#737373] text-base font-normal font-helvetica leading-tight flex flex-col pt-1">
          <span>Increase your reputation score by creating markets. </span>
        </div>
      </div>
      <p className="z-10 font-bold text-[#6FDBB5] text-5xl pt-1.5">89</p>
    </div>
  );
};

export default RepScore;
