import { genericBlur } from "@/lib/utils";
import Link from "next/link";
import ImageWithFallback from "./image-with-fallback";

interface Props {
  info: {
    id: number;
    name: string;
    coverUrl: string;
  };
}

export default function ArtistCard({ info }: Props) {
  const { id, name, coverUrl } = info;

  const artistUrl = `/app/artists/${id}`;

  return (
    <Link
      href={artistUrl}
      className="group block p-2.5 hover:bg-background-light rounded-md"
    >
      <ImageWithFallback
        loading="lazy"
        src={coverUrl}
        fallbackType="artist"
        alt={`${name} profile picture`}
        placeholder="blur"
        blurDataURL={genericBlur}
        height={100}
        width={100}
        className="w-full max-w-100 img-card rounded-full!"
      />

      <div className="text-center mt-2">
        <p className="text-[15px] font-medium">{name}</p>
      </div>
    </Link>
  );
}
