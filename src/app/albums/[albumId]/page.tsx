import { formatDateToSpanish, genericBlur } from "@/lib/utils";
import { DeezerAlbum } from "@/types/deezer/types";
import axios from "axios";
import { getAverageColor } from "fast-average-color-node";
import Image from "next/image";
import { FaDotCircle } from "react-icons/fa";

export default async function AlbumIdPage({
  params,
}: {
  params: Promise<{ albumId: number }>;
}) {
  const { albumId } = await params;
  const { data: album } = await axios<DeezerAlbum>(
    `https://cors-anywhere.com/https://api.deezer.com/album/${albumId}`,
    {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    }
  );

  const avgColor = (await getAverageColor(album.cover_small!)).hex;
  console.log(avgColor);

  const bgClass = `bg-linear-0 from-[${avgColor}] to-transparent`;
  console.log(bgClass);

  return (
    <div>
      <header
        style={{
          background: `linear-gradient(to bottom, ${avgColor}, transparent)`,
        }}
        className={`flex items-center gap-5 w-full py-20 px-10`}
      >
        <div className="max-w-50 w-full shadow-2xl shadow-background">
          <Image
            alt="album cover"
            src={album.cover_small!}
            width={100}
            height={100}
            placeholder="blur"
            blurDataURL={genericBlur}
            className="w-full"
          />
        </div>

        <div>
          <h2 className="font-primary text-4xl space-y-2 font-medium">
            {album.title}
          </h2>
          <p className="text-base text-text-muted">{album.artist?.name}</p>

          <div className="flex items-center gap-2 mt-2">
            <p className="text-xs text-text-muted italic">
              {album.tracks?.data.length} Canciones
            </p>

            <div className="size-1 rounded-full bg-white/80"></div>

            <p className="text-xs text-text-muted italic">
              Lanzado el {formatDateToSpanish(album.release_date!)}
            </p>
          </div>
        </div>
      </header>

      <main></main>
    </div>
  );
}
