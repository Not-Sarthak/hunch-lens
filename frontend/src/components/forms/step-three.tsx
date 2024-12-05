import { useEffect, useRef } from "react";
import { CheckCheck } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface Particle {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
}

const StepThree = () => {
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
    <div className="w-full bg-[#111015] border-[#1e1e21] border-[1px] rounded-lg p-6">
      <div className="space-y-6 relative text-center px-4 py-4 border-[#1e1e21] border-[1px] rounded-lg overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full w-[153px] h-[153px] bg-gradient-to-b from-[#6FDBB5] to-[#2A5547] blur-[50px]" />

        <canvas ref={canvasRef} className="absolute inset-0" />

        <div className="flex justify-center">
          <Image
            src="/icons/check-tick-double.svg"
            alt="check"
            width={100}
            height={100}
          />
        </div>

        <div className="relative animate-fadeIn delay-200">
          <p className="text-xl text-gray-200">Yay! Wallet Generated</p>
          <p className="text-sm text-gray-400 mt-2">0x23...2124</p>
        </div>

        <button
          onClick={() => toast.success("Funds check initiated!")}
          className="relative w-full py-3 px-4 bg-white hover:bg-gray-100 active:scale-95 transition-all text-black rounded-lg animate-fadeIn delay-300"
        >
          Check Funds
        </button>
      </div>
    </div>
  );
};

export default StepThree;
