import { genericBlur } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import fallbackImage from "@/assets/not-loaded.jpg";

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
      className="group inline-block p-2.5 hover:bg-background-light rounded-md"
    >
      <div className="overflow-hidden rounded-full">
        <Image
          loading="lazy"
          src={coverUrl || fallbackImage}
          alt={`${name} profile picture`}
          placeholder="blur"
          blurDataURL={genericBlur}
          height={100}
          width={100}
          className="w-full aspect-square max-w-100 rounded-sm"
        />
      </div>

      <div className="text-center mt-2">
        <p className="text-[15px] font-medium">{name}</p>
      </div>
    </Link>
  );
}
