import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MysteriousBoxProps {
  progressRef: React.MutableRefObject<number>;
}

export const MysteriousBox: React.FC<MysteriousBoxProps> = ({ progressRef }) => {
  const boxMasterRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Group>(null);
  const leftFlapRef = useRef<THREE.Group>(null);
  const rightFlapRef = useRef<THREE.Group>(null);
  const coreGlowLightRef = useRef<THREE.PointLight>(null);
  const floatingParticlesRef = useRef<THREE.Points>(null);

  // Floating ambient cyber dust particles
  const particleData = useMemo(() => {
    const count = 48;
    const pos = new Float32Array(count * 3);
    const vels: THREE.Vector3[] = [];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.4;
      pos[i * 3 + 1] = 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.4;

      const speed = 1.5 + Math.random() * 3.0;
      const angle = Math.random() * Math.PI * 2;
      vels.push(new THREE.Vector3(Math.cos(angle) * 0.8, speed, Math.sin(angle) * 0.8));
    }
    return { pos, vels };
  }, []);

  const materials = useMemo(() => {
    return {
      chestDark: new THREE.MeshStandardMaterial({
        color: '#0D1424',
        metalness: 0.85,
        roughness: 0.2,
      }),
      chestTrimCyan: new THREE.MeshStandardMaterial({
        color: '#00F0FF',
        emissive: '#00F0FF',
        emissiveIntensity: 1.8,
        roughness: 0.1,
      }),
      chestGoldAccent: new THREE.MeshStandardMaterial({
        color: '#F59E0B',
        metalness: 0.9,
        roughness: 0.2,
      }),
      chestCoreGlow: new THREE.MeshStandardMaterial({
        color: '#00F0FF',
        emissive: '#00F0FF',
        emissiveIntensity: 3.0,
      }),
      particleMat: new THREE.PointsMaterial({
        size: 0.08,
        color: '#00F0FF',
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
      }),
    };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const p = progressRef.current; // 0.0 to 1.0

    // Box Kinematics:
    // 0.00 - 0.50: Intact hovering
    // 0.50 - 0.65: Opening with physical reaction
    // 0.65 - 1.00: Fade out / sink into floor
    if (boxMasterRef.current) {
      if (p < 0.50) {
        boxMasterRef.current.position.y = 0.72 + Math.sin(time * 3) * 0.05;
        boxMasterRef.current.position.x = -0.2;
        boxMasterRef.current.rotation.y = time * 0.4;
        boxMasterRef.current.scale.set(1, 1, 1);
        if (lidRef.current) lidRef.current.rotation.x = 0;
        if (leftFlapRef.current) leftFlapRef.current.rotation.z = 0;
        if (rightFlapRef.current) rightFlapRef.current.rotation.z = 0;
      } else if (p < 0.68) {
        const openT = (p - 0.50) / 0.18;
        // Impact recoil shift backwards
        boxMasterRef.current.position.x = -0.2 + Math.sin(openT * Math.PI) * 0.12;
        boxMasterRef.current.position.y = THREE.MathUtils.lerp(0.72, 0.45, openT);

        // Lid hinges open
        if (lidRef.current) {
          lidRef.current.rotation.x = THREE.MathUtils.lerp(0, -Math.PI * 0.75, openT);
        }
        if (leftFlapRef.current) {
          leftFlapRef.current.rotation.z = THREE.MathUtils.lerp(0, Math.PI * 0.45, openT);
        }
        if (rightFlapRef.current) {
          rightFlapRef.current.rotation.z = THREE.MathUtils.lerp(0, -Math.PI * 0.45, openT);
        }
      } else {
        const fadeT = Math.min(1, (p - 0.68) / 0.12);
        const scaleDecay = Math.max(0.001, 1 - fadeT);
        boxMasterRef.current.scale.setScalar(scaleDecay);
      }
    }

    // Core pointlight flare
    if (coreGlowLightRef.current) {
      if (p < 0.50) {
        coreGlowLightRef.current.intensity = 2.0 + Math.sin(time * 6) * 0.6;
      } else if (p < 0.65) {
        const openT = (p - 0.50) / 0.15;
        coreGlowLightRef.current.intensity = (1 - openT) * 10;
      } else {
        coreGlowLightRef.current.intensity = 0;
      }
    }

    // Particle burst
    if (floatingParticlesRef.current) {
      if (p >= 0.50 && p < 0.75) {
        floatingParticlesRef.current.visible = true;
        const openT = (p - 0.50) / 0.25;
        const posAttr = floatingParticlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
        const arr = posAttr.array as Float32Array;

        particleData.vels.forEach((v, i) => {
          arr[i * 3] = particleData.pos[i * 3] + v.x * openT * 0.8;
          arr[i * 3 + 1] = particleData.pos[i * 3 + 1] + v.y * openT * 1.2;
          arr[i * 3 + 2] = particleData.pos[i * 3 + 2] + v.z * openT * 0.8;
        });
        posAttr.needsUpdate = true;

        const mat = floatingParticlesRef.current.material as THREE.PointsMaterial;
        mat.opacity = Math.max(0, 1 - openT);
      } else {
        floatingParticlesRef.current.visible = false;
      }
    }
  });

  return (
    <group position={[-0.2, 0, 0]}>
      <group ref={boxMasterRef} position={[0, 0.72, 0]}>
        {/* Main Base Box Body */}
        <mesh position={[0, -0.15, 0]} material={materials.chestDark} castShadow>
          <boxGeometry args={[0.82, 0.55, 0.82]} />
        </mesh>

        {/* Glowing Neon Seams & Edges */}
        <mesh position={[0, -0.15, 0.415]} material={materials.chestTrimCyan}>
          <boxGeometry args={[0.84, 0.04, 0.02]} />
        </mesh>
        <mesh position={[0, -0.15, -0.415]} material={materials.chestTrimCyan}>
          <boxGeometry args={[0.84, 0.04, 0.02]} />
        </mesh>

        {/* Gold Trim Corner Brackets */}
        <mesh position={[0.38, -0.15, 0.38]} material={materials.chestGoldAccent}>
          <boxGeometry args={[0.08, 0.52, 0.08]} />
        </mesh>
        <mesh position={[-0.38, -0.15, 0.38]} material={materials.chestGoldAccent}>
          <boxGeometry args={[0.08, 0.52, 0.08]} />
        </mesh>
        <mesh position={[0.38, -0.15, -0.38]} material={materials.chestGoldAccent}>
          <boxGeometry args={[0.08, 0.52, 0.08]} />
        </mesh>
        <mesh position={[-0.38, -0.15, -0.38]} material={materials.chestGoldAccent}>
          <boxGeometry args={[0.08, 0.52, 0.08]} />
        </mesh>

        {/* Left Side Flap */}
        <group ref={leftFlapRef} position={[-0.41, 0.12, 0]}>
          <mesh position={[-0.01, -0.18, 0]} material={materials.chestDark}>
            <boxGeometry args={[0.04, 0.38, 0.8]} />
          </mesh>
          <mesh position={[-0.02, -0.18, 0]} material={materials.chestTrimCyan}>
            <boxGeometry args={[0.02, 0.04, 0.82]} />
          </mesh>
        </group>

        {/* Right Side Flap */}
        <group ref={rightFlapRef} position={[0.41, 0.12, 0]}>
          <mesh position={[0.01, -0.18, 0]} material={materials.chestDark}>
            <boxGeometry args={[0.04, 0.38, 0.8]} />
          </mesh>
          <mesh position={[0.02, -0.18, 0]} material={materials.chestTrimCyan}>
            <boxGeometry args={[0.02, 0.04, 0.82]} />
          </mesh>
        </group>

        {/* Top Opening Lid (Hinged at the back) */}
        <group ref={lidRef} position={[0, 0.14, -0.41]}>
          <mesh position={[0, 0.12, 0.41]} material={materials.chestDark} castShadow>
            <boxGeometry args={[0.84, 0.24, 0.84]} />
          </mesh>
          <mesh position={[0, 0.245, 0.41]} rotation={[-Math.PI / 2, 0, 0]} material={materials.chestTrimCyan}>
            <torusGeometry args={[0.22, 0.03, 16, 32]} />
          </mesh>
          <mesh position={[0, 0.242, 0.41]} rotation={[-Math.PI / 2, 0, 0]} material={materials.chestGoldAccent}>
            <circleGeometry args={[0.1, 16]} />
          </mesh>
        </group>

        {/* Inner Glowing Core Energy Light */}
        <pointLight ref={coreGlowLightRef} color="#00F0FF" distance={6} intensity={2.5} />
        <mesh position={[0, 0.05, 0]} material={materials.chestCoreGlow}>
          <sphereGeometry args={[0.18, 16, 16]} />
        </mesh>

        {/* Ground Aura Ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.71, 0]}>
          <circleGeometry args={[0.75, 32]} />
          <meshBasicMaterial color="#00F0FF" transparent opacity={0.2} />
        </mesh>
      </group>

      {/* Bursting Glowing Energy Particles */}
      <points ref={floatingParticlesRef} visible={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particleData.pos, 3]}
          />
        </bufferGeometry>
        <primitive object={materials.particleMat} attach="material" />
      </points>
    </group>
  );
};
