import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FiAward,
  FiBookOpen,
  FiCommand,
  FiDownload,
  FiExternalLink,
  FiGrid,
  FiMail,
  FiUser,
} from "react-icons/fi";
import {
  academicDetails,
  achievements,
  bioinformaticsSkills,
  cbSkills,
  currentResearchFocus,
  educations,
  key_skills,
  otherSkills,
  skills,
  socialDetails,
} from "../../components/informations";
import ModeSwitcher from "../../components/ui/ModeSwitcher";
import { siteContent } from "../../content/siteContent";
import AmbientPortfolioScene from "./AmbientPortfolioScene";

const views = [
  { id: "about", label: "About Me", icon: FiUser },
  { id: "skills", label: "Skills", icon: FiAward },
  { id: "education", label: "Education & Experience", icon: FiBookOpen },
  { id: "research", label: "Research", icon: FiGrid },
  { id: "contact", label: "Contact Me", icon: FiMail },
];

const skillGroups = [
  { id: "programming", label: "Programming", items: skills },
  { id: "bioinformatics", label: "Bioinformatics", items: bioinformaticsSkills },
  { id: "computational", label: "Computational Biology", items: cbSkills },
  { id: "creative", label: "Creative / Other", items: otherSkills },
];

function pct(value) {
  return Number(String(value).replace("%", "")) || 0;
}

function DarkTopBar({ onOpenPalette, onSecret }) {
  return (
    <header className="dark-dashboard-topbar">
      <button
        type="button"
        className="dark-dashboard-brand"
        onClick={() => window.dispatchEvent(new CustomEvent("portfolio:navigate", { detail: "home" }))}
        onDoubleClick={onSecret}
        title="Double click for a tiny lab signal"
      >
        <span>B</span>
        <div>
          <strong>{siteContent.name}</strong>
          <small>{siteContent.role}</small>
        </div>
      </button>
      <div className="dark-dashboard-actions">
        <button className="icon-button" type="button" onClick={onOpenPalette} aria-label="Open command palette">
          <FiCommand />
        </button>
        <ModeSwitcher />
        <a className="nav-cv" href={siteContent.links.cv} target="_blank" rel="noopener noreferrer">
          <FiDownload />
          <span>CV</span>
        </a>
      </div>
    </header>
  );
}

function DarkNavRail({ activeView, setActiveView }) {
  return (
    <nav className="dark-dashboard-nav" aria-label="Dark mode portfolio views">
      {views.map((view) => {
        const Icon = view.icon;
        return (
          <motion.button
            type="button"
            key={view.id}
            className={activeView === view.id ? "active" : ""}
            onClick={() => setActiveView(view.id)}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <Icon aria-hidden="true" />
            <span>{view.label}</span>
          </motion.button>
        );
      })}
    </nav>
  );
}

