import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw, Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { soundFx } from '../../utils/audioSynthesizer';
import confetti from 'canvas-confetti';

interface CinematicVideoHeroProps {
  onStartProject?: () => void;
  onExploreWork?: () => void;
}

const FRAMES = [
  '/assets/frame_1_box.jpg',     // 0: Initial closed mystery box in dark cyber studio
  '/assets/frame_2_walk.jpg',    // 1: Cute Pixar boy walks in approaching box
  '/assets/frame_3_kick.jpg',    // 2: Dynamic athletic kick impact + spark shockwave
  '/assets/frame_4_emerge.jpg',  // 3: Box opens with light flare, 3D ADDIMS letters emerge
  '/assets/frame_5_sit.jpg',     // 4: Boy sitting comfortably on top of ADDIMS letters
];

export const CinematicVideoHero: React.FC<CinematicVideoHeroProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const shockwaveRef = useRef<{
    active: boolean;
    intensity: number;
    radius: number;
    x: number;
    y: number;
  }>({
    active: false,
    intensity: 0,
    radius: 0,
    x: 0.6,
    y: 0.52,
  });

  // Preload and cache all 5 widescreen Pixar keyframes in memory
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    FRAMES.forEach((src) => {
      const img = new Image();
      img.src = src;
      loadedImages.push(img);
    });
    imagesRef.current = loadedImages;
  }, []);

  // Audio & Timeline Sequence Director (Total duration: 8.8s)
  const startVideoSequence = useCallback(() => {
    startTimeRef.current = Date.now();
    setPlaybackProgress(0);
    shockwaveRef.current = { active: false, intensity: 0, radius: 0, x: 0.6, y: 0.52 };

    // Synchronized audio sound effects
    setTimeout(() => soundFx.playFootstep(), 1400);
    setTimeout(() => soundFx.playFootstep(), 2000);
    setTimeout(() => soundFx.playFootstep(), 2600);
    setTimeout(() => soundFx.playBoxHum(), 2900);
    setTimeout(() => soundFx.playKickWhoosh(), 3400);

    // 3.75s: Power Kick Impact!
    setTimeout(() => {
      soundFx.playKickImpact();
      soundFx.playBoxShatter();
      shockwaveRef.current = { active: true, intensity: 1.0, radius: 10, x: 0.6, y: 0.52 };

      confetti({
        particleCount: 80,
        spread: 90,
        origin: { x: 0.6, y: 0.52 },
        colors: ['#00F0FF', '#FF6B6B', '#3B82F6', '#FFFFFF', '#FBBF24'],
        disableForReducedMotion: true,
      });
    }, 3750);

    // 5.2s: ADDIMS Emergence Chime
    setTimeout(() => soundFx.playBrandReveal(), 5200);

    // 6.8s: Boy Settles Proudly on Logo
    setTimeout(() => {
      soundFx.playPoseSettle();
    }, 6800);
  }, []);

  useEffect(() => {
    startVideoSequence();
  }, [startVideoSequence]);

  // Master 60 FPS Video Interpolation Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localAnimId: number;

    const render = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const totalDuration = 8.8;
      const progress = Math.min(1, elapsed / totalDuration);
      setPlaybackProgress(progress);

      const width = canvas.width;
      const height = canvas.height;

      // --- SMOOTH S-CURVE CONTINUOUS FRAME INTERPOLATION ---
      let frameA = 0;
      let frameB = 0;
      let blend = 0;

      if (elapsed < 1.3) {
        frameA = 0;
        frameB = 0;
        blend = 0;
      } else if (elapsed < 1.9) {
        frameA = 0;
        frameB = 1;
        const rawBlend = (elapsed - 1.3) / 0.6;
        blend = (1 - Math.cos(rawBlend * Math.PI)) / 2;
      } else if (elapsed < 3.5) {
        frameA = 1;
        frameB = 1;
        blend = 0;
      } else if (elapsed < 3.8) {
        frameA = 1;
        frameB = 2;
        const rawBlend = (elapsed - 3.5) / 0.3;
        blend = (1 - Math.cos(rawBlend * Math.PI)) / 2;
      } else if (elapsed < 4.9) {
        frameA = 2;
        frameB = 2;
        blend = 0;
      } else if (elapsed < 5.4) {
        frameA = 2;
        frameB = 3;
        const rawBlend = (elapsed - 4.9) / 0.5;
        blend = (1 - Math.cos(rawBlend * Math.PI)) / 2;
      } else if (elapsed < 6.5) {
        frameA = 3;
        frameB = 3;
        blend = 0;
      } else if (elapsed < 7.0) {
        frameA = 3;
        frameB = 4;
        const rawBlend = (elapsed - 6.5) / 0.5;
        blend = (1 - Math.cos(rawBlend * Math.PI)) / 2;
      } else {
        frameA = 4;
        frameB = 4;
        blend = 0;
      }

      ctx.fillStyle = '#03060E';
      ctx.fillRect(0, 0, width, height);

      // --- CONTINUOUS CINEMATIC CAMERA DOLLY & PARALLAX ---
      const continuousCameraZoom = 1.0 + Math.sin(progress * Math.PI * 0.5) * 0.05;

      let cameraPanX = 0;
      if (elapsed < 3.5) {
        cameraPanX = (elapsed / 3.5) * 15;
      } else if (elapsed < 6.5) {
        cameraPanX = 15 - ((elapsed - 3.5) / 3.0) * 15;
      }

      let breathY = 0;
      if (elapsed >= 6.8) {
        breathY = Math.sin(elapsed * 2.2) * 4.0;
      }

      const parallaxX = mousePos.x * 16;
      const parallaxY = mousePos.y * 10;

      let shakeX = 0;
      let shakeY = 0;
      if (shockwaveRef.current.active && shockwaveRef.current.intensity > 0.01) {
        shakeX = (Math.random() - 0.5) * shockwaveRef.current.intensity * 26;
        shakeY = (Math.random() - 0.5) * shockwaveRef.current.intensity * 26;
        shockwaveRef.current.intensity *= 0.93;
        shockwaveRef.current.radius += 12;
      }

      ctx.save();
      ctx.translate(
        width / 2 + parallaxX + cameraPanX + shakeX,
        height / 2 + parallaxY + breathY + shakeY
      );
      ctx.scale(continuousCameraZoom, continuousCameraZoom);
      ctx.translate(-width / 2, -height / 2);

      const imgA = imagesRef.current[frameA];
      const imgB = imagesRef.current[frameB];

      // 1. Draw Base Frame A
      if (imgA && imgA.complete) {
        ctx.globalAlpha = 1.0;
        ctx.drawImage(imgA, 0, 0, width, height);
      }

      // 2. Draw Blended Frame B with S-Curve Transparency
      if (blend > 0 && imgB && imgB.complete) {
        ctx.globalAlpha = Math.min(1, Math.max(0, blend));
        ctx.drawImage(imgB, 0, 0, width, height);
      }

      // 3. Impact Flash & Shockwave FX on Kick (at 3.75s)
      if (shockwaveRef.current.active && shockwaveRef.current.intensity > 0.02) {
        const shockX = width * shockwaveRef.current.x;
        const shockY = height * shockwaveRef.current.y;
        const radius = shockwaveRef.current.radius;
        const alpha = shockwaveRef.current.intensity;

        const flashGrad = ctx.createRadialGradient(shockX, shockY, 10, shockX, shockY, radius * 1.5);
        flashGrad.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.9})`);
        flashGrad.addColorStop(0.3, `rgba(0, 240, 255, ${alpha * 0.7})`);
        flashGrad.addColorStop(0.7, `rgba(139, 92, 246, ${alpha * 0.3})`);
        flashGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.globalAlpha = alpha;
        ctx.fillStyle = flashGrad;
        ctx.beginPath();
        ctx.arc(shockX, shockY, radius * 1.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `rgba(0, 240, 255, ${alpha * 0.9})`;
        ctx.lineWidth = 6 * alpha;
        ctx.beginPath();
        ctx.arc(shockX, shockY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 4. Floating 60 FPS Ambient Cyber Energy Particles
      ctx.globalAlpha = 0.65;
      for (let i = 0; i < 28; i++) {
        const px = ((Math.sin(elapsed * 0.6 + i * 1.7) * 0.5 + 0.5) * width + i * 20) % width;
        const py = ((Math.cos(elapsed * 0.4 + i * 2.3) * 0.5 + 0.5) * height + i * 15) % height;
        const size = (Math.sin(elapsed * 2 + i) * 0.5 + 1.5) * 1.6;

        ctx.fillStyle = i % 3 === 0 ? '#00F0FF' : i % 3 === 1 ? '#8B5CF6' : '#FBBF24';
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      localAnimId = requestAnimationFrame(render);
    };

    localAnimId = requestAnimationFrame(render);
    animFrameIdRef.current = localAnimId;

    return () => {
      cancelAnimationFrame(localAnimId);
    };
  }, [mousePos]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 2,
      y: (clientY / innerHeight - 0.5) * 2,
    });
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundFx.setMuted(next);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-full h-[100dvh] min-h-[500px] sm:min-h-[720px] max-h-[1080px] bg-[#03060E] overflow-hidden select-none flex items-center justify-center"
    >
      {/* Ambient Cinematic Studio Glows for Seamless Mobile/Desktop Atmosphere */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="w-[320px] sm:w-[650px] h-[220px] sm:h-[450px] bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-indigo-500/10 rounded-full blur-[100px]" />
      </div>

      {/* 1. High-Definition 16:9 Video Canvas (1920x1080 Native Cinema Rendering - Object Contain on Mobile, Object Cover on Desktop) */}
      <canvas
        ref={canvasRef}
        width={1920}
        height={1080}
        className="w-full h-full object-contain md:object-cover pointer-events-none transition-all duration-300"
      />

      {/* 2. Top & Bottom Subtle Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#03060E]/80 via-transparent to-[#03060E]/60" />

      {/* 3. Floating Timeline Video Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5 z-40">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-violet-500 transition-all duration-75 shadow-[0_0_10px_#00F0FF]"
          style={{ width: `${playbackProgress * 100}%` }}
        />
      </div>

      {/* 4. Minimal Icon-Only Floating Story Controller (Top Right Corner) - Sleek Dark Obsidian Glass */}
      <div className="absolute top-4 sm:top-5 right-4 sm:right-6 z-30 flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#0C0614]/85 border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.85)] backdrop-blur-xl pointer-events-auto transition-all duration-300">
        <button
          onClick={startVideoSequence}
          className="p-2 rounded-xl text-slate-300 hover:text-white bg-white/[0.06] hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/40 transition-all active:scale-95 group cursor-pointer"
          title="Replay Video Sequence"
        >
          <RotateCcw className="w-4 h-4 text-cyan-400 group-hover:-rotate-90 transition-transform duration-300" />
        </button>

        <button
          onClick={toggleMute}
          className={`p-2 rounded-xl border transition-all active:scale-95 cursor-pointer ${
            isMuted
              ? 'text-slate-500 bg-white/[0.04] border-white/5 hover:text-slate-300'
              : 'text-cyan-400 bg-cyan-500/15 border-cyan-500/35 shadow-[0_0_12px_rgba(0,240,255,0.25)]'
          }`}
          title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
        </button>
      </div>

      {/* 5. Mobile Scroll Cue */}
      <div className="md:hidden absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none opacity-60 z-30 animate-pulse">
        <span className="text-[9px] font-mono font-bold tracking-[0.25em] text-slate-400 uppercase">Scroll</span>
        <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
      </div>
    </div>
  );
};
