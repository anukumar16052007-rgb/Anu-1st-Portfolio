import React, { useRef, useState } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  onClick?: () => void;
  as?: 'div' | 'article';
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  intensity = 6,
  onClick,
  as: Component = 'div',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -intensity;
    const rotateY = ((x - centerX) / centerX) * intensity;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`
    );
    setGlowPosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlowPosition((prev) => ({ ...prev, active: false }));
  };

  return (
    <Component
      ref={cardRef as any}
      data-cursor-card="true"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: glowPosition.active
          ? 'transform 120ms cubic-bezier(0.16, 1, 0.3, 1)'
          : 'transform 350ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`relative overflow-hidden rounded-2xl border border-[#292929] bg-[#101010] hover:border-[#F97316]/60 ${className}`}
    >
      {/* Orange spotlight reflection layer */}
      <div
        aria-hidden="true"
        style={{
          background: `radial-gradient(420px circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(249, 115, 22, 0.11), transparent 70%)`,
          opacity: glowPosition.active ? 1 : 0,
        }}
        className="pointer-events-none absolute inset-0 transition-opacity duration-200"
      />
      <div className="relative z-10 h-full">{children}</div>
    </Component>
  );
};
