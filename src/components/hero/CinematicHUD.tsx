import React from 'react';
import { RotateCcw, Volume2, VolumeX, Eye, CheckCircle2 } from 'lucide-react';
import type { StoryState, AnimationStage } from '../../types/animation';
import { soundFx } from '../../utils/audioSynthesizer';

interface CinematicHUDProps {
  storyState: StoryState;
  setStoryState: React.Dispatch<React.SetStateAction<StoryState>>;
  onReplay: () => void;
}

const STAGE_LABELS: { [key in AnimationStage]: { title: string; step: number } } = {
  INITIAL: { title: 'Atmosphere Init', step: 1 },
  WALK_IN: { title: 'Boy Enters Scene', step: 1 },
  NOTICE_BOX: { title: 'Noticing Futuristic 3D Box', step: 2 },
  WIND_UP: { title: 'Power Kick Stance', step: 3 },
  KICK: { title: 'High Kick Trajectory', step: 4 },
  IMPACT: { title: 'Impact Blast & Shockwave', step: 4 },
  SHATTER: { title: '3D Box Sharding', step: 5 },
  REVEAL_BRAND: { title: 'ADDIMS 3D Brand Reveal', step: 6 },
  WALK_TO_LOGO: { title: 'Approach Brand', step: 7 },
  LEAN_POSE: { title: 'Confident Lean Pose', step: 8 },
  COMPLETED: { title: 'Interactive Cinematic Mode', step: 8 },
};

export const CinematicHUD: React.FC<CinematicHUDProps> = ({
  storyState,
  setStoryState,
  onReplay,
}) => {
  const currentStageInfo = STAGE_LABELS[storyState.stage] || STAGE_LABELS.COMPLETED;

  const toggleMute = () => {
    const nextMute = !storyState.isMuted;
    soundFx.setMuted(nextMute);
    setStoryState((prev) => ({ ...prev, isMuted: nextMute }));
  };

  const toggleOrbit = () => {
    setStoryState((prev) => ({ ...prev, orbitEnabled: !prev.orbitEnabled }));
  };

  return (
    <div className="absolute bottom-6 left-0 right-0 px-4 sm:px-8 z-20 pointer-events-none flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
      {/* Active Story Progression Pill */}
      <div className="pointer-events-auto glass-panel px-4 py-2.5 rounded-2xl border border-white/10 flex items-center gap-3.5 shadow-xl max-w-sm sm:max-w-md w-full sm:w-auto">
        <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold">
          {currentStageInfo.step}/8
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
            <span className="truncate text-slate-300 font-medium">{currentStageInfo.title}</span>
            <span className="text-cyan-400 font-bold ml-2">{Math.round(storyState.progress * 100)}%</span>
          </div>

          {/* Progress Track */}
          <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-fuchsia-400 transition-all duration-150 ease-out"
              style={{ width: `${Math.max(5, storyState.progress * 100)}%` }}
            />
          </div>
        </div>

        {storyState.stage === 'COMPLETED' && (
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 animate-bounce" />
        )}
      </div>

      {/* Floating Control Toolbar */}
      <div className="pointer-events-auto flex items-center gap-2 p-1.5 rounded-2xl bg-[#0C0614]/85 border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.85)] backdrop-blur-xl">
        {/* Replay Sequence Button */}
        <button
          onClick={onReplay}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-white/[0.06] hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/40 transition-all duration-200 active:scale-95 group cursor-pointer"
          title="Replay Story Sequence"
        >
          <RotateCcw className="w-3.5 h-3.5 text-cyan-400 group-hover:-rotate-90 transition-transform duration-300" />
          <span className="hidden sm:inline">Replay</span>
        </button>

        {/* 360 Orbit Camera Toggle */}
        <button
          onClick={toggleOrbit}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 active:scale-95 cursor-pointer ${
            storyState.orbitEnabled
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
              : 'text-slate-300 hover:text-white bg-white/[0.06] hover:bg-white/10 border-white/10'
          }`}
          title="Toggle 360° Free Camera Orbit"
        >
          <Eye className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">{storyState.orbitEnabled ? '360° Free View: ON' : '360° Camera'}</span>
        </button>

        {/* Sound FX Toggle */}
        <button
          onClick={toggleMute}
          className={`p-2 rounded-xl border transition-all duration-200 active:scale-95 cursor-pointer ${
            storyState.isMuted
              ? 'text-slate-500 bg-white/[0.04] border-white/5 hover:text-slate-300'
              : 'text-cyan-400 bg-cyan-500/15 border-cyan-500/35 shadow-[0_0_10px_rgba(0,240,255,0.2)]'
          }`}
          title={storyState.isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
        >
          {storyState.isMuted ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4 animate-pulse" />
          )}
        </button>
      </div>
    </div>
  );
};
