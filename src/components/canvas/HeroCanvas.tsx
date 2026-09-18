import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { StudioEnvironment } from './StudioEnvironment';
import { PixarSchoolboy3D } from './PixarSchoolboy3D';
import { MysteriousBox } from './MysteriousBox';
import { AddimsTypography3D } from './AddimsTypography3D';
import { ImpactEffects } from './ImpactEffects';
import { soundFx } from '../../utils/audioSynthesizer';
import confetti from 'canvas-confetti';

interface HeroCanvasProps {
  onStoryComplete?: () => void;
  replayTrigger: number;
  orbitEnabled: boolean;
}

// Continuous Smooth Cinematic Camera Tracking
const CinematicCamera: React.FC<{
  progressRef: React.MutableRefObject<number>;
  mousePos: { x: number; y: number };
  orbitEnabled: boolean;
}> = ({ progressRef, mousePos, orbitEnabled }) => {
  const { camera, size } = useThree();
  const isMobile = size.width < 768;

  useFrame((_, delta) => {
    if (orbitEnabled) return;

    const p = progressRef.current; // 0.0 to 1.0 continuous

    // Continuous Target Coordinates along the sequence
    let targetX = 0;
    let targetY = 1.95;
    let targetZ = 7.4;
    let lookX = 0;

    if (p < 0.35) {
      // Wide shot watching the boy enter from left
      targetX = THREE.MathUtils.lerp(-0.8, -0.2, p / 0.35);
      targetZ = isMobile ? 9.8 : 7.6;
      lookX = THREE.MathUtils.lerp(-2.5, -0.6, p / 0.35);
    } else if (p < 0.58) {
      // Dynamic camera push-in during the anticipation & kick
      const t = (p - 0.35) / 0.23;
      targetX = THREE.MathUtils.lerp(-0.2, 0.2, t);
      targetZ = isMobile ? 8.6 : 6.4;
      targetY = 1.85;
      lookX = -0.3;
    } else if (p < 0.85) {
      // Camera smoothly pans out and tracks boy walking to the ADDIMS monument
      const t = (p - 0.58) / 0.27;
      targetX = THREE.MathUtils.lerp(0.2, 0.75, t);
      targetZ = isMobile ? 9.6 : 7.3;
      targetY = 1.95;
      lookX = THREE.MathUtils.lerp(-0.3, 0.4, t);
    } else {
      // Pristine panoramic framing of the schoolboy proudly leaning on ADDIMS
      targetX = isMobile ? 0 : 0.75;
      targetZ = isMobile ? 9.6 : 7.3;
      targetY = 1.95;
      lookX = isMobile ? 0 : 0.4;
    }

    // Smooth mouse parallax
    const parallaxX = mousePos.x * 0.35;
    const parallaxY = mousePos.y * 0.2;

    // Subtle impact screen shake
    let shakeOffset = 0;
    if (p >= 0.52 && p <= 0.56) {
      shakeOffset = (Math.random() - 0.5) * 0.15;
    }

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX + parallaxX + shakeOffset, delta * 3.5);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY + parallaxY + shakeOffset, delta * 3.5);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, delta * 3.0);

    camera.lookAt(lookX, 1.25, 0);
  });

  return null;
};

