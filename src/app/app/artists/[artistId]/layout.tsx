import { getAverageColor } from "fast-average-color-node";
import ArtistNavbar from "./_components/artist-navbar";
import ArtistHeader from "./_components/artist-header";
import { getArtistInfo } from "../../services/deezer";

export default async function ArtistLayout({
  params,
  children,
}: {
  params: Promise<{ artistId: number }>;
  children: React.ReactNode;
}) {
  const { artistId } = await params;
  const artist = await getArtistInfo(artistId);
  const avgColor = (await getAverageColor(artist.image_url)).hex || "#eee";

  return (
    <div
      style={{
        background: `radial-gradient(circle 550px at 50% -20%, ${avgColor}, transparent)`,
      }}
      className="size-full p-8 max-w-300 mx-auto"
    >
      <ArtistHeader artist={artist} />

      <ArtistNavbar artistId={artistId} />

      <section className="mt-8 pb-10">{children}</section>
    </div>
  );
}
