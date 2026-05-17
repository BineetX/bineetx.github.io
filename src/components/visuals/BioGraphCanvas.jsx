import { useEffect, useMemo, useRef } from "react";
import { useThemeMode } from "../../hooks/useThemeMode";

const families = [
  { name: "drug", color: "#7dd3fc", radius: 4.2 },
  { name: "protein", color: "#a78bfa", radius: 5 },
  { name: "gene", color: "#86efac", radius: 3.8 },
  { name: "cell", color: "#f0abfc", radius: 5.4 },
];

function createGraph() {
  const nodes = Array.from({ length: 34 }, (_, index) => {
    const family = families[index % families.length];
    const angle = (index / 34) * Math.PI * 2;
    const ring = index % 3 === 0 ? 0.33 : index % 3 === 1 ? 0.48 : 0.64;
    return {
      id: index,
      label: `${family.name}_${String(index + 1).padStart(2, "0")}`,
      family,
      angle,
      ring,
      drift: 0.2 + (index % 5) * 0.08,
    };
  });

  const edges = [];
  for (let i = 0; i < nodes.length; i += 1) {
    edges.push([i, (i + 3) % nodes.length]);
    if (i % 2 === 0) edges.push([i, (i + 7) % nodes.length]);
    if (i % 5 === 0) edges.push([i, (i + 13) % nodes.length]);
  }

  return { nodes, edges };
}

export default function BioGraphCanvas() {
  const canvasRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const { mode } = useThemeMode();
  const graph = useMemo(createGraph, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let animationId;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const scale = window.devicePixelRatio || 1;
      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;
      context.setTransform(scale, 0, 0, scale, 0, 0);
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const time = reduceMotion ? 18 : frame * 0.006;
      const cx = width / 2 + pointer.current.x * 14;
      const cy = height / 2 + pointer.current.y * 10;
      const min = Math.min(width, height);
      const palette =
        mode === "light"
          ? { bg: "rgba(250,247,240,0.06)", edge: "rgba(50,66,92,0.18)", text: "rgba(27,38,59,0.52)" }
          : { bg: "rgba(4,9,18,0.18)", edge: "rgba(125,211,252,0.22)", text: "rgba(214,232,255,0.58)" };

      context.clearRect(0, 0, width, height);
      context.fillStyle = palette.bg;
      context.fillRect(0, 0, width, height);

      const positioned = graph.nodes.map((node) => {
        const pulse = Math.sin(time * node.drift + node.id) * 0.035;
        const angle = node.angle + time * (0.08 + (node.id % 4) * 0.01);
        return {
          ...node,
          x: cx + Math.cos(angle) * min * (node.ring + pulse),
          y: cy + Math.sin(angle * 1.13) * min * (node.ring * 0.64 + pulse),
        };
      });

      context.lineWidth = 1;
      graph.edges.forEach(([a, b], index) => {
        const source = positioned[a];
        const target = positioned[b];
        context.beginPath();
        context.moveTo(source.x, source.y);
        context.lineTo(target.x, target.y);
        context.strokeStyle = index % 4 === 0 ? "rgba(134,239,172,0.24)" : palette.edge;
        context.stroke();
      });

      positioned.forEach((node, index) => {
        const glow = context.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.family.radius * 8);
        glow.addColorStop(0, `${node.family.color}88`);
        glow.addColorStop(1, `${node.family.color}00`);
        context.fillStyle = glow;
        context.beginPath();
        context.arc(node.x, node.y, node.family.radius * 8, 0, Math.PI * 2);
        context.fill();

        context.fillStyle = node.family.color;
        context.beginPath();
        context.arc(node.x, node.y, node.family.radius, 0, Math.PI * 2);
        context.fill();

        if (index % 7 === 0 && width > 520) {
          context.font = "11px JetBrains Mono, ui-monospace, monospace";
          context.fillStyle = palette.text;
          context.fillText(node.label, node.x + 9, node.y - 9);
        }
      });

      frame += 1;
      if (!reduceMotion) animationId = requestAnimationFrame(draw);
    };

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current = {
        x: (event.clientX - rect.left) / rect.width - 0.5,
        y: (event.clientY - rect.top) / rect.height - 0.5,
      };
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onPointerMove);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointerMove);
    };
  }, [graph, mode]);

  return (
    <div className="bio-graph-wrap" aria-label="Animated heterogeneous biomedical graph">
      <canvas ref={canvasRef} />
      <div className="graph-legend" aria-hidden="true">
        {families.map((family) => (
          <span key={family.name}>
            <i style={{ background: family.color }} />
            {family.name}
          </span>
        ))}
      </div>
    </div>
  );
}
