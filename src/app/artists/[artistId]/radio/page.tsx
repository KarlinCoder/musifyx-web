import TrackCard from "@/components/track-card";
import { getArtistRadio } from "@/services/deezer";

export default async function ArtistRadioPage({
  params,
}: {
  params: Promise<{ artistId: number }>;
}) {
  const { artistId } = await params;
  const { data: artistRadio } = await getArtistRadio(artistId);

  return (
    <div>
      <p className="artist-section-title">Radio</p>

      {artistRadio.map((track, index) => (
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
