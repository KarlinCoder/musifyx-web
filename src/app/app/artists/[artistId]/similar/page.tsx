import { getArtistSimilar } from "@/app/app/services/deezer";
import ArtistCard from "@/components/artist-card";

export default async function ArtistRelatedPage({
  params,
}: {
  params: Promise<{ artistId: number }>;
}) {
  const { artistId } = await params;
  const artistRelated = await getArtistSimilar(artistId);

  return (
    <div>
      <p className="artist-section-title">Artistas similares</p>

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
