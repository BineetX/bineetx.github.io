import { useEffect, useState } from "react";
import { FiCommand, FiDownload, FiMenu, FiX } from "react-icons/fi";
import ModeSwitcher from "../ui/ModeSwitcher";
import { siteContent } from "../../content/siteContent";
import { scrollToSection, sections } from "../../utils/navigation";

export default function Header({ onOpenPalette }) {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.08, 0.2, 0.4] },
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const navigate = (id) => {
    scrollToSection(id);
    setOpen(false);
  };

  return (
    <header className="site-header">
      <a
        className="brand-mark"
        href="#home"
        onClick={(event) => {
          event.preventDefault();
          navigate("home");
        }}
      >
        <span className="brand-orbit" aria-hidden="true" />
        <span>
          <strong>Bineet</strong>
          <small>computational biology interface</small>
        </span>
      </a>

      <nav className={`nav-links ${open ? "open" : ""}`} aria-label="Primary navigation">
        {sections.map((section) => (
          <button
            type="button"
            key={section.id}
            className={active === section.id ? "active" : ""}
            onClick={() => navigate(section.id)}
          >
            {section.label}
          </button>
        ))}
      </nav>

      <div className="header-actions">
        <button className="icon-button" type="button" onClick={onOpenPalette} aria-label="Open command palette">
          <FiCommand />
          <span className="shortcut">K</span>
        </button>
        <ModeSwitcher />
        <a className="nav-cv" href={siteContent.links.cv} target="_blank" rel="noopener noreferrer">
          <FiDownload />
          <span>CV</span>
        </a>
        <button
          className="icon-button mobile-menu-button"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </header>
  );
}
