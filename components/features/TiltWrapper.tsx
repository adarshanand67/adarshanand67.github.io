"use client";

import React, { useRef, useCallback } from "react";

export function TiltWrapper({
  children,
  intensity = 15,
  className,
}: {
  children: React.ReactNode;
  intensity?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -intensity * 2;
      const ry = ((e.clientX - rect.left) / rect.width - 0.5) * intensity * 2;
      ref.current.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    },
    [intensity],
  );

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "";
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", transition: "transform 0.3s ease" }}
      className={className}
    >
      <div style={{ transform: "translateZ(20px)" }}>{children}</div>
    </div>
  );
}
