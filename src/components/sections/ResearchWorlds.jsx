import { motion } from "framer-motion";
import { siteContent } from "../../content/siteContent";
import Section from "../ui/Section";

export default function ResearchWorlds() {
  return (
    <Section
      id="worlds"
      eyebrow="Research"
      title="Publications and research outputs."
      intro="Entries are sourced from the portfolio information file."
    >
      <div className="world-grid">
        {siteContent.publications.map((item, index) => (
          <motion.article
            className="world-card"
            key={item.id}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <div className="card-index">{String(index + 1).padStart(2, "0")}</div>
            <h3>{item.title}</h3>
            <p>{item.journal} / {item.year}</p>
            <div className="tag-row">
              {item.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
