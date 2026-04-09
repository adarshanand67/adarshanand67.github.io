import { create } from "zustand";

interface AudioStore {
  currentTime: number;
  duration: number;
  seekTime: number | null;
  setProgress: (currentTime: number, duration: number) => void;
  requestSeek: (time: number | null) => void;
}

export const useAudioStore = create<AudioStore>((set) => ({
  currentTime: 0,
  duration: 0,
  seekTime: null,
  setProgress: (currentTime, duration) => set({ currentTime, duration }),
  requestSeek: (time) => set({ seekTime: time }),
}));
