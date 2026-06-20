"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import {
  runThemeTransition,
  type TransitionOrigin,
} from "@/lib/view-transition";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme, origin?: TransitionOrigin) => void;
  toggleTheme: (origin?: TransitionOrigin) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyThemeClass(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const preferred = getPreferredTheme();
    setThemeState(preferred);
    applyThemeClass(preferred);
  }, []);

  const applyThemeChange = useCallback((next: Theme, origin?: TransitionOrigin) => {
    runThemeTransition(() => {
      flushSync(() => {
        setThemeState(next);
      });
      localStorage.setItem("theme", next);
      applyThemeClass(next);
    }, origin);
  }, []);

  const setTheme = useCallback(
    (next: Theme, origin?: TransitionOrigin) => {
      applyThemeChange(next, origin);
    },
    [applyThemeChange],
  );

  const toggleTheme = useCallback(
    (origin?: TransitionOrigin) => {
      applyThemeChange(theme === "light" ? "dark" : "light", origin);
    },
    [applyThemeChange, theme],
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
