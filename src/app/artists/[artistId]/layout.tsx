import { genericBlur } from "@/lib/utils";
import { getArtist } from "@/services/deezer";
import { getAverageColor } from "fast-average-color-node";
import Image from "next/image";
import ArtistNavbar from "./_components/artist-navbar";

export default async function ArtistLayout({
  params,
  children,
}: {
  params: Promise<{ artistId: number }>;
  children: React.ReactNode;
}) {
  const { artistId } = await params;
  const artist = await getArtist(artistId);
  const avgColor = (await getAverageColor(artist.picture_small)).hex;

  return (
    <div
      style={{
        background: `radial-gradient(circle 550px at 50% -20%, ${avgColor}, transparent)`,
      }}
      className="size-full max-w-300 w-full mx-auto p-8"
    >
      <header className="relative flex items-center px-15 py-20 bg-center bg-no-repeat bg-cover gap-5">
        <Image
          src={artist.picture_big || "/not-loaded.jpg"}
          alt="artist picture"
          width={600}
          height={600}
          placeholder="blur"
          blurDataURL={genericBlur}
          className="rounded-full max-w-60"
        />

        <div>
          <h2 className="font-primary text-5xl space-y-2 font-medium">
            {artist.name}
          </h2>
          <p className="flex items-center gap-2 mt-2 text-sm text-neutral-400">
            {artist.nb_fan} seguidores | {artist.nb_album} lanzamientos
          </p>
        </div>
      </header>

      <ArtistNavbar artistId={artistId} />

      <section className="mt-8">{children}</section>
    </div>
  );
}
