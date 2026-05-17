import { motion } from "framer-motion";
import { useEffect } from "react";
import { FiCommand, FiDownload, FiExternalLink } from "react-icons/fi";
import { bioinformaticsSkills, cbSkills, key_skills, otherSkills, skills } from "../../components/informations";
import { siteContent } from "../../content/siteContent";
import ModeSwitcher from "../../components/ui/ModeSwitcher";
import ReadingProgress from "./ReadingProgress";

const chapters = [
  { id: "front", label: "Profile", number: "00" },
  { id: "about-paper", label: "About Me", number: "01" },
  { id: "skills-paper", label: "Skills", number: "02" },
  { id: "education-paper", label: "Education & Experience", number: "03" },
  { id: "research-paper", label: "Research", number: "04" },
  { id: "contact-paper", label: "Contact Me", number: "05" },
];

const skillSections = [
  { category: "Programming", items: skills },
  { category: "Bioinformatics", items: bioinformaticsSkills },
  { category: "Computational Biology", items: cbSkills },
  { category: "Key Professional Skills", items: key_skills },
  { category: "Scientific Communication", items: otherSkills },
];

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function EditorialHeader({ onOpenPalette }) {
  return (
    <header className="editorial-header">
      <button type="button" className="paper-brand" onClick={() => scrollTo("front")}>
        BINEET.DEV
      </button>
      <nav aria-label="Portfolio sections">
        {chapters.slice(1).map((chapter) => (
          <button type="button" key={chapter.id} onClick={() => scrollTo(chapter.id)}>
            {chapter.label}
          </button>
        ))}
      </nav>
      <div className="paper-actions">
        <button className="icon-button" type="button" onClick={onOpenPalette} aria-label="Open command palette">
          <FiCommand />
        </button>
        <ModeSwitcher />
      </div>
    </header>
  );
}

function PaperSection({ id, kicker, title, children }) {
  const chapter = chapters.find((item) => item.id === id);

  return (
    <motion.section
      id={id}
      className="portfolio-paper-section"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.52, ease: "easeOut" }}
    >
      <div className="paper-section-rule">
        <span>{chapter?.number || "00"}</span>
        <i />
        <small>{kicker}</small>
      </div>
      <h2>{title}</h2>
      {children}
    </motion.section>
  );
}

function HighlightedAuthors({ authors }) {
  const parts = authors.split("Bineet Kumar Mohanta");

  return (
    <span className="paper-authors">
      {parts.map((part, index) => (
        <span key={`${part}-${index}`}>
          {part}
          {index < parts.length - 1 && (
            <mark>
              Bineet Kumar Mohanta
              <i aria-hidden="true" />
            </mark>
          )}
        </span>
      ))}
    </span>
  );
}

