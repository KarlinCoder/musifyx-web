// src/stores/useAudioPreviewStore.ts
import { DeezerTrack } from "@/types/deezer";
import { create } from "zustand";

interface AudioState {
  current: DeezerTrack | null;
  audio: HTMLAudioElement | null;
  isPlaying: boolean;
  isLoading: boolean;
  play: (track: DeezerTrack) => void;
  pause: () => void;
  toggle: (track: DeezerTrack) => void;
  clear: () => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  current: null,
  audio: null,
  isPlaying: false,
  isLoading: false,

  play: (track) => {
    const { audio: currentAudio } = get();

    if (currentAudio) {
      currentAudio.pause();
      currentAudio.src = "";
      currentAudio.load();
    }

    set({
      current: track,
      isLoading: true,
      isPlaying: false,
    });

    const audio = new Audio(track.preview);
    audio.preload = "auto";

    audio.addEventListener(
      "canplay",
      async () => {
        try {
          await audio.play();
          set({
            isPlaying: true,
            isLoading: false,
            audio,
          });
        } catch (error) {
          console.error("Error al reproducir:", error);
          set({
            isPlaying: false,
            isLoading: false,
          });
        }
      },
      { once: true },
    );

    audio.addEventListener("ended", () => {
      get().clear();
    });

    audio.load();
  },

  pause: () => {
    const { audio } = get();
    if (audio) {
      audio.pause();
      set({ isPlaying: false });
    }
  },

  toggle: (track) => {
    const { current, isPlaying } = get();

    if (current?.id === track.id) {
      return isPlaying ? get().pause() : get().play(track);
    } else {
      get().play(track);
    }
  },

  clear: () => {
    const { audio } = get();
    if (audio) {
      audio.pause();
      audio.src = "";
    }
    set({
      current: null,
      audio: null,
      isPlaying: false,
      isLoading: false,
    });
  },
}));
