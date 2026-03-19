import DownloadButton from "@/components/download-button";
import Hr from "@/components/hr";
import TrackCard from "@/components/track-card";
import {
  formatDateToSpanish,
  formatSecondsToMinutes,
  genericBlur,
} from "@/lib/utils";
import { getAlbum } from "@/services/deezer";
import { getAverageColor } from "fast-average-color-node";
import Image from "next/image";
import Link from "next/link";

export default async function AlbumIdPage({
  params,
}: {
  params: Promise<{ albumId: number }>;
}) {
  const { albumId } = await params;

  const album = await getAlbum(albumId);

  const avgColor = (await getAverageColor(album.cover_small)).hex;

  return (
    <div
      style={{
        background: `radial-gradient(circle 550px at 50% -20%, ${avgColor}, transparent)`,
      }}
      className="size-full"
    >
      <div className="max-w-300 mx-auto w-full">
        <header className={`flex items-center gap-5 w-full py-17 px-10`}>
          <div className="max-w-65 w-full shadow-2xl shadow-background">
            <Image
              alt="album cover"
              src={album.cover_big || "/not-loaded.jpg"}
              width={100}
              height={100}
              placeholder="blur"
              blurDataURL={genericBlur}
              className="w-full"
            />
          </div>

          <div>
            <h2 className="font-primary text-5xl space-y-2 font-medium">
              {album.title}
            </h2>

            <div className="flex items-center gap-2 mt-4">
              <Image
                src={album.artist.picture_small || "/not-loaded.jpg"}
                alt="artist picture"
                width={70}
                height={70}
                className="size-7 rounded-full"
              />
              <Link
                href={`/artists/${album.artist.id}`}
                className="block text-base text-neutral-300 hover:underline underline-offset-2 "
              >
                {album.artist.name}
              </Link>
            </div>

            <div className="flex items-center gap-2 mt-1 text-sm text-neutral-400">
              <p>{album.tracks.data.length} canciones</p>
              {"|"}
              <p>{formatSecondsToMinutes(album.duration)} minutos</p>
              {"|"}
              <p>Lanzado el {formatDateToSpanish(album.release_date!)}</p>
            </div>

            <DownloadButton id={albumId}>Descargar álbum</DownloadButton>
          </div>
        </header>

        <main className="p-8">
          <p className="text-2xl font-primary font-medium mb-2">Canciones:</p>
          <Hr />

          <div className="flex flex-col">
            {album.tracks.data.map((item, index) => {
              return (
                <TrackCard key={item.id} data={item} listPosition={index + 1} />
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
