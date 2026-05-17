import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/* =========================================================
   Match your existing particle portrait scale and placement
========================================================= */

const PORTRAIT_LAYOUT = {
  desktop: {
    targetHeight: 17.4,
    yOffsetFactor: -0.08,
    scanlineScale: 760,
    gridOpacity: 1,
    hoverRadius: 0.46,
  },
  mobile: {
    targetHeight: 17.4,
    yOffsetFactor: -0.08,
    scanlineScale: 1320,
    gridOpacity: 0.34,
    hoverRadius: 0.58,
  },
};

/* =========================================================
   Vertex Shader
========================================================= */

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

/* =========================================================
   Fragment Shader
   Preserves original image while adding:
   - subtle silhouette edge glow
   - cyan/violet holographic rim
   - animated diagonal light sweep
   - pointer-reactive soft specular glow
   - faint internal shimmer
========================================================= */

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uTexelSize;
  uniform vec2 uUvScale;
  uniform vec2 uUvOffset;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uHover;
  uniform float uScanlineScale;
  uniform float uGridOpacity;
  uniform float uHoverRadius;
  uniform float uIntro;

  varying vec2 vUv;

  float alphaAt(vec2 uv) {
    return texture2D(uTexture, uv).a;
  }

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  void main() {
    float introReverse = 1.0 - uIntro;
    float bandNoise = hash(vec2(floor(vUv.y * 130.0), floor(uTime * 18.0)));
    float glitchGate =
      step(0.965, hash(vec2(floor(uTime * 1.7), floor(vUv.y * 18.0)))) *
      (0.5 + 0.5 * sin(uTime * 22.0));
    float introBand = step(hash(vec2(floor(vUv.y * 42.0), 7.13)), uIntro + 0.08);
    float introColumn = step(hash(vec2(floor(vUv.x * 30.0), 3.91)), uIntro + 0.16);
    float introMask = max(introBand, introColumn);
    float glitchOffset = (bandNoise - 0.5) * (0.010 * glitchGate + introReverse * 0.055);
    float mouseDistanceForWarp = distance(vUv, uMouse);
    float mouseWarp =
      (1.0 - smoothstep(0.0, uHoverRadius * 0.72, mouseDistanceForWarp)) *
      uHover *
      0.026;
    vec2 fromMouse = normalize(vUv - uMouse + vec2(0.0001));
    vec2 portraitUv = uUvOffset + (vUv + fromMouse * mouseWarp + vec2(glitchOffset, 0.0)) * uUvScale;

    vec4 base = texture2D(uTexture, portraitUv);
    vec4 redSample = texture2D(uTexture, portraitUv + vec2(uTexelSize.x * (2.0 + uHover * 2.0), 0.0));
    vec4 blueSample = texture2D(uTexture, portraitUv - vec2(uTexelSize.x * (2.0 + uHover * 2.0), 0.0));
    float alpha = base.a;

    // Keep fully transparent space clean
    if (alpha <= 0.001) {
      // But allow only silhouette outer glow later
    }

    /* ---------------------------------------------
       Silhouette edge detection from alpha channel
    --------------------------------------------- */

    float aR1 = alphaAt(portraitUv + vec2( uTexelSize.x * 2.0, 0.0));
    float aL1 = alphaAt(portraitUv + vec2(-uTexelSize.x * 2.0, 0.0));
    float aU1 = alphaAt(portraitUv + vec2(0.0,  uTexelSize.y * 2.0));
    float aD1 = alphaAt(portraitUv + vec2(0.0, -uTexelSize.y * 2.0));

    float aR2 = alphaAt(portraitUv + vec2( uTexelSize.x * 5.0, 0.0));
    float aL2 = alphaAt(portraitUv + vec2(-uTexelSize.x * 5.0, 0.0));
    float aU2 = alphaAt(portraitUv + vec2(0.0,  uTexelSize.y * 5.0));
    float aD2 = alphaAt(portraitUv + vec2(0.0, -uTexelSize.y * 5.0));

    float nearAlpha = max(max(aR1, aL1), max(aU1, aD1));
    float farAlpha = max(max(aR2, aL2), max(aU2, aD2));

    // Glow outside the transparent portrait boundary
    float outerEdge = clamp(farAlpha - alpha, 0.0, 1.0);

    // Glow close to the inner silhouette edge
    float innerEdge = clamp(alpha - min(min(aR1, aL1), min(aU1, aD1)), 0.0, 1.0);

    /* ---------------------------------------------
       Dynamic cyan/violet technical glow color
    --------------------------------------------- */

    float colorWave = 0.5 + 0.5 * sin(uTime * 1.05 + vUv.y * 7.5 + glitchGate * 1.4);
    vec3 cyan = vec3(0.04, 0.86, 1.00);
    vec3 violet = vec3(0.62, 0.32, 1.00);
    vec3 emerald = vec3(0.30, 1.00, 0.72);
    vec3 rimColor = mix(cyan, violet, colorWave);

    /* ---------------------------------------------
       Pointer-reactive soft glow
    --------------------------------------------- */

    float mouseDistance = distance(vUv, uMouse);
    float mouseGlow =
      (1.0 - smoothstep(0.0, uHoverRadius, mouseDistance))
      * alpha
      * (0.22 + uHover * 2.4);

    float mouseRing =
      (1.0 - smoothstep(0.045, 0.12, abs(mouseDistance - 0.22)))
      * alpha
      * uHover;

    /* ---------------------------------------------
       Extremely subtle living shimmer
    --------------------------------------------- */

    float scanline = 0.5 + 0.5 * sin(vUv.y * uScanlineScale + uTime * 7.0);
    scanline = mix(0.84, 1.05, scanline);

    float gridX = 1.0 - smoothstep(0.0, 0.008, abs(fract(vUv.x * 20.0) - 0.5));
    float gridY = 1.0 - smoothstep(0.0, 0.008, abs(fract(vUv.y * 25.0) - 0.5));
    float holoGrid = (gridX + gridY) * 0.025 * alpha * uGridOpacity;

    float shimmer =
      sin(vUv.y * 34.0 + uTime * 1.7) *
      cos(vUv.x * 27.0 - uTime * 1.25);

    shimmer *= 0.018 * alpha;

    /* ---------------------------------------------
       Preserve face image, only enrich lighting
    --------------------------------------------- */

    vec3 color = vec3(redSample.r, base.g, blueSample.b);
    color = mix(color, base.rgb, 0.72);

    // Preserve the portrait, but push it into a holographic projection space.
    color = mix(color, color * vec3(0.78, 1.04, 1.16), 0.42);
    color = mix(rimColor * (0.55 + bandNoise * 0.45), color, uIntro);
    color *= scanline;
    color += rimColor * holoGrid;

    // Edge/rim glow
    color += rimColor * innerEdge * (0.18 + uHover * 0.16);
    color += rimColor * outerEdge * (1.15 + uHover * 0.34);

    // Mouse reactive lighting
    color += vec3(0.12, 0.62, 1.00) * mouseGlow * 1.05;
    color += mix(cyan, emerald, colorWave) * mouseRing * 0.95;
    color += rimColor * mouseWarp * 9.0 * alpha;
    color += rimColor * glitchGate * 0.055 * alpha;
    color += rimColor * introReverse * (0.22 + bandNoise * 0.2) * introMask;

    // Subtle motion texture
    color += vec3(shimmer);

    // Let the rim glow remain slightly visible outside the subject
    float finalAlpha = max(alpha * 0.94, outerEdge * (0.56 + uHover * 0.18));
    finalAlpha = max(finalAlpha, (holoGrid * 0.7 + mouseRing * 0.12) * alpha);
    finalAlpha *= mix(introMask * (0.35 + bandNoise * 0.65), 1.0, uIntro);

    gl_FragColor = vec4(color, finalAlpha);
  }
