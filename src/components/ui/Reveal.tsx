"use client";

import { useScrollAnimation } from "@/lib/useScrollAnimation";
import { ReactNode, CSSProperties } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "fade";
  className?: string;
  style?: CSSProperties;
};

export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  style,
}: RevealProps) {
  const { ref, visible } = useScrollAnimation();

  const initialTransform =
    direction === "up"
      ? "translateY(40px)"
      : direction === "left"
      ? "translateX(40px)"
      : "none";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0,0)" : initialTransform,
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
