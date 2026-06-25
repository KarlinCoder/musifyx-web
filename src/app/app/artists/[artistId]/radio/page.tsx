import TrackCard from "@/app/app/_components/track-card";
import { getArtistRadio } from "@/app/app/_services/musify";

export default async function ArtistRadioPage({
  params,
}: {
  params: Promise<{ artistId: string }>;
}) {
  const { artistId } = await params;
  const artistRadio = await getArtistRadio(Number(artistId));

  return (
    <div>
      <p className="app-section-title">Radio</p>

      {artistRadio.map((track) => (
        <TrackCard
          key={track.id}
          data={{
            artists: track.artists,
            duration: track.duration_ms,
            explicit_lyrics: track.explicit_lyrics,
            id: track.id,
            image_url: track.image_url,
            title: track.title,
          }}
        />
      ))}
    </div>
  );
}
