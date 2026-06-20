"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

type ThemeOption = "light" | "dark";

const options: { value: ThemeOption; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

export function ThemeInspector() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.aside
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.15 }}
      aria-label="Theme inspector"
      className="fixed bottom-6 right-6 z-50 w-[min(calc(100vw-3rem),17rem)]"
    >
      <div className="rounded-2xl border border-border bg-card p-4 shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-muted">
          Appearance
        </p>

        <div
          role="radiogroup"
          aria-label="Color theme"
          className="flex gap-1 rounded-xl border border-border bg-background p-1"
        >
          {options.map((option) => {
            const isActive = theme === option.value;

            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => setTheme(option.value)}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-[background-color,color,box-shadow] duration-300 ease-in-out ${
                  isActive
                    ? "bg-metric text-metric-foreground shadow-sm"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <p className="mt-3 text-xs leading-relaxed text-muted">
          {theme === "dark"
            ? "Canvas #100D0A with recalibrated contrast."
            : "Clean light canvas with accessible accents."}
        </p>
      </div>
    </motion.aside>
  );
}
