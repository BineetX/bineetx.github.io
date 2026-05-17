import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { siteContent } from "../../content/siteContent";

function useBootVisibility() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.sessionStorage.getItem("bineet-loader-seen") !== "true";
  });

  useEffect(() => {
    if (!visible) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => {
      window.sessionStorage.setItem("bineet-loader-seen", "true");
      setVisible(false);
    }, reduceMotion ? 350 : 1550);
    return () => window.clearTimeout(timer);
  }, [visible]);

  const dismiss = () => {
    window.sessionStorage.setItem("bineet-loader-seen", "true");
    setVisible(false);
  };

  return { visible, dismiss };
}

export default function WelcomeLoader({ mode }) {
  const { visible, dismiss } = useBootVisibility();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`welcome-loader welcome-loader-${mode}`}
          role="status"
          aria-label="Opening Bineet Kumar Mohanta portfolio"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.42, ease: "easeInOut" }}
        >
          <button type="button" className="loader-skip" onClick={dismiss}>
            Enter
          </button>
          <motion.div
            className="loader-identity"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <motion.div
              className="loader-monogram"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.42, ease: "easeOut" }}
              aria-hidden="true"
            >
              BK
            </motion.div>
            <div className="loader-name">
              <span>BINEET.DEV</span>
              <strong>{siteContent.name}</strong>
              <small>{siteContent.role}</small>
            </div>
            <motion.div
              className="loader-lenses"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.62, duration: 0.35 }}
            >
              <span>Bioinformatician</span>
              <span>Researcher</span>
              <span>Developer</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
