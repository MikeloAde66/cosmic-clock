"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// 3D Orbital Rings with Axial Precession
function OrbitRings() {
  const outerRingRef = useRef<THREE.Group>(null);
  const innerRingRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (outerRingRef.current) {
      // Slow rotation representing axial precession (~25,772 yr cycle)
      outerRingRef.current.rotation.z += delta * 0.05;
      outerRingRef.current.rotation.x += delta * 0.02;
    }
    if (innerRingRef.current) {
      // Counter-rotation for planetary orbit simulation
      innerRingRef.current.rotation.z -= delta * 0.1;
      innerRingRef.current.rotation.y += delta * 0.03;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group>
      {/* Central Solar Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial color="#f59e0b" wireframe />
      </mesh>

      {/* Precession Outer Ring (Tilted 23.44 degrees like Earth's axial tilt) */}
      <group ref={outerRingRef} rotation={[0.41, 0, 0]}>
        <mesh>
          <ringGeometry args={[3.2, 3.25, 64]} />
          <meshBasicMaterial color="#fbbf24" side={THREE.DoubleSide} transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Secondary Orbital Ring */}
      <group ref={innerRingRef} rotation={[-0.2, 0.5, 0]}>
        <mesh>
          <ringGeometry args={[2.2, 2.23, 64]} />
          <meshBasicMaterial color="#34d399" side={THREE.DoubleSide} transparent opacity={0.4} />
        </mesh>
      </group>
    </group>
  );
}

export default function CosmicCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#fbbf24" />
        
        {/* Deep Space Background Particle Field */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
        {/* Animated 3D Rings */}
        <OrbitRings />
        
        {/* Interactive Camera Mouse Controls */}
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
