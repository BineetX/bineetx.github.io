import { siteContent } from "../../content/siteContent";
import Section from "../ui/Section";

export default function TimelineSection() {
  const educationItems = siteContent.timeline.filter((item) => item.type === "Education");
  const achievementItems = siteContent.timeline.filter((item) => item.type === "Achievement");

  return (
    <Section
      id="timeline"
      eyebrow="Academic & Technical Journey"
      title="A compact path from biology toward computational systems."
    >
      <div className="timeline-block">
        <div className="timeline-block-title">
          <span>Education</span>
          <strong>Academic path</strong>
        </div>
        <div className="timeline">
          {educationItems.map((item) => (
            <article className="timeline-item" key={`${item.period}-${item.title}`}>
              <time>{item.period}</time>
              <div>
                <h3>{item.title}</h3>
                <p className="place">{item.place}</p>
                <p>{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="timeline-block achievement-block">
        <div className="timeline-block-title">
          <span>Achievements</span>
          <strong>Awards, qualifications, and scientific events</strong>
        </div>
        <div className="achievement-ledger">
          {achievementItems.map((item, index) => (
            <article className="achievement-row" key={`${item.period}-${item.title}`}>
              <time>{item.period}</time>
              <div>
                <h3>{item.title}</h3>
                <p>{item.place}</p>
              </div>
              <span>{String(index + 1).padStart(2, "0")}</span>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