export default function LightModeExperience({ onOpenPalette }) {
  const educationItems = siteContent.timeline.filter((item) => item.type === "Education");
  const achievementItems = siteContent.timeline.filter((item) => item.type === "Achievement");

  useEffect(() => {
    const onNavigate = (event) => {
      const map = {
        home: "front",
        about: "about-paper",
        skills: "skills-paper",
        technology: "skills-paper",
        education: "education-paper",
        timeline: "education-paper",
        research: "research-paper",
        contact: "contact-paper",
      };
      if (map[event.detail]) scrollTo(map[event.detail]);
    };
    window.addEventListener("portfolio:navigate", onNavigate);
    return () => window.removeEventListener("portfolio:navigate", onNavigate);
  }, []);

  return (
    <main className="light-editorial">
      <ReadingProgress />
      <EditorialHeader onOpenPalette={onOpenPalette} />

      <section id="front" className="paper-masthead">
        <div className="masthead-line">
          <span>Professional Portfolio</span>
          <span>{siteContent.role}</span>
          <span>bineet.dev</span>
        </div>
        <h1>{siteContent.name}</h1>
        <p>{siteContent.title}</p>
        <div className="byline">
          <strong>{siteContent.name}</strong>
          <span>{siteContent.statement}</span>
        </div>
      </section>

      <div className="paper-layout">
        <aside className="paper-index" aria-label="Table of contents">
          <span>Portfolio</span>
          {chapters.map((chapter) => (
            <button type="button" key={chapter.id} onClick={() => scrollTo(chapter.id)}>
              {chapter.label}
            </button>
          ))}
        </aside>

        <div className="paper-story">
          <PaperSection id="about-paper" kicker="About Me" title="Introduction">
            <p>{siteContent.about.summary}</p>
            <p>{siteContent.about.focus}</p>
            <div className="paper-highlight-grid">
              {siteContent.highlights.map((line) => (
                <motion.article key={line} whileHover={{ y: -5, rotateX: 2 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
                  {line}
                </motion.article>
              ))}
            </div>
          </PaperSection>

          <PaperSection id="skills-paper" kicker="Skills" title="Professional tools and skills I am good at">
            <div className="paper-module-list paper-skill-grid">
              {skillSections.map((group) => (
                <motion.article key={group.category} whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
                  <strong>{group.category}</strong>
                  <span>{group.items.length} listed skills</span>
                  <small>{group.items.map((item) => item.name.replace("Java Srcipt", "JavaScript")).join(" / ")}</small>
                </motion.article>
              ))}
            </div>
          </PaperSection>

          <PaperSection id="education-paper" kicker="Education & Experience" title="Academic path and current research work.">
            <div className="editorial-chronology compact-chronology">
              {educationItems.map((item) => (
                <motion.article key={`${item.period}-${item.title}`} whileHover={{ x: 6 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
                  <time>{item.period}</time>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.place}</p>
                    <span>{item.detail}</span>
                  </div>
                </motion.article>
              ))}
            </div>
            <div className="paper-achievement-ledger">
              <div className="paper-achievement-heading">
                <span>Achievements</span>
                <strong>{achievementItems.length} selected entries</strong>
              </div>
              {achievementItems.map((item, index) => (
                <motion.article key={`${item.period}-${item.title}`} whileHover={{ x: 6 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
                  <time>{item.period}</time>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.place}</p>
                  </div>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </motion.article>
              ))}
            </div>
          </PaperSection>

          <PaperSection id="research-paper" kicker="Research" title="Research outputs and publications.">
            <div className="paper-publication-list">
              {siteContent.publications.map((item) => (
                <motion.a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <time>{item.year}</time>
                  <div>
                    <div className="paper-publication-meta">
                      <span>{item.type}</span>
                      <span>{item.journal}</span>
                    </div>
                    <strong>{item.title}</strong>
                    <HighlightedAuthors authors={item.authors} />
                    <small>{item.link.replace("https://doi.org/", "doi: ")}</small>
                    <div className="paper-publication-tags">
                      {item.tags.map((tag) => (
                        <em key={tag}>{tag}</em>
                      ))}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </PaperSection>

          <PaperSection id="contact-paper" kicker="Contact Me" title="Email, profiles, and CV.">
            <div className="footer-links">
              <a href={`mailto:${siteContent.emails.professional}`}>{siteContent.emails.professional}</a>
              <a href={`mailto:${siteContent.emails.personal}`}>{siteContent.emails.personal}</a>
              <a href={siteContent.links.github} target="_blank" rel="noopener noreferrer">
                GitHub <FiExternalLink />
              </a>
              <a href={siteContent.links.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn <FiExternalLink />
              </a>
              <a href={siteContent.links.scholar} target="_blank" rel="noopener noreferrer">
                Google Scholar <FiExternalLink />
              </a>
              <a href={siteContent.links.cv} target="_blank" rel="noopener noreferrer">
                Download CV <FiDownload />
              </a>
            </div>
          </PaperSection>
        </div>
      </div>
    </main>
  );
}
