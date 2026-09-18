import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ImpactEffectsProps {
  progressRef: React.MutableRefObject<number>;
}

export const ImpactEffects: React.FC<ImpactEffectsProps> = ({ progressRef }) => {
  const shockwaveRef = useRef<THREE.Mesh>(null);
  const flashLightRef = useRef<THREE.PointLight>(null);
  const sparksRef = useRef<THREE.Points>(null);
  const ambientParticlesRef = useRef<THREE.Points>(null);

  // 60 burst spark particle trajectories
  const sparkData = useMemo(() => {
    const positions = new Float32Array(60 * 3);
    const velocities: THREE.Vector3[] = [];

    for (let i = 0; i < 60; i++) {
      positions[i * 3] = -0.2;
      positions[i * 3 + 1] = 0.75;
      positions[i * 3 + 2] = 0;

      const angle = Math.random() * Math.PI * 2;
      const elevation = Math.random() * Math.PI - Math.PI / 2;
      const speed = 4 + Math.random() * 6;

      velocities.push(
        new THREE.Vector3(
          Math.cos(angle) * Math.cos(elevation) * speed,
          Math.sin(elevation) * speed + 1.5,
          Math.sin(angle) * Math.cos(elevation) * speed
        )
      );
    }
    return { positions, velocities };
  }, []);

  // Ambient dust particles (250 motes)
  const ambientData = useMemo(() => {
    const count = 250;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const cyan = new THREE.Color('#00F0FF');
    const violet = new THREE.Color('#8B5CF6');

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = Math.random() * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 16;

      const col = Math.random() > 0.5 ? cyan : violet;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const p = progressRef.current; // 0.0 to 1.0

    // Impact triggers at p = 0.52 to 0.65
    if (p >= 0.52 && p <= 0.65) {
      const impT = (p - 0.52) / 0.13; // 0 to 1

      // 1. Shockwave Ground Ring
      if (shockwaveRef.current) {
        shockwaveRef.current.visible = true;
        const scale = 0.2 + impT * 7.0;
        shockwaveRef.current.scale.set(scale, scale, 1);
        const mat = shockwaveRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity = Math.max(0, (1 - impT) * 0.9);
      }

      // 2. Flash Light Burst
      if (flashLightRef.current) {
        flashLightRef.current.intensity = (1 - impT) * 12;
      }

      // 3. Sparks Burst
      if (sparksRef.current) {
        sparksRef.current.visible = true;
        const posAttr = sparksRef.current.geometry.attributes.position as THREE.BufferAttribute;
        const posArray = posAttr.array as Float32Array;

        sparkData.velocities.forEach((vel, i) => {
          posArray[i * 3] = -0.2 + vel.x * impT * 0.7;
          posArray[i * 3 + 1] = Math.max(0.02, 0.75 + vel.y * impT * 0.7 - 5 * (impT * impT));
          posArray[i * 3 + 2] = vel.z * impT * 0.7;
        });
        posAttr.needsUpdate = true;

        const mat = sparksRef.current.material as THREE.PointsMaterial;
        mat.opacity = Math.max(0, 1 - impT);
      }
    } else {
      if (shockwaveRef.current) shockwaveRef.current.visible = false;
      if (flashLightRef.current) flashLightRef.current.intensity = 0;
      if (sparksRef.current) sparksRef.current.visible = false;
    }

    // Ambient floating dust
    if (ambientParticlesRef.current) {
      const posAttr = ambientParticlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;
      for (let i = 0; i < 250; i++) {
        posArray[i * 3 + 1] += Math.sin(time * 0.8 + i) * 0.003;
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Ground Shockwave */}
      <mesh
        ref={shockwaveRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-0.2, 0.02, 0]}
        visible={false}
      >
        <ringGeometry args={[0.85, 1.0, 48]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>

      {/* Pointlight Flash */}
      <pointLight
        ref={flashLightRef}
        position={[-0.2, 0.75, 0]}
        color="#00F0FF"
        distance={8}
        intensity={0}
      />

      {/* Impact Sparks */}
      <points ref={sparksRef} visible={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[sparkData.positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.09}
          color="#00F0FF"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Ambient Floating Dust Motes */}
      <points ref={ambientParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[ambientData.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[ambientData.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};
