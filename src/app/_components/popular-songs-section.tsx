import SectionTitle from "@/components/section-title";
import TrackCard from "../../components/track-card";
import { DeezerTrack } from "@/types/deezer";

interface Props {
  songs: DeezerTrack[];
}

export default function PopularSongsSection({ songs }: Props) {
  return (
    <div className="mt-8" id="canciones">
      <SectionTitle>Canciones populares</SectionTitle>

      <div className="grid grid-cols-2 w-full overflow-hidden overflow-x-auto styled-scrollbar">
        {songs.map((item) => {
          return <TrackCard key={item.id} data={item} />;
        })}
      </div>
    </div>
  );
}
