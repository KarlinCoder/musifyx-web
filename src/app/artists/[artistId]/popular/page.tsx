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
        <TrackCard key={track.id} data={track} listPosition={index + 1} />
      ))}
    </div>
  );
}
