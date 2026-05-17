import { FiChevronRight, FiFileText, FiFolder } from "react-icons/fi";
import { tree } from "./terminalUtils";

function TreeNode({ node, activeFile, onOpenFile, level = 0 }) {
  const isFolder = Boolean(node.children);
  return (
    <div>
      <button
        type="button"
        className={`tree-node ${activeFile === node.path ? "active" : ""}`}
        style={{ paddingLeft: `${level * 14 + 10}px` }}
        onClick={() => !isFolder && onOpenFile(node.path)}
      >
        {isFolder ? <FiChevronRight aria-hidden="true" /> : <span className="tree-spacer" />}
        {isFolder ? <FiFolder aria-hidden="true" /> : <FiFileText aria-hidden="true" />}
        <span>{node.name}</span>
      </button>
      {node.children?.map((child) => (
        <TreeNode key={child.path} node={child} activeFile={activeFile} onOpenFile={onOpenFile} level={level + 1} />
      ))}
    </div>
  );
}

export default function ExplorerTree({ activeFile, onOpenFile }) {
  return (
    <aside className="terminal-explorer" aria-label="Terminal file explorer">
      <div className="panel-title">Explorer</div>
      <TreeNode node={tree} activeFile={activeFile} onOpenFile={onOpenFile} />
    </aside>
  );
}
