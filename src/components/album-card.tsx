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
  console.log(artistId);

  return (
    <Link
      href={`/albums/${id}`}
      key={id}
      className="inline-block overflow-hidden hover:bg-background-light cursor-pointer h-fit p-2.5 rounded-md"
    >
      <div className="relative overflow-hidden">
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
        <p className="text-[15px] font-medium">{title}</p>
        <p className="block text-text-muted text-[13px]">{artistName}</p>
      </div>
    </Link>
  );
}
