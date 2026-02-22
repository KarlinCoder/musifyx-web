import { genericBlur } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

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
  return (
    <Link
      href={`/albums/${id}`}
      key={id}
      className="inline-block rounded-lg overflow-hidden hover:bg-background-light cursor-pointer h-fit group"
    >
      <div className="relative overflow-hidden">
        <Image
          loading="lazy"
          placeholder="blur"
          blurDataURL={genericBlur}
          width={100}
          height={100}
          src={coverUrl || ""}
          alt={`"${title}" de ${artistName}`}
          className="w-full aspect-square group-hover:scale-115 duration-500 transition-transform"
        />

        {hasExplicitLyrics && (
          <span className="text-[10px] bg-background/70 rounded-md absolute bottom-2 left-2 size-6 grid place-content-center">
            E
          </span>
        )}

        <span className="text-[10px] bg-background/70 rounded-md absolute bottom-2 right-2 p-1 grid place-content-center uppercase">
          {recordType}
        </span>
      </div>

      <div className="p-3 -space-y-0.5">
        <p className="font-primary text-[15px] font-medium">{title}</p>
        <p className="block text-text-muted text-[13px]">{artistName}</p>
      </div>
    </Link>
  );
}
