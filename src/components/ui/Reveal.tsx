"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "ul" | "ol" | "li";
};

// Fades content up once as it enters the viewport. Opacity-only when reduced motion is on.
export function Reveal({ children, className, as = "div" }: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={fadeUp}
    >
      {children}
    </Tag>
  );
}

// Staggers direct RevealItem children.
export function RevealGroup({ children, className, as = "div" }: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={stagger(0.1)}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({ children, className, as = "div" }: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={fadeUp}>
      {children}
    </Tag>
  );
}
