"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { LabExperiment } from "@/lib/types";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image";
import { PlaceholderBlock } from "@/components/ui/PlaceholderBlock";

interface LabCardProps {
  experiment: LabExperiment;
}

export function LabCard({ experiment }: LabCardProps) {
  const badgePosition = experiment.badgePosition ?? "right";

  return (
    <motion.article
      whileHover={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="text-left"
    >
      <Link href={`/labs/${experiment.slug}`} className="block">
        <div className="relative mb-4">
          <PlaceholderBlock
            aspect="video"
            className="rounded-2xl"
            label={experiment.coverAlt ?? experiment.title}
          >
            {experiment.coverImage && (
              <Image
                src={experiment.coverImage}
                alt={experiment.coverAlt ?? experiment.title}
                width={800}
                height={600}
                className="h-full w-full object-cover"
                placeholder="blur"
                blurDataURL={IMAGE_BLUR_DATA_URL}
              />
            )}
          </PlaceholderBlock>

          {experiment.badge && (
            <span
              className={`absolute top-3 rounded-full border border-border bg-background/95 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-sm ${
                badgePosition === "left" ? "left-3" : "right-3"
              }`}
            >
              {experiment.badge}
            </span>
          )}
        </div>

        <div className="flex items-start gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-card text-sm font-semibold text-foreground"
            style={
              experiment.iconBg ? { backgroundColor: experiment.iconBg } : undefined
            }
          >
            {experiment.iconImage ? (
              <Image
                src={experiment.iconImage}
                alt={experiment.iconAlt ?? `${experiment.title} icon`}
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            ) : (
              <span aria-hidden="true">{experiment.title.charAt(0)}</span>
            )}
          </div>

          <div className="min-w-0 pt-0.5">
            <h2 className="text-base font-semibold leading-tight text-foreground">
              {experiment.title}
            </h2>
            <p className="mt-1 truncate text-sm text-muted">{experiment.description}</p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
