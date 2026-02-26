import { create } from "zustand";

type PreviewTrackInfo = {
  title: string;
  artist: string;
  cover: string;
};

interface AudioState {
  currentPreviewUrl: string | null;
  isPlaying: boolean;
  isLoading: boolean;
  audio: HTMLAudioElement | null;
  trackData: PreviewTrackInfo | null;

  setAudio: (audio: HTMLAudioElement | null) => void;
  playPreview: (url: string, track: PreviewTrackInfo) => void;
  pausePreview: () => void;
  togglePreview: (url: string, track: PreviewTrackInfo) => void;
  reset: () => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  currentPreviewUrl: null,
  isPlaying: false,
  isLoading: false,
  audio: null,
  trackData: null,

  setAudio: (audio) => set({ audio }),

  reset: () => {
    const { audio } = get();
    if (audio) {
      audio.pause();
      audio.src = "";
      audio.load();
    }
    set({
      currentPreviewUrl: null,
      isPlaying: false,
      isLoading: false,
      audio: null,
      trackData: null,
    });
  },

  playPreview: (url, track) => {
    const { audio: currentAudio } = get();

    if (currentAudio) {
      currentAudio.pause();
      currentAudio.src = "";
      currentAudio.load();
    }

    // Guardamos URL + datos ligeros del track
    set({ isLoading: true, currentPreviewUrl: url, trackData: track });

    const audio = new Audio(url);
    audio.preload = "auto";

    audio.addEventListener(
      "canplay",
      async () => {
        try {
          await audio.play();
          set({ isPlaying: true, isLoading: false, audio });
        } catch (error) {
          console.error("Error al reproducir:", error);
          set({ isPlaying: false, isLoading: false });
        }
      },
      { once: true },
    );

    audio.addEventListener("ended", () => {
      get().reset();
    });

    audio.load();
  },

  pausePreview: () => {
    const { audio } = get();
    if (audio) {
      audio.pause();
    }
    set({ isPlaying: false });
  },

  togglePreview: (url, track) => {
    const { currentPreviewUrl, isPlaying } = get();

    if (currentPreviewUrl === url) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      isPlaying ? get().pausePreview() : get().playPreview(url, track);
    } else {
      get().playPreview(url, track);
    }
  },
}));
