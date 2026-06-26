"use client";

import { useRef } from "react";
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

  const label = theme === "dark" ? "light" : "dark";
  const icon = theme === "dark" ? "☼" : "☾";

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleClick}
      aria-label={`Switch to ${label} mode`}
      className="font-mono text-[11px] tracking-[0.05em] text-toggle transition-colors duration-150 ease-in-out hover:text-muted"
    >
      {icon}&nbsp;&nbsp;{label}
    </button>
  );
}
