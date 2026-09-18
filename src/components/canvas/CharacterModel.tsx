import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { AnimationStage } from '../../types/animation';

interface CharacterModelProps {
  stage: AnimationStage;
  mousePos: { x: number; y: number };
  characterXRef: React.MutableRefObject<number>;
  characterZRef: React.MutableRefObject<number>;
  kickProgressRef: React.MutableRefObject<number>;
  walkCycleRef: React.MutableRefObject<number>;
  leanProgressRef: React.MutableRefObject<number>;
}

export const CharacterModel: React.FC<CharacterModelProps> = ({
  stage,
  mousePos,
  characterXRef,
  characterZRef,
  kickProgressRef,
  walkCycleRef,
  leanProgressRef,
}) => {
  const rootGroupRef = useRef<THREE.Group>(null);
  const hipMasterRef = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Group>(null);
  const headMasterRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Group>(null);
  const rightEyeRef = useRef<THREE.Group>(null);
  const mouthRef = useRef<THREE.Mesh>(null);
  const leftEyebrowRef = useRef<THREE.Group>(null);
  const rightEyebrowRef = useRef<THREE.Group>(null);

  const leftShoulderRef = useRef<THREE.Group>(null);
  const leftElbowRef = useRef<THREE.Group>(null);
  const leftHandRef = useRef<THREE.Group>(null);

  const rightShoulderRef = useRef<THREE.Group>(null);
  const rightElbowRef = useRef<THREE.Group>(null);
  const rightHandRef = useRef<THREE.Group>(null);

  const leftHipRef = useRef<THREE.Group>(null);
  const leftKneeRef = useRef<THREE.Group>(null);
  const leftFootRef = useRef<THREE.Group>(null);

  const rightHipRef = useRef<THREE.Group>(null);
  const rightKneeRef = useRef<THREE.Group>(null);
  const rightFootRef = useRef<THREE.Group>(null);

  // High-Quality Pixar/Animated Movie Stylized Materials
  const materials = useMemo(() => {
    return {
      // Warm, healthy cartoon skin with soft velvety sheen
      skin: new THREE.MeshStandardMaterial({
        color: '#FCD5B5',
        roughness: 0.45,
        metalness: 0.05,
      }),
      // Cheeks soft blush
      blush: new THREE.MeshStandardMaterial({
        color: '#F87171',
        transparent: true,
        opacity: 0.4,
        roughness: 0.8,
      }),
      // Soft stylized chestnut brown hair
      hair: new THREE.MeshStandardMaterial({
        color: '#3D2314',
        roughness: 0.55,
        metalness: 0.1,
      }),
      hairHighlight: new THREE.MeshStandardMaterial({
        color: '#5C3820',
        roughness: 0.5,
      }),
      // Large lively eyes: Crisp white sclera + vibrant electric blue iris
      eyeWhite: new THREE.MeshStandardMaterial({
        color: '#FFFFFF',
        roughness: 0.1,
      }),
      iris: new THREE.MeshStandardMaterial({
        color: '#0284C7',
        roughness: 0.2,
      }),
      pupil: new THREE.MeshBasicMaterial({
        color: '#09090B',
      }),
      eyeHighlight: new THREE.MeshBasicMaterial({
        color: '#FFFFFF',
      }),
      eyebrows: new THREE.MeshStandardMaterial({
        color: '#26160C',
        roughness: 0.7,
      }),
      mouth: new THREE.MeshStandardMaterial({
        color: '#991B1B',
        roughness: 0.4,
      }),
      teeth: new THREE.MeshStandardMaterial({
        color: '#FFFFFF',
        roughness: 0.2,
      }),

      // Stylish Modern Bomber Jacket: Vibrant Royal Indigo/Cobalt + Crisp White Sleeves + Neon Coral Accents
      jacketBody: new THREE.MeshStandardMaterial({
        color: '#2563EB',
        roughness: 0.35,
        metalness: 0.15,
      }),
      jacketSleeves: new THREE.MeshStandardMaterial({
        color: '#F8FAFC',
        roughness: 0.4,
      }),
      jacketTrim: new THREE.MeshStandardMaterial({
        color: '#FF6B6B',
        roughness: 0.4,
      }),
      jacketCollar: new THREE.MeshStandardMaterial({
        color: '#1E293B',
        roughness: 0.6,
      }),

      // Inner T-Shirt: Pure white with cyber cyan decal
      tshirt: new THREE.MeshStandardMaterial({
        color: '#FFFFFF',
        roughness: 0.6,
      }),
      tshirtEmblem: new THREE.MeshStandardMaterial({
        color: '#00F0FF',
        emissive: '#00F0FF',
        emissiveIntensity: 0.8,
      }),

      // Modern Jeans: Indigo Blue Denim with soft fabric roughness
      jeans: new THREE.MeshStandardMaterial({
        color: '#1E3A8A',
        roughness: 0.75,
        metalness: 0.05,
      }),
      jeansCuff: new THREE.MeshStandardMaterial({
        color: '#3B82F6',
        roughness: 0.7,
      }),
      belt: new THREE.MeshStandardMaterial({
        color: '#0F172A',
        roughness: 0.5,
      }),
      beltBuckle: new THREE.MeshStandardMaterial({
        color: '#E2E8F0',
        metalness: 0.9,
        roughness: 0.2,
      }),

      // Chunky Streetwear Sneakers
      sneakerMain: new THREE.MeshStandardMaterial({
        color: '#FFFFFF',
        roughness: 0.25,
      }),
      sneakerAccent: new THREE.MeshStandardMaterial({
        color: '#FF6B6B',
        roughness: 0.3,
      }),
      sneakerCyan: new THREE.MeshStandardMaterial({
        color: '#00F0FF',
        emissive: '#00F0FF',
        emissiveIntensity: 0.6,
        roughness: 0.2,
      }),
      sneakerSole: new THREE.MeshStandardMaterial({
        color: '#0F172A',
        roughness: 0.4,
      }),
    };
  }, []);

  useFrame((state, delta) => {
    if (!rootGroupRef.current) return;

    const time = state.clock.getElapsedTime();
    const charX = characterXRef.current;
    const charZ = characterZRef.current;
    const kickT = kickProgressRef.current;
    const walkT = walkCycleRef.current;
    const leanT = leanProgressRef.current;

    // Position root
    rootGroupRef.current.position.x = charX;
    rootGroupRef.current.position.z = charZ;

    // Head and Eyes Interactive Look-At Cursor
    if (headMasterRef.current) {
      const targetLookX = mousePos.y * 0.18;
      const targetLookY = mousePos.x * 0.28;
      headMasterRef.current.rotation.x = THREE.MathUtils.lerp(headMasterRef.current.rotation.x, targetLookX, delta * 5);
      headMasterRef.current.rotation.y = THREE.MathUtils.lerp(headMasterRef.current.rotation.y, targetLookY, delta * 5);
    }

    // Pupils micro-movement tracking cursor
    const eyePupilX = mousePos.x * 0.035;
    const eyePupilY = mousePos.y * 0.025;
    if (leftEyeRef.current) {
      leftEyeRef.current.position.x = -0.16 + eyePupilX;
      leftEyeRef.current.position.y = 0.08 + eyePupilY;
    }
    if (rightEyeRef.current) {
      rightEyeRef.current.position.x = 0.16 + eyePupilX;
      rightEyeRef.current.position.y = 0.08 + eyePupilY;
    }

    // Expressive Eyebrows & Smile
    if (leftEyebrowRef.current && rightEyebrowRef.current) {
      // Natural subtle eyebrow emotion
      const browBounce = Math.sin(time * 1.5) * 0.02;
      leftEyebrowRef.current.position.y = 0.24 + browBounce;
      rightEyebrowRef.current.position.y = 0.24 + browBounce;
    }

    // Kinematic Animation States
    if (stage === 'INITIAL' || stage === 'WALK_IN') {
      // Confident, bouncy, charming cartoon walk
      rootGroupRef.current.rotation.y = THREE.MathUtils.lerp(rootGroupRef.current.rotation.y, Math.PI / 2 - 0.15, delta * 6);

      const walkSwing = Math.sin(walkT * 9) * 0.65;
      if (leftHipRef.current) leftHipRef.current.rotation.x = walkSwing;
      if (rightHipRef.current) rightHipRef.current.rotation.x = -walkSwing;

      if (leftKneeRef.current) leftKneeRef.current.rotation.x = walkSwing < 0 ? -walkSwing * 0.9 : 0.1;
      if (rightKneeRef.current) rightKneeRef.current.rotation.x = -walkSwing < 0 ? walkSwing * 0.9 : 0.1;

      // Playful expressive arm swing
      if (leftShoulderRef.current) leftShoulderRef.current.rotation.x = -walkSwing * 0.75;
      if (rightShoulderRef.current) rightShoulderRef.current.rotation.x = walkSwing * 0.75;

      // Bouncy hip & torso bob
      if (hipMasterRef.current) {
        hipMasterRef.current.position.y = 0.92 + Math.abs(Math.sin(walkT * 9)) * 0.08;
        hipMasterRef.current.rotation.y = Math.sin(walkT * 9) * 0.08;
        hipMasterRef.current.rotation.z = Math.sin(walkT * 9) * 0.04;
      }
      if (torsoRef.current) {
        torsoRef.current.rotation.y = -Math.sin(walkT * 9) * 0.08;
      }
    } else if (stage === 'NOTICE_BOX') {
      // Playful stop, looks down at box with a curious smirk
      rootGroupRef.current.rotation.y = THREE.MathUtils.lerp(rootGroupRef.current.rotation.y, Math.PI / 2.3, delta * 5);

      if (leftHipRef.current) leftHipRef.current.rotation.x = THREE.MathUtils.lerp(leftHipRef.current.rotation.x, 0.1, delta * 6);
      if (rightHipRef.current) rightHipRef.current.rotation.x = THREE.MathUtils.lerp(rightHipRef.current.rotation.x, -0.15, delta * 6);
      if (leftKneeRef.current) leftKneeRef.current.rotation.x = THREE.MathUtils.lerp(leftKneeRef.current.rotation.x, 0.1, delta * 6);
      if (rightKneeRef.current) rightKneeRef.current.rotation.x = THREE.MathUtils.lerp(rightKneeRef.current.rotation.x, 0.1, delta * 6);

      if (leftShoulderRef.current) leftShoulderRef.current.rotation.x = THREE.MathUtils.lerp(leftShoulderRef.current.rotation.x, 0.2, delta * 5);
      if (rightShoulderRef.current) rightShoulderRef.current.rotation.x = THREE.MathUtils.lerp(rightShoulderRef.current.rotation.x, -0.15, delta * 5);

      if (hipMasterRef.current) {
        hipMasterRef.current.position.y = THREE.MathUtils.lerp(hipMasterRef.current.position.y, 0.92, delta * 6);
        hipMasterRef.current.rotation.set(0, 0, 0);
      }
    } else if (stage === 'WIND_UP') {
      // Playful anticipation: right leg coils back, arms balance out, torso leans back
      rootGroupRef.current.rotation.y = THREE.MathUtils.lerp(rootGroupRef.current.rotation.y, Math.PI / 2.1, delta * 8);

      if (torsoRef.current) {
        torsoRef.current.rotation.x = THREE.MathUtils.lerp(torsoRef.current.rotation.x, -0.25, delta * 8);
        torsoRef.current.rotation.y = THREE.MathUtils.lerp(torsoRef.current.rotation.y, -0.35, delta * 8);
      }

      if (rightHipRef.current) {
        rightHipRef.current.rotation.x = THREE.MathUtils.lerp(rightHipRef.current.rotation.x, -1.25, delta * 9);
        rightHipRef.current.rotation.z = THREE.MathUtils.lerp(rightHipRef.current.rotation.z, 0.2, delta * 9);
      }
      if (rightKneeRef.current) {
        rightKneeRef.current.rotation.x = THREE.MathUtils.lerp(rightKneeRef.current.rotation.x, 1.45, delta * 9);
      }

      if (leftHipRef.current) leftHipRef.current.rotation.x = THREE.MathUtils.lerp(leftHipRef.current.rotation.x, 0.15, delta * 8);
      if (leftKneeRef.current) leftKneeRef.current.rotation.x = THREE.MathUtils.lerp(leftKneeRef.current.rotation.x, 0.25, delta * 8);

      if (leftShoulderRef.current) {
        leftShoulderRef.current.rotation.x = THREE.MathUtils.lerp(leftShoulderRef.current.rotation.x, 0.7, delta * 8);
        leftShoulderRef.current.rotation.z = THREE.MathUtils.lerp(leftShoulderRef.current.rotation.z, -0.6, delta * 8);
      }
      if (rightShoulderRef.current) {
        rightShoulderRef.current.rotation.x = THREE.MathUtils.lerp(rightShoulderRef.current.rotation.x, -0.5, delta * 8);
        rightShoulderRef.current.rotation.z = THREE.MathUtils.lerp(rightShoulderRef.current.rotation.z, 0.6, delta * 8);
      }
    } else if (stage === 'KICK' || stage === 'IMPACT') {
      // Dynamic, athletic cartoon kick with squash and stretch
      const k = kickT; // 0 to 1

      if (torsoRef.current) {
        torsoRef.current.rotation.x = THREE.MathUtils.lerp(-0.25, 0.18, k);
        torsoRef.current.rotation.y = THREE.MathUtils.lerp(-0.35, 0.55, k);
      }

      if (rightHipRef.current) {
        rightHipRef.current.rotation.x = THREE.MathUtils.lerp(-1.25, 1.5, k);
        rightHipRef.current.rotation.z = THREE.MathUtils.lerp(0.2, -0.08, k);
      }
      if (rightKneeRef.current) {
        rightKneeRef.current.rotation.x = THREE.MathUtils.lerp(1.45, 0.02, k);
      }
      if (rightFootRef.current) {
        rightFootRef.current.rotation.x = THREE.MathUtils.lerp(0, -0.35, k);
      }

      if (leftShoulderRef.current) {
        leftShoulderRef.current.rotation.x = THREE.MathUtils.lerp(0.7, -0.85, k);
        leftShoulderRef.current.rotation.z = -0.35;
      }
      if (rightShoulderRef.current) {
        rightShoulderRef.current.rotation.x = THREE.MathUtils.lerp(-0.5, 0.75, k);
        rightShoulderRef.current.rotation.z = 0.55;
      }
    } else if (stage === 'SHATTER' || stage === 'REVEAL_BRAND') {
      // Foot lands softly, boy watches the glowing 3D ADDIMS letters emerge with awe and joy
      rootGroupRef.current.rotation.y = THREE.MathUtils.lerp(rootGroupRef.current.rotation.y, Math.PI / 2.4, delta * 5);

      if (torsoRef.current) {
        torsoRef.current.rotation.x = THREE.MathUtils.lerp(torsoRef.current.rotation.x, 0, delta * 5);
        torsoRef.current.rotation.y = THREE.MathUtils.lerp(torsoRef.current.rotation.y, 0.1, delta * 5);
      }

      if (rightHipRef.current) {
        rightHipRef.current.rotation.x = THREE.MathUtils.lerp(rightHipRef.current.rotation.x, -0.1, delta * 6);
        rightHipRef.current.rotation.z = THREE.MathUtils.lerp(rightHipRef.current.rotation.z, 0, delta * 6);
      }
      if (rightKneeRef.current) rightKneeRef.current.rotation.x = THREE.MathUtils.lerp(rightKneeRef.current.rotation.x, 0.1, delta * 6);
      if (leftHipRef.current) leftHipRef.current.rotation.x = THREE.MathUtils.lerp(leftHipRef.current.rotation.x, 0.1, delta * 6);

      if (leftShoulderRef.current) {
        leftShoulderRef.current.rotation.x = THREE.MathUtils.lerp(leftShoulderRef.current.rotation.x, 0.1, delta * 5);
        leftShoulderRef.current.rotation.z = THREE.MathUtils.lerp(leftShoulderRef.current.rotation.z, -0.15, delta * 5);
      }
      if (rightShoulderRef.current) {
        rightShoulderRef.current.rotation.x = THREE.MathUtils.lerp(rightShoulderRef.current.rotation.x, 0.1, delta * 5);
        rightShoulderRef.current.rotation.z = THREE.MathUtils.lerp(rightShoulderRef.current.rotation.z, 0.15, delta * 5);
      }
    } else if (stage === 'WALK_TO_LOGO') {
      // Walks happily beside the ADDIMS brand monument
      rootGroupRef.current.rotation.y = THREE.MathUtils.lerp(rootGroupRef.current.rotation.y, Math.PI / 2, delta * 6);

      const walkSwing = Math.sin(walkT * 8) * 0.55;
      if (leftHipRef.current) leftHipRef.current.rotation.x = walkSwing;
      if (rightHipRef.current) rightHipRef.current.rotation.x = -walkSwing;
      if (leftKneeRef.current) leftKneeRef.current.rotation.x = walkSwing < 0 ? -walkSwing * 0.8 : 0.1;
      if (rightKneeRef.current) rightKneeRef.current.rotation.x = -walkSwing < 0 ? walkSwing * 0.8 : 0.1;

      if (leftShoulderRef.current) leftShoulderRef.current.rotation.x = -walkSwing * 0.65;
      if (rightShoulderRef.current) rightShoulderRef.current.rotation.x = walkSwing * 0.65;

      if (hipMasterRef.current) {
        hipMasterRef.current.position.y = 0.92 + Math.abs(Math.sin(walkT * 8)) * 0.06;
      }
    } else if (stage === 'LEAN_POSE' || stage === 'COMPLETED') {
      // Confident, charming, stylish lean pose next to the ADDIMS letters!
      const speedFactor = delta * (4 + leanT * 2);
      rootGroupRef.current.rotation.y = THREE.MathUtils.lerp(rootGroupRef.current.rotation.y, 0.22, speedFactor);

      // Torso leans comfortably toward the logo structure
      if (torsoRef.current) {
        torsoRef.current.rotation.z = THREE.MathUtils.lerp(torsoRef.current.rotation.z, 0.15, speedFactor);
        torsoRef.current.rotation.y = THREE.MathUtils.lerp(torsoRef.current.rotation.y, -0.22, speedFactor);

        // Gentle breathing idle
        const breath = Math.sin(time * 2.2) * 0.015;
        torsoRef.current.position.y = breath;
      }

      // Left Arm: Casual elbow rest on the top of the ADDIMS logo
      if (leftShoulderRef.current) {
        leftShoulderRef.current.rotation.x = THREE.MathUtils.lerp(leftShoulderRef.current.rotation.x, 0.38, speedFactor);
        leftShoulderRef.current.rotation.z = THREE.MathUtils.lerp(leftShoulderRef.current.rotation.z, -1.28, speedFactor);
        leftShoulderRef.current.rotation.y = THREE.MathUtils.lerp(leftShoulderRef.current.rotation.y, 0.32, speedFactor);
      }

      // Right Arm: Relaxed at side / hand in pocket with stylish swagger
      if (rightShoulderRef.current) {
        rightShoulderRef.current.rotation.x = THREE.MathUtils.lerp(rightShoulderRef.current.rotation.x, 0.22, speedFactor);
        rightShoulderRef.current.rotation.z = THREE.MathUtils.lerp(rightShoulderRef.current.rotation.z, 0.32, speedFactor);
        rightShoulderRef.current.rotation.y = THREE.MathUtils.lerp(rightShoulderRef.current.rotation.y, -0.15, speedFactor);
      }

      // Crossed Leg Swagger Stance
      if (leftHipRef.current) {
        leftHipRef.current.rotation.z = THREE.MathUtils.lerp(leftHipRef.current.rotation.z, 0.14, speedFactor);
        leftHipRef.current.rotation.x = THREE.MathUtils.lerp(leftHipRef.current.rotation.x, 0.05, speedFactor);
      }
      if (rightHipRef.current) {
        rightHipRef.current.rotation.z = THREE.MathUtils.lerp(rightHipRef.current.rotation.z, -0.3, speedFactor);
        rightHipRef.current.rotation.x = THREE.MathUtils.lerp(rightHipRef.current.rotation.x, 0.35, speedFactor);
      }
      if (rightKneeRef.current) {
        rightKneeRef.current.rotation.x = THREE.MathUtils.lerp(rightKneeRef.current.rotation.x, 0.32, speedFactor);
      }
    }
  });

  return (
    <group ref={rootGroupRef} position={[-7.5, 0, 0]} scale={[1.15, 1.15, 1.15]}>
      {/* Soft Contact Shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <circleGeometry args={[0.65, 32]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.4} />
      </mesh>

      {/* Hip Master Group */}
      <group ref={hipMasterRef} position={[0, 0.92, 0]}>
        {/* Torso & Upper Body Group */}
        <group ref={torsoRef}>
          {/* Inner T-Shirt Base */}
          <mesh position={[0, 0.28, 0]} material={materials.tshirt} castShadow>
            <cylinderGeometry args={[0.26, 0.24, 0.52, 24]} />
          </mesh>

          {/* Cyber Emblem on Chest */}
          <mesh position={[0, 0.36, 0.242]} material={materials.tshirtEmblem}>
            <circleGeometry args={[0.065, 16]} />
          </mesh>

          {/* Stylish Bomber Jacket Outer Body */}
          <mesh position={[0, 0.28, 0]} material={materials.jacketBody} castShadow>
            <cylinderGeometry args={[0.3, 0.28, 0.54, 24, 1, true, -Math.PI * 0.72, Math.PI * 1.44]} />
          </mesh>

          {/* Jacket Front Coral Zip Trims */}
          <mesh position={[-0.12, 0.28, 0.24]} rotation={[0, 0.4, 0]} material={materials.jacketTrim}>
            <boxGeometry args={[0.035, 0.52, 0.02]} />
          </mesh>
          <mesh position={[0.12, 0.28, 0.24]} rotation={[0, -0.4, 0]} material={materials.jacketTrim}>
            <boxGeometry args={[0.035, 0.52, 0.02]} />
          </mesh>

          {/* Rounded Jacket Collar */}
          <mesh position={[0, 0.54, -0.02]} rotation={[Math.PI / 2, 0, -Math.PI * 0.15]} material={materials.jacketCollar}>
            <torusGeometry args={[0.18, 0.045, 16, 24, Math.PI * 1.3]} />
          </mesh>

          {/* Neck */}
          <mesh position={[0, 0.58, 0]} material={materials.skin}>
            <cylinderGeometry args={[0.11, 0.12, 0.14, 20]} />
          </mesh>

          {/* --- CUTE STYLIZED 3D HEAD & FACE --- */}
          <group ref={headMasterRef} position={[0, 0.88, 0.04]}>
            {/* Cute Rounded Head Shape */}
            <mesh material={materials.skin} castShadow>
              <sphereGeometry args={[0.34, 32, 32]} />
            </mesh>

            {/* Cute Rounded Cheeks */}
            <mesh position={[-0.22, -0.04, 0.18]} material={materials.blush}>
              <sphereGeometry args={[0.08, 16, 16]} />
            </mesh>
            <mesh position={[0.22, -0.04, 0.18]} material={materials.blush}>
              <sphereGeometry args={[0.08, 16, 16]} />
            </mesh>

            {/* Cute Stylized Nose */}
            <mesh position={[0, 0.02, 0.33]} material={materials.skin}>
              <sphereGeometry args={[0.045, 16, 16]} />
            </mesh>

            {/* Cute Friendly Smiling Mouth */}
            <group position={[0, -0.12, 0.29]}>
              <mesh ref={mouthRef} rotation={[Math.PI, 0, 0]} material={materials.mouth}>
                <cylinderGeometry args={[0.07, 0.07, 0.04, 16, 1, false, 0, Math.PI]} />
              </mesh>
              {/* Top Teeth Row */}
              <mesh position={[0, 0.015, 0.01]} material={materials.teeth}>
                <boxGeometry args={[0.09, 0.02, 0.02]} />
              </mesh>
            </group>

            {/* Expressive Eyebrows */}
            <group ref={leftEyebrowRef} position={[-0.16, 0.22, 0.27]} rotation={[0, 0, 0.15]}>
              <mesh material={materials.eyebrows}>
                <boxGeometry args={[0.13, 0.035, 0.03]} />
              </mesh>
            </group>
            <group ref={rightEyebrowRef} position={[0.16, 0.22, 0.27]} rotation={[0, 0, -0.15]}>
              <mesh material={materials.eyebrows}>
                <boxGeometry args={[0.13, 0.035, 0.03]} />
              </mesh>
            </group>

            {/* Left Eye (Sclera + Vibrant Blue Iris + Pupil + Light Reflection) */}
            <group position={[-0.15, 0.08, 0.28]}>
              <mesh material={materials.eyeWhite}>
                <sphereGeometry args={[0.085, 20, 20]} />
              </mesh>
              {/* Dynamic Pupil Group tracking cursor */}
              <group ref={leftEyeRef} position={[0, 0, 0.06]}>
                <mesh material={materials.iris}>
                  <circleGeometry args={[0.055, 20]} />
                </mesh>
                <mesh position={[0, 0, 0.005]} material={materials.pupil}>
                  <circleGeometry args={[0.032, 16]} />
                </mesh>
                {/* Specular Light Catch */}
                <mesh position={[0.018, 0.018, 0.01]} material={materials.eyeHighlight}>
                  <circleGeometry args={[0.015, 12]} />
                </mesh>
              </group>
            </group>

            {/* Right Eye */}
            <group position={[0.15, 0.08, 0.28]}>
              <mesh material={materials.eyeWhite}>
                <sphereGeometry args={[0.085, 20, 20]} />
              </mesh>
              {/* Dynamic Pupil Group tracking cursor */}
              <group ref={rightEyeRef} position={[0, 0, 0.06]}>
                <mesh material={materials.iris}>
                  <circleGeometry args={[0.055, 20]} />
                </mesh>
                <mesh position={[0, 0, 0.005]} material={materials.pupil}>
                  <circleGeometry args={[0.032, 16]} />
                </mesh>
                {/* Specular Light Catch */}
                <mesh position={[0.018, 0.018, 0.01]} material={materials.eyeHighlight}>
                  <circleGeometry args={[0.015, 12]} />
                </mesh>
              </group>
            </group>

            {/* Cute Stylized Rounded Ears */}
            <mesh position={[-0.34, 0.02, -0.02]} rotation={[0, -0.2, 0]} material={materials.skin}>
              <sphereGeometry args={[0.085, 16, 16]} />
            </mesh>
            <mesh position={[0.34, 0.02, -0.02]} rotation={[0, 0.2, 0]} material={materials.skin}>
              <sphereGeometry args={[0.085, 16, 16]} />
            </mesh>

            {/* --- SOFT STYLIZED VOLUMINOUS HAIR --- */}
            <group position={[0, 0.12, 0]}>
              {/* Main Hair Cap */}
              <mesh position={[0, 0.08, -0.04]} material={materials.hair} castShadow>
                <sphereGeometry args={[0.37, 28, 28, 0, Math.PI * 2, 0, Math.PI * 0.65]} />
              </mesh>
              {/* Front Charming Swoop Lock */}
              <mesh position={[-0.12, 0.24, 0.24]} rotation={[0.4, -0.2, -0.3]} material={materials.hairHighlight} castShadow>
                <coneGeometry args={[0.13, 0.28, 16]} />
              </mesh>
              <mesh position={[0.1, 0.26, 0.22]} rotation={[0.3, 0.3, 0.4]} material={materials.hairHighlight} castShadow>
                <coneGeometry args={[0.12, 0.24, 16]} />
              </mesh>
              {/* Side Volume Tufts */}
              <mesh position={[-0.26, 0.16, 0.12]} rotation={[0.2, -0.5, -0.4]} material={materials.hair}>
                <sphereGeometry args={[0.14, 16, 16]} />
              </mesh>
              <mesh position={[0.26, 0.16, 0.12]} rotation={[0.2, 0.5, 0.4]} material={materials.hair}>
                <sphereGeometry args={[0.14, 16, 16]} />
              </mesh>
              {/* Top Crest */}
              <mesh position={[0, 0.32, 0.02]} rotation={[-0.2, 0, 0]} material={materials.hairHighlight}>
                <sphereGeometry args={[0.18, 16, 16]} />
              </mesh>
            </group>
          </group>

          {/* Left Arm (Shoulder -> White Sleeve -> Forearm -> Cute Hand) */}
          <group ref={leftShoulderRef} position={[-0.34, 0.48, 0]}>
            {/* Shoulder Sphere */}
            <mesh material={materials.jacketSleeves} castShadow>
              <sphereGeometry args={[0.12, 16, 16]} />
            </mesh>
            {/* Upper Arm Sleeve */}
            <mesh position={[0, -0.16, 0]} material={materials.jacketSleeves} castShadow>
              <cylinderGeometry args={[0.1, 0.085, 0.24, 16]} />
            </mesh>

            <group ref={leftElbowRef} position={[0, -0.3, 0]}>
              {/* Forearm & Ribbed Cuff */}
              <mesh position={[0, -0.14, 0]} material={materials.jacketSleeves} castShadow>
                <cylinderGeometry args={[0.085, 0.075, 0.22, 16]} />
              </mesh>
              <mesh position={[0, -0.24, 0]} material={materials.jacketTrim}>
                <cylinderGeometry args={[0.078, 0.078, 0.04, 16]} />
              </mesh>
              {/* Cute Cartoon Hand */}
              <group ref={leftHandRef} position={[0, -0.32, 0]}>
                <mesh material={materials.skin} castShadow>
                  <sphereGeometry args={[0.075, 16, 16]} />
                </mesh>
                {/* Thumb */}
                <mesh position={[0.04, 0.02, 0.03]} rotation={[0, 0, -0.4]} material={materials.skin}>
                  <capsuleGeometry args={[0.022, 0.04, 8, 8]} />
                </mesh>
              </group>
            </group>
          </group>

          {/* Right Arm */}
          <group ref={rightShoulderRef} position={[0.34, 0.48, 0]}>
            <mesh material={materials.jacketSleeves} castShadow>
              <sphereGeometry args={[0.12, 16, 16]} />
            </mesh>
            <mesh position={[0, -0.16, 0]} material={materials.jacketSleeves} castShadow>
              <cylinderGeometry args={[0.1, 0.085, 0.24, 16]} />
            </mesh>

            <group ref={rightElbowRef} position={[0, -0.3, 0]}>
              <mesh position={[0, -0.14, 0]} material={materials.jacketSleeves} castShadow>
                <cylinderGeometry args={[0.085, 0.075, 0.22, 16]} />
              </mesh>
              <mesh position={[0, -0.24, 0]} material={materials.jacketTrim}>
                <cylinderGeometry args={[0.078, 0.078, 0.04, 16]} />
              </mesh>
              <group ref={rightHandRef} position={[0, -0.32, 0]}>
                <mesh material={materials.skin} castShadow>
                  <sphereGeometry args={[0.075, 16, 16]} />
                </mesh>
                <mesh position={[-0.04, 0.02, 0.03]} rotation={[0, 0, 0.4]} material={materials.skin}>
                  <capsuleGeometry args={[0.022, 0.04, 8, 8]} />
                </mesh>
              </group>
            </group>
          </group>
        </group>

        {/* Waist / Jeans Belt */}
        <mesh position={[0, 0.04, 0]} material={materials.belt}>
          <cylinderGeometry args={[0.26, 0.25, 0.08, 24]} />
        </mesh>
        <mesh position={[0, 0.04, 0.255]} material={materials.beltBuckle}>
          <boxGeometry args={[0.09, 0.06, 0.02]} />
        </mesh>

        {/* --- LEGS & CHUNKY CARTOON SNEAKERS --- */}
        {/* Left Leg */}
        <group ref={leftHipRef} position={[-0.14, 0, 0]}>
          {/* Thigh */}
          <mesh position={[0, -0.2, 0]} material={materials.jeans} castShadow>
            <cylinderGeometry args={[0.12, 0.1, 0.36, 16]} />
          </mesh>

          <group ref={leftKneeRef} position={[0, -0.4, 0]}>
            {/* Calf / Shin with Denim Cuff */}
            <mesh position={[0, -0.2, 0]} material={materials.jeans} castShadow>
              <cylinderGeometry args={[0.1, 0.09, 0.36, 16]} />
            </mesh>
            <mesh position={[0, -0.36, 0]} material={materials.jeansCuff}>
              <cylinderGeometry args={[0.1, 0.1, 0.06, 16]} />
            </mesh>

            {/* Chunky Cartoon Sneaker */}
            <group ref={leftFootRef} position={[0, -0.42, 0.06]}>
              {/* Shoe Main Body */}
              <mesh position={[0, 0.07, 0]} material={materials.sneakerMain} castShadow>
                <boxGeometry args={[0.16, 0.13, 0.34]} />
              </mesh>
              {/* Rounded Front Cap */}
              <mesh position={[0, 0.04, 0.16]} material={materials.sneakerMain}>
                <sphereGeometry args={[0.085, 16, 16]} />
              </mesh>
              {/* Coral Heel Patch */}
              <mesh position={[0, 0.08, -0.16]} material={materials.sneakerAccent}>
                <boxGeometry args={[0.14, 0.1, 0.04]} />
              </mesh>
              {/* Cyan Glow Trim */}
              <mesh position={[0, 0.02, 0]} material={materials.sneakerCyan}>
                <boxGeometry args={[0.17, 0.03, 0.35]} />
              </mesh>
              {/* Thick Dark Sole */}
              <mesh position={[0, -0.02, 0]} material={materials.sneakerSole}>
                <boxGeometry args={[0.18, 0.05, 0.36]} />
              </mesh>
            </group>
          </group>
        </group>

        {/* Right Leg */}
        <group ref={rightHipRef} position={[0.14, 0, 0]}>
          <mesh position={[0, -0.2, 0]} material={materials.jeans} castShadow>
            <cylinderGeometry args={[0.12, 0.1, 0.36, 16]} />
          </mesh>

          <group ref={rightKneeRef} position={[0, -0.4, 0]}>
            <mesh position={[0, -0.2, 0]} material={materials.jeans} castShadow>
              <cylinderGeometry args={[0.1, 0.09, 0.36, 16]} />
            </mesh>
            <mesh position={[0, -0.36, 0]} material={materials.jeansCuff}>
              <cylinderGeometry args={[0.1, 0.1, 0.06, 16]} />
            </mesh>

            {/* Chunky Cartoon Sneaker */}
            <group ref={rightFootRef} position={[0, -0.42, 0.06]}>
              <mesh position={[0, 0.07, 0]} material={materials.sneakerMain} castShadow>
                <boxGeometry args={[0.16, 0.13, 0.34]} />
              </mesh>
              <mesh position={[0, 0.04, 0.16]} material={materials.sneakerMain}>
                <sphereGeometry args={[0.085, 16, 16]} />
              </mesh>
              <mesh position={[0, 0.08, -0.16]} material={materials.sneakerAccent}>
                <boxGeometry args={[0.14, 0.1, 0.04]} />
              </mesh>
              <mesh position={[0, 0.02, 0]} material={materials.sneakerCyan}>
                <boxGeometry args={[0.17, 0.03, 0.35]} />
              </mesh>
              <mesh position={[0, -0.02, 0]} material={materials.sneakerSole}>
                <boxGeometry args={[0.18, 0.05, 0.36]} />
              </mesh>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};
