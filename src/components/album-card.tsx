import { formatRecordType, genericBlur } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import ExplicitMark from "./explicit-mark";

interface Props {
  id: number;
  coverUrl: string;
  title: string;
  artistName: string;
  artistId: number;
  hasExplicitLyrics: boolean;
  recordType: string;
}

export default function AlbumCard({
  id,
  coverUrl,
  title,
  artistName,
  artistId,
  hasExplicitLyrics,
  recordType,
}: Props) {
  console.log(artistId);

  return (
    <Link
      href={`/albums/${id}`}
      key={id}
      className="inline-block overflow-hidden hover:bg-background-light cursor-pointer h-fit p-2.5 rounded-md"
    >
      <div className="overflow-hidden">
        <Image
          loading="lazy"
          placeholder="blur"
          blurDataURL={genericBlur}
          width={100}
          height={100}
          src={coverUrl || "/not-loaded.jpg"}
          alt={`"${title}" de ${artistName}`}
          className="w-full aspect-square"
        />
      </div>

      <div className="p-3">
        <p className="font-medium text-[15px] min-w-0 w-full flex items-center gap-1">
          <span className="truncate">{title}</span>
        </p>
        <p className="text-text-muted truncate text-[13px] flex items-center gap-1.5">
          {hasExplicitLyrics && <ExplicitMark />} {formatRecordType(recordType)}{" "}
          • {artistName}
        </p>
      </div>
    </Link>
  );
}
