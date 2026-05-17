import { siteContent } from "../../content/siteContent";
import Section from "../ui/Section";

export default function TechConstellation() {
  return (
    <Section
      id="technology"
      eyebrow="Technology Constellation"
      title="Tools arranged by scientific purpose."
      intro="A living capability matrix for modeling, platforms, workflow infrastructure, and visualization."
    >
      <div className="tech-constellation">
        {siteContent.technologies.map((group) => (
          <article className="tech-cluster" key={group.category}>
            <h3>{group.category}</h3>
            <p>{group.note}</p>
            <div className="tech-items">
              {group.items.map((item) => (
                <span key={item} title={group.note}>
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
