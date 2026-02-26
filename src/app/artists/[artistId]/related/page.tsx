import ArtistCard from "@/components/artist-card";
import { getArtistRelated } from "@/services/deezer";

export default async function ArtistRelatedPage({
  params,
}: {
  params: Promise<{ artistId: number }>;
}) {
  const { artistId } = await params;
  const { data: artistRelated } = await getArtistRelated(artistId);

  return (
    <div>
      <p className="artist-section-title">Artistas similares</p>

      <div className="grid grid-cols-5">
        {artistRelated.map((artist) => (
          <ArtistCard
            key={artist.id}
            id={artist.id}
            coverUrl={artist.picture_big}
            name={artist.name}
          />
        ))}
      </div>
    </div>
  );
}
