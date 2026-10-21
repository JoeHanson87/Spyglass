"use client";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({ children, delay = 0, y = 32, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className, gap = 0.1 }: { children: ReactNode[]; className?: string; gap?: number }) {
  return (
    <div className={className}>
      {children.map((c, i) => (
        <Reveal key={i} delay={Math.min(i, 6) * gap}>{c}</Reveal>
      ))}
    </div>
  );
}
