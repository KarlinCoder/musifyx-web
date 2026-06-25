class AudioPlayer {
  private static instance: AudioPlayer;
  private audio: HTMLAudioElement | null = null;

  private constructor() {}

  public static getInstance(): AudioPlayer {
    if (!AudioPlayer.instance) {
      AudioPlayer.instance = new AudioPlayer();
    }
    return AudioPlayer.instance;
  }

  public play(url: string): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }

    this.audio = new Audio(url);

    this.audio.addEventListener("error", (e) => {
      console.error("Error al reproducir:", e);
    });

    this.audio.play().catch((error) => {
      console.error("Error al iniciar reproducción:", error);
    });
  }

  public stop(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
    }
  }

  public pause(): void {
    if (this.audio) {
      this.audio.pause();
    }
  }

  public isPlaying(): boolean {
    return this.audio !== null && !this.audio.paused;
  }
}

export const audioPlayer = AudioPlayer.getInstance();
