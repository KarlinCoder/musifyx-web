import { RiMusic2Fill } from "react-icons/ri";
import TrackCard from "../songs/_components/track-card";
import Hr from "@/components/hr";
import { DeezerTrack } from "@/types/deezer/types";

interface Props {
  songs: DeezerTrack[];
}

export default function PopularSongsSection({ songs }: Props) {
  return (
    <div className="mt-8">
      <p className="text-lg flex items-center gap-2">
        <RiMusic2Fill /> Canciones populares
      </p>

      <Hr className="mb-4 mt-3" />

      <div className="grid grid-cols-2 gap-3 w-full overflow-hidden overflow-x-auto styled-scrollbar">
        {songs.map((item) => {
          return (
            <TrackCard
              key={item.id}
              title={item.title}
              artistId={item.artist.id}
              artistName={item.artist.name}
              coverUrl={item.album.cover_medium}
              duration={item.duration}
              id={item.id}
              previewUrl={item.preview}
            />
          );
        })}
      </div>
    </div>
  );
}
