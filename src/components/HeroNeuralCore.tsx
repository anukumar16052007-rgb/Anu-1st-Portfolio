import React, { useEffect, useRef, useState } from 'react';
import { Cpu, Layers, Code2, Database } from 'lucide-react';

interface Node3D {
  x: number;
  y: number;
  z: number;
  label?: string;
}

const CORE_NODES: { label: string; group: string }[] = [
  { label: 'HTML', group: 'Frontend' },
  { label: 'CSS', group: 'Frontend' },
  { label: 'JavaScript', group: 'Programming' },
  { label: 'Python (Basic)', group: 'Programming' },
  { label: 'Django', group: 'Framework' },
  { label: 'SQL', group: 'Programming' },
  { label: 'MySQL', group: 'Database' },
  { label: 'AI & Data Science', group: 'B.Sc. CS' },
];

export const HeroNeuralCore: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeLayer, setActiveLayer] = useState<'architecture' | 'stack' | 'education'>('architecture');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 520);
    let height = (canvas.height = 420);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 420;
    };

    window.addEventListener('resize', handleResize);

    // Create 3D Fibonacci sphere vertices
    const numPoints = 38;
    const radius = Math.min(width, height) * 0.33;
    const nodes: Node3D[] = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < numPoints; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / numPoints);
      nodes.push({
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        label: i < CORE_NODES.length ? CORE_NODES[i].label : undefined,
      });
    }

    let angleX = 0.25;
    let angleY = 0.4;
    let targetVelX = 0.0025;
    let targetVelY = 0.0045;
    let rafId = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const relX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const relY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      if (Math.abs(relX) <= 1.2 && Math.abs(relY) <= 1.2) {
        targetVelY = relX * 0.015;
        targetVelX = -relY * 0.015;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const renderFrame = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Subtle ambient radial glow
      const radial = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius * 1.45);
      radial.addColorStop(0, 'rgba(249, 115, 22, 0.16)');
      radial.addColorStop(0.55, 'rgba(249, 115, 22, 0.04)');
      radial.addColorStop(1, 'rgba(8, 8, 8, 0)');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);

      // Outer technical orbital rings
      ctx.save();
      ctx.translate(cx, cy);
      ctx.strokeStyle = 'rgba(249, 115, 22, 0.16)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.arc(0, 0, radius * 1.18, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(0, 0, radius * 1.34, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      if (!prefersReducedMotion) {
        angleX += targetVelX;
        angleY += targetVelY;
        targetVelX += (0.002 - targetVelX) * 0.04;
        targetVelY += (0.0045 - targetVelY) * 0.04;
      }

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const projected = nodes.map((node) => {
        // Rotate around Y
        const x1 = node.x * cosY - node.z * sinY;
        const z1 = node.z * cosY + node.x * sinY;
        // Rotate around X
        const y2 = node.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + node.y * sinX;

        const fov = 360;
        const scale = fov / (fov + z2 + radius);
        return {
          x: cx + x1 * scale,
          y: cy + y2 * scale,
          z: z2,
          scale,
          label: node.label,
        };
      });

      // Draw connecting edges between nearby 3D points
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dz = nodes[i].z - nodes[j].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < radius * 0.72) {
            const depthAlpha = ((projected[i].z + projected[j].z) / (2 * radius) + 1) / 2;
            ctx.strokeStyle = `rgba(249, 115, 22, ${(0.06 + depthAlpha * 0.28).toFixed(3)})`;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          }
        }
      }

      // Sort back-to-front
      projected.sort((a, b) => b.z - a.z);

      for (const p of projected) {
        const normZ = (p.z + radius) / (2 * radius);
        const alpha = 0.25 + (1 - normZ) * 0.75;
        const dotRadius = Math.max(2, 4.2 * p.scale);

        ctx.beginPath();
        ctx.arc(p.x, p.y, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.label ? `rgba(251, 146, 60, ${alpha})` : `rgba(255, 255, 255, ${alpha * 0.7})`;
        ctx.fill();

        if (p.label && normZ < 0.68) {
          ctx.font = '500 11px "JetBrains Mono", monospace';
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, alpha + 0.15)})`;
          ctx.fillText(p.label, p.x + 8, p.y + 3);
        }
      }

      if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="relative flex h-full flex-col justify-between rounded-2xl border border-[#292929] bg-[#101010] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.85)]">
      {/* Top Identity Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#292929] pb-4">
        <div>
          <p className="text-xs font-medium text-[#A3A3A3]">Developer Identity Portrait</p>
          <p className="font-display text-base font-semibold text-white">ANU K · AI & Full Stack Architecture</p>
        </div>

        {/* Interactive mode selector */}
        <div
          role="tablist"
          aria-label="Identity visual perspective"
          className="flex items-center gap-1 rounded-lg border border-[#292929] bg-[#080808] p-1"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeLayer === 'architecture'}
            onClick={() => setActiveLayer('architecture')}
            className={`whitespace-nowrap shrink-0 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              activeLayer === 'architecture'
                ? 'bg-[#F97316] text-black'
                : 'text-[#A3A3A3] hover:text-white'
            }`}
          >
            3D Core
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeLayer === 'stack'}
            onClick={() => setActiveLayer('stack')}
            className={`whitespace-nowrap shrink-0 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              activeLayer === 'stack'
                ? 'bg-[#F97316] text-black'
                : 'text-[#A3A3A3] hover:text-white'
            }`}
          >
            Core Stack
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeLayer === 'education'}
            onClick={() => setActiveLayer('education')}
            className={`whitespace-nowrap shrink-0 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              activeLayer === 'education'
                ? 'bg-[#F97316] text-black'
                : 'text-[#A3A3A3] hover:text-white'
            }`}
          >
            Academic Focus
          </button>
        </div>
      </div>

      {/* Interactive 3D Canvas + Typographic Portrait Monogram Overlay */}
      <div className="relative my-2 flex min-h-[360px] items-center justify-center overflow-hidden rounded-xl border border-[#292929]/70 bg-[#080808] bg-tech-grid">
        <canvas
          ref={canvasRef}
          aria-label="Interactive 3D neural network representing ANU K's technical skills in Full Stack Development and AI"
          className="h-[380px] w-full cursor-grab active:cursor-grabbing"
        />

        {/* Center Typographic Monogram Core */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[#F97316]/50 bg-[#080808]/90 shadow-[0_0_40px_rgba(249,115,22,0.3)] backdrop-blur-md">
            <span className="font-display text-2xl font-bold tracking-tight text-white">
              AK
            </span>
          </div>
          <span className="mt-2 rounded bg-[#080808]/80 px-2 py-0.5 font-mono-tabular text-[11px] text-[#FB923C]">
            ANU K
          </span>
        </div>
      </div>

      {/* Contextual Lower Panel based on selected tab */}
      <div className="border-t border-[#292929] pt-4">
        {activeLayer === 'architecture' && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-[#292929] bg-[#171717] p-3">
              <div className="flex items-center gap-2 text-xs text-[#A3A3A3]">
                <Cpu className="h-3.5 w-3.5 text-[#F97316]" />
                <span>Specialization</span>
              </div>
              <p className="mt-1 text-sm font-semibold text-white">AI & Data Science</p>
            </div>
            <div className="rounded-xl border border-[#292929] bg-[#171717] p-3">
              <div className="flex items-center gap-2 text-xs text-[#A3A3A3]">
                <Layers className="h-3.5 w-3.5 text-[#F97316]" />
                <span>Internship Role</span>
              </div>
              <p className="mt-1 text-sm font-semibold text-white">Full Stack Intern</p>
            </div>
            <div className="col-span-2 rounded-xl border border-[#292929] bg-[#171717] p-3 sm:col-span-1">
              <div className="flex items-center gap-2 text-xs text-[#A3A3A3]">
                <Code2 className="h-3.5 w-3.5 text-[#F97316]" />
                <span>Leadership</span>
              </div>
              <p className="mt-1 text-sm font-semibold text-white">JCI President</p>
            </div>
          </div>
        )}

        {activeLayer === 'stack' && (
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-[#A3A3A3]">
              <span>Documented Full Stack & Database Technologies</span>
              <Database className="h-3.5 w-3.5 text-[#F97316]" />
            </div>
            <p className="text-sm text-white">
              Python (Basic) · JavaScript · SQL · Django · HTML · CSS · MySQL
            </p>
            <p className="text-xs text-[#A3A3A3]">
              Tools & Software: Visual Studio Code (VS Code) · GitHub · Microsoft Excel · Tally ERP 9
            </p>
          </div>
        )}

        {activeLayer === 'education' && (
          <div className="space-y-1.5 text-xs">
            <p className="text-[#FB923C] font-medium">
              Bachelor of Computer Science (Artificial Intelligence & Data Science)
            </p>
            <p className="text-sm text-white">
              Shree Venkateshwara Arts and Science College, Tiruppur
            </p>
            <p className="font-mono-tabular text-[#A3A3A3]">
              Duration: 2024 – Pursuing · Current Percentage: 69.45%
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
