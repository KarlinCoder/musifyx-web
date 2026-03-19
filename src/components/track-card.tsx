"use client";
import imageFallback from "@/assets/not-loaded.jpg";
import Image from "next/image";
import Link from "next/link";
import { formatSecondsToMinutes, genericBlur } from "@/lib/utils";
import { RiPauseFill, RiPlayFill, RiLoader3Line } from "react-icons/ri";
import { useAudioStore } from "@/stores/useAudioPreviewStore";
import ExplicitMark from "./explicit-mark";
import { DeezerTrack } from "@/types/deezer";
import { useEffect } from "react";
import TrackCardDownloadButton from "./track-card-download-button";

interface Props {
  data: DeezerTrack;
  listPosition?: number;
}

export default function TrackCard({ data, listPosition }: Props) {
  const current = useAudioStore((s) => s.current);
  const isPlaying = useAudioStore((s) => s.isPlaying);
  const isLoading = useAudioStore((s) => s.isLoading);
  const { play, pause, clear } = useAudioStore();

  const isThis = current?.id === data?.id;

  const handleToggle = () => {
    if (isThis && isPlaying) pause();
    else play(data);
  };

  useEffect(() => {
    return () => clear();
  }, [clear]);

  return (
    <div className="flex gap-10 justify-between items-center rounded-md hover:bg-background grow p-2.5 group/track">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {listPosition && (
          <p className="text-text-muted text-sm w-5 text-right font-mono shrink-0">
            {listPosition}
          </p>
        )}

        <div className="relative size-13 rounded shrink-0 group">
          <Image
            src={data.album?.cover_small || imageFallback}
            alt={`Song cover art`}
            blurDataURL={genericBlur}
            width={64}
            height={64}
            placeholder="blur"
            className={`object-cover size-full transition-all duration-300`}
          />

          <div
            className={`absolute inset-0 size-full ${isThis && data.preview ? "opacity-100" : "group-hover/track:opacity-100 opacity-0"} bg-black/30 flex items-center justify-center rounded`}
          >
            <button
              onClick={handleToggle}
              disabled={isLoading && isThis}
              className={`bg-primary hover:bg-secondary active:bg-primary text-white rounded-full size-9 flex justify-center items-center cursor-pointer transition-opacity duration-200 `}
            >
              {isLoading && isThis ? (
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
            {data.title || "[Título no disponible]"}
          </p>

          <div className="flex flex-nowrap items-center gap-1.5 text-text-muted text-[13px] truncate w-full min-w-0">
            {data.explicit_lyrics && <ExplicitMark />}
            <span>Cancion • </span>
            {data.contributors?.length > 0 && (
              <>
                <div className="flex gap-1 min-w-0">
                  {data.contributors.map((artist, index) => (
                    <Link
                      key={artist.id}
                      href={`/artists/${artist.id}`}
                      className="hover:underline underline-offset-2 hover:text-foreground transition-colors whitespace-nowrap"
                    >
                      {artist.name}
                      {index < data.contributors?.length - 1 && ","}
                    </Link>
                  ))}
                </div>
              </>
            )}
            {(!data.contributors || data.contributors.length === 0) && (
              <span>[Artista desconocido]</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center gap-3 shrink-0">
        <p className="text-[13px] text-text-muted text-right font-nums">
          {formatSecondsToMinutes(data.duration || 0)}
        </p>

        <TrackCardDownloadButton trackId={data.id} />
      </div>
    </div>
  );
}
