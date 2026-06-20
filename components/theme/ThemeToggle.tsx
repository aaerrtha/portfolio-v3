"use client";

import { useRef } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    const origin = rect
      ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      : undefined;

    toggleTheme(origin);
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleClick}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className="inline-flex items-center justify-center text-muted transition-colors hover:text-foreground"
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="inline-flex"
      >
        {theme === "light" ? (
          <MoonIcon className="h-[22px] w-[22px]" aria-hidden="true" />
        ) : (
          <SunIcon className="h-[22px] w-[22px]" aria-hidden="true" />
        )}
      </motion.span>
    </button>
  );
}
