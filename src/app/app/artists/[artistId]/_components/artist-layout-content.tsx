import { notFound } from "next/navigation";
import { getAverageColor } from "@/lib/get-average-color";
import ArtistNavbar from "./artist-navbar";
import ArtistHeader from "./artist-header";
import { getArtist } from "../../../_services/musify";

interface Props {
  artistId: string;
  children: React.ReactNode;
}

export default async function ArtistLayoutContent({
  artistId,
  children,
}: Props) {
  let artist;

  try {
    artist = await getArtist(Number(artistId));
  } catch {
    return notFound();
  }

  const avgColor = (await getAverageColor(artist.image_url)) || "#eee";

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
