"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

export function Parallax({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <div ref={ref} className="split-media">
      <motion.div style={{ y: reduce ? 0 : y, position: "absolute", inset: "-10% 0" }}>
        <Image src={src} alt={alt} fill sizes="(max-width:960px) 100vw, 50vw" />
      </motion.div>
    </div>
  );
}
