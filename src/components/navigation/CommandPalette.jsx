import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiArrowRight, FiCommand, FiDownload, FiExternalLink, FiMoon, FiSearch, FiSun, FiTerminal } from "react-icons/fi";
import { siteContent } from "../../content/siteContent";

function buildCommands(actions) {
  return [
    { label: "Go to About Me", hint: "about", icon: FiArrowRight, run: () => actions.scrollTo("about") },
    { label: "Go to Skills", hint: "skills", icon: FiArrowRight, run: () => actions.scrollTo("technology") },
    { label: "Go to Education & Experience", hint: "education", icon: FiArrowRight, run: () => actions.scrollTo("timeline") },
    { label: "Go to Research", hint: "research", icon: FiArrowRight, run: () => actions.scrollTo("research") },
    { label: "Go to Contact Me", hint: "contact", icon: FiArrowRight, run: () => actions.scrollTo("contact") },
    { label: "Download CV", hint: "file", icon: FiDownload, run: actions.downloadCv },
    { label: "Switch to Bioinformatician", hint: "theme", icon: FiMoon, run: () => actions.setMode("dark") },
    { label: "Switch to Researcher", hint: "theme", icon: FiSun, run: () => actions.setMode("light") },
    { label: "Switch to Developer", hint: "theme", icon: FiTerminal, run: () => actions.setMode("terminal") },
    { label: "Open GitHub", hint: "external", icon: FiExternalLink, run: () => actions.openUrl(siteContent.links.github) },
    { label: "Open Scholar", hint: "external", icon: FiExternalLink, run: () => actions.openUrl(siteContent.links.scholar) },
  ];
}

export default function CommandPalette({ isOpen, onClose, actions }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const commands = useMemo(() => buildCommands(actions), [actions]);
  const filtered = commands.filter((command) =>
    `${command.label} ${command.hint}`.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    if (!isOpen) return;
    setQuery("");
    setActive(0);
    window.setTimeout(() => inputRef.current?.focus(), 40);
  }, [isOpen]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  const runCommand = (command) => {
    if (!command) return;
    command.run();
    onClose();
  };

  const onKeyDown = (event) => {
    if (event.key === "Escape") onClose();
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => Math.min(index + 1, filtered.length - 1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => Math.max(index - 1, 0));
    }
    if (event.key === "Enter") {
      event.preventDefault();
      runCommand(filtered[active]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="palette-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            className="command-palette"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="palette-input">
              <FiSearch aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search commands..."
                aria-label="Search commands"
              />
              <FiCommand aria-hidden="true" />
            </div>
            <div className="palette-list" role="listbox" aria-label="Available commands">
              {filtered.map((command, index) => {
                const Icon = command.icon;
                return (
                  <button
                    type="button"
                    key={command.label}
                    className={index === active ? "active" : ""}
                    onMouseEnter={() => setActive(index)}
                    onClick={() => runCommand(command)}
                    role="option"
                    aria-selected={index === active}
                  >
                    <Icon aria-hidden="true" />
                    <span>{command.label}</span>
                    <small>{command.hint}</small>
                  </button>
                );
              })}
              {!filtered.length && <p className="palette-empty">No command found.</p>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
