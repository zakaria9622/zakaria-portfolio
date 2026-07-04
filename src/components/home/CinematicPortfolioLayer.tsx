"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function CinematicPortfolioLayer() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.5,
  });

  return (
    <>
      <div
        className="portfolio-ambient-texture"
        data-reduced-motion={shouldReduceMotion ? "true" : "false"}
        aria-hidden="true"
      />
      <div className="portfolio-scroll-progress" aria-hidden="true">
        <motion.div
          className="portfolio-scroll-progress-indicator"
          style={{
            scaleY: shouldReduceMotion ? scrollYProgress : smoothProgress,
            transformOrigin: "top",
          }}
        />
      </div>
    </>
  );
}
