import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  previewVolume: number;
  hideExplicit: boolean;
  animations: boolean;
  setPreviewVolume: (v: number) => void;
  setHideExplicit: (v: boolean) => void;
  setAnimations: (v: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      previewVolume: 75,
      hideExplicit: false,
      animations: true,
      setPreviewVolume: (previewVolume) => set({ previewVolume }),
      setHideExplicit: (hideExplicit) => set({ hideExplicit }),
      setAnimations: (animations) => set({ animations }),
    }),
    {
      name: "musify-settings",
    },
  ),
);
