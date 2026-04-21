import type { SolvedUser } from "./solvedac";

export type UserDataPreset = {
  user: SolvedUser;
  profileImagePath?: string;
  backgroundImagePath?: string;
};

const PRESETS: Record<string, UserDataPreset> = {
  "0501": {
    user: {
      handle: "0501",
      tier: 31,
      solvedCount: 0,
      rank: 0,
      class: 10,
      classDecoration: "gold",
      backgroundId: "0501_back",
      profileImageUrl: null,
      maxStreak: 0,
    },
    profileImagePath: "profile/0501.jpg",
    backgroundImagePath: "background/0501_back.jpg",
  },
};

export function getUserDataPreset(handle: string) {
  return PRESETS[handle.trim().toLowerCase()] ?? null;
}
