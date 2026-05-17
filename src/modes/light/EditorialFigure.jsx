export default function EditorialFigure({ variant = "graph", caption, label }) {
  const nodes = variant === "pipeline" ? ["Data", "QC", "Model", "API", "Interface"] : ["Drug", "Protein", "Gene", "Cell", "Model"];

  return (
    <figure className={`editorial-figure ${variant}`}>
      <div className="figure-label">{label}</div>
      <div className="figure-canvas" aria-hidden="true">
        {nodes.map((node, index) => (
          <span key={node} style={{ "--i": index }}>
            {node}
          </span>
        ))}
        <svg viewBox="0 0 420 280" role="presentation">
          <path d="M75 80 C155 30, 235 55, 330 92" />
          <path d="M75 190 C165 145, 245 190, 330 154" />
          <path d="M115 72 C145 145, 235 150, 292 92" />
          <path d="M120 205 C160 90, 260 90, 300 185" />
        </svg>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
