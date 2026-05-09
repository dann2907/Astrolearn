'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface PlanetProps {
  data: {
    id: string;
    name: string;
    radius: number;
    distance: number;
    speed: number;
    texturePath: string;
    hasRings?: boolean;
  };
  onClick: (data: any) => void;
}

const Planet = ({ data, onClick }: PlanetProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  
  // Textures are in public/planets/**
  const texture = useLoader(THREE.TextureLoader, data.texturePath);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.5 * delta;
    }
    if (orbitRef.current) {
      orbitRef.current.rotation.y += data.speed * delta * 15; // Adjusted speed for viewing
    }
  });

  return (
    <group ref={orbitRef}>
      <mesh
        ref={meshRef}
        position={[data.distance, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onClick(data);
        }}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      >
        <sphereGeometry args={[data.radius, 32, 32]} />
        <meshStandardMaterial map={texture} roughness={0.8} metalness={0.1} />
        
        {data.hasRings && (
          <mesh rotation={[Math.PI / 2 + 0.3, 0, 0]}>
            <ringGeometry args={[data.radius * 1.5, data.radius * 2.5, 64]} />
            <meshStandardMaterial
              color="#c3a171"
              transparent
              opacity={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </mesh>
      
      {/* Orbit Path Visual */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[data.distance - 0.05, data.distance + 0.05, 128]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

const Sun = ({ onClick }: { onClick: (data: any) => void }) => {
  const sunRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, '/planets/matahari.png');

  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.1 * delta;
    }
  });

  const sunData = {
    id: 'matahari',
    name: 'Matahari',
    texturePath: '/planets/matahari.png',
    distStr: 'Pusat (0 km)',
    revStr: '-',
    facts: 'Bintang pusat tata surya kita. Mencakup 99,8% massa dari seluruh sistem tata surya dan ditenagai oleh fusi nuklir.'
  };

  return (
    <group 
      onClick={() => onClick(sunData)} 
      onPointerOver={() => (document.body.style.cursor = 'pointer')} 
      onPointerOut={() => (document.body.style.cursor = 'auto')}
    >
      <mesh ref={sunRef}>
        <sphereGeometry args={[6, 64, 64]} />
        <meshBasicMaterial map={texture} />
      </mesh>
      <pointLight intensity={4} distance={400} color="#ffffee" />
      
      {/* Sun Glow Effect */}
      <mesh>
        <sphereGeometry args={[7.5, 32, 32]} />
        <meshBasicMaterial color="#ffaa00" transparent opacity={0.1} side={THREE.BackSide} />
      </mesh>
    </group>
  );
};

export const SolarSystem3D = ({ onSelectPlanet }: { onSelectPlanet: (data: any) => void }) => {
  // Data migrated strictly from simulasi3d.html
  const planetData = useMemo(() => [
    { id: 'merkurius', name: 'Merkurius', radius: 0.8, distance: 12, speed: 0.04, texturePath: '/planets/merkurius.png', distStr: '57.9 Juta km', revStr: '88 Hari', facts: 'Planet terkecil and terdekat dari Matahari. Tidak memiliki atmosfer untuk menahan panas, sehingga perbedaan suhu siang dan malam sangat ekstrem.' },
    { id: 'venus', name: 'Venus', radius: 1.5, distance: 18, speed: 0.015, texturePath: '/planets/venus.png', distStr: '108.2 Juta km', revStr: '225 Hari', facts: 'Planet terpanas di tata surya karena efek rumah kaca ekstrem. Uniknya, Venus berputar dari timur ke barat (retrogade).' },
    { id: 'bumi', name: 'Bumi', radius: 1.6, distance: 26, speed: 0.01, texturePath: '/planets/bumi.png', distStr: '149.6 Juta km', revStr: '365.25 Hari', facts: 'Satu-satunya tempat di alam semesta yang diketahui menampung kehidupan. Memiliki satu satelit alami, yaitu Bulan.' },
    { id: 'mars', name: 'Mars', radius: 1.1, distance: 34, speed: 0.008, texturePath: '/planets/mars.png', distStr: '227.9 Juta km', revStr: '687 Hari', facts: 'Dijuluki Planet Merah. Memiliki gunung berapi terbesar di tata surya bernama Olympus Mons, yang tingginya 3 kali Gunung Everest.' },
    { id: 'jupiter', name: 'Jupiter', radius: 3.5, distance: 48, speed: 0.002, texturePath: '/planets/jupiter.png', distStr: '778.5 Juta km', revStr: '11.9 Tahun', facts: 'Planet gas raksasa terbesar. Memiliki "Bintik Merah Raksasa", sebuah badai berumur ratusan tahun yang ukurannya lebih besar dari Bumi.' },
    { id: 'saturnus', name: 'Saturnus', radius: 3.0, distance: 64, speed: 0.0009, texturePath: '/planets/saturnus.png', hasRings: true, distStr: '1.4 Miliar km', revStr: '29.5 Tahun', facts: 'Terkenal dengan sistem cincinnya yang megah, terbuat dari miliaran kepingan es dan batuan.' },
    { id: 'uranus', name: 'Uranus', radius: 2.2, distance: 80, speed: 0.0004, texturePath: '/planets/uranus.png', distStr: '2.9 Miliar km', revStr: '84 Tahun', facts: 'Planet es raksasa yang sumbu rotasinya sangat miring, sehingga ia tampak "menggelinding" di sepanjang orbitnya.' },
    { id: 'neptunus', name: 'Neptunus', radius: 2.1, distance: 96, speed: 0.0001, texturePath: '/planets/neptunus.png', distStr: '4.5 Miliar km', revStr: '164.8 Tahun', facts: 'Planet terjauh yang berwarna biru gelap. Memiliki angin supersonik terkencang di tata surya, mencapai 2.100 km/jam.' }
  ], []);

  return (
    <div className="w-full h-full bg-[#020617]">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 80, 100]} fov={45} />
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          maxDistance={300}
          minDistance={20}
        />
        <ambientLight intensity={0.3} />
        <Stars radius={300} depth={60} count={3000} factor={4} saturation={0} fade speed={1} />
        
        <Sun onClick={onSelectPlanet} />
        
        {planetData.map((data) => (
          <Planet key={data.id} data={data} onClick={onSelectPlanet} />
        ))}
      </Canvas>
    </div>
  );
};
