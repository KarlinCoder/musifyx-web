import TrackCard from "@/components/track-card";
import { getArtistRadio } from "@/app/app/services/deezer";

export default async function ArtistRadioPage({
  params,
}: {
  params: Promise<{ artistId: number }>;
}) {
  const { artistId } = await params;
  const artistRadio = await getArtistRadio(artistId);

  return (
    <div>
      <p className="artist-section-title">Radio</p>

      {artistRadio.map((track, index) => (
        <TrackCard
          key={track.id}
          data={{
            artists: track.artists,
            duration: track.duration,
            explicit_lyrics: track.explicit_lyrics,
            id: track.id,
            image_url: track.image_url,
            title: track.title,
          }}
          listPosition={index + 1}
        />
      ))}
    </div>
  );
}
