import { FiArrowUpRight } from "react-icons/fi";
import { siteContent } from "../../content/siteContent";
import Section from "../ui/Section";

export default function SystemsSection() {
  return (
    <Section
      id="systems"
      eyebrow="Selected Systems"
      title="Case-study directions for scientific software and biological intelligence."
      intro="Concise, editable snapshots of technical focus areas without fabricated metrics."
    >
      <div className="systems-grid">
        {siteContent.systems.map((system) => (
          <article className="system-card" key={system.title}>
            <div className="system-visual" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <p className="eyebrow">{system.eyebrow}</p>
            <h3>{system.title}</h3>
            <p>{system.description}</p>
            <div className="breakdown">
              <div>
                <strong>Problem</strong>
                <span>{system.breakdown.problem}</span>
              </div>
              <div>
                <strong>Idea</strong>
                <span>{system.breakdown.idea}</span>
              </div>
              <div>
                <strong>System</strong>
                <span>{system.breakdown.system}</span>
              </div>
            </div>
            <div className="tag-row">
              {system.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <button type="button" className="text-link" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              Explore technical focus <FiArrowUpRight />
            </button>
          </article>
        ))}
      </div>
    </Section>
  );
}