function Panel({ className = "", children, delay = 0 }) {
  return (
    <motion.article
      className={`dash-panel ${className}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay, ease: "easeOut" }}
      whileHover={{ y: -4 }}
    >
      {children}
    </motion.article>
  );
}

function SkillChip({ item }) {
  return (
    <motion.div className="skill-chip" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
      <span className="skill-icon">{item.logo}</span>
      <span>{item.name.replace("Java Srcipt", "JavaScript")}</span>
      <i style={{ "--level": `${pct(item.conf)}%` }} />
    </motion.div>
  );
}

function LinkDock({ compact = false }) {
  const links = [...academicDetails, ...socialDetails].slice(0, compact ? 6 : undefined);
  return (
    <div className="premium-link-dock">
      {links.map((item, index) => (
        <motion.a
          key={item.name}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ y: -4, scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          aria-label={item.name}
          title={item.name}
        >
          {item.logo}
          <span>{item.name}</span>
        </motion.a>
      ))}
    </div>
  );
}

const skillColors = {
  Intelligence: "#67e8f9",
  "Graph AI": "#a78bfa",
  Modelling: "#86efac",
  Engineering: "#facc15",
  Analytics: "#fb7185",
  "Life Science": "#38bdf8",
  Translation: "#f0abfc",
};

const majorKeySkills = new Set(["AI", "ML", "HGNN", "Mathematical Modelling", "Programming", "Python", "Drug Synergy Prediction"]);

function KeySkillsConstellation({ items }) {
  const nodes = useMemo(
    () =>
      items.map((item, index) => ({
        ...item,
        id: index,
        color: skillColors[item.group] || "#67e8f9",
      })),
    [items],
  );

  return (
    <div className="key-skills-constellation">
      <div className="key-skill-node-layer" aria-label="Floating key professional skills">
        {nodes.map((node) => (
          <div
            className={`key-skill-node ${majorKeySkills.has(node.name) ? "major" : ""}`}
            key={node.name}
            style={{
              "--node-color": node.color,
            }}
            title={node.group}
          >
            <i />
            <span>{node.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutDashboard({ setActiveView, secretActive }) {
  const quickLinks = [...academicDetails.slice(0, 2), ...socialDetails.filter((item) => ["LinkedIn", "Github"].includes(item.name))];

  return (
    <div className="about-fast-dashboard">
      <motion.section
        className="about-profile-panel"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, ease: "easeOut" }}
      >
        <div className="about-photo-frame">
          <img src="/assets/bineet_c.png" alt="Bineet Kumar Mohanta" />
        </div>
        <div className="about-profile-copy">
          <p className="eyebrow">About Me</p>
          <h1>{siteContent.name}</h1>
          <p>
            Currently working as Senior Research Fellow (Ph.D.) under Dr. Anshuman Dixit at the Computational Biology
            and Bioinformatics Lab, Institute of Life Sciences, Bhubaneswar.
          </p>
          <div className="about-action-row">
            <a href={siteContent.links.cv} target="_blank" rel="noopener noreferrer">
              <FiDownload />
              Download CV
            </a>
            <button type="button" onClick={() => setActiveView("contact")}>
              <FiMail />
              Contact
            </button>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="about-research-focus"
        aria-label={currentResearchFocus.title}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, delay: 0.08, ease: "easeOut" }}
      >
        <div className="research-focus-symbol" aria-hidden="true">
          <span>Research Focus</span>
          <i>01</i>
        </div>
        <div className="research-focus-copy">
          <span>{currentResearchFocus.title}</span>
          <blockquote>{currentResearchFocus.detail}</blockquote>
          <p>
            Building graph-based models that represent heterogeneous biological and chemical relationships for more
            reliable drug-combination response prediction.
          </p>
        </div>
      </motion.section>

      <motion.section
        className="about-links-panel"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, delay: 0.14, ease: "easeOut" }}
      >
        <div className="panel-heading">
          <span>Links</span>
          <strong>Profiles</strong>
        </div>
        <div className="about-link-list">
          {quickLinks.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
            >
              {item.logo}
              <span>{item.name}</span>
            </motion.a>
          ))}
        </div>
      </motion.section>

      {secretActive && (
        <motion.div
          className="dark-easter-panel"
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
        >
          <span>hidden signal unlocked</span>
          <strong>BIO // CODE // DESIGN</strong>
        </motion.div>
      )}
    </div>
  );
}

function SkillsDashboard() {
  const [activeGroup, setActiveGroup] = useState(skillGroups[0].id);
  const selected = skillGroups.find((group) => group.id === activeGroup) || skillGroups[0];

  return (
    <div className="expertise-dashboard">
      <Panel className="expertise-selector-panel">
        <p className="eyebrow">Technology atlas</p>
        <h2>Skills</h2>
        <div className="expertise-tabs">
          {skillGroups.map((group, index) => (
            <motion.button
              type="button"
              key={group.id}
              className={activeGroup === group.id ? "active" : ""}
              onClick={() => setActiveGroup(group.id)}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {group.label}
              <span>{group.items.length}</span>
            </motion.button>
          ))}
        </div>
      </Panel>
      <Panel className="expertise-matrix-panel" delay={0.06}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            className="expertise-matrix"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.24 }}
          >
            {selected.items.map((item, index) => (
              <motion.div
                className="capability-card"
                key={item.name}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -7, rotateX: 3 }}
                style={{ "--score": `${pct(item.conf)}%` }}
              >
                <div>{item.logo}</div>
                <strong>{item.name.replace("Java Srcipt", "JavaScript")}</strong>
                <span>{item.conf}</span>
                <i />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </Panel>
    </div>
  );
}

function JourneyDashboard() {
  return (
    <div className="journey-dashboard">
      <Panel className="journey-title-panel">
        <p className="eyebrow">Digital CV timeline</p>
        <h2>Education and Experiences</h2>
      </Panel>
      <div className="journey-track" aria-label="Education timeline">
        {educations.map((item, index) => (
          <motion.article
            className="journey-node"
            key={`${item.inst}-${item.time}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            whileHover={{ y: -8 }}
          >
            <span>{item.time}</span>
            <strong>{item.degree}</strong>
            <h3>{item.inst}</h3>
            <p>{item.subject}</p>
            <small>{item.location}</small>
          </motion.article>
        ))}
      </div>
      <Panel className="journey-title-panel" delay={0.12}>
        <p className="eyebrow">Achievements</p>
        <h2>Awards, qualifications, and scientific events</h2>
      </Panel>
      <div className="achievement-ledger dark-achievement-ledger" aria-label="Achievements timeline">
        {achievements.map((item, index) => (
          <motion.article
            className="achievement-row"
            key={`${item.year}-${item.title}`}
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12 + index * 0.06 }}
            whileHover={{ x: 8 }}
          >
            <time>{item.year}</time>
            <div>
              <h3>{item.title}</h3>
              <p>{item.agency}</p>
            </div>
            <span>{String(index + 1).padStart(2, "0")}</span>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

function ResearchDashboard() {
  const featuredPublications = siteContent.publications.slice(0, 5);

  return (
    <div className="research-dashboard">
      <Panel className="research-focus-panel">
        <p className="eyebrow">Research</p>
        <h2>Bioinformatics and computational biology focus</h2>
        <p>{featuredPublications.length} listed publications and research outputs.</p>
      </Panel>
      <Panel className="key-skills-panel" delay={0.06}>
        <div className="panel-heading">
          <span>Key Professional Skills</span>
          <strong>{key_skills.length} connected nodes</strong>
        </div>
        <KeySkillsConstellation items={key_skills} />
      </Panel>
      <Panel className="publication-panel" delay={0.12}>
        <div className="panel-heading">
          <span>Publications</span>
          <strong>{featuredPublications.length} entries</strong>
        </div>
        <div className="publication-list">
          {featuredPublications.map((item, index) => (
            <motion.a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="publication-card"
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.12 + index * 0.06 }}
              whileHover={{ x: 6 }}
            >
              <span>{item.year}</span>
              <strong>{item.title}</strong>
              <small>{item.journal} / {item.type}</small>
            </motion.a>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function ConnectDashboard() {
  return (
    <div className="connect-dashboard" id="dark-connect-view" tabIndex={-1}>
      <Panel className="contact-command-panel">
        <p className="eyebrow">Open channels</p>
        <h2>Contact and academic identity</h2>
        <div className="contact-actions">
          <a href={`mailto:${siteContent.emails.professional}`}><FiMail /> {siteContent.emails.professional}</a>
          <a href={siteContent.links.cv} target="_blank" rel="noopener noreferrer"><FiDownload /> Download CV</a>
        </div>
      </Panel>
      <Panel className="academic-dock-panel" delay={0.06}>
        <div className="panel-heading">
          <span>Academic Profiles</span>
          <strong>{academicDetails.length} links</strong>
        </div>
        <div className="premium-link-dock large">
          {academicDetails.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ y: -6 }}
            >
              {item.logo}
              <span>{item.name}</span>
              <FiExternalLink />
            </motion.a>
          ))}
        </div>
      </Panel>
      <Panel className="social-dock-panel" delay={0.1}>
        <div className="panel-heading">
          <span>Social + Code</span>
          <strong>{socialDetails.length} links</strong>
        </div>
        <LinkDock />
      </Panel>
    </div>
  );
}

