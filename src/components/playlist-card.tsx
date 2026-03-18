import { genericBlur } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  id: number;
  coverUrl: string;
  title: string;
  totalSongs: number;
  fans: number;
}

export default function PlaylistCard({
  id,
  coverUrl,
  title,
  totalSongs,
  fans,
}: Props) {
  return (
    <Link
      href={`/playlists/${id}`}
      key={id}
      className="inline-block hover:bg-background-light p-2.5 rounded-md cursor-pointer h-fit"
    >
      <div className="relative overflow-hidden">
        <Image
          loading="lazy"
          placeholder="blur"
          blurDataURL={genericBlur}
          width={100}
          height={100}
          src={coverUrl || "/not-loaded.jpg"}
          alt={`playlist ${title}`}
          className="w-full aspect-square"
        />
      </div>

      <div className="p-3 -space-y-0.5">
        <p className="text-[15px] font-medium truncate">{title}</p>
        <p className="block text-text-muted text-[13px]">
          {totalSongs} canciones - {fans} fans
        </p>
      </div>
    </Link>
  );
}
