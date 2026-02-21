import { genericBlur } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  id: number;
  name: string;
  coverUrl: string;
}

export default function ArtistCard({ id, name, coverUrl }: Props) {
  const artistUrl = `/artists/${id}`;

  return (
    <Link href={artistUrl} className="group inline-block p-3">
      <div className="overflow-hidden rounded-full">
        <Image
          src={coverUrl}
          alt={`${name} profile picture`}
          placeholder="blur"
          blurDataURL={genericBlur}
          height={50}
          width={50}
          className="w-full aspect-square group-hover:scale-115 duration-500 transition-transform"
        />
      </div>

      <div className="text-center mt-2">
        <p className="font-primary text-[15px] font-medium">{name}</p>
      </div>
    </Link>
  );
}
