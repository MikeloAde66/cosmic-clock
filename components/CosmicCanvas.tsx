"use client";

import React, { useEffect, useRef } from "react";

interface CanvasProps {
  kpIndex: number;
}

export default function CosmicCanvas({ kpIndex }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Generate pronounced, bright stars
    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.8, // Bigger, clearer stars
      alpha: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 0.02 + 0.005,
    }));

    let earthRotation = 0;
    let wobbleAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Pronounced Background Stars
      stars.forEach((star) => {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0.2) star.speed = -star.speed;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.alpha)})`;
        ctx.shadowBlur = star.radius > 1.8 ? 8 : 0;
        ctx.shadowColor = "#fef08a";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Render Rotating & Wobbling Earth at Center
      const centerX = width / 2;
      const centerY = height / 2;
      const earthRadius = 140;

      earthRotation += 0.005; // Earth spin
      wobbleAngle += 0.008; // Precession wobble simulation

      const tilt = Math.sin(wobbleAngle) * 0.15 + 0.41; // ~23.5 degree axial wobble dynamic

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(tilt);

      // Earth Glow / Atmosphere
      const glow = ctx.createRadialGradient(0, 0, earthRadius * 0.8, 0, 0, earthRadius * 1.2);
      glow.addColorStop(0, "rgba(56, 189, 248, 0.2)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 0, earthRadius * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // Earth Sphere Base
      const sphereGrad = ctx.createRadialGradient(
        -earthRadius * 0.3,
        -earthRadius * 0.3,
        earthRadius * 0.1,
        0,
        0,
        earthRadius
      );
      sphereGrad.addColorStop(0, "#1e3a8a");
      sphereGrad.addColorStop(0.6, "#0f172a");
      sphereGrad.addColorStop(1, "#020617");

      ctx.beginPath();
      ctx.arc(0, 0, earthRadius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.fill();
      ctx.stroke();

      // Latitude Lines (Axial grid)
      ctx.strokeStyle = "rgba(125, 211, 252, 0.25)";
      ctx.lineWidth = 1;
      for (let i = -3; i <= 3; i++) {
        ctx.beginPath();
        const y = (i * earthRadius) / 4;
        const r = Math.sqrt(earthRadius * earthRadius - y * y);
        ctx.ellipse(0, y, r, r * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Longitude Lines (Spinning Wireframe)
      for (let i = 0; i < 6; i++) {
        const angle = earthRotation + (i * Math.PI) / 6;
        const xRadius = Math.cos(angle) * earthRadius;
        ctx.beginPath();
        ctx.ellipse(0, 0, Math.abs(xRadius), earthRadius, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Axis Line showing the Wobble Tilt
      ctx.strokeStyle = "rgba(251, 191, 36, 0.6)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -earthRadius * 1.4);
      ctx.lineTo(0, earthRadius * 1.4);
      ctx.stroke();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [kpIndex]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 bg-slate-950" />;
}
