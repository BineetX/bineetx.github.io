import { useState } from "react";
import { FiCommand } from "react-icons/fi";
import { useThemeMode } from "../../hooks/useThemeMode";
import ModeSwitcher from "../ui/ModeSwitcher";
import EditorPane from "./EditorPane";
import ExplorerTree from "./ExplorerTree";
import TerminalShell from "./TerminalShell";

export default function TerminalWorkspace({ onOpenPalette }) {
  const [cwd, setCwd] = useState("/bineet");
  const [activeFile, setActiveFile] = useState("/bineet/README.md");
  const { setMode } = useThemeMode();

  return (
    <main className="terminal-workspace">
      <header className="workstation-titlebar">
        <strong>BINEET / Professional-portfolio</strong>
        <div className="workstation-actions">
          <ModeSwitcher />
          <button type="button" onClick={onOpenPalette} aria-label="Open command palette">
            <FiCommand />
          </button>
        </div>
      </header>
      <div className="workstation-grid">
        <ExplorerTree activeFile={activeFile} onOpenFile={setActiveFile} />
        <EditorPane activeFile={activeFile} />
        <TerminalShell cwd={cwd} setCwd={setCwd} setActiveFile={setActiveFile} setMode={setMode} />
      </div>
    </main>
  );
}
