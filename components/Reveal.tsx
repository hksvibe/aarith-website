"use client";

import * as React from "react";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "span" | "p" | "h1" | "h2" | "h3";
}

/**
 * Wraps children in a viewport-triggered fade-up. Honors prefers-reduced-motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
  as = "div"
}: RevealProps) {
  const reduced = useReducedMotion();
  const Comp = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduced ? 0 : 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay
      }
    }
  };

  return (
    <Comp
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </Comp>
  );
}
