import PlaylistCard from "@/components/playlist-card";
import { DeezerPlaylist } from "@/types/deezer";
import SectionTitle from "@/components/section-title";

interface Props {
  playlists: DeezerPlaylist[];
}

export default function PopularPlaylistsSection({ playlists }: Props) {
  return (
    <div className="mt-8" id="playlists">
      <SectionTitle>Playlists populares</SectionTitle>
      <div className="grid grid-cols-5 w-full overflow-hidden overflow-x-auto styled-scrollbar">
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