`;

function getAlphaBounds(image, alphaThreshold = 34) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);

  const { data, width, height } = ctx.getImageData(0, 0, widthSafe(canvas.width), widthSafe(canvas.height));
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (data[(y * width + x) * 4 + 3] > alphaThreshold) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  if (minX >= maxX || minY >= maxY) {
    return {
      aspect: image.width / image.height,
      uvOffset: new THREE.Vector2(0, 0),
      uvScale: new THREE.Vector2(1, 1),
    };
  }

  const padX = Math.max(8, (maxX - minX) * 0.06);
  const padY = Math.max(8, (maxY - minY) * 0.04);
  const cropMinX = Math.max(0, minX - padX);
  const cropMaxX = Math.min(width, maxX + padX);
  const cropMinY = Math.max(0, minY - padY);
  const cropMaxY = Math.min(height, maxY + padY);
  const cropWidth = cropMaxX - cropMinX;
  const cropHeight = cropMaxY - cropMinY;

  return {
    aspect: cropWidth / cropHeight,
    uvOffset: new THREE.Vector2(cropMinX / width, 1 - cropMaxY / height),
    uvScale: new THREE.Vector2(cropWidth / width, cropHeight / height),
  };
}

function widthSafe(value) {
  return Math.max(1, value);
}

/* =========================================================
   Shader Portrait Plane
========================================================= */

function PortraitShaderPlane({ imageUrl, layout }) {
  const texture = useTexture(imageUrl);
  const materialRef = useRef(null);
  const groupRef = useRef(null);
  const hoverTarget = useRef(0);
  const [bounds, setBounds] = useState(null);

  const aspect =
    bounds?.aspect
      ? bounds.aspect
      : texture?.image?.width && texture?.image?.height
        ? texture.image.width / texture.image.height
      : 0.78;

  const planeHeight = layout.targetHeight;
  const planeWidth = planeHeight * aspect;
  const yOffset = layout.targetHeight * layout.yOffsetFactor;

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTexelSize: { value: new THREE.Vector2(1 / 1024, 1 / 1024) },
      uUvScale: { value: new THREE.Vector2(1, 1) },
      uUvOffset: { value: new THREE.Vector2(0, 0) },
      uMouse: { value: new THREE.Vector2(0.5, 0.52) },
      uTime: { value: 0 },
      uHover: { value: 0 },
      uScanlineScale: { value: layout.scanlineScale },
      uGridOpacity: { value: layout.gridOpacity },
      uHoverRadius: { value: layout.hoverRadius },
      uIntro: { value: 0 },
    }),
    [layout, texture],
  );

  useEffect(() => {
    if (!texture?.image) return;

    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;

    uniforms.uTexelSize.value.set(
      1 / texture.image.width,
      1 / texture.image.height,
    );

    const measuredBounds = getAlphaBounds(texture.image);
    uniforms.uUvScale.value.copy(measuredBounds.uvScale);
    uniforms.uUvOffset.value.copy(measuredBounds.uvOffset);
    setBounds(measuredBounds);
  }, [texture, uniforms]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    uniforms.uTime.value = time;
    uniforms.uHover.value = THREE.MathUtils.damp(
      uniforms.uHover.value,
      hoverTarget.current,
      5.0,
      delta,
    );
    uniforms.uScanlineScale.value = THREE.MathUtils.damp(
      uniforms.uScanlineScale.value,
      layout.scanlineScale,
      6.0,
      delta,
    );
    uniforms.uGridOpacity.value = THREE.MathUtils.damp(
      uniforms.uGridOpacity.value,
      layout.gridOpacity,
      6.0,
      delta,
    );
    uniforms.uHoverRadius.value = layout.hoverRadius;
    uniforms.uIntro.value = THREE.MathUtils.damp(
      uniforms.uIntro.value,
      1,
      1.95,
      delta,
    );

    // Very restrained living presence.
    // Does not change placement; only tiny atmospheric motion.
    if (groupRef.current) {
      const introLift = 1 - uniforms.uIntro.value;
      groupRef.current.rotation.y = Math.sin(time * 0.22) * 0.012 + introLift * Math.sin(time * 8.0) * 0.05;
      groupRef.current.rotation.x = Math.cos(time * 0.18) * 0.006;
      groupRef.current.scale.setScalar(1 + introLift * 0.035);
    }
  });

  return (
    <group ref={groupRef} position={[0, yOffset, 0]}>
      <mesh
        onPointerEnter={() => {
          hoverTarget.current = 1;
        }}
        onPointerLeave={() => {
          hoverTarget.current = 0;
          uniforms.uMouse.value.set(0.5, 0.52);
        }}
        onPointerMove={(event) => {
          if (event.uv) {
            uniforms.uMouse.value.set(event.uv.x, event.uv.y);
          }
        }}
      >
        <planeGeometry args={[planeWidth, planeHeight, 1, 1]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   Public Component
   Same wrapper style as your particle component
========================================================= */

export default function LandingPortraitShader({
  imageUrl = "/assets/bineet.png",
  className = "",
}) {
  const [layout, setLayout] = useState(PORTRAIT_LAYOUT.desktop);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const updateLayout = () => {
      setLayout(
        mediaQuery.matches
          ? PORTRAIT_LAYOUT.mobile
          : PORTRAIT_LAYOUT.desktop,
      );
    };

    updateLayout();
    mediaQuery.addEventListener("change", updateLayout);

    return () => mediaQuery.removeEventListener("change", updateLayout);
  }, []);

  return (
    <div
      className={`landing-portrait-network landing-portrait-shader ${className}`}
      role="img"
      aria-label="Holographic portrait of Bineet Kumar Mohanta"
    >
      <div className="landing-portrait-digital-ring" aria-hidden="true" />
      <div className="landing-portrait-glow" aria-hidden="true" />

      <Canvas
        camera={{ position: [0, 0, 40], fov: 34 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <PortraitShaderPlane imageUrl={imageUrl} layout={layout} />
      </Canvas>
    </div>
  );
}
