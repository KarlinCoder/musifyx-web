"use client";

import { formatRecordType, genericBlur } from "@/lib/utils";
import Link from "next/link";
import ExplicitMark from "./explicit-mark";
import ImageWithFallback from "./image-with-fallback";
import { useSettingsStore } from "@/app/app/_stores/useSettingsStore";

interface Props {
  info: {
    id: number;
    coverUrl: string;
    title: string;
    artistName: string;
    hasExplicitLyrics: boolean;
    recordType: string;
  };
}

export default function AlbumCard({ info }: Props) {
  const hideExplicit = useSettingsStore((s) => s.hideExplicit);
  const { id, coverUrl, title, artistName, hasExplicitLyrics, recordType } =
    info;

  if (hideExplicit && hasExplicitLyrics) return null;

  return (
    <Link
      href={`/app/albums/${id}`}
      key={id}
      title={title}
      className="inline-block overflow-hidden hover:bg-background-light cursor-pointer h-fit p-2.5 rounded-md"
    >
      <div className="overflow-hidden">
        <ImageWithFallback
          loading="lazy"
          placeholder="blur"
          blurDataURL={genericBlur}
          width={100}
          height={100}
          src={coverUrl}
          fallbackType="album"
          alt={`"${title}" de ${artistName}`}
          className="w-full aspect-square img-card"
        />
      </div>

      <div className="p-3">
        <p className="font-medium text-[15px] min-w-0 w-full flex items-center gap-1">
          <span className="truncate">{title}</span>
          {}
        </p>
        <p className="text-text-muted truncate text-[13px] flex items-center gap-1.5">
          {hasExplicitLyrics && (
            <>
              <ExplicitMark />
            </>
          )}
          {formatRecordType(recordType) ?? "XD"}
          {" • "}
          {artistName}
        </p>
      </div>
    </Link>
  );
}
