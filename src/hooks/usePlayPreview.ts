// hooks/usePlayPreview.ts
import { useEffect, useRef, useState } from "react";

interface Props {
  previewUrl: string;
}

export default function usePlayPreview({ previewUrl }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Limpiar audio anterior si existe
  const cleanupAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current.load();
      audioRef.current = null;
    }
  };

  const play = async () => {
    cleanupAudio();

    setIsLoading(true);

    try {
      const audio = new Audio(previewUrl);
      audioRef.current = audio;

      const handleCanPlay = () => {
        setIsLoading(false);
        audio.play().catch((error) => {
          console.error("Error al reproducir:", error);
          setIsPlaying(false);
          setIsLoading(false);
        });
      };

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleEnded = () => {
        setIsPlaying(false);
        cleanupAudio();
      };

      audio.addEventListener("canplay", handleCanPlay);
      audio.addEventListener("play", handlePlay);
      audio.addEventListener("pause", handlePause);
      audio.addEventListener("ended", handleEnded);

      audio.preload = "auto";
      audio.load();
    } catch (error) {
      console.error("Error al crear el audio:", error);
      setIsLoading(false);
      setIsPlaying(false);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  // Cleanup al desmontar el componente
  useEffect(() => {
    return () => {
      cleanupAudio();
    };
  }, []);

  return {
    isLoading,
    isPlaying,
    play,
    pause,
    togglePlayPause,
  };
}
