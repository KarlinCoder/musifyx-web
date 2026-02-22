import { RiPlayList2Fill } from "react-icons/ri";
import Hr from "@/components/hr";
import PlaylistCard from "@/components/playlist-card";
import { DeezerPlaylist } from "@/types/deezer";

interface Props {
  playlists: DeezerPlaylist[];
}

export default function PopularPlaylistsSection({ playlists }: Props) {
  return (
    <div className="mt-8" id="playlists">
      <p className="text-lg flex items-center gap-2">
        <RiPlayList2Fill /> Playlists populares
      </p>

      <Hr className="mb-4 mt-3" />

      <div className="grid grid-cols-5 gap-3 w-full overflow-hidden overflow-x-auto styled-scrollbar">
        {playlists.map((item) => {
          return (
            <PlaylistCard
              key={item.id}
              id={item.id}
              title={item.title}
              totalSongs={item.nb_tracks}
              coverUrl={item.picture_medium!}
              fans={item.fans!}
            />
          );
        })}
      </div>
    </div>
  );
}
