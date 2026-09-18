import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AddimsTypography3DProps {
  progressRef: React.MutableRefObject<number>;
}

// Sculpted 3D Geometries for each letter of "ADDIMS"
const LetterA: React.FC<{ material: THREE.Material; glowMaterial: THREE.Material }> = ({ material, glowMaterial }) => (
  <group>
    <mesh position={[-0.22, 0, 0]} rotation={[0, 0, -0.22]} material={material} castShadow>
      <boxGeometry args={[0.15, 1.1, 0.28]} />
    </mesh>
    <mesh position={[0.22, 0, 0]} rotation={[0, 0, 0.22]} material={material} castShadow>
      <boxGeometry args={[0.15, 1.1, 0.28]} />
    </mesh>
    <mesh position={[0, 0.52, 0]} material={material} castShadow>
      <boxGeometry args={[0.28, 0.15, 0.28]} />
    </mesh>
    <mesh position={[0, -0.05, 0]} material={material} castShadow>
      <boxGeometry args={[0.34, 0.12, 0.26]} />
    </mesh>
    <mesh position={[0, -0.05, 0.145]} material={glowMaterial}>
      <boxGeometry args={[0.3, 0.03, 0.02]} />
    </mesh>
  </group>
);

const LetterD: React.FC<{ material: THREE.Material; glowMaterial: THREE.Material }> = ({ material, glowMaterial }) => (
  <group>
    <mesh position={[-0.22, 0, 0]} material={material} castShadow>
      <boxGeometry args={[0.15, 1.05, 0.28]} />
    </mesh>
    <mesh position={[0.02, 0.45, 0]} material={material} castShadow>
      <boxGeometry args={[0.36, 0.15, 0.28]} />
    </mesh>
    <mesh position={[0.02, -0.45, 0]} material={material} castShadow>
      <boxGeometry args={[0.36, 0.15, 0.28]} />
    </mesh>
    <mesh position={[0.2, 0, 0]} rotation={[Math.PI / 2, 0, 0]} material={material} castShadow>
      <cylinderGeometry args={[0.45, 0.45, 0.28, 16, 1, false, -Math.PI / 2, Math.PI]} />
    </mesh>
    <mesh position={[-0.22, 0, 0.145]} material={glowMaterial}>
      <boxGeometry args={[0.04, 0.95, 0.02]} />
    </mesh>
  </group>
);

const LetterI: React.FC<{ material: THREE.Material; glowMaterial: THREE.Material }> = ({ material, glowMaterial }) => (
  <group>
    <mesh position={[0, 0, 0]} material={material} castShadow>
      <boxGeometry args={[0.16, 1.05, 0.28]} />
    </mesh>
    <mesh position={[0, 0.46, 0]} material={material} castShadow>
      <boxGeometry args={[0.32, 0.13, 0.28]} />
    </mesh>
    <mesh position={[0, -0.46, 0]} material={material} castShadow>
      <boxGeometry args={[0.32, 0.13, 0.28]} />
    </mesh>
    <mesh position={[0, 0, 0.145]} material={glowMaterial}>
      <boxGeometry args={[0.04, 0.95, 0.02]} />
    </mesh>
  </group>
);

const LetterM: React.FC<{ material: THREE.Material; glowMaterial: THREE.Material }> = ({ material, glowMaterial }) => (
  <group>
    <mesh position={[-0.32, 0, 0]} material={material} castShadow>
      <boxGeometry args={[0.14, 1.05, 0.28]} />
    </mesh>
    <mesh position={[0.32, 0, 0]} material={material} castShadow>
      <boxGeometry args={[0.14, 1.05, 0.28]} />
    </mesh>
    <mesh position={[-0.16, 0.12, 0]} rotation={[0, 0, -0.45]} material={material} castShadow>
      <boxGeometry args={[0.12, 0.75, 0.28]} />
    </mesh>
    <mesh position={[0.16, 0.12, 0]} rotation={[0, 0, 0.45]} material={material} castShadow>
      <boxGeometry args={[0.12, 0.75, 0.28]} />
    </mesh>
    <mesh position={[0, -0.2, 0.145]} material={glowMaterial}>
      <sphereGeometry args={[0.06, 12, 12]} />
    </mesh>
  </group>
);

const LetterS: React.FC<{ material: THREE.Material; glowMaterial: THREE.Material }> = ({ material, glowMaterial }) => (
  <group>
    <mesh position={[0, 0.45, 0]} material={material} castShadow>
      <boxGeometry args={[0.48, 0.15, 0.28]} />
    </mesh>
    <mesh position={[-0.18, 0.22, 0]} material={material} castShadow>
      <boxGeometry args={[0.14, 0.38, 0.28]} />
    </mesh>
    <mesh position={[0, 0, 0]} material={material} castShadow>
      <boxGeometry args={[0.48, 0.14, 0.28]} />
    </mesh>
    <mesh position={[0.18, -0.22, 0]} material={material} castShadow>
      <boxGeometry args={[0.14, 0.38, 0.28]} />
    </mesh>
    <mesh position={[0, -0.45, 0]} material={material} castShadow>
      <boxGeometry args={[0.48, 0.15, 0.28]} />
    </mesh>
    <mesh position={[0, 0, 0.145]} material={glowMaterial}>
      <boxGeometry args={[0.4, 0.03, 0.02]} />
    </mesh>
  </group>
);

