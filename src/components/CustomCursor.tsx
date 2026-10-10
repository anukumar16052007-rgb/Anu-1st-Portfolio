import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hoveredState, setHoveredState] = useState<'default' | 'interactive' | 'card'>('default');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isFinePointer || prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) setVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('a, button, [role="button"], input, textarea, select')) {
        setHoveredState('interactive');
      } else if (target.closest('[data-cursor-card="true"]')) {
        setHoveredState('card');
      } else {
        setHoveredState('default');
      }
    };

    const onMouseLeave = () => {
      setVisible(false);
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [visible]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-200 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Central Orange Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1.5 -mt-1.5 h-3 w-3 rounded-full bg-[#F97316] shadow-[0_0_12px_#F97316] will-change-transform"
      />
      {/* Trailing Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border transition-[width,height,margin,border-color,background-color] duration-150 will-change-transform ${
          hoveredState === 'interactive'
            ? '-ml-6 -mt-6 h-12 w-12 border-[#FB923C] bg-[#F97316]/15 shadow-[0_0_24px_rgba(249,115,22,0.35)]'
            : hoveredState === 'card'
              ? '-ml-5 -mt-5 h-10 w-10 border-[#F97316]/70 bg-[#F97316]/5'
              : '-ml-4 -mt-4 h-8 w-8 border-[#F97316]/45 bg-transparent'
        }`}
      />
    </div>
  );
};
