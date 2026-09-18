import React, { useMemo } from 'react';
import * as THREE from 'three';

export const StudioEnvironment: React.FC = () => {
  // Grid lines texture for the reflective floor
  const gridTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#05070D';
      ctx.fillRect(0, 0, 512, 512);

      ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
      ctx.lineWidth = 2;

      // Draw grid
      const step = 32;
      for (let x = 0; x <= 512; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 512);
        ctx.stroke();
      }
      for (let y = 0; y <= 512; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();
      }

      // Neon dots at intersections
      ctx.fillStyle = 'rgba(0, 240, 255, 0.4)';
      for (let x = 0; x <= 512; x += step * 2) {
        for (let y = 0; y <= 512; y += step * 2) {
          ctx.beginPath();
          ctx.arc(x, y, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(16, 16);
    return texture;
  }, []);

  return (
    <group>
      {/* Background Depth Fog */}
      <color attach="background" args={['#05070D']} />
      <fog attach="fog" args={['#05070D', 8, 26]} />

      {/* Main Key Lights */}
      <ambientLight intensity={0.4} color="#CBD5E1" />

      {/* Cyan Rim Light from Left/Back */}
      <directionalLight
        position={[-6, 6, -4]}
        intensity={2.2}
        color="#00F0FF"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Violet Key Light from Right/Front */}
      <directionalLight
        position={[6, 8, 5]}
        intensity={1.8}
        color="#8B5CF6"
      />

      {/* Top Soft White Fill */}
      <directionalLight
        position={[0, 10, 2]}
        intensity={0.9}
        color="#FFFFFF"
      />

      {/* Under-glow Fill */}
      <pointLight position={[0, 0.2, 0]} color="#00F0FF" intensity={1.5} distance={10} />

      {/* High-Tech Floor Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial
          map={gridTexture}
          roughness={0.2}
          metalness={0.8}
          color="#0B1120"
        />
      </mesh>

      {/* Distant Cyber Horizon Rings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, -6]}>
        <ringGeometry args={[14, 14.15, 64]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.15} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, -6]}>
        <ringGeometry args={[18, 18.2, 64]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.1} />
      </mesh>
    </group>
  );
};
