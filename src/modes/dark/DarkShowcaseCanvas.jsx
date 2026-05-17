import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";

const palettes = {
  about: ["#67e8f9", "#a78bfa", "#bef264"],
  skills: ["#38bdf8", "#f0abfc", "#22c55e"],
  education: ["#60a5fa", "#facc15", "#67e8f9"],
  research: ["#2dd4bf", "#a78bfa", "#f472b6"],
  contact: ["#67e8f9", "#fb7185", "#bef264"],
};

function ShowcaseObjects({ workspace }) {
  const groupRef = useRef(null);
  const colors = palettes[workspace.id] || palettes.about;
  const objects = useMemo(
    () =>
      Array.from({ length: 9 }, (_, index) => ({
        color: colors[index % colors.length],
        position: [
          Math.cos(index * 0.9) * (1.45 + (index % 3) * 0.28),
          Math.sin(index * 1.2) * 0.92,
          -0.7 + (index % 4) * 0.42,
        ],
        scale: 0.28 + (index % 4) * 0.06,
        speed: 0.7 + index * 0.08,
      })),
    [colors],
  );

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.18;
    groupRef.current.rotation.x = Math.sin(Date.now() * 0.00035) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {objects.map((item, index) => (
        <Float key={`${workspace.id}-${index}`} speed={item.speed} rotationIntensity={0.65} floatIntensity={0.7}>
          <mesh position={item.position} scale={item.scale}>
            {index % 3 === 0 ? (
              <icosahedronGeometry args={[1, 1]} />
            ) : index % 3 === 1 ? (
              <torusGeometry args={[0.76, 0.22, 18, 44]} />
            ) : (
              <octahedronGeometry args={[1, 0]} />
            )}
            <MeshDistortMaterial color={item.color} roughness={0.24} metalness={0.18} distort={0.2} speed={1.4} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function DarkShowcaseCanvas({ workspace }) {
  return (
    <Canvas className="dark-showcase-canvas" camera={{ position: [0, 0, 5.2], fov: 46 }} dpr={[1, 1.6]}>
      <ambientLight intensity={0.42} />
      <pointLight position={[3, 4, 5]} intensity={1.2} color="#67e8f9" />
      <pointLight position={[-4, -2, 2]} intensity={0.8} color="#a78bfa" />
      <ShowcaseObjects workspace={workspace} />
    </Canvas>
  );
}
