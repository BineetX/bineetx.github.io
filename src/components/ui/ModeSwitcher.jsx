import { useState } from "react";
import { FiGrid, FiMoon, FiSun, FiTerminal } from "react-icons/fi";
import { useThemeMode } from "../../hooks/useThemeMode";

const options = [
  { id: "dark", label: "Bioinformatician", short: "Bio", icon: FiMoon },
  { id: "light", label: "Researcher", short: "Research", icon: FiSun },
  { id: "terminal", label: "Developer", short: "Dev", icon: FiTerminal },
];

export default function ModeSwitcher() {
  const { mode, setMode } = useThemeMode();
  const [open, setOpen] = useState(false);
  const activeOption = options.find((option) => option.id === mode) || options[0];
  const ActiveIcon = activeOption.icon;

  const chooseMode = (id) => {
    setMode(id);
    setOpen(false);
  };

  return (
    <div className={`mode-switcher ${open ? "open" : ""}`}>
      <button
        type="button"
        className="mode-switcher-trigger"
        aria-label="Open role navigation"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <FiGrid aria-hidden="true" />
        <ActiveIcon aria-hidden="true" />
      </button>
      <div className="mode-switcher-options" role="radiogroup" aria-label="Site mode">
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.id}
              type="button"
              className={mode === option.id ? "active" : ""}
              aria-label={`Switch to ${option.label} mode`}
              aria-checked={mode === option.id}
              role="radio"
              title={option.label}
              onClick={() => chooseMode(option.id)}
            >
              <Icon aria-hidden="true" />
              <span className="mode-label">{option.label}</span>
              <small className="mode-short" aria-hidden="true">{option.short}</small>
            </button>
          );
        })}
      </div>
    </div>
  );
}
