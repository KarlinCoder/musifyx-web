import PlaylistCard from "@/components/playlist-card";
import SectionTitle from "@/components/section-title";
import { MusifyPlaylist } from "../_types/musify";

interface Props {
  playlists: MusifyPlaylist[];
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
              info={{
                id: item.id,
                isOfficial: item.is_official,
                picture: item.image_url,
                title: item.title,
                nb_tracks: item.nb_tracks,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
