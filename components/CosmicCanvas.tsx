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

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.8,
      alpha: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 0.02 + 0.005,
    }));

    let earthRotation = 0;
    let wobbleAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Stars
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

      // Larger Central Earth
      const centerX = width * 0.58; // Slightly off-center to balance left UI
      const centerY = height * 0.48;
      const earthRadius = 190; // ENLARGED central sphere

      earthRotation += 0.004;
      wobbleAngle += 0.006;
      const tilt = Math.sin(wobbleAngle) * 0.15 + 0.41;

      ctx.save();
      ctx.translate(centerX, centerY);

      // --- Draw Yuga Cycle Schematic Ring (From Image) ---
      const ringRadius = earthRadius * 1.55;
      ctx.strokeStyle = "rgba(251, 191, 36, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Cycle Labels around Ring
      ctx.font = "11px monospace";
      ctx.fillStyle = "#fde68a";
      ctx.textAlign = "center";
      
      ctx.fillText("Satya Yuga", 0, -ringRadius - 12);
      ctx.fillText("Kali Yuga (Current)", 0, ringRadius + 22);
      
      ctx.textAlign = "right";
      ctx.fillText("Treta Yuga (Ascending)", -ringRadius - 10, -ringRadius * 0.4);
      ctx.fillText("Dwapara Yuga", -ringRadius - 10, ringRadius * 0.4);

      ctx.textAlign = "left";
      ctx.fillText("Treta Yuga (Descending)", ringRadius + 10, -ringRadius * 0.4);
      ctx.fillText("Dwapara Yuga", ringRadius + 10, ringRadius * 0.4);

      // --- Rotating / Wobbling Earth Core ---
      ctx.rotate(tilt);

      const glow = ctx.createRadialGradient(0, 0, earthRadius * 0.8, 0, 0, earthRadius * 1.25);
      glow.addColorStop(0, "rgba(56, 189, 248, 0.25)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 0, earthRadius * 1.3, 0, Math.PI * 2);
      ctx.fill();

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
      ctx.strokeStyle = "rgba(56, 189, 248, 0.5)";
      ctx.lineWidth = 1.5;
      ctx.fill();
      ctx.stroke();

      // Lat/Long Wireframe
      ctx.strokeStyle = "rgba(125, 211, 252, 0.25)";
      ctx.lineWidth = 1;
      for (let i = -4; i <= 4; i++) {
        ctx.beginPath();
        const y = (i * earthRadius) / 5;
        const r = Math.sqrt(Math.max(0, earthRadius * earthRadius - y * y));
        ctx.ellipse(0, y, r, r * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (let i = 0; i < 8; i++) {
        const angle = earthRotation + (i * Math.PI) / 8;
        const xRadius = Math.cos(angle) * earthRadius;
        ctx.beginPath();
        ctx.ellipse(0, 0, Math.abs(xRadius), earthRadius, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Wobble Axis Line
      ctx.strokeStyle = "rgba(251, 191, 36, 0.7)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -earthRadius * 1.35);
      ctx.lineTo(0, earthRadius * 1.35);
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

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none touch-none z-0 bg-slate-950" />;
}
