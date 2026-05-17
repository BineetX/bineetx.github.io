import { useEffect, useRef, useState } from "react";
import { executeCommand } from "./terminalUtils";

const bootLines = [
  { command: "boot", output: "BINEET professional portfolio initialized", type: "success" },
  { command: "whoami", output: "Bineet Kumar Mohanta :: professional portfolio", type: "muted" },
];

export default function TerminalShell({ cwd, setCwd, setActiveFile, setMode }) {
  const [history, setHistory] = useState(bootLines);
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(null);
  const commandHistory = useRef([]);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [history]);

  const submit = (event) => {
    event.preventDefault();
    const command = input.trim();
    if (!command) return;
    commandHistory.current = [command, ...commandHistory.current].slice(0, 50);
    setHistoryIndex(null);

    const result = executeCommand(command, { cwd }, setMode);
    if (result.clear) {
      setHistory([]);
    } else {
      setHistory((lines) => [...lines, { command, output: result.output, type: result.type || "result" }]);
    }
    if (result.cwd) setCwd(result.cwd);
    if (result.openFile) setActiveFile(result.openFile);
    setInput("");
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      const next = historyIndex === null ? 0 : Math.min(historyIndex + 1, commandHistory.current.length - 1);
      setHistoryIndex(next);
      setInput(commandHistory.current[next] || "");
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex === null) return;
      const next = historyIndex - 1;
      setHistoryIndex(next < 0 ? null : next);
      setInput(next < 0 ? "" : commandHistory.current[next] || "");
    }
  };

  return (
    <section className="terminal-shell" aria-label="Interactive command terminal">
      <div className="panel-title">Terminal</div>
      <div className="terminal-output" aria-live="polite">
        {history.map((entry, index) => (
          <div className="terminal-entry" key={`${entry.command}-${index}`}>
            <div className="prompt-line">
              <span className="prompt">bineet:{cwd}$</span>
              <span>{entry.command}</span>
            </div>
            {entry.output && <pre className={entry.type}>{entry.output}</pre>}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form className="terminal-input" onSubmit={submit}>
        <label htmlFor="terminal-command">bineet:{cwd}$</label>
        <input
          id="terminal-command"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          spellCheck="false"
          placeholder="type help"
        />
        <span className="cursor" aria-hidden="true" />
      </form>
    </section>
  );
}
