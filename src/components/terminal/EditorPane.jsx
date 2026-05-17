import { terminalFiles } from "../../content/siteContent";

export default function EditorPane({ activeFile }) {
  const content = terminalFiles[activeFile] || "Select a file from the explorer or run open <file>.";

  return (
    <section className="terminal-editor" aria-label="Editor pane">
      <div className="editor-tab">{activeFile.replace("/bineet/", "")}</div>
      <pre>{content}</pre>
    </section>
  );
}
