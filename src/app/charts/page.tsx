import PlaylistCard from "@/components/playlist-card";
import { getCharts } from "@/services/deezer";

export default async function ChartsPage() {
  const playlistsData = await getCharts();

  return (
    <div className="p-7">
      <h2>Canciones del momento</h2>

      <div className="grid grid-cols-5 gap-3">
        {playlistsData.map((chartPlaylist) => {
          return (
            <PlaylistCard
              key={chartPlaylist.playlistId}
              coverUrl={chartPlaylist.data!.picture_big!}
              fans={chartPlaylist.data!.fans!}
              id={chartPlaylist.playlistId}
              title={chartPlaylist.data!.title}
              totalSongs={chartPlaylist.data!.tracks.data.length}
            />
          );
        })}
      </div>
    </div>
  );
}
