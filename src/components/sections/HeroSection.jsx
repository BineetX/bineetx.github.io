import { motion } from "framer-motion";
import { FiArrowDown, FiDownload, FiLayers } from "react-icons/fi";
import { siteContent } from "../../content/siteContent";
import { scrollToSection } from "../../utils/navigation";
import BioGraphCanvas from "../visuals/BioGraphCanvas";

export default function HeroSection() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-content">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="eyebrow">living computational biology interface</p>
          <h1>{siteContent.name}</h1>
          <p className="hero-title">{siteContent.title}</p>
          <p className="hero-statement">{siteContent.statement}</p>
          <div className="hero-actions">
            <button type="button" className="primary-button" onClick={() => scrollToSection("research")}>
              <FiArrowDown />
              Explore Research
            </button>
            <button type="button" className="secondary-button" onClick={() => scrollToSection("systems")}>
              <FiLayers />
              View Systems
            </button>
            <a className="secondary-button" href={siteContent.links.cv} target="_blank" rel="noopener noreferrer">
              <FiDownload />
              Download CV
            </a>
          </div>
          <div className="metadata-chips">
            {siteContent.metadata.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          <BioGraphCanvas />
        </motion.div>
      </div>
      <div className="identity-strip" aria-label="Identity metadata">
        {siteContent.identityStrip.map((item) => (
          <div key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
