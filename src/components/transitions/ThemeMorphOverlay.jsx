import { AnimatePresence, motion } from "framer-motion";
import { useThemeMode } from "../../hooks/useThemeMode";

const labels = {
  dark: "Bioinformatician",
  light: "Researcher",
  terminal: "Developer",
};

export default function ThemeMorphOverlay() {
  const { transition } = useThemeMode();

  return (
    <AnimatePresence>
      {transition && (
        <motion.div
          className={`theme-morph theme-morph-${transition.from}-${transition.to}`}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
        >
          <motion.div
            className="theme-morph-line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 1.08, opacity: 0 }}
            transition={{ duration: 0.46, ease: "easeInOut" }}
          />
          <motion.div
            className="theme-morph-label"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            <span>{labels[transition.from]}</span>
            <i />
            <span>{labels[transition.to]}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
