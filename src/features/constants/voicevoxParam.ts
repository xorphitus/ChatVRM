export type VoicevoxParam = {
  speaker: number;
};

export const DEFAULT_PARAM: VoicevoxParam = {
  speaker: 0,
} as const;

export const PRESET_A: VoicevoxParam = {
  speaker: 0,
} as const;

export const PRESET_B: VoicevoxParam = {
  speaker: 0,
} as const;

export const PRESET_C: VoicevoxParam = {
  speaker: 0,
} as const;

export const PRESET_D: VoicevoxParam = {
  speaker: -0,
} as const;
