import { getArtistSimilar } from "@/app/app/_services/musify";
import ArtistCard from "@/app/app/_components/artist-card";

export default async function ArtistRelatedPage({
  params,
}: {
  params: Promise<{ artistId: string }>;
}) {
  const { artistId } = await params;
  const artistRelated = await getArtistSimilar(Number(artistId));

  return (
    <div>
      <p className="app-section-title">Artistas similares</p>

      <div className="grid grid-cols-5">
        {artistRelated.map((artist) => (
          <ArtistCard
            key={artist.id}
            info={{
              id: artist.id,
              name: artist.name,
              coverUrl: artist.image_url,
            }}
          />
        ))}
      </div>
    </div>
  );
}