function ActiveView({ activeView, setActiveView, secretActive }) {
  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={activeView}
        className="dark-dashboard-view"
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.985 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        {activeView === "about" && <AboutDashboard setActiveView={setActiveView} secretActive={secretActive} />}
        {activeView === "skills" && <SkillsDashboard />}
        {activeView === "education" && <JourneyDashboard />}
        {activeView === "research" && <ResearchDashboard />}
        {activeView === "contact" && <ConnectDashboard />}
      </motion.section>
    </AnimatePresence>
  );
}

export default function DarkModeExperience({ onOpenPalette }) {
  const [activeView, setActiveView] = useState("about");
  const [secretActive, setSecretActive] = useState(false);
  const shellRef = useRef(null);
  const pointerFrame = useRef(null);

  const navigateMap = useMemo(
    () => ({
      home: "about",
      about: "about",
      skills: "skills",
      technology: "skills",
      education: "education",
      timeline: "education",
      research: "research",
      contact: "contact",
    }),
    [],
  );

  useEffect(() => {
    return () => window.cancelAnimationFrame(pointerFrame.current);
  }, []);

  useEffect(() => {
    const onNavigate = (event) => {
      if (navigateMap[event.detail]) setActiveView(navigateMap[event.detail]);
    };
    window.addEventListener("portfolio:navigate", onNavigate);
    return () => window.removeEventListener("portfolio:navigate", onNavigate);
  }, [navigateMap]);

  useEffect(() => {
    let buffer = "";
    const onKeyDown = (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      buffer = `${buffer}${event.key.toLowerCase()}`.slice(-6);
      if (buffer.endsWith("bio")) {
        setSecretActive(true);
        setActiveView("about");
        window.setTimeout(() => setSecretActive(false), 4200);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const onPointerMove = (event) => {
    if (activeView === "about") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    window.cancelAnimationFrame(pointerFrame.current);
    pointerFrame.current = window.requestAnimationFrame(() => {
      shellRef.current?.style.setProperty("--mx", `${x}%`);
      shellRef.current?.style.setProperty("--my", `${y}%`);
    });
  };

  return (
    <main
      ref={shellRef}
      className={`dark-dashboard-shell view-${activeView} ${secretActive ? "secret-active" : ""}`}
      onPointerMove={onPointerMove}
    >
      <AmbientPortfolioScene activeView={activeView} />
      <DarkTopBar onOpenPalette={onOpenPalette} onSecret={() => setSecretActive((value) => !value)} />
      <div className="dark-dashboard-layout">
        <DarkNavRail activeView={activeView} setActiveView={setActiveView} />
        <ActiveView activeView={activeView} setActiveView={setActiveView} secretActive={secretActive} />
      </div>
    </main>
  );
}
