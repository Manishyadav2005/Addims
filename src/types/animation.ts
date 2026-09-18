export type AnimationStage = 
  | 'INITIAL'       // 0: Scene init, particles & lights
  | 'WALK_IN'       // 1: Boy enters from left
  | 'NOTICE_BOX'    // 2: Boy stops and looks at the box
  | 'WIND_UP'       // 3: Prepares for kick, balances stance
  | 'KICK'          // 4: Smooth dynamic power kick
  | 'IMPACT'        // 5: Foot hits box, screen shake, spark blast
  | 'SHATTER'       // 6: Box shatters into 3D fragments
  | 'REVEAL_BRAND'  // 7: ADDIMS 3D letters emerge from glowing epicenter
  | 'WALK_TO_LOGO'  // 8: Boy walks to the side of ADDIMS
  | 'LEAN_POSE'     // 9: Boy rests elbow/shoulder on ADDIMS in confident idle
  | 'COMPLETED';    // 10: Interactive mode (orbit, mouse parallax, replay)

export interface StoryState {
  stage: AnimationStage;
  progress: number; // 0 to 1
  isMuted: boolean;
  orbitEnabled: boolean;
  screenShake: number; // 0 to 1 intensity
  impactTriggered: boolean;
  boxShattered: boolean;
  brandRevealed: boolean;
  boyLeaning: boolean;
}
