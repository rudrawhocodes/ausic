"use client";

import { useRef, useEffect } from "react";

type Particle = {
  x: number;
  y: number;
  z: number; // depth for parallax
  vx: number;
  vy: number;
  size: number;
};

const ThreeDBackground = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "-11";
    mount.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPR = Math.max(1, window.devicePixelRatio || 1);
    let width = 0;
    let height = 0;

    let particles: Particle[] = [];

    const build = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      canvas.width = Math.floor(width * DPR);
      canvas.height = Math.floor(height * DPR);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      const count = Math.max(40, Math.floor((width * height) / 30000));
      particles = [];
      for (let i = 0; i < count; i++) {
        const depth = Math.random();
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: depth,
          vx: (Math.random() - 0.5) * (0.2 + depth * 0.8),
          vy: (Math.random() - 0.5) * (0.2 + depth * 0.8),
          size: 1 + depth * 2.5,
        });
      }
    };

    build();

    let mouseX = width / 2;
    let mouseY = height / 2;

    const onMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", build);

    let t = 0;
    let raf = 0;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      t += 0.01;

      // fade background slightly for trailing
      ctx.fillStyle = "rgba(4,6,10,0.85)";
      ctx.fillRect(0, 0, width, height);

      // move particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // parallax attraction to mouse: closer particles move faster
        const dx = (mouseX - p.x) * (0.0008 + p.z * 0.0025);
        const dy = (mouseY - p.y) * (0.0008 + p.z * 0.0025);
        p.vx += dx;
        p.vy += dy;

        // damping
        p.vx *= 0.98;
        p.vy *= 0.98;

        // wrap
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
      }

      // draw connections
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.14 * (1 - Math.abs(a.z - b.z));
            ctx.strokeStyle = `rgba(125,249,255,${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.8 * (1 - (a.z + b.z) / 2);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // draw particles
      for (const p of particles) {
        const glow = 0.12 + (1 - p.z) * 0.6;
        ctx.fillStyle = `rgba(125,249,255,${glow.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", build);
      if (canvas && canvas.parentNode === mount) mount.removeChild(canvas);
    };
  }, []);

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default ThreeDBackground;
