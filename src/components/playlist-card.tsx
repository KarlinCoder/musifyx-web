import { genericBlur } from "@/lib/utils";
import Link from "next/link";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import ImageWithFallback from "./image-with-fallback";

interface Props {
  info: {
    id: number;
    picture: string;
    title: string;
    isOfficial: boolean;
    nb_tracks: number;
  };
}

export default function PlaylistCard({ info }: Props) {
  const { id, picture, title, nb_tracks, isOfficial } = info;

  return (
    <Link
      href={`/app/playlists/${id}`}
      key={id}
      className="inline-block hover:bg-background-light p-2.5 rounded-md cursor-pointer h-fit"
    >
      <div className="relative overflow-hidden">
        <ImageWithFallback
          loading="lazy"
          placeholder="blur"
          blurDataURL={genericBlur}
          width={100}
          height={100}
          src={picture}
          fallbackType="playlist"
          alt={`playlist ${title}`}
          className="w-full aspect-square rounded-md"
        />
      </div>

      <div className="p-3 -space-y-0.5 w-full">
        <p className="text-[15px] font-medium truncate flex items-center gap-1 w-full min-w-0">
          {isOfficial && (
            <RiVerifiedBadgeFill size={18} className="text-blue-400" />
          )}

          {title}
        </p>
        <p className="block text-text-muted text-[13px]">
          {nb_tracks} canciones
        </p>
      </div>
    </Link>
  );
}
