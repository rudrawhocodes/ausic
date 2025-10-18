"use client";

import { useRef, useEffect } from "react";

type Particle = {
  x: number;
  y: number;
  z: number; // depth for parallax
  vx: number;
  vy: number;
  size: number;
  jitter: number;
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
          jitter: Math.random() * 0.5,
        });
      }
    };

    build();

  let mouseX = width / 2;
  let mouseY = height / 2;
  let lastMouseX = mouseX;
  let lastMouseY = mouseY;
  let lastMoveAt = performance.now();

    const onMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      const now = performance.now();
      if (Math.hypot(mouseX - lastMouseX, mouseY - lastMouseY) > 1) {
        lastMoveAt = now;
      }
      lastMouseX = mouseX;
      lastMouseY = mouseY;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", build);

    let t = 0;
    let raf = 0;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      t += 0.02;

      // fade background for subtle trails
      ctx.fillStyle = "rgba(4,6,10,0.86)";
      ctx.fillRect(0, 0, width, height);

      const now = performance.now();
      const mouseIdle = now - lastMoveAt > 700; // ms of inactivity

      // move particles with gentle spread + oscillation
      for (const p of particles) {
        // subtle oscillation to give life
        p.vx += Math.cos(t * (0.5 + p.z * 1.2) + p.jitter) * 0.02 * (0.5 + p.z);
        p.vy += Math.sin(t * (0.5 + p.z * 1.2) + p.jitter) * 0.02 * (0.5 + p.z);

        // gentle radial spread from center
        const cx = width / 2;
        const cy = height / 2;
        const dxC = p.x - cx;
        const dyC = p.y - cy;
        const distC = Math.sqrt(dxC * dxC + dyC * dyC) + 0.001;
        // outward push that depends on depth
        p.vx += (dxC / distC) * (0.0005 + p.z * 0.001);
        p.vy += (dyC / distC) * (0.0005 + p.z * 0.001);

        // mouse interaction: when moving, attract gently; when idle, increase local jitter (mix-up)
        const mdx = mouseX - p.x;
        const mdy = mouseY - p.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (!mouseIdle) {
          // attract when mouse active
          const strength = (0.0009 + p.z * 0.0018) * Math.max(0, 1 - mdist / 400);
          p.vx += mdx * strength;
          p.vy += mdy * strength;
        } else {
          // mouse idle: increase jitter near mouse to 'mix up'
          if (mdist < 220) {
            p.vx += (Math.random() - 0.5) * (0.6 + (220 - mdist) / 120);
            p.vy += (Math.random() - 0.5) * (0.6 + (220 - mdist) / 120);
          }
        }

        // damping
        p.vx *= 0.975;
        p.vy *= 0.975;

        // integrate
        p.x += p.vx;
        p.y += p.vy;

        // wrap
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
      }

      // draw connections to a few nearest neighbors for each particle
      const maxNeighbors = 3;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        // find nearest neighbors (simple O(n*k) selection)
        const nearest: { idx: number; dist: number }[] = [];
        for (let j = 0; j < particles.length; j++) {
          if (i === j) continue;
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (nearest.length < maxNeighbors) {
            nearest.push({ idx: j, dist: d2 });
            if (nearest.length === maxNeighbors) nearest.sort((u, v) => u.dist - v.dist);
          } else if (d2 < nearest[nearest.length - 1].dist) {
            nearest[nearest.length - 1] = { idx: j, dist: d2 };
            nearest.sort((u, v) => u.dist - v.dist);
          }
        }

        for (const n of nearest) {
          const b = particles[n.idx];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxD = 180;
          if (dist < maxD) {
            // pulse alpha with time for a living effect
            const pulse = 0.5 + 0.5 * Math.sin(t * 2 + (a.jitter + b.jitter) * 5);
            const baseAlpha = (1 - dist / maxD) * 0.22 * (1 - Math.abs(a.z - b.z));
            const alpha = Math.max(0, baseAlpha * pulse);
            ctx.strokeStyle = `rgba(125,249,255,${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.7 * (1 - (a.z + b.z) / 2);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // draw particles on top
      for (const p of particles) {
        const glow = 0.14 + (1 - p.z) * 0.6;
        const size = p.size * (1 + 0.4 * Math.sin(t * 3 + p.jitter));
        ctx.fillStyle = `rgba(125,249,255,${glow.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
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
