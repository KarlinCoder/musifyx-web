"use client";

import Image from "next/image";
import Link from "next/link";
import { formatSecondsToMinutes, genericBlur } from "@/lib/utils";
import {
  RiDownloadCloudFill,
  RiPauseFill,
  RiPlayFill,
  RiLoader3Line,
} from "react-icons/ri";
import { useAudioStore } from "@/stores/useAudioPreviewStore";

interface Props {
  title: string;
  artistName: string;
  artistId: number;
  duration: number;
  coverUrl: string;
  id: number;
  previewUrl: string;
  albumPosition?: number;
}

export default function TrackCard({
  artistName,
  artistId,
  coverUrl,
  duration,
  id,
  previewUrl,
  title,
  albumPosition,
}: Props) {
  console.log(id);

  const currentPreviewUrl = useAudioStore((state) => state.currentPreviewUrl);
  const isPlaying = useAudioStore((state) => state.isPlaying);
  const isLoading = useAudioStore((state) => state.isLoading);
  const togglePreview = useAudioStore((state) => state.togglePreview);

  const artistUrl = `/artists/${artistId}`;
  const isThisPlaying = currentPreviewUrl === previewUrl && isPlaying;

  const handlePlayPreview = () => {
    const trackInfo = { title, artist: artistName, cover: coverUrl };
    togglePreview(previewUrl, trackInfo);
  };

  return (
    <div className="flex justify-between items-center rounded-md hover:bg-background/50 transition-colors duration-200 grow p-2.5 group/track">
      <div className="flex items-center gap-3">
        {albumPosition && (
          <p className="text-text-muted text-sm w-5 text-right font-mono">
            {albumPosition}
          </p>
        )}

        <div className="relative size-13 rounded overflow-hidden group">
          <Image
            src={coverUrl || "/not-loaded.jpg"}
            alt={`${title} by ${artistName}`}
            blurDataURL={genericBlur}
            width={64}
            height={64}
            placeholder="blur"
            className={`object-cover size-full transition-all duration-300 ${
              isThisPlaying
                ? "scale-105 brightness-75"
                : "group-hover:scale-105"
            }`}
          />

          <div
            className={`absolute inset-0 bg-black/60 flex justify-center items-center backdrop-blur-[2px] transition-opacity duration-200 ${
              isThisPlaying
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            }`}
          >
            <button
              onClick={handlePlayPreview}
              disabled={isLoading && isThisPlaying}
              className="bg-white/90 hover:bg-white text-black rounded-full size-9 flex justify-center items-center transform transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer disabled:opacity-70"
              aria-label={isThisPlaying ? `Pause ${title}` : `Play ${title}`}
            >
              {isLoading && isThisPlaying ? (
                <RiLoader3Line size={18} className="animate-spin" />
              ) : isThisPlaying ? (
                <RiPauseFill size={18} />
              ) : (
                <RiPlayFill size={18} className="ml-0.5" />
              )}
            </button>
          </div>
        </div>

        <div className="-space-y-1 min-w-0">
          <p className="font-medium text-sm truncate">{title}</p>
          <Link
            href={artistUrl}
            className="text-text-muted text-[13px] hover:underline underline-offset-2 block truncate"
          >
            {artistName}
          </Link>
        </div>
      </div>

      <div className="flex justify-end items-center gap-3">
        <p className="text-[13px] text-text-muted text-right">
          {formatSecondsToMinutes(duration)}
        </p>

        <button
          className="rounded-full bg-primary/90 hover:bg-primary active:scale-95 cursor-pointer text-white size-8 flex justify-center items-center transition-all duration-200 hover:shadow-lg"
          aria-label={`Download ${title}`}
        >
          <RiDownloadCloudFill size={20} />
        </button>
      </div>
    </div>
  );
}
