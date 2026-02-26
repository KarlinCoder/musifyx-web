import TrackCard from "@/components/track-card";
import { getArtistTop10 } from "@/services/deezer";

export default async function ArtistTop10Page({
  params,
}: {
  params: Promise<{ artistId: number }>;
}) {
  const { artistId } = await params;
  const { data: artistPopular } = await getArtistTop10(artistId);

  return (
    <div>
      <p className="artist-section-title">Popular ahora</p>

      {artistPopular.map((track, index) => (
        <TrackCard
          key={track.id}
          id={track.id}
          artistId={track.artist.id}
          artistName={track.artist.name}
          duration={track.duration}
          coverUrl={track.album.cover_medium}
          previewUrl={track.preview}
          title={track.title}
          albumPosition={index + 1}
        />
      ))}
    </div>
  );
}
