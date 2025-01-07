import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import NumberFlow from "@number-flow/react";
import Image from "next/image";
import lensLogo from "../../assets/lens.svg"

interface CardProps {
  title: string;
  subtitle: React.ReactNode | string;
  effect: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, subtitle, effect }) => (
  <div className="flex-shrink-0 flex-grow-0 flex items-center mx-4 gap-8 rounded-lg w-[500px]">
    <div className="flex-shrink-0 w-[200px] h-[140px] rounded-2xl overflow-hidden border border-[#1E1E21]">
      {effect}
    </div>
    <div className="flex flex-col items-start justify-between flex-grow-0 h-full">
      <h3 className="text-xl text-white">{title}</h3>
      <p className="text-[#787878] whitespace-break-spaces">{subtitle}</p>
    </div>
  </div>
);

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
      className="absolute top-0 left-0 w-full h-full opacity-50"
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />
    </div>
  );
};

const AgentElement: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-full bg-[#16151A] isolate">
      <ParticleBackground />
      <motion.h1 className="absolute z-10 font-normal top-6 left-7">
        {Array.from("stani.lens").map((char, index) => (
          <motion.span
            layout="preserve-aspect"
            className="inline-block text-transparent bg-gradient-to-b from-[#000000] to-[#fafafa8a] bg-clip-text"
            key={index}
            animate={{
              opacity: [0, 1, 1, 0],
              x: [-8, 0, 0, -8],
              y: [-8, 0, 0, 0],
              filter: ["blur(4px)", "blur(0px)", "blur(0px)", "blur(4px)"],
              willChange: "transform, opacity, filter",
            }}
            transition={{
              duration: 4,
              times: [0, 0.2, 0.8, 1],
              delay: index * 0.05,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>
      <Image src={lensLogo} alt="lens" fill={true} />
    </div>
  );
};

const ControlElement = () => {
  const totalWidth = 120;

  const [fraction, setFraction] = useState(0.5);

  useEffect(() => {
    const interval = setInterval(() => {
      setFraction((prev) => 0.25 + Math.random() * 0.5);
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full h-full bg-[#16151A] isolate">
      <ParticleBackground />
      <div className="relative z-10 flex flex-col items-end justify-center w-full h-full gap-3 mt-2 text-xs isolate">
        <div className="w-[120px] h-4 bg-[#242424] relative rounded-l-full">
          <motion.div
            className="h-full bg-[#6FDBB5] absolute top-0 left-0 rounded-l-full"
            animate={{
              width: `${totalWidth * fraction}px`,
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
          />
          <motion.div
            animate={{
              left: `${totalWidth * fraction}px`,
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
            className="h-6 w-5 bg-gradient-to-b from-[#26262A] to-[#16151A] border-2 border-[#6FDBB5] absolute top-1/2 -translate-y-1/2 rounded-md"
          />

          <motion.p
            animate={{
              left: `${totalWidth * fraction}px`,
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
            className="absolute -top-10 text-[#6FDBB5] text-sm font-normal -translate-x-0.5"
          >
            <NumberFlow value={Number((fraction * 6).toFixed(1))} />
          </motion.p>
        </div>
      </div>
      <motion.div
        animate={{
          opacity: [1, 0.75, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="h-20 w-28 bg-[#6FDBB5] absolute -bottom-10 -right-4 blur-[50px] z-[-1]"
      />
    </div>
  );
};

const StyleElement = () => {
  const [items] = useState(["Only Profit", "I value values", "Socialistic"]);

  return (
    <div className="relative flex items-center justify-center w-full h-full bg-[#16151A] isolate">
      <ParticleBackground />
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-3 mt-2 text-xs isolate">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ y: 0 }}
            animate={{
              y: [-10, 0, -10],
              scale: index === 1 ? 1.25 : 1,
            }}
            transition={{
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.5,
              },
              scale: {
                duration: 0.5,
              },
            }}
            className={`border-2 origin-center ${
              index === 1
                ? "bg-[#6FDBB5] bg-opacity-30 text-[#FFFFFF] border-[#45A176] z-10 blur-[0px]"
                : "bg-[#242424] text-[#737373] border-[#1E1E21] z-0"
            } px-3 py-1.5 rounded-lg`}
          >
            {item}
          </motion.div>
        ))}
      </div>
      <motion.div
        animate={{
          opacity: [1, 0.75, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="h-20 w-28 bg-[#6FDBB5] absolute -bottom-10 -left-4 blur-[50px] z-[-1]"
      />
    </div>
  );
};

interface CardProps {
  title: string;
  subtitle: React.ReactNode;
  effect: React.ReactNode;
}

const InfiniteScroll: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroll = scrollRef.current;
    const content = contentRef.current;
    if (!scroll || !content) return;

    const totalWidth = content.offsetWidth;
    scroll.style.transform = "translateX(0)";

    const animate = () => {
      const currentTransform = getComputedStyle(scroll).transform;
      const matrix = new DOMMatrix(currentTransform);
      const currentX = matrix.m41;

      let newX = currentX - 1;
      if (newX <= -totalWidth) {
        newX = 0;
      }

      scroll.style.transform = `translateX(${newX}px)`;
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="w-full mt-12 mb-24 overflow-hidden gradient-mask">
      <div ref={scrollRef} className="flex">
        <div ref={contentRef} className="flex">
          <Card
            title="Discover Viral Posts"
            subtitle={
              <div>
                <div>Find trending content before it peaks.</div>
                <div className="mt-4 leading-tight">
                  Our algorithm helps identify posts with viral potential early.
                </div>
              </div>
            }
            effect={<AgentElement />}
          />
          <Card
            title="Invest in Social Value"
            subtitle={
              <div>
                <p className="leading-tight">
                  Buy tokens of posts you believe will go viral.
                </p>
                <p className="mt-4 leading-tight">
                  Watch your investment grow as engagement increases.
                </p>
              </div>
            }
            effect={<StyleElement />}
          />
          <Card
            title="Time Your Markets"
            subtitle={
              <div>
                <p className="leading-tight">
                  Buy low when posts are new, sell high when they trend.
                </p>
                <p className="mt-4 leading-tight">
                  Track engagement metrics and market sentiment in real-time.
                </p>
              </div>
            }
            effect={<ControlElement />}
          />
        </div>
        <div className="flex">
          <Card
            title="Discover Viral Posts"
            subtitle={
              <div>
                <div>Find trending content before it peaks.</div>
                <div className="mt-4 leading-tight">
                  Our algorithm helps identify posts with viral potential early.
                </div>
              </div>
            }
            effect={<AgentElement />}
          />
          <Card
            title="Invest in Social Value"
            subtitle={
              <div>
                <p className="leading-tight">
                  Buy tokens of posts you believe will go viral.
                </p>
                <p className="mt-4 leading-tight">
                  Watch your investment grow as engagement increases.
                </p>
              </div>
            }
            effect={<StyleElement />}
          />
          <Card
            title="Time Your Markets"
            subtitle={
              <div>
                <p className="leading-tight">
                  Buy low when posts are new, sell high when they trend.
                </p>
                <p className="mt-4 leading-tight">
                  Track engagement metrics and market sentiment in real-time.
                </p>
              </div>
            }
            effect={<ControlElement />}
          />
        </div>
      </div>
    </div>
  );
};

export default InfiniteScroll;