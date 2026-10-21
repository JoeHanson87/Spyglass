"use client";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const item = (i: number) => ({
  initial: { opacity: 0, y: 36 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay: 0.25 + i * 0.15, ease: [0.22, 1, 0.36, 1] as const },
});

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg"><Image src="/images/dining.png" alt="" fill priority sizes="100vw" /></div>
      <div className="hero-inner">
        <motion.p className="eyebrow" {...item(0)}>Good Food &middot; Great Drinks &middot; Warm Welcome</motion.p>
        <motion.h1 {...item(1)}><span className="pre">Welcome to</span>Spyglass <i>&amp;</i> Kettle</motion.h1>
        <motion.p className="sub" {...item(2)}>Pub &amp; Restaurant</motion.p>
        <motion.div className="cta" {...item(3)}>
          <Link className="btn btn-gold" href="/menu">Explore Our Menu</Link>
          <Link className="btn btn-outline" href="/book">Book a Table</Link>
        </motion.div>
      </div>
      <div className="scroll-cue" aria-hidden />
    </section>
  );
}
