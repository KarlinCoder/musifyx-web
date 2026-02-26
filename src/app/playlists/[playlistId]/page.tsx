import Hr from "@/components/hr";
import TrackCard from "@/components/track-card";
import {
  formatDateToSpanish,
  formatSecondsToMinutes,
  genericBlur,
} from "@/lib/utils";
import { getPlaylist } from "@/services/deezer";
import { getAverageColor } from "fast-average-color-node";
import Image from "next/image";

export default async function PlaylistIdPage({
  params,
}: {
  params: Promise<{ playlistId: number }>;
}) {
  const { playlistId } = await params;

  const playlist = await getPlaylist(playlistId);

  const avgColor = (await getAverageColor(playlist.picture_small)).hex;

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
              src={playlist.picture_big || "/not-loaded.jpg"}
              width={100}
              height={100}
              placeholder="blur"
              blurDataURL={genericBlur}
              className="w-full"
            />
          </div>

          <div>
            <h2 className="font-primary text-5xl space-y-2 font-medium">
              {playlist.title}
            </h2>

            <div className="mt-1 text-sm text-neutral-400">
              <div className="flex items-center gap-2">
                <p>{playlist.tracks.data.length} canciones</p>
                {"|"}
                <p>{formatSecondsToMinutes(playlist.duration)} </p>
                {"|"}
                <p>{playlist.fans} fans</p>
              </div>

              <p>Actualizada el {formatDateToSpanish(playlist.mod_date)}</p>
              <Hr className="my-3" />
              <p className="text-pretty">{playlist.description}</p>
            </div>

            <button className="mt-3 text-sm bg-primary hover:bg-primary/85 active:bg-primary transition-all duration-100 text-white rounded-full px-8 cursor-pointer py-2 font-semibold">
              Descargar
            </button>
          </div>
        </header>

        <main className="p-8">
          <p className="text-2xl font-primary font-medium mb-2">Canciones:</p>
          <Hr />

          <div className="flex flex-col">
            {playlist.tracks.data.map((item, index) => {
              return (
                <TrackCard
                  key={item.id}
                  id={item.id}
                  artistId={item.artist.id}
                  artistName={item.artist.name}
                  coverUrl={item.album.cover_small}
                  duration={item.duration}
                  previewUrl={item.preview}
                  title={item.title}
                  albumPosition={index + 1}
                />
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
