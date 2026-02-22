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
      href={`/albums/${id}`}
      key={id}
      className="inline-block rounded-lg overflow-hidden hover:bg-background-light cursor-pointer h-fit group"
    >
      <div className="relative overflow-hidden">
        <Image
          placeholder="blur"
          blurDataURL={genericBlur}
          width={100}
          height={100}
          src={coverUrl || ""}
          alt={`playlist ${title}`}
          className="w-full aspect-square group-hover:scale-115 duration-500 transition-transform"
        />
      </div>

      <div className="p-3 -space-y-0.5">
        <p className="font-primary text-[15px] font-medium">{title}</p>
        <p className="block text-text-muted text-[13px]">
          {totalSongs} canciones - {fans} fans
        </p>
      </div>
    </Link>
  );
}
