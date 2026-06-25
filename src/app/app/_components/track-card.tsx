"use client";

import ImageWithFallback from "./image-with-fallback";
import { formatSecondsToMinutes, genericBlur } from "@/lib/utils";
import {
  RiPauseFill,
  RiPlayFill,
  RiLoader3Line,
  RiMore2Line,
  RiCircleFill,
  RiHeartFill,
  RiHeartLine,
} from "react-icons/ri";
import { useAudioStore } from "@/app/app/_stores/useAudioPreviewStore";
import ExplicitMark from "./explicit-mark";
import { useEffect, useState } from "react";
import TrackCardDownloadButton from "./track-card-download-button";
import TrackCardDropdown from "./track-card-dropdown";
import TrackLyricsModal from "@/app/app/_components/track-lyrics-modal";
import { AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import TrackMeaningsModal from "@/app/app/_components/track-meaning-modal";

import { getTrackPreview } from "@/app/app/_services/musify";
import { useFavoritesStore } from "@/app/app/_stores/useFavoriteStore";
import { useSettingsStore } from "@/app/app/_stores/useSettingsStore";
import { MFArtist } from "@/app/app/_types/musify";

interface Props {
  data: {
    id: number;
    title: string;
    artists: MFArtist[];
    image_url: string;
    explicit_lyrics: boolean;
    duration: number;
  };
  listPosition?: number;
}

export default function TrackCard({ data, listPosition }: Props) {
  const hideExplicit = useSettingsStore((s) => s.hideExplicit);
  const current = useAudioStore((s) => s.current);
  const isPlaying = useAudioStore((s) => s.isPlaying);
  const isLoading = useAudioStore((s) => s.isLoading);
  const [detailOption, setDetailOption] = useState("");
  const { play, clear } = useAudioStore();

  const [showDropdown, setShowDropdown] = useState(false);
  const [isFetchingPreview, setIsFetchingPreview] = useState(false);

  const { toggleTrack, tracks } = useFavoritesStore();

  const isFav = tracks.some((t) => t.id === data.id);
  const artistsText = data.artists.map((artist) => artist.name).join(", ");

  const isThis = current?.id === data.id;

  const handleToggle = async () => {
    if (isThis && isPlaying) {
      clear();
      return;
    }

    try {
      setIsFetchingPreview(true);
      const previewUrl = await getTrackPreview(data.id);
      if (!previewUrl) return;
      play({ ...data, preview_url: previewUrl });
    } catch (error) {
      console.error("❌ Failed to fetch track preview:", error);
    } finally {
      setIsFetchingPreview(false);
    }
  };

  const toggleFavorite = () => {
    toggleTrack({
      id: data.id,
      title: data.title,
      artists: data.artists,
      image_url: data.image_url,
      explicit_lyrics: data.explicit_lyrics,
      duration_ms: data.duration,
      preview_url: null,
    });
  };

  useEffect(() => {
    console.log(data.id);
    return () => clear();
  }, [clear, data]);

  const isLoadingOrFetching = isFetchingPreview || (isLoading && isThis);

  if (hideExplicit && data.explicit_lyrics) return null;

  return (
    <div className="relative overflow-visible flex gap-4 justify-between items-center rounded-md hover:bg-background grow py-3 px-2 group/track box-border">
      <AnimatePresence>
        {showDropdown && (
          <TrackCardDropdown
            isFavorite={isFav}
            onClose={() => setShowDropdown(false)}
            onSelect={(option) => setDetailOption(option)}
          />
        )}
      </AnimatePresence>

      {createPortal(
        <AnimatePresence>
          {detailOption === "track-lyrics" && (
            <TrackLyricsModal
              key="track-lyrics-modal"
              trackName={data.title}
              songId={data.id}
              imageUrl={data.image_url}
              artists={data.artists}
              onClose={() => setDetailOption("")}
            />
          )}

          {detailOption === "track-meaning" && (
            <TrackMeaningsModal
              key="track-meaning-modal"
              trackName={data.title}
              songId={data.id}
              imageUrl={data.image_url}
              artists={data.artists}
              onClose={() => setDetailOption("")}
            />
          )}
        </AnimatePresence>,
        document.querySelector("body")!,
      )}

      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="relative size-13 rounded shrink-0 group">
          <ImageWithFallback
            src={data.image_url}
            fallbackType="track"
            alt={`Song cover art`}
            blurDataURL={genericBlur}
            width={64}
            height={64}
            placeholder="blur"
            className="object-cover size-full transition-all duration-300 img-card"
          />

          <div
            className={`absolute inset-0 size-full ${
              isThis ? "opacity-100" : "group-hover/track:opacity-100 opacity-0"
            } bg-black/30 flex items-center justify-center`}
          >
            <button
              onClick={handleToggle}
              disabled={isLoadingOrFetching}
              className={`bg-[#0009] backdrop-blur-2xl hover:bg-[#000f] active:bg-[#0009] text-white rounded-full size-9 flex justify-center items-center cursor-pointer transition-opacity duration-200 ${
                isLoadingOrFetching ? "cursor-not-allowed opacity-70" : ""
              }`}
            >
              {isLoadingOrFetching ? (
                <RiLoader3Line size={18} className="animate-spin" />
              ) : isThis && isPlaying ? (
                <RiPauseFill size={18} />
              ) : (
                <RiPlayFill size={18} className="ml-0.5" />
              )}
            </button>
          </div>
        </div>

        <div className="min-w-0 flex flex-col justify-center">
          <p className="font-medium text-sm truncate">
            {listPosition && (
              <span className="text-white/70 mr-1">
                {listPosition?.toString().padStart(2, " ")}.{" "}
              </span>
            )}
            {data.title || "[Título no disponible]"}
          </p>

          <div className="flex flex-nowrap items-center gap-1.5 text-text-muted text-[13px] truncate w-full min-w-0">
            {data.explicit_lyrics && <ExplicitMark />}
            <div className="flex items-center gap-1.5">
              <p>Cancion</p> <RiCircleFill size={5} className="block" />
              <p>{artistsText}</p>
            </div>

            {!data.artists && <span>[Artista desconocido]</span>}
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center shrink-0 gap-1">
        <p className="text-[12px] mr-2 text-text-muted text-right font-nums flex items-center gap-1">
          {formatSecondsToMinutes(data.duration || 0)}
        </p>

        <button
          type="button"
          onClick={toggleFavorite}
          className="p-2 hover:scale-110 active:scale-95 transition cursor-pointer"
          aria-label={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {isFav ? (
            <RiHeartFill className="w-5 h-5 text-red-500" />
          ) : (
            <RiHeartLine className="w-5 h-5 text-text-muted hover:text-white" />
          )}
        </button>

        <TrackCardDownloadButton
          trackId={data.id}
          artist={artistsText}
          imageUrl={data.image_url}
          title={data.title}
        />

        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="p-2 hover:bg-white/7 active:bg-white/4 cursor-pointer rounded-full"
        >
          <RiMore2Line size={18} />
        </button>
      </div>
    </div>
  );
}
