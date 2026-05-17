import { motion } from "framer-motion";
import { FiActivity, FiBookOpen, FiCode, FiDownload, FiMail, FiUser } from "react-icons/fi";
import { siteContent } from "../../content/siteContent";
import DarkShowcaseCanvas from "./DarkShowcaseCanvas";

const icons = {
  about: FiUser,
  skills: FiCode,
  education: FiBookOpen,
  research: FiActivity,
  contact: FiMail,
};

export default function PortfolioSectionVisual({ workspace }) {
  const Icon = icons[workspace.id] || FiUser;
  const metrics = {
    about: ["Ph.D. Scholar", "ILS Bhubaneswar", "Bioinformatics"],
    skills: siteContent.technologies.slice(0, 4).map((group) => group.category),
    education: siteContent.timeline.slice(0, 4).map((item) => item.period),
    research: siteContent.publications.slice(0, 4).map((item) => String(item.year)),
    contact: ["Email", "GitHub", "Scholar", "CV"],
  }[workspace.id];

  return (
    <div className={`portfolio-section-visual visual-${workspace.id}`}>
      <DarkShowcaseCanvas workspace={workspace} />
      <motion.div
        className="visual-core"
        whileHover={{ rotateX: 8, rotateY: -10, scale: 1.04 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      >
        <Icon aria-hidden="true" />
        <span>{workspace.label}</span>
      </motion.div>
      <div className="visual-ring" aria-hidden="true" />
      <div className="visual-lines">
        {metrics.map((item, index) => (
          <motion.div
            key={item}
            style={{ "--i": index }}
            whileHover={{ y: -5, rotateY: index % 2 ? -5 : 5 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item}</strong>
          </motion.div>
        ))}
      </div>
      {workspace.id === "contact" && (
        <a className="visual-cv-link" href={siteContent.links.cv} target="_blank" rel="noopener noreferrer">
          <FiDownload />
          Download CV
        </a>
      )}
    </div>
  );
}
