import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw, Volume2, VolumeX, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { soundFx } from '../../utils/audioSynthesizer';
import confetti from 'canvas-confetti';

interface CinematicStoryHeroProps {
  onStartProject: () => void;
  onExploreWork: () => void;
}

type StoryPhase = 'INITIAL_BOX' | 'BOY_WALKING' | 'BOY_KICK' | 'BOX_SHATTER' | 'ADDIMS_REVEAL' | 'BOY_SITTING';

export const CinematicStoryHero: React.FC<CinematicStoryHeroProps> = ({
  onStartProject,
  onExploreWork,
}) => {
  const [phase, setPhase] = useState<StoryPhase>('INITIAL_BOX');
  const [isMuted, setIsMuted] = useState(false);
  const [showUIOverlays, setShowUIOverlays] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [walkX, setWalkX] = useState(-35); // percentage offset from left
  const [screenShake, setScreenShake] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const startStorySequence = useCallback(() => {
    clearAllTimeouts();
    setPhase('INITIAL_BOX');
    setWalkX(-35);
    setShowUIOverlays(false);
    setScreenShake(false);

    // 1. 0s - 0.6s: Show clean initial mysterious closed box only
    const t0 = setTimeout(() => {
      setPhase('BOY_WALKING');
      soundFx.playFootstep();
    }, 600);

    // 2. 0.6s - 2.8s: Boy walks in with smooth, life-like stride towards the box
    const walkInterval = setInterval(() => {
      setWalkX((prev) => {
        if (prev < 12) {
          if (Math.random() > 0.6) soundFx.playFootstep();
          return prev + 1.2;
        }
        clearInterval(walkInterval);
        return 12;
      });
    }, 45);

    // 3. 2.7s: Wind-up preparation
    const t1 = setTimeout(() => {
      setPhase('BOY_KICK');
      soundFx.playKickWhoosh();
    }, 2700);

    // 4. 3.2s: Foot impacts the box!
    const t2 = setTimeout(() => {
      setScreenShake(true);
      soundFx.playKickImpact();
      soundFx.playBoxShatter();

      confetti({
        particleCount: 60,
        spread: 80,
        origin: { x: 0.62, y: 0.55 },
        colors: ['#00F0FF', '#FF6B6B', '#3B82F6', '#FFFFFF', '#F59E0B'],
        disableForReducedMotion: true,
      });

      setTimeout(() => setScreenShake(false), 450);
    }, 3200);

    // 5. 3.8s: Box bursts open & bold 3D ADDIMS typography emerges
    const t3 = setTimeout(() => {
      setPhase('ADDIMS_REVEAL');
      soundFx.playBrandReveal();
    }, 3800);

    // 6. 4.8s: Boy climbs up and sits comfortably on top of the ADDIMS letters!
    const t4 = setTimeout(() => {
      setPhase('BOY_SITTING');
      soundFx.playPoseSettle();
    }, 4800);

    // 7. 5.6s: Modern non-intrusive action controls & headline fade in
    const t5 = setTimeout(() => {
      setShowUIOverlays(true);
    }, 5600);

    timeoutsRef.current.push(t0, t1, t2, t3, t4, t5);
  }, []);

  useEffect(() => {
    startStorySequence();
    return () => clearAllTimeouts();
  }, [startStorySequence]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMouseOffset({
      x: (clientX / innerWidth - 0.5) * 20,
      y: (clientY / innerHeight - 0.5) * 15,
    });
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundFx.setMuted(next);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative w-full h-screen min-h-[720px] max-h-[1080px] bg-[#03060E] overflow-hidden select-none flex items-center justify-center ${
        screenShake ? 'animate-shake' : ''
      }`}
      style={{ perspective: '1200px' }}
    >
      {/* 1. Cinematic Studio Background Layer */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 ease-out"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 40%, rgba(0, 240, 255, 0.08) 0%, rgba(5, 7, 13, 0.95) 75%), url('/assets/scene_1_box.jpg')`,
          transform: `scale(1.05) translate(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#03060E] via-transparent to-[#03060E]/80" />
      </div>

      {/* 2. Floating Ambient Sparkles & Energy Dust */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-cyan-400/80 shadow-[0_0_12px_#00F0FF] animate-ping" />
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-violet-400/80 shadow-[0_0_12px_#8B5CF6] animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 rounded-full bg-sky-300/60 shadow-[0_0_10px_#38BDF8] animate-bounce" />
      </div>

      {/* 3. CINEMATIC CHARACTER & STORY STAGE */}
      <div className="relative z-20 w-full max-w-7xl h-full flex items-center justify-center">
        {/* --- SCENE A: INITIAL MYSTERY BOX ONLY (Clean Load State) --- */}
        {phase === 'INITIAL_BOX' && (
          <div className="relative flex flex-col items-center justify-center animate-fade-in">
            <div className="relative w-[340px] sm:w-[420px] md:w-[480px] h-[340px] sm:h-[420px] md:h-[480px] transition-transform duration-500">
              <img
                src="/assets/scene_1_box.jpg"
                alt="Mysterious Box"
                className="w-full h-full object-contain filter drop-shadow-[0_0_40px_rgba(0,240,255,0.4)]"
              />
            </div>
            <div className="w-48 h-12 rounded-full bg-cyan-500/20 blur-xl -mt-10 animate-pulse" />
          </div>
        )}

        {/* --- SCENE B: BOY WALKING TOWARDS THE BOX --- */}
        {phase === 'BOY_WALKING' && (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* The Stationary Box */}
            <div className="absolute right-[20%] sm:right-[26%] top-1/2 -translate-y-1/2 w-[280px] sm:w-[380px] h-[280px] sm:h-[380px]">
              <img
                src="/assets/scene_1_box.jpg"
                alt="Mysterious Box"
                className="w-full h-full object-contain filter drop-shadow-[0_0_35px_rgba(0,240,255,0.4)]"
              />
            </div>

            {/* The Pixar Boy Walking In from Left */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-[280px] sm:w-[360px] transition-all duration-75 ease-linear"
              style={{
                left: `${walkX}%`,
                transform: `translateY(-50%) translate(${mouseOffset.x * 0.6}px, ${mouseOffset.y * 0.6}px)`,
              }}
            >
              <img
                src="/assets/scene_2_walk.jpg"
                alt="Pixar Boy Walking"
                className="w-full h-auto object-contain rounded-3xl filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] border border-cyan-400/20"
              />
            </div>
          </div>
        )}

        {/* --- SCENE C: DYNAMIC ATHLETIC KICK & IMPACT SPARK EXPLOSION --- */}
        {(phase === 'BOY_KICK' || phase === 'BOX_SHATTER') && (
          <div className="relative w-full max-w-5xl h-[520px] sm:h-[620px] flex items-center justify-center animate-zoom-impact">
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src="/assets/scene_3_kick.jpg"
                alt="Boy Kicking Mystery Box"
                className="w-full h-full object-contain rounded-3xl filter drop-shadow-[0_0_60px_rgba(0,240,255,0.6)] border border-cyan-400/30"
              />
              <div className="absolute inset-0 bg-cyan-400/15 rounded-3xl pointer-events-none animate-ping duration-300" />
            </div>
          </div>
        )}

        {/* --- SCENE D: ADDIMS EMERGENCE & BOY SITTING PROUDLY ON TOP --- */}
        {(phase === 'ADDIMS_REVEAL' || phase === 'BOY_SITTING') && (
          <div
            className="relative w-full max-w-6xl h-[540px] sm:h-[680px] flex items-center justify-center animate-fade-in-up"
            style={{
              transform: `translate(${mouseOffset.x * 0.5}px, ${mouseOffset.y * 0.5}px)`,
            }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src="/assets/scene_4_sit_addims.jpg"
                alt="Boy Sitting Proudly on ADDIMS 3D Typography"
                className="w-full h-full object-contain rounded-3xl filter drop-shadow-[0_0_70px_rgba(0,240,255,0.5)] border border-cyan-400/30"
              />
              <div className="absolute bottom-8 left-1/4 right-1/4 h-16 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none animate-pulse" />
            </div>
          </div>
        )}
      </div>

      {/* 4. POST-REVEAL HERO HEADLINE & ACTIONS (Fades in smoothly after boy is sitting) */}
      {showUIOverlays && (
        <div className="absolute bottom-20 sm:bottom-12 left-0 right-0 z-30 px-4 sm:px-8 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 pointer-events-auto animate-fade-in-up">
          {/* Left Brand Slogan */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-400/30 text-[11px] font-mono text-cyan-300 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>IDEAS. BUILT FORWARD.</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white drop-shadow-[0_0_25px_rgba(0,240,255,0.4)]">
              Next-Gen Digital Lab & Studio
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-md mt-1 font-light">
              Crafting spatial 3D web platforms, intelligent software, and high-performance solutions.
            </p>
          </div>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={onExploreWork}
              className="px-5 py-3 rounded-xl glass-panel text-xs font-semibold text-slate-200 hover:text-white border border-white/15 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all flex items-center gap-2 shadow-lg"
            >
              <span>Explore Work</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
            </button>

            <button
              onClick={onStartProject}
              className="px-6 py-3 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 hover:from-cyan-300 hover:to-fuchsia-400 transition-all shadow-[0_0_30px_rgba(0,240,255,0.5)] flex items-center gap-2 active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 fill-black" />
              <span>Start a Project</span>
            </button>
          </div>
        </div>
      )}

      {/* 5. Minimalistic Floating Cinematic Dock Controls */}
      <div className="absolute top-24 right-6 sm:right-10 z-40 flex items-center gap-2 p-1.5 rounded-2xl bg-[#0C0614]/85 border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.85)] backdrop-blur-xl pointer-events-auto">
        <button
          onClick={startStorySequence}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-white/[0.06] hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/40 transition-all active:scale-95 group cursor-pointer"
          title="Replay Video Sequence"
        >
          <RotateCcw className="w-3.5 h-3.5 text-cyan-400 group-hover:-rotate-90 transition-transform duration-300" />
          <span className="hidden sm:inline">Replay Story</span>
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
    </div>
  );
};
