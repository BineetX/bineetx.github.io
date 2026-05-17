import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const QUALITY_PRESETS = {
  desktop: {
    maxSourceWidth: 480,
    sampleGap: 2,
    maxPoints: 26000,
    pointSize: 0.25,
    targetHeight: 17.4,
    scatterWidth: 118,
    scatterHeight: 84,
  },
  mobile: {
    maxSourceWidth: 480,
    sampleGap: 2,
    maxPoints: 26000,
    pointSize: 0.08,
    targetHeight: 17.4,
    scatterWidth: 118,
    scatterHeight: 84,
  },
};

function enhanceSourceColor(r, g, b) {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const luminance = red * 0.2126 + green * 0.7152 + blue * 0.0722;
  const saturation = 1.0;
  const contrast = 1.2;
  const exposure = 0.7;

  const tune = (channel) => {
    const saturated = luminance + (channel - luminance) * saturation;
    const contrasted = (saturated - 0.5) * contrast + 0.5;
    return THREE.MathUtils.clamp(contrasted * exposure + 0.012, 0, 1);
  };

  return [tune(red), tune(green), tune(blue)];
}

function limitPointCount(raw, maxPoints) {
  const totalPoints = raw.targetPositions.length / 3;

  if (totalPoints <= maxPoints) return raw;

  const targetPositions = new Float32Array(maxPoints * 3);
  const startPositions = new Float32Array(maxPoints * 3);
  const colors = new Float32Array(maxPoints * 3);
  const goldenRatio = 0.6180339887498949;

  for (let n = 0; n < maxPoints; n += 1) {
    const sourceIndex = Math.floor(((n * goldenRatio) % 1) * totalPoints);

    for (let j = 0; j < 3; j += 1) {
      targetPositions[n * 3 + j] = raw.targetPositions[sourceIndex * 3 + j];
      startPositions[n * 3 + j] = raw.startPositions[sourceIndex * 3 + j];
      colors[n * 3 + j] = raw.colors[sourceIndex * 3 + j];
    }
  }

  return {
    targetPositions,
    startPositions,
    colors,
  };
}

function sampleImageToPoints(image, quality) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const sourceScale = Math.min(1, quality.maxSourceWidth / image.width);

  canvas.width = Math.round(image.width * sourceScale);
  canvas.height = Math.round(image.height * sourceScale);

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const targetPositions = [];
  const startPositions = [];
  const colors = [];
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const a = data[(y * width + x) * 4 + 3];

      if (a > 34) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  const visibleWidth = Math.max(1, maxX - minX);
  const visibleHeight = Math.max(1, maxY - minY);
  const centerX = minX + visibleWidth / 2;
  const centerY = minY + visibleHeight / 2;
  const fitScale = quality.targetHeight / visibleHeight;
  const targetYOffset = -quality.targetHeight * 0.08;

  for (let y = 0; y < height; y += quality.sampleGap) {
    for (let x = 0; x < width; x += quality.sampleGap) {
      const i = (y * width + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      if (a > 34) {
        const px = (x - centerX) * fitScale;
        const py = (centerY - y) * fitScale + targetYOffset;
        const pz = (Math.random() - 0.5) * 1.6;
        const edge = Math.floor(Math.random() * 4);
        const sideX = Math.random() < 0.5 ? -1 : 1;
        const sideY = Math.random() < 0.5 ? -1 : 1;
        const sx =
          edge < 2
            ? sideX * (quality.scatterWidth * 0.52 + Math.random() * quality.scatterWidth * 0.24)
            : (Math.random() - 0.5) * quality.scatterWidth;
        const sy =
          edge >= 2
            ? sideY * (quality.scatterHeight * 0.52 + Math.random() * quality.scatterHeight * 0.24)
            : (Math.random() - 0.5) * quality.scatterHeight;
        const sz = -20 - Math.random() * 28;
        const [cr, cg, cb] = enhanceSourceColor(r, g, b);

        targetPositions.push(px, py, pz);
        startPositions.push(sx, sy, sz);
        colors.push(cr, cg, cb);
      }
    }
  }

  return limitPointCount(
    {
      targetPositions: new Float32Array(targetPositions),
      startPositions: new Float32Array(startPositions),
      colors: new Float32Array(colors),
    },
    quality.maxPoints,
  );
}

