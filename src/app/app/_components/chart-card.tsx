import { genericBlur } from "@/lib/utils";
import Link from "next/link";
import ImageWithFallback from "./image-with-fallback";

interface Props {
  id: number;
  coverUrl: string;
  title: string;
  totalSongs: number;
}

export default function ChartCard({ id, coverUrl, title, totalSongs }: Props) {
  return (
    <Link
      href={`/app/playlists/${id}`}
      key={id}
      className="inline-block p-2.5 hover:bg-background-light rounded-md overflow-hidden cursor-pointer h-fit group shadow-2xl shadow-background-dark"
    >
      <div className="relative overflow-hidden group">
        <ImageWithFallback
          loading="lazy"
          placeholder="blur"
          blurDataURL={genericBlur}
          width={100}
          height={100}
          src={coverUrl}
          fallbackType="playlist"
          alt={`playlist ${title}`}
          className="w-full aspect-square"
        />

        <div className="absolute size-full inset-0 group-hover:bg-black/12 transition-colors duration-200"></div>
      </div>

      <div className="p-3 -space-y-0.5">
        <p className="text-[15px] font-medium">{title}</p>
        <p className="block text-text-muted text-[13px]">
          {totalSongs} canciones
        </p>
      </div>
    </Link>
  );
}
