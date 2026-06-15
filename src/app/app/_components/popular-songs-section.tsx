import SectionTitle from "@/components/section-title";
import TrackCard from "@/components/track-card";
import { MFTrack } from "../_types/musify";

interface Props {
  songs: MFTrack[];
}

export default function PopularSongsSection({ songs }: Props) {
  return (
    <div className="mt-8" id="canciones">
      <SectionTitle>Canciones populares</SectionTitle>

      <div className="grid grid-cols-2 w-full styled-scrollbar">
        {songs.map((track) => {
          return (
            <TrackCard
              key={track.id}
              data={{
                artists: track.artists,
                id: track.id,
                duration: track.duration_ms,
                explicit_lyrics: track.explicit_lyrics,
                title: track.title,
                image_url: track.image_url,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
