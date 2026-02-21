import { RiPlayList2Fill } from "react-icons/ri";
import Hr from "@/components/hr";
import { DeezerPlaylist } from "@/types/deezer/types";
import PlaylistCard from "@/components/playlist-card";

interface Props {
  songs: DeezerPlaylist[];
}

export default function PopularPlaylistsSection({ songs }: Props) {
  return (
    <div className="mt-8">
      <p className="text-lg flex items-center gap-2">
        <RiPlayList2Fill /> Playlists populares
      </p>

      <Hr className="mb-4 mt-3" />

      <div className="grid grid-cols-2 gap-3 w-full overflow-hidden overflow-x-auto styled-scrollbar">
        {songs.map((item) => {
          return (
            <PlaylistCard
              key={item.id}
              id={item.id}
              title={item.title}
              totalSongs={item.nb_tracks}
              coverUrl={item.picture_medium!}
            />
          );
        })}
      </div>
    </div>
  );
}
