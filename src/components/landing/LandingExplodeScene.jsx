import { Line, RoundedBox, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { useMemo, useRef } from "react";

const domainTags = [
  { label: "NETWORK", sub: "biology", color: "#bef264", rest: [0, 0, 0], hover: [-2.08, 1.05, 0.65] },
  { label: "GNN", sub: "graphs", color: "#a78bfa", rest: [0, 0, 0], hover: [2.05, 0.92, 0.52] },
  { label: "DATA", sub: "matrix", color: "#67e8f9", rest: [0, 0, 0], hover: [0.08, 1.78, 0.76] },
  { label: "BIOINFO", sub: "omics", color: "#2dd4bf", rest: [0, 0, 0], hover: [-1.95, -0.92, 0.48] },
  { label: "AI", sub: "models", color: "#f0abfc", rest: [0, 0, 0], hover: [1.88, -0.92, 0.58] },
  { label: "CODE", sub: "tools", color: "#facc15", rest: [0, 0, 0], hover: [0, -1.7, 0.7] },
];

function DomainTag({ item, isHover, index }) {
  const width = item.label.length * 0.16 + 0.48;
  return (
    <motion.group
      position={item.rest}
      animate={{
        x: isHover ? item.hover[0] : item.rest[0],
        y: isHover ? item.hover[1] : item.rest[1],
        z: isHover ? item.hover[2] : item.rest[2],
        scale: isHover ? 1 : 0.12,
        opacity: isHover ? 1 : 0,
        rotateX: isHover ? 0.22 * (index % 2 ? -1 : 1) : 0,
        rotateY: isHover ? 0.34 * (index % 2 ? 1 : -1) : 0,
      }}
      transition={{ type: "spring", stiffness: 130, damping: 16, delay: index * 0.025 }}
    >
      <RoundedBox args={[width, 0.36, 0.09]} radius={0.08} smoothness={8}>
        <meshStandardMaterial
          color="#07101d"
          emissive={item.color}
          emissiveIntensity={isHover ? 0.46 : 0}
          roughness={0.18}
          metalness={0.18}
          transparent
          opacity={isHover ? 0.98 : 0}
        />
      </RoundedBox>
      <mesh position={[-width / 2 + 0.16, 0, 0.07]}>
        <sphereGeometry args={[0.055, 14, 14]} />
        <meshStandardMaterial color={item.color} emissive={item.color} emissiveIntensity={1.1} roughness={0.3} transparent opacity={isHover ? 1 : 0} />
      </mesh>
      <Text
        position={[0.05, 0.048, 0.082]}
        fontSize={0.118}
        letterSpacing={0.05}
        anchorX="center"
        anchorY="middle"
        color="#f8fdff"
        outlineWidth={0.008}
        outlineColor={item.color}
        fillOpacity={isHover ? 1 : 0}
      >
        {item.label}
      </Text>
      <Text
        position={[0.05, -0.078, 0.082]}
        fontSize={0.056}
        letterSpacing={0.08}
        anchorX="center"
        anchorY="middle"
        color="#dbeafe"
        outlineWidth={0.002}
        outlineColor="#020817"
        fillOpacity={isHover ? 0.92 : 0}
      >
        {item.sub}
      </Text>
    </motion.group>
  );
}

function CoreObjects({ isHover, isPress }) {
  const groupRef = useRef(null);
  const connectors = useMemo(
    () =>
      domainTags.map((item, index) => ({
        color: item.color,
        position: item.hover,
        scale: 0.045 + index * 0.004,
      })),
    [],
  );

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z += delta * (isHover ? 0.18 : 0.04);
  });

  return (
    <group ref={groupRef}>
      <motion.group animate={{ scale: isHover ? 1 : 0.05 }} transition={{ type: "spring", stiffness: 150, damping: 18 }}>
        {[0, 1, 2, 3, 4, 5].map((index) => {
          const angle = (index / 6) * Math.PI * 2;
          const x = Math.cos(angle) * 0.34;
          const y = Math.sin(angle) * 0.34;
          return (
            <group key={index}>
              <Line points={[[0, 0, 0], [x, y, 0.03]]} color="#67e8f9" lineWidth={0.55} transparent opacity={isHover ? 0.38 : 0} />
              <mesh position={[x, y, 0.04]}>
                <sphereGeometry args={[0.045, 10, 10]} />
                <meshStandardMaterial color="#67e8f9" emissive="#67e8f9" emissiveIntensity={0.9} transparent opacity={isHover ? 1 : 0} />
              </mesh>
            </group>
          );
        })}
        <mesh>
          <torusGeometry args={[0.46, 0.012, 8, 80]} />
          <meshStandardMaterial color="#bef264" emissive="#bef264" emissiveIntensity={0.42} transparent opacity={isHover ? 0.9 : 0} />
        </mesh>
      </motion.group>
      {connectors.map((item, index) => (
        <motion.group
          key={`line-${item.color}-${index}`}
          animate={{ scale: isHover ? 1 : 0.05, opacity: isHover ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 18, delay: index * 0.015 }}
        >
          <Line
            points={[[0, 0, -0.16], [item.position[0] * 0.58, item.position[1] * 0.58, item.position[2] * 0.4]]}
            color={item.color}
            lineWidth={0.7}
            transparent
            opacity={0.38}
          />
        </motion.group>
      ))}
      {connectors.map((item, index) => (
        <motion.mesh
          key={`${item.color}-${index}`}
          position={[0, 0, -0.08]}
          animate={{
            x: isHover ? item.position[0] * 0.58 : 0,
            y: isHover ? item.position[1] * 0.58 : 0,
            z: isHover ? item.position[2] * 0.4 : -0.08,
            scale: isHover ? item.scale : 0.012,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 17, delay: index * 0.02 }}
        >
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial color={item.color} emissive={item.color} emissiveIntensity={0.8} roughness={0.32} />
        </motion.mesh>
      ))}
    </group>
  );
}

export default function LandingExplodeScene({ isHover, isPress, mouseX, mouseY }) {
  return (
    <Canvas dpr={[1, 1.35]} camera={{ position: [0, 0, 4.7], fov: 42 }} resize={{ scroll: false, offsetSize: true }}>
      <ambientLight intensity={0.52} />
      <pointLight position={[-2, 2, 4]} intensity={1.4} color="#67e8f9" />
      <pointLight position={[2, -2, 3]} intensity={0.9} color="#a78bfa" />
      <ResponsiveConstellation isHover={isHover} isPress={isPress} mouseX={mouseX} mouseY={mouseY} />
    </Canvas>
  );
}

function ResponsiveConstellation({ isHover, isPress, mouseX, mouseY }) {
  const groupRef = useRef(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const targetY = mouseX.get() / 420;
    const targetX = mouseY.get() / -420;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.08;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <CoreObjects isHover={isHover} isPress={isPress} />
      {domainTags.map((item, index) => (
        <DomainTag key={item.label} item={item} index={index} isHover={isHover} />
      ))}
    </group>
  );
}
