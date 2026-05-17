import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { FiCommand, FiDownload } from "react-icons/fi";
import { siteContent } from "../../content/siteContent";
import LandingAction3D from "./LandingAction3D";
import LandingPortraitRandomizer from "./LandingPortraitRandomizer";

function useRotatingText(lines) {
  const [lineIndex, setLineIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const activeLine = lines[lineIndex];

  useEffect(() => {
    setVisibleCount(0);
  }, [lineIndex]);

  useEffect(() => {
    if (visibleCount < activeLine.length) {
      const timer = window.setTimeout(() => setVisibleCount((count) => count + 1), 42);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      setLineIndex((index) => (index + 1) % lines.length);
    }, 1450);
    return () => window.clearTimeout(timer);
  }, [activeLine, lines.length, visibleCount]);

  return activeLine.slice(0, visibleCount);
}

export default function PortfolioLanding({ onEnter, onOpenPalette }) {
  const typeLines = useMemo(
    () => [
      "Hii there!!",
      "I am Bineet Kumar Mohanta",
      "Working as a Ph.D. scholar at ILS",
      "I do Bioinformatics",
      "I do Computational Biology",
      "< I love Programming />",
    ],
    [],
  );
  const typedLine = useRotatingText(typeLines);

  return (
    <main className="portfolio-landing" aria-label="Portfolio landing">
      <div className="landing-grid" aria-hidden="true" />
      <header className="landing-topbar">
        <button type="button" className="landing-brand" onClick={onEnter}>
          BINEET.DEV
        </button>
        <div className="landing-actions">
          <button className="icon-button" type="button" onClick={onOpenPalette} aria-label="Open command palette">
            <FiCommand />
          </button>
          <a className="nav-cv" href={siteContent.links.cv} target="_blank" rel="noopener noreferrer">
            <FiDownload />
            <span>CV</span>
          </a>
        </div>
      </header>

      <section className="landing-stage">
        <motion.div
          className="landing-orbit"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <LandingPortraitRandomizer imageUrl="/assets/bineet.png" />
        </motion.div>

        <motion.div
          className="landing-copy"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.52, ease: "easeOut" }}
        >
          <p className="eyebrow">Computational Biology | Research | Development | Mathematical Modelling</p>
          <h1>{siteContent.name}</h1>
          <p className="landing-type" aria-live="polite">
            {typedLine}
            <span>|</span>
          </p>
          <p className="landing-summary">{siteContent.statement}</p>
          <div className="landing-cta-row">
            <LandingAction3D onClick={onEnter} />
          </div>
        </motion.div>
      </section>

      <div className="landing-signal-strip">
        {siteContent.identityStrip.map((item) => (
          <div key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </main>
  );
}
