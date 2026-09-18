import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PixarSchoolboy3DProps {
  progressRef: React.MutableRefObject<number>;
  mousePos: { x: number; y: number };
}

export const PixarSchoolboy3D: React.FC<PixarSchoolboy3DProps> = ({
  progressRef,
  mousePos,
}) => {
  // Hierarchical Skeleton Joint References
  const rootRef = useRef<THREE.Group>(null);
  const hipMasterRef = useRef<THREE.Group>(null);
  const spineRef = useRef<THREE.Group>(null);
  const chestRef = useRef<THREE.Group>(null);
  const neckRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftEyePupilRef = useRef<THREE.Group>(null);
  const rightEyePupilRef = useRef<THREE.Group>(null);
  const leftBrowRef = useRef<THREE.Group>(null);
  const rightBrowRef = useRef<THREE.Group>(null);

  // Arms Skeleton
  const leftShoulderRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const leftElbowRef = useRef<THREE.Group>(null);
  const leftWristRef = useRef<THREE.Group>(null);

  const rightShoulderRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const rightElbowRef = useRef<THREE.Group>(null);
  const rightWristRef = useRef<THREE.Group>(null);

  // Legs Skeleton
  const leftHipRef = useRef<THREE.Group>(null);
  const leftThighRef = useRef<THREE.Group>(null);
  const leftKneeRef = useRef<THREE.Group>(null);
  const leftAnkleRef = useRef<THREE.Group>(null);

  const rightHipRef = useRef<THREE.Group>(null);
  const rightThighRef = useRef<THREE.Group>(null);
  const rightKneeRef = useRef<THREE.Group>(null);
  const rightAnkleRef = useRef<THREE.Group>(null);

  // High-Quality Pixar Movie Stylized Materials matching the reference schoolboy
  const materials = useMemo(() => {
    return {
      // Warm, healthy cartoon skin with soft velvet sheen
      skin: new THREE.MeshStandardMaterial({
        color: '#FDDCB8',
        roughness: 0.42,
        metalness: 0.05,
      }),
      // Cheeks natural rosy blush
      blush: new THREE.MeshStandardMaterial({
        color: '#F87171',
        transparent: true,
        opacity: 0.45,
        roughness: 0.8,
      }),
      // Fluffy chestnut brown hair
      hair: new THREE.MeshStandardMaterial({
        color: '#452614',
        roughness: 0.55,
        metalness: 0.08,
      }),
      hairHighlight: new THREE.MeshStandardMaterial({
        color: '#633B1E',
        roughness: 0.5,
      }),
      // Big lively eyes: Crisp white sclera + warm brown/amber iris
      eyeWhite: new THREE.MeshStandardMaterial({
        color: '#FFFFFF',
        roughness: 0.1,
      }),
      iris: new THREE.MeshStandardMaterial({
        color: '#6B3A19',
        roughness: 0.2,
      }),
      pupil: new THREE.MeshBasicMaterial({
        color: '#09090B',
      }),
      eyeHighlight: new THREE.MeshBasicMaterial({
        color: '#FFFFFF',
      }),
      eyebrows: new THREE.MeshStandardMaterial({
        color: '#2B160A',
        roughness: 0.7,
      }),
      mouth: new THREE.MeshStandardMaterial({
        color: '#991B1B',
        roughness: 0.35,
      }),
      teeth: new THREE.MeshStandardMaterial({
        color: '#FFFFFF',
        roughness: 0.2,
      }),

      // Royal Blue Tailored School Blazer with Gold Buttons and Crest Badge
      blazerBlue: new THREE.MeshStandardMaterial({
        color: '#1D4ED8',
        roughness: 0.38,
        metalness: 0.12,
      }),
      blazerLapel: new THREE.MeshStandardMaterial({
        color: '#1E40AF',
        roughness: 0.45,
      }),
      goldButton: new THREE.MeshStandardMaterial({
        color: '#F59E0B',
        metalness: 0.9,
        roughness: 0.2,
      }),
      crestBadge: new THREE.MeshStandardMaterial({
        color: '#FBBF24',
        metalness: 0.85,
        roughness: 0.25,
      }),

      // Light Blue / White Collared Shirt
      shirt: new THREE.MeshStandardMaterial({
        color: '#E0F2FE',
        roughness: 0.5,
      }),
      // Striped Navy & Gold Tie
      tieBase: new THREE.MeshStandardMaterial({
        color: '#1E3A8A',
        roughness: 0.4,
      }),
      tieStripe: new THREE.MeshStandardMaterial({
        color: '#F59E0B',
        roughness: 0.3,
      }),

      // Dark Charcoal Tailored Trousers
      trousers: new THREE.MeshStandardMaterial({
        color: '#334155',
        roughness: 0.75,
        metalness: 0.05,
      }),

      // Brown Leather School Backpack & Straps
      backpackLeather: new THREE.MeshStandardMaterial({
        color: '#5C381E',
        roughness: 0.45,
        metalness: 0.1,
      }),
      buckleMetal: new THREE.MeshStandardMaterial({
        color: '#E2E8F0',
        metalness: 0.9,
        roughness: 0.2,
      }),

      // Dark Brown Leather School Shoes
      shoes: new THREE.MeshStandardMaterial({
        color: '#3D200F',
        roughness: 0.28,
        metalness: 0.2,
      }),
      shoeSole: new THREE.MeshStandardMaterial({
        color: '#1E1B18',
        roughness: 0.6,
      }),
    };
  }, []);

  useFrame((state, delta) => {
    if (!rootRef.current) return;

    const time = state.clock.getElapsedTime();
    const p = progressRef.current; // Continuous progress 0.0 to 1.0

    let posX = -6.5;
    let posZ = 0;
    let rotY = Math.PI / 2 - 0.15;
    let hipBob = 0;

    let leftHipRotX = 0;
    let leftKneeRotX = 0;
    let leftHipRotZ = 0;

    let rightHipRotX = 0;
    let rightKneeRotX = 0;
    let rightHipRotZ = 0;

    let leftArmRotX = 0;
    let leftArmRotZ = -0.15;
    let leftArmRotY = 0;

    let rightArmRotX = 0;
    let rightArmRotZ = 0.15;
    let rightArmRotY = 0;

    let torsoRotX = 0;
    let torsoRotY = 0;
    let torsoRotZ = 0;

    let headRotX = 0;
    let headRotY = 0;

    // 1. WALK-IN PHASE (0.00 -> 0.30)
    if (p < 0.30) {
      const t = p / 0.30;
      posX = THREE.MathUtils.lerp(-6.5, -2.15, t);
      const walkT = t * 18;
      
      const swing = Math.sin(walkT) * 0.65;
      leftHipRotX = swing;
      rightHipRotX = -swing;

      leftKneeRotX = swing < 0 ? -swing * 0.9 : 0.08;
      rightKneeRotX = -swing < 0 ? swing * 0.9 : 0.08;

      leftArmRotX = -swing * 0.75;
      rightArmRotX = swing * 0.75;

      hipBob = Math.abs(Math.sin(walkT)) * 0.08;
      torsoRotY = Math.sin(walkT) * 0.08;
      rotY = Math.PI / 2 - 0.12;
    }
    // 2. NOTICE BOX & DECELERATE (0.30 -> 0.42)
    else if (p < 0.42) {
      const t = (p - 0.30) / 0.12;
      posX = THREE.MathUtils.lerp(-2.15, -2.15, t);
      rotY = THREE.MathUtils.lerp(Math.PI / 2 - 0.12, Math.PI / 2.3, t);

      leftHipRotX = THREE.MathUtils.lerp(0.2, 0.08, t);
      rightHipRotX = THREE.MathUtils.lerp(-0.2, -0.1, t);
      leftKneeRotX = 0.1;
      rightKneeRotX = 0.1;

      leftArmRotX = THREE.MathUtils.lerp(-0.2, 0.15, t);
      rightArmRotX = THREE.MathUtils.lerp(0.2, -0.15, t);

      headRotX = THREE.MathUtils.lerp(0, 0.22, t);
    }
    // 3. ANTICIPATION & WEIGHT SHIFT (0.42 -> 0.50)
    else if (p < 0.50) {
      const t = (p - 0.42) / 0.08;
      posX = -2.15;
      rotY = THREE.MathUtils.lerp(Math.PI / 2.3, Math.PI / 2.1, t);

      leftHipRotX = THREE.MathUtils.lerp(0.08, 0.18, t);
      leftKneeRotX = THREE.MathUtils.lerp(0.1, 0.28, t);

      rightHipRotX = THREE.MathUtils.lerp(-0.1, -1.3, t);
      rightHipRotZ = THREE.MathUtils.lerp(0, 0.22, t);
      rightKneeRotX = THREE.MathUtils.lerp(0.1, 1.5, t);

      torsoRotX = THREE.MathUtils.lerp(0, -0.26, t);
      torsoRotY = THREE.MathUtils.lerp(0, -0.38, t);

      leftArmRotX = THREE.MathUtils.lerp(0.15, 0.75, t);
      leftArmRotZ = THREE.MathUtils.lerp(-0.15, -0.65, t);

      rightArmRotX = THREE.MathUtils.lerp(-0.15, -0.55, t);
      rightArmRotZ = THREE.MathUtils.lerp(0.15, 0.65, t);

      headRotX = THREE.MathUtils.lerp(0.22, 0.1, t);
    }
    // 4. POWER KICK & IMPACT (0.50 -> 0.56)
    else if (p < 0.56) {
      const t = (p - 0.50) / 0.06;
      posX = -2.15;
      rotY = Math.PI / 2.1;

      rightHipRotX = THREE.MathUtils.lerp(-1.3, 1.55, t);
      rightHipRotZ = THREE.MathUtils.lerp(0.22, -0.08, t);
      rightKneeRotX = THREE.MathUtils.lerp(1.5, 0.02, t);

      leftHipRotX = 0.15;
      leftKneeRotX = 0.22;

      torsoRotX = THREE.MathUtils.lerp(-0.26, 0.18, t);
      torsoRotY = THREE.MathUtils.lerp(-0.38, 0.58, t);

      leftArmRotX = THREE.MathUtils.lerp(0.75, -0.85, t);
      leftArmRotZ = -0.35;

      rightArmRotX = THREE.MathUtils.lerp(-0.55, 0.78, t);
      rightArmRotZ = 0.55;
    }
    // 5. RECOVERY & BOX REACTION (0.56 -> 0.68)
    else if (p < 0.68) {
      const t = (p - 0.56) / 0.12;
      posX = THREE.MathUtils.lerp(-2.15, -1.0, t);
      rotY = THREE.MathUtils.lerp(Math.PI / 2.1, Math.PI / 2.4, t);

      rightHipRotX = THREE.MathUtils.lerp(1.55, -0.08, t);
      rightHipRotZ = THREE.MathUtils.lerp(-0.08, 0, t);
      rightKneeRotX = THREE.MathUtils.lerp(0.02, 0.1, t);

      leftHipRotX = THREE.MathUtils.lerp(0.15, 0.08, t);
      leftKneeRotX = THREE.MathUtils.lerp(0.22, 0.1, t);

      torsoRotX = THREE.MathUtils.lerp(0.18, 0, t);
      torsoRotY = THREE.MathUtils.lerp(0.58, 0.1, t);

      leftArmRotX = THREE.MathUtils.lerp(-0.85, 0.1, t);
      leftArmRotZ = THREE.MathUtils.lerp(-0.35, -0.15, t);

      rightArmRotX = THREE.MathUtils.lerp(0.78, 0.1, t);
      rightArmRotZ = THREE.MathUtils.lerp(0.55, 0.15, t);

      headRotX = THREE.MathUtils.lerp(0.1, -0.12, t);
    }
    // 6. WALK TO ADDIMS MONUMENT (0.68 -> 0.84)
    else if (p < 0.84) {
      const t = (p - 0.68) / 0.16;
      posX = THREE.MathUtils.lerp(-1.0, 2.2, t);
      posZ = THREE.MathUtils.lerp(0, 0.1, t);
      rotY = Math.PI / 2;

      const walkT = t * 14;
      const swing = Math.sin(walkT) * 0.55;

      leftHipRotX = swing;
      rightHipRotX = -swing;

      leftKneeRotX = swing < 0 ? -swing * 0.8 : 0.08;
      rightKneeRotX = -swing < 0 ? swing * 0.8 : 0.08;

      leftArmRotX = -swing * 0.65;
      rightArmRotX = swing * 0.65;

      hipBob = Math.abs(Math.sin(walkT)) * 0.06;
      torsoRotY = Math.sin(walkT) * 0.06;
    }
    // 7. TRANSITION INTO PROUD LEAN POSE (0.84 -> 0.94)
    else if (p < 0.94) {
      const t = (p - 0.84) / 0.10;
      posX = 2.2;
      posZ = 0.1;
      rotY = THREE.MathUtils.lerp(Math.PI / 2, 0.24, t);

      leftArmRotX = THREE.MathUtils.lerp(0.1, 0.38, t);
      leftArmRotZ = THREE.MathUtils.lerp(-0.15, -1.3, t);
      leftArmRotY = THREE.MathUtils.lerp(0, 0.32, t);

      rightArmRotX = THREE.MathUtils.lerp(0.1, 0.22, t);
      rightArmRotZ = THREE.MathUtils.lerp(0.15, 0.32, t);
      rightArmRotY = THREE.MathUtils.lerp(0, -0.15, t);

      leftHipRotZ = THREE.MathUtils.lerp(0, 0.14, t);
      leftHipRotX = THREE.MathUtils.lerp(0, 0.05, t);

      rightHipRotZ = THREE.MathUtils.lerp(0, -0.32, t);
      rightHipRotX = THREE.MathUtils.lerp(0, 0.35, t);
      rightKneeRotX = THREE.MathUtils.lerp(0.08, 0.34, t);

      torsoRotZ = THREE.MathUtils.lerp(0, 0.15, t);
      torsoRotY = THREE.MathUtils.lerp(0, -0.22, t);
    }
    // 8. CONTINUOUS PROUD IDLE (0.94 -> 1.00)
    else {
      posX = 2.2;
      posZ = 0.1;
      rotY = 0.24;

      leftArmRotX = 0.38;
      leftArmRotZ = -1.3;
      leftArmRotY = 0.32;

      rightArmRotX = 0.22;
      rightArmRotZ = 0.32;
      rightArmRotY = -0.15;

      leftHipRotZ = 0.14;
      leftHipRotX = 0.05;

      rightHipRotZ = -0.32;
      rightHipRotX = 0.35;
      rightKneeRotX = 0.34;

      const breath = Math.sin(time * 2.2) * 0.015;
      torsoRotZ = 0.15 + breath * 0.4;
      torsoRotY = -0.22;
      hipBob = breath;
    }

    // Apply Transforms to 3D Skeletal Rig
    rootRef.current.position.x = posX;
    rootRef.current.position.z = posZ;
    rootRef.current.rotation.y = rotY;

    if (hipMasterRef.current) {
      hipMasterRef.current.position.y = 0.95 + hipBob;
    }

    if (spineRef.current) {
      spineRef.current.rotation.set(torsoRotX, torsoRotY, torsoRotZ);
    }

    // Head and Eyes Interactive Look-At Cursor
    if (headRef.current) {
      const targetLookX = headRotX + mousePos.y * 0.18;
      const targetLookY = headRotY + mousePos.x * 0.28;
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetLookX, delta * 5);
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetLookY, delta * 5);
    }

    // Pupils micro glance tracking
    const eyePupilX = mousePos.x * 0.035;
    const eyePupilY = mousePos.y * 0.025;
    if (leftEyePupilRef.current) {
      leftEyePupilRef.current.position.x = -0.15 + eyePupilX;
      leftEyePupilRef.current.position.y = 0.08 + eyePupilY;
    }
    if (rightEyePupilRef.current) {
      rightEyePupilRef.current.position.x = 0.15 + eyePupilX;
      rightEyePupilRef.current.position.y = 0.08 + eyePupilY;
    }

    // Eyebrows expressive movement
    if (leftBrowRef.current && rightBrowRef.current) {
      const browBounce = Math.sin(time * 1.5) * 0.015;
      leftBrowRef.current.position.y = 0.23 + browBounce;
      rightBrowRef.current.position.y = 0.23 + browBounce;
    }

    // Arms Rotations
    if (leftShoulderRef.current) {
      leftShoulderRef.current.rotation.set(leftArmRotX, leftArmRotY, leftArmRotZ);
    }
    if (rightShoulderRef.current) {
      rightShoulderRef.current.rotation.set(rightArmRotX, rightArmRotY, rightArmRotZ);
    }

    // Legs Rotations
    if (leftHipRef.current) {
      leftHipRef.current.rotation.set(leftHipRotX, 0, leftHipRotZ);
    }
    if (leftKneeRef.current) {
      leftKneeRef.current.rotation.x = leftKneeRotX;
    }

    if (rightHipRef.current) {
      rightHipRef.current.rotation.set(rightHipRotX, 0, rightHipRotZ);
    }
    if (rightKneeRef.current) {
      rightKneeRef.current.rotation.x = rightKneeRotX;
    }
  });

  return (
    <group ref={rootRef} position={[-6.5, 0, 0]} scale={[1.15, 1.15, 1.15]}>
      {/* Contact Shadow disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <circleGeometry args={[0.65, 32]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.4} />
      </mesh>

      {/* Pelvis & Hips Master Joint */}
      <group ref={hipMasterRef} position={[0, 0.95, 0]}>
        {/* Spine & Chest Hierarchy */}
        <group ref={spineRef}>
          <group ref={chestRef}>
            {/* Inner Light Blue Collared Shirt */}
            <mesh position={[0, 0.3, 0]} material={materials.shirt} castShadow>
              <cylinderGeometry args={[0.26, 0.23, 0.54, 24]} />
            </mesh>

            {/* Striped Navy & Gold Tie */}
            <group position={[0, 0.35, 0.235]}>
              <mesh material={materials.tieBase}>
                <boxGeometry args={[0.08, 0.42, 0.015]} />
              </mesh>
              {/* Gold Stripes */}
              <mesh position={[0, 0.1, 0.01]} rotation={[0, 0, 0.3]} material={materials.tieStripe}>
                <boxGeometry args={[0.09, 0.025, 0.01]} />
              </mesh>
              <mesh position={[0, -0.05, 0.01]} rotation={[0, 0, 0.3]} material={materials.tieStripe}>
                <boxGeometry args={[0.09, 0.025, 0.01]} />
              </mesh>
            </group>

            {/* Royal Blue School Blazer Jacket Outer Body */}
            <mesh position={[0, 0.28, 0]} material={materials.blazerBlue} castShadow>
              <cylinderGeometry args={[0.3, 0.27, 0.56, 24, 1, true, -Math.PI * 0.72, Math.PI * 1.44]} />
            </mesh>

            {/* Blazer Lapels */}
            <mesh position={[-0.13, 0.36, 0.23]} rotation={[0, 0.35, -0.1]} material={materials.blazerLapel}>
              <boxGeometry args={[0.07, 0.32, 0.02]} />
            </mesh>
            <mesh position={[0.13, 0.36, 0.23]} rotation={[0, -0.35, 0.1]} material={materials.blazerLapel}>
              <boxGeometry args={[0.07, 0.32, 0.02]} />
            </mesh>

            {/* Gold Buttons on Blazer */}
            <mesh position={[-0.04, 0.22, 0.25]} material={materials.goldButton}>
              <sphereGeometry args={[0.02, 12, 12]} />
            </mesh>
            <mesh position={[-0.04, 0.12, 0.24]} material={materials.goldButton}>
              <sphereGeometry args={[0.02, 12, 12]} />
            </mesh>

            {/* Gold Crest Badge on Breast Pocket (Left Chest) */}
            <mesh position={[0.15, 0.38, 0.24]} rotation={[0, -0.3, 0]} material={materials.crestBadge}>
              <boxGeometry args={[0.065, 0.075, 0.01]} />
            </mesh>

            {/* Brown Leather School Backpack on Back */}
            <group position={[0, 0.32, -0.24]}>
              <mesh material={materials.backpackLeather} castShadow>
                <boxGeometry args={[0.36, 0.44, 0.16]} />
              </mesh>
              {/* Flap & Buckles */}
              <mesh position={[0, 0.16, 0.04]} material={materials.backpackLeather}>
                <boxGeometry args={[0.38, 0.14, 0.18]} />
              </mesh>
              <mesh position={[-0.1, 0.08, 0.09]} material={materials.buckleMetal}>
                <boxGeometry args={[0.035, 0.04, 0.02]} />
              </mesh>
              <mesh position={[0.1, 0.08, 0.09]} material={materials.buckleMetal}>
                <boxGeometry args={[0.035, 0.04, 0.02]} />
              </mesh>
            </group>

            {/* Leather Shoulder Straps */}
            <mesh position={[-0.18, 0.32, 0.08]} rotation={[0.25, 0, 0]} material={materials.backpackLeather}>
              <boxGeometry args={[0.04, 0.48, 0.26]} />
            </mesh>
            <mesh position={[0.18, 0.32, 0.08]} rotation={[0.25, 0, 0]} material={materials.backpackLeather}>
              <boxGeometry args={[0.04, 0.48, 0.26]} />
            </mesh>

            {/* Neck & Collared Shirt Collar */}
            <group ref={neckRef} position={[0, 0.58, 0]}>
              <mesh material={materials.skin}>
                <cylinderGeometry args={[0.1, 0.11, 0.14, 20]} />
              </mesh>
              <mesh position={[0, -0.02, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.shirt}>
                <torusGeometry args={[0.13, 0.035, 16, 24]} />
              </mesh>

              {/* --- CUTE STYLIZED PIXAR HEAD & FACE --- */}
              <group ref={headRef} position={[0, 0.3, 0.04]}>
                {/* Rounded Cheerful Head Shape */}
                <mesh material={materials.skin} castShadow>
                  <sphereGeometry args={[0.34, 32, 32]} />
                </mesh>

                {/* Soft Rosy Cheeks */}
                <mesh position={[-0.22, -0.04, 0.18]} material={materials.blush}>
                  <sphereGeometry args={[0.08, 16, 16]} />
                </mesh>
                <mesh position={[0.22, -0.04, 0.18]} material={materials.blush}>
                  <sphereGeometry args={[0.08, 16, 16]} />
                </mesh>

                {/* Cute Button Nose */}
                <mesh position={[0, 0.02, 0.33]} material={materials.skin}>
                  <sphereGeometry args={[0.045, 16, 16]} />
                </mesh>

                {/* Friendly Open Smile */}
                <group position={[0, -0.12, 0.29]}>
                  <mesh rotation={[Math.PI, 0, 0]} material={materials.mouth}>
                    <cylinderGeometry args={[0.075, 0.075, 0.04, 16, 1, false, 0, Math.PI]} />
                  </mesh>
                  <mesh position={[0, 0.015, 0.01]} material={materials.teeth}>
                    <boxGeometry args={[0.09, 0.02, 0.02]} />
                  </mesh>
                </group>

                {/* Expressive Cheerful Eyebrows */}
                <group ref={leftBrowRef} position={[-0.16, 0.23, 0.27]} rotation={[0, 0, 0.15]}>
                  <mesh material={materials.eyebrows}>
                    <boxGeometry args={[0.13, 0.035, 0.03]} />
                  </mesh>
                </group>
                <group ref={rightBrowRef} position={[0.16, 0.23, 0.27]} rotation={[0, 0, -0.15]}>
                  <mesh material={materials.eyebrows}>
                    <boxGeometry args={[0.13, 0.035, 0.03]} />
                  </mesh>
                </group>

                {/* Left Lively Eye */}
                <group position={[-0.15, 0.08, 0.28]}>
                  <mesh material={materials.eyeWhite}>
                    <sphereGeometry args={[0.085, 20, 20]} />
                  </mesh>
                  <group ref={leftEyePupilRef} position={[0, 0, 0.06]}>
                    <mesh material={materials.iris}>
                      <circleGeometry args={[0.055, 20]} />
                    </mesh>
                    <mesh position={[0, 0, 0.005]} material={materials.pupil}>
                      <circleGeometry args={[0.032, 16]} />
                    </mesh>
                    <mesh position={[0.018, 0.018, 0.01]} material={materials.eyeHighlight}>
                      <circleGeometry args={[0.015, 12]} />
                    </mesh>
                  </group>
                </group>

                {/* Right Lively Eye */}
                <group position={[0.15, 0.08, 0.28]}>
                  <mesh material={materials.eyeWhite}>
                    <sphereGeometry args={[0.085, 20, 20]} />
                  </mesh>
                  <group ref={rightEyePupilRef} position={[0, 0, 0.06]}>
                    <mesh material={materials.iris}>
                      <circleGeometry args={[0.055, 20]} />
                    </mesh>
                    <mesh position={[0, 0, 0.005]} material={materials.pupil}>
                      <circleGeometry args={[0.032, 16]} />
                    </mesh>
                    <mesh position={[0.018, 0.018, 0.01]} material={materials.eyeHighlight}>
                      <circleGeometry args={[0.015, 12]} />
                    </mesh>
                  </group>
                </group>

                {/* Rounded Ears */}
                <mesh position={[-0.34, 0.02, -0.02]} rotation={[0, -0.2, 0]} material={materials.skin}>
                  <sphereGeometry args={[0.085, 16, 16]} />
                </mesh>
                <mesh position={[0.34, 0.02, -0.02]} rotation={[0, 0.2, 0]} material={materials.skin}>
                  <sphereGeometry args={[0.085, 16, 16]} />
                </mesh>

                {/* --- FLUFFY TOUSLED CHESTNUT BROWN HAIR --- */}
                <group position={[0, 0.12, 0]}>
                  <mesh position={[0, 0.08, -0.04]} material={materials.hair} castShadow>
                    <sphereGeometry args={[0.37, 28, 28, 0, Math.PI * 2, 0, Math.PI * 0.65]} />
                  </mesh>
                  <mesh position={[-0.12, 0.24, 0.24]} rotation={[0.4, -0.2, -0.3]} material={materials.hairHighlight} castShadow>
                    <coneGeometry args={[0.13, 0.28, 16]} />
                  </mesh>
                  <mesh position={[0.1, 0.26, 0.22]} rotation={[0.3, 0.3, 0.4]} material={materials.hairHighlight} castShadow>
                    <coneGeometry args={[0.12, 0.24, 16]} />
                  </mesh>
                  <mesh position={[-0.26, 0.16, 0.12]} rotation={[0.2, -0.5, -0.4]} material={materials.hair}>
                    <sphereGeometry args={[0.14, 16, 16]} />
                  </mesh>
                  <mesh position={[0.26, 0.16, 0.12]} rotation={[0.2, 0.5, 0.4]} material={materials.hair}>
                    <sphereGeometry args={[0.14, 16, 16]} />
                  </mesh>
                  <mesh position={[0, 0.32, 0.02]} rotation={[-0.2, 0, 0]} material={materials.hairHighlight}>
                    <sphereGeometry args={[0.18, 16, 16]} />
                  </mesh>
                </group>
              </group>
            </group>

            {/* Left Arm Joint */}
            <group ref={leftShoulderRef} position={[-0.34, 0.48, 0]}>
              <mesh material={materials.blazerBlue} castShadow>
                <sphereGeometry args={[0.12, 16, 16]} />
              </mesh>
              <group ref={leftArmRef}>
                <mesh position={[0, -0.16, 0]} material={materials.blazerBlue} castShadow>
                  <cylinderGeometry args={[0.1, 0.085, 0.24, 16]} />
                </mesh>
                <group ref={leftElbowRef} position={[0, -0.3, 0]}>
                  <mesh position={[0, -0.14, 0]} material={materials.blazerBlue} castShadow>
                    <cylinderGeometry args={[0.085, 0.075, 0.22, 16]} />
                  </mesh>
                  <mesh position={[0, -0.24, 0]} material={materials.shirt}>
                    <cylinderGeometry args={[0.076, 0.076, 0.03, 16]} />
                  </mesh>
                  <mesh position={[0, -0.22, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.buckleMetal}>
                    <torusGeometry args={[0.08, 0.012, 8, 16]} />
                  </mesh>
                  <group ref={leftWristRef} position={[0, -0.32, 0]}>
                    <mesh material={materials.skin} castShadow>
                      <sphereGeometry args={[0.075, 16, 16]} />
                    </mesh>
                    <mesh position={[0.04, 0.02, 0.03]} rotation={[0, 0, -0.4]} material={materials.skin}>
                      <capsuleGeometry args={[0.022, 0.04, 8, 8]} />
                    </mesh>
                  </group>
                </group>
              </group>
            </group>

            {/* Right Arm Joint */}
            <group ref={rightShoulderRef} position={[0.34, 0.48, 0]}>
              <mesh material={materials.blazerBlue} castShadow>
                <sphereGeometry args={[0.12, 16, 16]} />
              </mesh>
              <group ref={rightArmRef}>
                <mesh position={[0, -0.16, 0]} material={materials.blazerBlue} castShadow>
                  <cylinderGeometry args={[0.1, 0.085, 0.24, 16]} />
                </mesh>
                <group ref={rightElbowRef} position={[0, -0.3, 0]}>
                  <mesh position={[0, -0.14, 0]} material={materials.blazerBlue} castShadow>
                    <cylinderGeometry args={[0.085, 0.075, 0.22, 16]} />
                  </mesh>
                  <mesh position={[0, -0.24, 0]} material={materials.shirt}>
                    <cylinderGeometry args={[0.076, 0.076, 0.03, 16]} />
                  </mesh>
                  <group ref={rightWristRef} position={[0, -0.32, 0]}>
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
          </group>
        </group>

        {/* Waist / Charcoal Trousers Beltline */}
        <mesh position={[0, 0.04, 0]} material={materials.trousers}>
          <cylinderGeometry args={[0.26, 0.25, 0.08, 24]} />
        </mesh>

        {/* Left Leg Joint */}
        <group ref={leftHipRef} position={[-0.14, 0, 0]}>
          <group ref={leftThighRef}>
            <mesh position={[0, -0.2, 0]} material={materials.trousers} castShadow>
              <cylinderGeometry args={[0.12, 0.1, 0.36, 16]} />
            </mesh>
            <group ref={leftKneeRef} position={[0, -0.4, 0]}>
              <mesh position={[0, -0.2, 0]} material={materials.trousers} castShadow>
                <cylinderGeometry args={[0.1, 0.09, 0.36, 16]} />
              </mesh>
              <group ref={leftAnkleRef} position={[0, -0.42, 0.06]}>
                <mesh position={[0, 0.06, 0]} material={materials.shoes} castShadow>
                  <boxGeometry args={[0.15, 0.12, 0.32]} />
                </mesh>
                <mesh position={[0, 0.03, 0.14]} material={materials.shoes}>
                  <sphereGeometry args={[0.08, 16, 16]} />
                </mesh>
                <mesh position={[0, -0.02, 0]} material={materials.shoeSole}>
                  <boxGeometry args={[0.16, 0.04, 0.34]} />
                </mesh>
              </group>
            </group>
          </group>
        </group>

        {/* Right Leg Joint */}
        <group ref={rightHipRef} position={[0.14, 0, 0]}>
          <group ref={rightThighRef}>
            <mesh position={[0, -0.2, 0]} material={materials.trousers} castShadow>
              <cylinderGeometry args={[0.12, 0.1, 0.36, 16]} />
            </mesh>
            <group ref={rightKneeRef} position={[0, -0.4, 0]}>
              <mesh position={[0, -0.2, 0]} material={materials.trousers} castShadow>
                <cylinderGeometry args={[0.1, 0.09, 0.36, 16]} />
              </mesh>
              <group ref={rightAnkleRef} position={[0, -0.42, 0.06]}>
                <mesh position={[0, 0.06, 0]} material={materials.shoes} castShadow>
                  <boxGeometry args={[0.15, 0.12, 0.32]} />
                </mesh>
                <mesh position={[0, 0.03, 0.14]} material={materials.shoes}>
                  <sphereGeometry args={[0.08, 16, 16]} />
                </mesh>
                <mesh position={[0, -0.02, 0]} material={materials.shoeSole}>
                  <boxGeometry args={[0.16, 0.04, 0.34]} />
                </mesh>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};
