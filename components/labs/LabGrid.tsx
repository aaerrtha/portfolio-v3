"use client";

import { motion, type Variants } from "framer-motion";
import type { LabExperiment } from "@/lib/types";
import { LabCard } from "./LabCard";

interface LabGridProps {
  experiments: LabExperiment[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export function LabGrid({ experiments }: LabGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3"
    >
      {experiments.map((experiment) => (
        <motion.div key={experiment.slug} variants={itemVariants}>
          <LabCard experiment={experiment} />
        </motion.div>
      ))}
    </motion.div>
  );
}
