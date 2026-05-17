import { siteContent } from "../../content/siteContent";
import Section from "../ui/Section";

export default function PhilosophySection() {
  return (
    <Section id="research" eyebrow="Research Philosophy" title="From molecular evidence to executable meaning.">
      <div className="philosophy-layout">
        <div className="philosophy-lines">
          {siteContent.philosophy.map((line, index) => (
            <p key={line} className={index === 1 ? "accent-line" : ""}>
              {line}
            </p>
          ))}
        </div>
        <div className="diagram-card" aria-hidden="true">
          <span>molecule</span>
          <i />
          <span>model</span>
          <i />
          <span>interface</span>
          <i />
          <span>interpretation</span>
        </div>
      </div>
    </Section>
  );
}
