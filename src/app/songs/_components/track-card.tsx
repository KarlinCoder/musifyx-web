"use client";

import fallbackImage from "@/assets/album-fallback.webp";
import Image from "next/image";
import Link from "next/link";
import { formatSecondsToMinutes, genericBlur } from "@/lib/utils";
import { useState } from "react";
import { RiDownloadCloudFill, RiLoader2Line } from "react-icons/ri";
import { downloadTrack } from "@/services/download-track";

interface Props {
  title: string;
  artistName: string;
  artistId: number;
  duration: number;
  coverUrl: string | undefined;
  id: number;
  previewUrl: string;
}

export default function TrackCard({
  artistName,
  artistId,
  coverUrl,
  duration,
  id,
  previewUrl,
  title,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const artistUrl = `/artists/${artistId}`;

  const handleDownload = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const trackFileUrl = await downloadTrack(id);
    window.open(trackFileUrl);

    setIsLoading(false);
  };

  return (
    <div className="flex justify-between items-center rounded-lg hover:bg-background active:bg-blend-lighten grow p-3 cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="relative size-13 rounded overflow-hidden">
          <Image
            src={coverUrl ? coverUrl : fallbackImage}
            alt={`${title} by ${artistName}`}
            blurDataURL={genericBlur}
            width={64}
            height={64}
            placeholder="blur"
            className="object-cover size-full"
          />
        </div>

        <div className="-space-y-1">
          <p className="font-medium text-sm">{title}</p>
          <Link
            href={artistUrl}
            className="text-text-muted text-[13px] hover:underline underline-offset-2"
          >
            {artistName}
          </Link>
        </div>
      </div>

      <div className="flex justify-end items-center gap-3">
        <p className="text-[13px] text-text-muted">
          {formatSecondsToMinutes(duration)}
        </p>

        <button
          onClick={handleDownload}
          disabled={isLoading}
          className="rounded-full bg-primary hover:opacity-80 active:opacity-100 cursor-pointer text-white disabled:bg-neutral-600 size-8 flex justify-center items-center"
        >
          <div>
            {isLoading ? (
              <RiLoader2Line size={20} className="animate-spin" />
            ) : (
              <RiDownloadCloudFill size={20} />
            )}
          </div>
        </button>
      </div>
    </div>
  );
}