function PortraitParticleSystem({ imageUrl, pointerRef, quality }) {
  const groupRef = useRef();
  const geometryRef = useRef();
  const materialRef = useRef();
  const [pointData, setPointData] = useState(null);
  const assembleStartRef = useRef(null);
  const activePointer = useRef(false);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();

    img.onload = () => {
      if (!cancelled) {
        assembleStartRef.current = null;
        setPointData(sampleImageToPoints(img, quality));
      }
    };
    img.src = imageUrl;

    return () => {
      cancelled = true;
    };
  }, [imageUrl, quality]);

  useFrame((state, delta) => {
    if (!pointData || !geometryRef.current) return;

    if (assembleStartRef.current === null) assembleStartRef.current = state.clock.getElapsedTime();

    const positionAttribute = geometryRef.current.attributes.position;
    const positions = positionAttribute.array;
    const targets = pointData.targetPositions;
    const time = state.clock.getElapsedTime();
    const elapsed = time - assembleStartRef.current;
    const delayedElapsed = Math.max(0, elapsed - 0.42);
    const assemblyEase = THREE.MathUtils.smoothstep(delayedElapsed, 0, 2.1);
    const followStrength = 1.2 + assemblyEase * 4.8;
    const portraitScale = quality.targetHeight / 17.4;
    const mouseX = pointerRef.current.x * state.viewport.width * portraitScale;
    const mouseY = pointerRef.current.y * state.viewport.height * portraitScale;
    activePointer.current = Math.abs(pointerRef.current.x) < 4 && Math.abs(pointerRef.current.y) < 4;

    for (let i = 0; i < positions.length; i += 3) {
      const tx = targets[i];
      const ty = targets[i + 1];
      const tz = targets[i + 2];
      const cx = positions[i];
      const cy = positions[i + 1];
      const dx = cx - mouseX;
      const dy = cy - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      let repelX = 0;
      let repelY = 0;

      if (activePointer.current && delayedElapsed > 0.75 && dist < 7.4) {
        const force = (1 - dist / 7.4) * 2.45;
        const angle = Math.atan2(dy, dx);

        repelX = Math.cos(angle) * force;
        repelY = Math.sin(angle) * force;
      }

      const breathingDepth = tz + Math.sin(time * 1.15 + tx * 0.3 + ty * 0.18) * 0.18;

      positions[i] = THREE.MathUtils.damp(positions[i], tx + repelX, followStrength, delta);
      positions[i + 1] = THREE.MathUtils.damp(positions[i + 1], ty + repelY, followStrength, delta);
      positions[i + 2] = THREE.MathUtils.damp(positions[i + 2], breathingDepth, followStrength * 0.78, delta);
    }

    positionAttribute.needsUpdate = true;

    if (materialRef.current) {
      materialRef.current.opacity = THREE.MathUtils.damp(materialRef.current.opacity, 1, 2.6, delta);
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.24) * 0.055;
      groupRef.current.rotation.x = Math.cos(time * 0.18) * 0.025;
      groupRef.current.position.y = Math.sin(time * 0.42) * 0.22;
    }
  });

  if (!pointData) return null;

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute
            attach="attributes-position"
            array={pointData.startPositions}
            count={pointData.startPositions.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            array={pointData.colors}
            count={pointData.colors.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={materialRef}
          size={quality.pointSize}
          transparent
          opacity={0}
          sizeAttenuation
          vertexColors
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>
    </group>
  );
}

export default function LandingPortraitNetwork({ imageUrl = "/assets/bineet.png", className = "" }) {
  const [quality, setQuality] = useState(QUALITY_PRESETS.desktop);
  const containerRef = useRef(null);
  const pointerRef = useRef({ x: 9999, y: 9999 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const updateQuality = () => {
      setQuality(mediaQuery.matches ? QUALITY_PRESETS.mobile : QUALITY_PRESETS.desktop);
    };

    updateQuality();
    mediaQuery.addEventListener("change", updateQuality);

    return () => mediaQuery.removeEventListener("change", updateQuality);
  }, []);

  useEffect(() => {
    const handlePointerMove = (event) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const activeRadius = Math.max(rect.width, rect.height) * 0.72;
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;

      if (Math.hypot(dx, dy) > activeRadius) {
        pointerRef.current.x = 9999;
        pointerRef.current.y = 9999;
        return;
      }

      pointerRef.current.x = dx / rect.width;
      pointerRef.current.y = -dy / rect.height;
    };

    const handlePointerLeave = () => {
      pointerRef.current.x = 9999;
      pointerRef.current.y = 9999;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`landing-portrait-network ${className}`}
      role="img"
      aria-label="Animated portrait of Bineet Kumar Mohanta"
    >
      <div className="landing-portrait-glow" aria-hidden="true" />
      <Canvas
        camera={{ position: [0, 0, 40], fov: 34 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <PortraitParticleSystem imageUrl={imageUrl} pointerRef={pointerRef} quality={quality} />
      </Canvas>
    </div>
  );
}