export const AddimsTypography3D: React.FC<AddimsTypography3DProps> = ({ progressRef }) => {
  const containerRef = useRef<THREE.Group>(null);
  const letterRefs = useRef<(THREE.Group | null)[]>([]);

  const materials = useMemo(() => {
    return {
      titanium: new THREE.MeshStandardMaterial({
        color: '#F1F5F9',
        metalness: 0.9,
        roughness: 0.15,
      }),
      neonGlow: new THREE.MeshStandardMaterial({
        color: '#00F0FF',
        emissive: '#00F0FF',
        emissiveIntensity: 2.2,
      }),
      violetBacklight: new THREE.MeshStandardMaterial({
        color: '#8B5CF6',
        emissive: '#8B5CF6',
        emissiveIntensity: 1.5,
      }),
    };
  }, []);

  const letterPositions = useMemo(() => [
    { x: -1.75, y: 0, z: 0 },   // A
    { x: -1.05, y: 0, z: 0 },   // D
    { x: -0.35, y: 0, z: 0 },   // D
    { x: 0.25, y: 0, z: 0 },    // I
    { x: 0.85, y: 0, z: 0 },    // M
    { x: 1.55, y: 0, z: 0 },    // S
  ], []);

  useFrame((state) => {
    if (!containerRef.current) return;
    const time = state.clock.getElapsedTime();
    const p = progressRef.current; // 0.0 to 1.0

    // Typography reveals between p = 0.52 and 0.70, then floats in place
    if (p >= 0.52) {
      containerRef.current.visible = true;
      const revealT = Math.min(1, (p - 0.52) / 0.18);

      if (revealT >= 0.98) {
        containerRef.current.position.y = 1.05 + Math.sin(time * 2) * 0.03;
        containerRef.current.rotation.y = Math.sin(time * 1.2) * 0.02;
      } else {
        containerRef.current.position.y = THREE.MathUtils.lerp(0.2, 1.05, revealT);
      }

      letterRefs.current.forEach((letterGroup, index) => {
        if (!letterGroup) return;
        const target = letterPositions[index];
        const delay = index * 0.08;
        const letterProgress = Math.min(1, Math.max(0, (revealT - delay) / (1 - delay * 0.6)));

        const s = THREE.MathUtils.lerp(0.001, 1, Math.sin(letterProgress * Math.PI * 0.5));
        letterGroup.scale.set(s, s, s);

        letterGroup.position.x = THREE.MathUtils.lerp(0, target.x, letterProgress);
        letterGroup.position.z = THREE.MathUtils.lerp(-0.5, target.z, letterProgress);

        letterGroup.rotation.y = THREE.MathUtils.lerp(Math.PI * 0.6, 0, letterProgress);
        letterGroup.rotation.x = THREE.MathUtils.lerp(-Math.PI * 0.25, 0, letterProgress);
      });
    } else {
      containerRef.current.visible = false;
    }
  });

  return (
    <group ref={containerRef} position={[0.2, 1.05, 0]} visible={false}>
      {/* Dynamic Brand Under-Lighting */}
      <pointLight position={[0, -0.4, 0.6]} color="#00F0FF" intensity={3.5} distance={5} />
      <pointLight position={[1.2, 0.5, -0.4]} color="#8B5CF6" intensity={2.5} distance={4} />

      <group ref={(el) => { letterRefs.current[0] = el; }}>
        <LetterA material={materials.titanium} glowMaterial={materials.neonGlow} />
      </group>
      <group ref={(el) => { letterRefs.current[1] = el; }}>
        <LetterD material={materials.titanium} glowMaterial={materials.neonGlow} />
      </group>
      <group ref={(el) => { letterRefs.current[2] = el; }}>
        <LetterD material={materials.titanium} glowMaterial={materials.neonGlow} />
      </group>
      <group ref={(el) => { letterRefs.current[3] = el; }}>
        <LetterI material={materials.titanium} glowMaterial={materials.neonGlow} />
      </group>
      <group ref={(el) => { letterRefs.current[4] = el; }}>
        <LetterM material={materials.titanium} glowMaterial={materials.neonGlow} />
      </group>
      <group ref={(el) => { letterRefs.current[5] = el; }}>
        <LetterS material={materials.titanium} glowMaterial={materials.neonGlow} />
      </group>

      {/* Floating Aura Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]}>
        <ringGeometry args={[1.6, 2.4, 32]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.25} />
      </mesh>
    </group>
  );
};
