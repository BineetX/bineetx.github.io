import { useEffect, useMemo, useRef } from "react";

const families = {
  drug: { color: "#67e8f9", radius: 5 },
  protein: { color: "#a78bfa", radius: 6 },
  gene: { color: "#bef264", radius: 4 },
  cell: { color: "#f0abfc", radius: 7 },
  system: { color: "#60a5fa", radius: 6 },
};

function makeNodes(scene) {
  const count =
    scene === "architecture" ? 25 : scene === "timeline" ? 16 : scene === "philosophy" ? 22 : scene === "capabilities" ? 30 : 36;
  return Array.from({ length: count }, (_, index) => {
    const familyKey =
      scene === "architecture"
        ? ["system", "drug", "protein"][index % 3]
        : scene === "timeline"
          ? ["gene", "system"][index % 2]
          : scene === "capabilities"
            ? ["system", "protein", "gene"][index % 3]
          : ["drug", "protein", "gene", "cell"][index % 4];

    return {
      id: index,
      family: families[familyKey],
      familyKey,
      phase: index * 0.47,
      label: `${familyKey}.${String(index + 1).padStart(2, "0")}`,
    };
  });
}

function positionNode(node, index, total, width, height, scene, time, pointer) {
  const cx = width / 2 + pointer.x * 28;
  const cy = height / 2 + pointer.y * 20;
  const min = Math.min(width, height);
  const angle = (index / total) * Math.PI * 2;

  if (scene === "architecture") {
    const layer = index % 5;
    return {
      x: width * (0.18 + layer * 0.16) + Math.sin(time + node.phase) * 12,
      y: height * (0.25 + ((index * 7) % 10) * 0.055) + Math.cos(time * 0.8 + node.phase) * 10,
    };
  }

  if (scene === "timeline") {
    return {
      x: width * (0.12 + index / Math.max(total - 1, 1) * 0.76),
      y: cy + Math.sin(index * 0.9 + time) * min * 0.16,
    };
  }

  if (scene === "philosophy") {
    const ring = index % 2 === 0 ? 0.26 : 0.42;
    return {
      x: cx + Math.cos(angle + time * 0.08) * min * ring,
      y: cy + Math.sin(angle + time * 0.08) * min * ring,
    };
  }

  if (scene === "capabilities") {
    const column = index % 6;
    const row = Math.floor(index / 6);
    return {
      x: width * (0.16 + column * 0.135) + Math.sin(time + node.phase) * 8,
      y: height * (0.22 + row * 0.14) + Math.cos(time * 0.7 + node.phase) * 8,
    };
  }

  if (scene === "signal") {
    const ring = 0.12 + (index % 5) * 0.055 + Math.sin(time + node.phase) * 0.01;
    return {
      x: cx + Math.cos(angle + time * 0.2) * min * ring,
      y: cy + Math.sin(angle + time * 0.2) * min * ring,
    };
  }

  if (scene === "constellation") {
    const arm = index % 4;
    const orbit = 0.2 + arm * 0.09;
    return {
      x: cx + Math.cos(angle * 1.7 + time * 0.12) * min * orbit,
      y: cy + Math.sin(angle * 1.2 - time * 0.1) * min * (orbit * 0.72),
    };
  }

  const orbit = scene === "graph" ? 0.18 + (index % 4) * 0.08 : 0.22 + (index % 3) * 0.12;
  return {
    x: cx + Math.cos(angle + time * 0.18 + node.phase * 0.04) * min * orbit,
    y: cy + Math.sin(angle * 1.14 + time * 0.15) * min * orbit * 0.72,
  };
}

export default function ResearchSceneCanvas({ workspace }) {
  const canvasRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const nodes = useMemo(() => makeNodes(workspace.scene), [workspace.scene]);

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
      const time = reduceMotion ? 16 : frame * 0.012;

      context.clearRect(0, 0, width, height);
      const bg = context.createRadialGradient(width * 0.5, height * 0.44, 0, width * 0.5, height * 0.44, Math.max(width, height) * 0.66);
      bg.addColorStop(0, "rgba(41, 121, 255, 0.12)");
      bg.addColorStop(0.45, "rgba(99, 102, 241, 0.055)");
      bg.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = bg;
      context.fillRect(0, 0, width, height);

      const points = nodes.map((node, index) =>
        positionNode(node, index, nodes.length, width, height, workspace.scene, time, pointer.current),
      );

      context.lineWidth = 1;
      points.forEach((point, index) => {
        const next = points[(index + (workspace.scene === "architecture" ? 5 : 7)) % points.length];
        const pulse = (Math.sin(time * 2 + index) + 1) / 2;
        context.beginPath();
        context.moveTo(point.x, point.y);
        context.lineTo(next.x, next.y);
        context.strokeStyle = `rgba(103, 232, 249, ${0.08 + pulse * 0.18})`;
        context.stroke();
      });

      if (workspace.scene === "architecture" || workspace.scene === "capabilities") {
        [0.18, 0.34, 0.5, 0.66, 0.82].forEach((x, index) => {
          context.strokeStyle = index % 2 ? "rgba(167, 139, 250, 0.22)" : "rgba(103, 232, 249, 0.18)";
          context.strokeRect(width * x - 42, height * 0.18, 84, height * (workspace.scene === "capabilities" ? 0.54 : 0.64));
        });
      }

      if (workspace.scene === "philosophy") {
        context.strokeStyle = "rgba(190, 242, 100, 0.16)";
        [0.18, 0.31, 0.44].forEach((ring) => {
          context.beginPath();
          context.arc(width / 2, height / 2, Math.min(width, height) * ring, 0, Math.PI * 2);
          context.stroke();
        });
      }

      points.forEach((point, index) => {
        const node = nodes[index];
        const radius = node.family.radius + Math.sin(time * 2 + node.phase) * 0.7;
        const glow = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius * 9);
        glow.addColorStop(0, `${node.family.color}80`);
        glow.addColorStop(1, `${node.family.color}00`);
        context.fillStyle = glow;
        context.beginPath();
        context.arc(point.x, point.y, radius * 9, 0, Math.PI * 2);
        context.fill();

        context.fillStyle = node.family.color;
        context.beginPath();
        context.arc(point.x, point.y, radius, 0, Math.PI * 2);
        context.fill();

        if ((index % 6 === 0 || workspace.scene === "timeline") && width > 680) {
          context.font = "11px JetBrains Mono, Consolas, monospace";
          context.fillStyle = "rgba(226, 244, 255, 0.62)";
          context.fillText(workspace.scene === "timeline" ? workspace.related[index % workspace.related.length] : node.label, point.x + 10, point.y - 10);
        }
      });

      context.font = "12px JetBrains Mono, Consolas, monospace";
      context.fillStyle = "rgba(125, 211, 252, 0.7)";
      context.fillText(`SCENE // ${workspace.scene.toUpperCase()}`, 22, 32);
      context.fillText(`WORKSPACE // ${workspace.id.toUpperCase()}`, 22, 52);

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
  }, [nodes, workspace]);

  return <canvas className="research-scene-canvas" ref={canvasRef} aria-label={`${workspace.label} animated research scene`} />;
}
