import { getArtistTop } from "@/app/app/services/deezer";
import TrackCard from "@/components/track-card";

export default async function ArtistTop10Page({
  params,
}: {
  params: Promise<{ artistId: string }>;
}) {
  const { artistId } = await params;
  const artistPopular = await getArtistTop(Number(artistId));

  return (
    <div>
      <p className="artist-section-title">Popular ahora</p>

      {artistPopular.map((track, index) => (
        <TrackCard
          key={track.id}
          data={{
            id: track.id,
            artists: track.artists,
            duration: track.duration,
            explicit_lyrics: track.explicit_lyrics,
            image_url: track.image_url,
            title: track.title,
          }}
          listPosition={index + 1}
        />
      ))}
    </div>
  );
}