export const HeroCanvas: React.FC<HeroCanvasProps> = ({
  onStoryComplete,
  replayTrigger,
  orbitEnabled,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const progressRef = useRef<number>(0);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (e.clientX / innerWidth) * 2 - 1,
      y: -(e.clientY / innerHeight) * 2 + 1,
    });
  }, []);

  // Main Continuous GSAP 60 FPS Timeline
  useEffect(() => {
    if (tlRef.current) {
      tlRef.current.kill();
    }

    progressRef.current = 0;

    const tl = gsap.timeline({
      onUpdate: () => {
        progressRef.current = tl.progress();
      },
      onComplete: () => {
        if (onStoryComplete) onStoryComplete();
      },
    });

    tlRef.current = tl;

    // --- CONTINUOUS UNIFIED CHOREOGRAPHY ---
    // 0.0s -> 3.0s: Walk In (p: 0.00 -> 0.30)
    // Sound FX scheduled continuously
    tl.to({}, {
      duration: 3.0,
      ease: 'none',
      onUpdate: function () {
        const prog = this.progress();
        if (prog > 0.1 && prog < 0.95 && Math.sin(prog * 18) > 0.9) {
          soundFx.playFootstep();
        }
      },
    });

    // 3.0s -> 4.2s: Notice box & stop (p: 0.30 -> 0.42)
    tl.call(() => {
      soundFx.playBoxHum();
    });
    tl.to({}, { duration: 1.2, ease: 'power1.out' });

    // 4.2s -> 5.0s: Anticipation wind-up (p: 0.42 -> 0.50)
    tl.call(() => {
      soundFx.playKickWhoosh();
    });
    tl.to({}, { duration: 0.8, ease: 'power2.in' });

    // 5.0s -> 5.6s: Continuous Kick Swing & IMPACT! (p: 0.50 -> 0.56)
    tl.to({}, { duration: 0.25, ease: 'power3.in' });

    // 5.25s: Foot hits box!
    tl.call(() => {
      soundFx.playKickImpact();
      soundFx.playBoxShatter();

      confetti({
        particleCount: 50,
        spread: 70,
        origin: { x: 0.58, y: 0.52 },
        colors: ['#00F0FF', '#F59E0B', '#3B82F6', '#FFFFFF'],
        disableForReducedMotion: true,
      });
    });

    tl.to({}, { duration: 0.35, ease: 'power2.out' });

    // 5.6s -> 6.8s: Box opens, 3D ADDIMS letters emerge (p: 0.56 -> 0.68)
    tl.call(() => {
      soundFx.playBrandReveal();
    });
    tl.to({}, { duration: 1.2, ease: 'elastic.out(1, 0.8)' });

    // 6.8s -> 8.4s: Boy walks over to ADDIMS letters (p: 0.68 -> 0.84)
    tl.to({}, {
      duration: 1.6,
      ease: 'power1.inOut',
      onUpdate: function () {
        const prog = this.progress();
        if (Math.sin(prog * 14) > 0.85) {
          soundFx.playFootstep();
        }
      },
    });

    // 8.4s -> 9.5s: Settles into casual lean pose against letters (p: 0.84 -> 0.94)
    tl.call(() => {
      soundFx.playPoseSettle();
    });
    tl.to({}, { duration: 1.1, ease: 'back.out(1.4)' });

    return () => {
      tl.kill();
    };
  }, [replayTrigger, onStoryComplete]);

  return (
    <div
      className="w-full h-full relative cursor-grab active:cursor-grabbing select-none"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 1.95, 7.4], fov: 45 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <CinematicCamera
          progressRef={progressRef}
          mousePos={mousePos}
          orbitEnabled={orbitEnabled}
        />

        {/* 3D Dark Studio Environment */}
        <StudioEnvironment />

        {/* Key Lighting on Character */}
        <pointLight position={[-1.5, 3.5, 3]} color="#FFF5EB" intensity={3.0} distance={14} />
        <pointLight position={[2.5, 3.0, 2]} color="#00F0FF" intensity={2.0} distance={12} />

        {/* Continuous 3D Skeletal Schoolboy */}
        <PixarSchoolboy3D
          progressRef={progressRef}
          mousePos={mousePos}
        />

        {/* Continuous 3D Mysterious Box Chest */}
        <MysteriousBox
          progressRef={progressRef}
        />

        {/* Continuous 3D ADDIMS Typography Monument */}
        <AddimsTypography3D
          progressRef={progressRef}
        />

        {/* Continuous Impact & Spark Effects */}
        <ImpactEffects
          progressRef={progressRef}
        />

        {/* 360° Camera Orbit on Demand */}
        {orbitEnabled && (
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={4}
            maxDistance={14}
            maxPolarAngle={Math.PI / 2 - 0.05}
            target={[0.4, 1.25, 0]}
          />
        )}
      </Canvas>
    </div>
  );
};
