"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars, PerspectiveCamera, Html } from "@react-three/drei";
import * as THREE from "three";

interface PlanetData {
  name: string;
  radius: number;
  distance: number;
  speed: number;
  color: string;
  info: string;
}

const Planet = ({ data, speedMultiplier }: { data: PlanetData; speedMultiplier: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.5 * delta;
    }
    if (orbitRef.current) {
      orbitRef.current.rotation.y += data.speed * delta * speedMultiplier * 5;
    }
  });

  return (
    <group ref={orbitRef}>
      <mesh
        ref={meshRef}
        position={[data.distance, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(null)}
      >
        <sphereGeometry args={[data.radius, 32, 32]} />
        <meshStandardMaterial color={data.color} roughness={0.7} metalness={0.2} />
        
        {hovered && (
          <Html distanceFactor={10} position={[0, data.radius + 1, 0]}>
            <div className="bg-slate-900/90 border border-slate-700 p-2 rounded-lg backdrop-blur-md shadow-2xl min-w-30 pointer-events-none">
              <p className="text-xs font-black text-white uppercase mb-1">{data.name}</p>
              <p className="text-[10px] text-slate-300 leading-tight">{data.info}</p>
            </div>
          </Html>
        )}
      </mesh>
      
      {/* Orbit Line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[data.distance - 0.05, data.distance + 0.05, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export default function OrbitSimulation({ 
  speed = 1, 
  planets = "all", 
  height = "400px" 
}: Readonly<{ 
  speed?: number; 
  planets?: "all" | "inner" | "outer";
  height?: string;
}>) {
  const allPlanets: PlanetData[] = [
    { name: "Merkurius", radius: 0.8, distance: 12, speed: 0.04, color: "#9CA3AF", info: "Planet terkecil & terdekat." },
    { name: "Venus", radius: 1.5, distance: 18, speed: 0.015, color: "#FBBF24", info: "Planet terpanas di tata surya." },
    { name: "Bumi", radius: 1.6, distance: 26, speed: 0.01, color: "#3B82F6", info: "Rumah kita yang indah." },
    { name: "Mars", radius: 1.1, distance: 34, speed: 0.008, color: "#EF4444", info: "Planet merah berdebu." },
    { name: "Jupiter", radius: 3.5, distance: 48, speed: 0.002, color: "#F59E0B", info: "Raksasa gas terbesar." },
  ];

  const filteredPlanets = useMemo(() => {
    if (planets === "inner") return allPlanets.slice(0, 4);
    if (planets === "outer") return allPlanets.slice(4);
    return allPlanets;
  }, [planets]);

  return (
    <div 
      className="w-full rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 relative group"
      style={{ height }}
    >
      <div className="absolute top-4 left-4 z-10">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-900/50 px-2 py-1 rounded-md border border-slate-800">
          Simulasi Orbit Interaktif
        </span>
      </div>
      
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 40, 60]} fov={45} />
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          maxDistance={150}
          minDistance={10}
        />
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 0]} intensity={100} color="#FBBF24" />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        
        {/* Sun */}
        <mesh>
          <sphereGeometry args={[6, 32, 32]} />
          <meshBasicMaterial color="#FBBF24" />
          <pointLight intensity={50} distance={100} color="#FBBF24" />
        </mesh>
        
        {filteredPlanets.map((p) => (
          <Planet key={p.name} data={p} speedMultiplier={speed} />
        ))}
      </Canvas>

      <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wide">
          Gunakan Mouse untuk Putar & Zoom
        </p>
      </div>
    </div>
  );
}
