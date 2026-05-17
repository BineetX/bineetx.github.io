import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

const ThemeContext = createContext(null);
const modes = ["dark", "light", "terminal"];

function getInitialMode() {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem("bineet-theme-mode");
  return modes.includes(stored) ? stored : "dark";
}

export function ThemeProvider({ children }) {
  const [mode, setModeState] = useState(getInitialMode);
  const [transition, setTransition] = useState(null);
  const transitionTimer = useRef(null);

  const setMode = (nextMode) => {
    if (!modes.includes(nextMode)) return;
    if (nextMode === mode) return;
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setModeState(nextMode);
      return;
    }
    window.clearTimeout(transitionTimer.current);
    setTransition({ from: mode, to: nextMode });
    transitionTimer.current = window.setTimeout(() => {
      setModeState(nextMode);
      transitionTimer.current = window.setTimeout(() => setTransition(null), 620);
    }, 360);
  };

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    document.documentElement.classList.toggle("light", mode === "light");
    document.documentElement.classList.toggle("dark", mode !== "light");
    window.localStorage.setItem("bineet-theme-mode", mode);
  }, [mode]);

  useEffect(() => () => window.clearTimeout(transitionTimer.current), []);

  const value = useMemo(() => ({ mode, setMode, modes, transition }), [mode, transition]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeMode() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeMode must be used inside ThemeProvider");
  }
  return context;
}
