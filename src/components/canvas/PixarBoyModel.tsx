import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { AnimationStage } from '../../types/animation';

interface PixarBoyModelProps {
  stage: AnimationStage;
  mousePos: { x: number; y: number };
  characterXRef: React.MutableRefObject<number>;
  characterZRef: React.MutableRefObject<number>;
  kickProgressRef: React.MutableRefObject<number>;
  walkCycleRef: React.MutableRefObject<number>;
  leanProgressRef: React.MutableRefObject<number>;
}

export const PixarBoyModel: React.FC<PixarBoyModelProps> = ({
  stage,
  mousePos,
  characterXRef,
  characterZRef,
  kickProgressRef,
  walkCycleRef,
  leanProgressRef,
}) => {
  const rootGroupRef = useRef<THREE.Group>(null);
  const meshWalkRef = useRef<THREE.Mesh>(null);
  const meshKickRef = useRef<THREE.Mesh>(null);
  const meshLeanRef = useRef<THREE.Mesh>(null);

  // Load the 3 high-res Pixar cartoon boy pose textures
  const textures = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const walk = loader.load('/assets/boy_walk.jpg');
    const kick = loader.load('/assets/boy_kick.jpg');
    const lean = loader.load('/assets/boy_lean.jpg');

    [walk, kick, lean].forEach((tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
    });

    return { walk, kick, lean };
  }, []);

  useFrame((state, delta) => {
    if (!rootGroupRef.current) return;

    const time = state.clock.getElapsedTime();
    const charX = characterXRef.current;
    const charZ = characterZRef.current;
    const walkT = walkCycleRef.current;
    const kickT = kickProgressRef.current;
    const leanT = leanProgressRef.current;

    // Position root in 3D scene
    rootGroupRef.current.position.x = charX;
    rootGroupRef.current.position.z = charZ;

    // Interactive 3D cursor tilt parallax
    const targetRotY = mousePos.x * 0.25;
    const targetRotX = -mousePos.y * 0.15;
    rootGroupRef.current.rotation.y = THREE.MathUtils.lerp(rootGroupRef.current.rotation.y, targetRotY, delta * 4);
    rootGroupRef.current.rotation.x = THREE.MathUtils.lerp(rootGroupRef.current.rotation.x, targetRotX, delta * 4);

    // Natural breathing & bounce animation
    const breath = Math.sin(time * 2.5) * 0.02;

    // Manage Pose Transitions and Opacities
    if (stage === 'INITIAL' || stage === 'WALK_IN' || stage === 'NOTICE_BOX' || stage === 'WIND_UP') {
      // 1. Walk & Standing Pose Active
      if (meshWalkRef.current) {
        meshWalkRef.current.visible = true;
        const mat = meshWalkRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity = 1.0;

        // Walk cycle vertical bounce & stride tilt
        if (stage === 'WALK_IN') {
          const walkBob = Math.abs(Math.sin(walkT * 9)) * 0.08;
          meshWalkRef.current.position.y = 1.6 + walkBob;
          meshWalkRef.current.rotation.z = Math.sin(walkT * 9) * 0.04;
        } else {
          // Idle breathing
          meshWalkRef.current.position.y = 1.6 + breath;
          meshWalkRef.current.rotation.z = 0;
        }
      }
      if (meshKickRef.current) meshKickRef.current.visible = false;
      if (meshLeanRef.current) meshLeanRef.current.visible = false;
    } else if (stage === 'KICK' || stage === 'IMPACT') {
      // 2. High-Impact Athletic Kick Pose Active
      if (meshWalkRef.current) meshWalkRef.current.visible = false;
      if (meshKickRef.current) {
        meshKickRef.current.visible = true;
        const mat = meshKickRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity = 1.0;

        // Dynamic squash and stretch on kick
        const stretchY = 1.0 + Math.sin(kickT * Math.PI) * 0.08;
        const stretchX = 1.0 - Math.sin(kickT * Math.PI) * 0.04;
        meshKickRef.current.scale.set(stretchX * 2.5, stretchY * 3.3, 1);
        meshKickRef.current.position.y = 1.7 + Math.sin(kickT * Math.PI) * 0.15;
      }
      if (meshLeanRef.current) meshLeanRef.current.visible = false;
    } else if (stage === 'SHATTER' || stage === 'REVEAL_BRAND') {
      // Transition from kick recovery to standing
      if (meshKickRef.current) {
        meshKickRef.current.visible = true;
        meshKickRef.current.position.y = THREE.MathUtils.lerp(meshKickRef.current.position.y, 1.6, delta * 6);
      }
      if (meshWalkRef.current) meshWalkRef.current.visible = false;
      if (meshLeanRef.current) meshLeanRef.current.visible = false;
    } else if (stage === 'WALK_TO_LOGO') {
      // Walking toward ADDIMS letters
      if (meshWalkRef.current) {
        meshWalkRef.current.visible = true;
        const mat = meshWalkRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity = 1.0;
        const walkBob = Math.abs(Math.sin(walkT * 8)) * 0.06;
        meshWalkRef.current.position.y = 1.6 + walkBob;
        meshWalkRef.current.rotation.z = Math.sin(walkT * 8) * 0.03;
      }
      if (meshKickRef.current) meshKickRef.current.visible = false;
      if (meshLeanRef.current) meshLeanRef.current.visible = false;
    } else if (stage === 'LEAN_POSE' || stage === 'COMPLETED') {
      // 3. Proud Lean Pose against the 3D ADDIMS Letters Active
      if (meshWalkRef.current) meshWalkRef.current.visible = false;
      if (meshKickRef.current) meshKickRef.current.visible = false;

      if (meshLeanRef.current) {
        meshLeanRef.current.visible = true;
        const mat = meshLeanRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity = 1.0;

        // Smooth settle easing into lean pose
        meshLeanRef.current.position.y = 1.65 + breath;
        meshLeanRef.current.position.x = THREE.MathUtils.lerp(0, 0.1, leanT);
      }
    }
  });

  return (
    <group ref={rootGroupRef} position={[-7.5, 0, 0]}>
      {/* Soft Contact Shadow under feet */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <circleGeometry args={[0.75, 32]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.5} />
      </mesh>

      {/* 1. Walk Pose Mesh */}
      <mesh ref={meshWalkRef} position={[0, 1.6, 0]} scale={[2.4, 3.2, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={textures.walk}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 2. Kick Pose Mesh */}
      <mesh ref={meshKickRef} position={[0, 1.7, 0]} scale={[2.5, 3.3, 1]} visible={false}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={textures.kick}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 3. Proud Lean Pose Mesh */}
      <mesh ref={meshLeanRef} position={[0, 1.65, 0]} scale={[2.45, 3.25, 1]} visible={false}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={textures.lean}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Ambient Character Rim Glow Aura */}
      <pointLight position={[0, 1.6, 0.8]} color="#FFF0D4" intensity={1.8} distance={5} />
      <pointLight position={[-0.8, 2.2, -0.5]} color="#00F0FF" intensity={1.2} distance={4} />
    </group>
  );
};
