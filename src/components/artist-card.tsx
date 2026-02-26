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
    <Link
      href={artistUrl}
      className="group inline-block p-2.5 hover:bg-background-light rounded-md"
    >
      <div className="overflow-hidden rounded-full">
        <Image
          loading="lazy"
          src={coverUrl || "/not-loaded.jpg"}
          alt={`${name} profile picture`}
          placeholder="blur"
          blurDataURL={genericBlur}
          height={50}
          width={50}
          className="w-full aspect-square max-w-100"
        />
      </div>

      <div className="text-center mt-2">
        <p className="text-[15px] font-medium">{name}</p>
      </div>
    </Link>
  );
}
