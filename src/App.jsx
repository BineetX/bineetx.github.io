import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import WelcomeLoader from "./components/loader/WelcomeLoader";
import PortfolioLanding from "./components/landing/PortfolioLanding";
import CommandPalette from "./components/navigation/CommandPalette";
import TerminalWorkspace from "./components/terminal/TerminalWorkspace";
import ThemeMorphOverlay from "./components/transitions/ThemeMorphOverlay";
import { siteContent } from "./content/siteContent";
import { ThemeProvider, useThemeMode } from "./hooks/useThemeMode";
import DarkModeExperience from "./modes/dark/DarkModeExperience";
import LightModeExperience from "./modes/light/LightModeExperience";

function Portfolio() {
  const { mode, setMode } = useThemeMode();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  const enterPortfolio = () => {
    window.sessionStorage.setItem("bineet-loader-seen", "true");
    setHasEntered(true);
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      const key = event.key.toLowerCase();
      if ((event.ctrlKey || event.metaKey) && key === "k") {
        event.preventDefault();
        setPaletteOpen(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onPortfolioExit = () => {
      setPaletteOpen(false);
      setHasEntered(false);
    };

    window.addEventListener("portfolio:exit", onPortfolioExit);
    return () => window.removeEventListener("portfolio:exit", onPortfolioExit);
  }, []);

  const commandActions = useMemo(
    () => ({
      scrollTo: (id) => {
        if (!hasEntered) {
          enterPortfolio();
          window.setTimeout(() => window.dispatchEvent(new CustomEvent("portfolio:navigate", { detail: id })), 120);
          return;
        }
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        if (mode === "terminal") {
          setMode("dark");
          window.setTimeout(() => window.dispatchEvent(new CustomEvent("portfolio:navigate", { detail: id })), 560);
          return;
        }
        window.dispatchEvent(new CustomEvent("portfolio:navigate", { detail: id }));
      },
      setMode,
      downloadCv: () => window.open(siteContent.links.cv, "_blank", "noopener,noreferrer"),
      openUrl: (url) => window.open(url, "_blank", "noopener,noreferrer"),
    }),
    [hasEntered, mode, setMode],
  );

  if (!hasEntered) {
    return (
      <div className="min-h-screen bg-bg text-text transition-colors duration-500">
        <PortfolioLanding onEnter={enterPortfolio} onOpenPalette={() => setPaletteOpen(true)} />
        <CommandPalette
          isOpen={paletteOpen}
          onClose={() => setPaletteOpen(false)}
          actions={commandActions}
        />
        <ThemeMorphOverlay />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-text transition-colors duration-500">
      <AnimatePresence mode="wait">
        {mode === "terminal" ? (
          <motion.div
            key="terminal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <TerminalWorkspace onOpenPalette={() => setPaletteOpen(true)} />
          </motion.div>
        ) : mode === "light" ? (
          <motion.div
            key="light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <LightModeExperience onOpenPalette={() => setPaletteOpen(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="dark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <DarkModeExperience onOpenPalette={() => setPaletteOpen(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        actions={commandActions}
      />
      <ThemeMorphOverlay />
      <WelcomeLoader mode={mode} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Portfolio />
    </ThemeProvider>
  );
}
