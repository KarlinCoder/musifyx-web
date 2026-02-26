import PlaylistCard from "@/components/playlist-card";
import { getArtistPlaylists } from "@/services/deezer";

export default async function ArtistPlaylistsPage({
  params,
}: {
  params: Promise<{ artistId: number }>;
}) {
  const { artistId } = await params;
  const { data: artistPlaylists } = await getArtistPlaylists(artistId);

  return (
    <div>
      <p className="artist-section-title">Menciones importantes</p>

      <div className="grid grid-cols-5">
        {artistPlaylists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            id={playlist.id}
            coverUrl={playlist.picture_medium}
            fans={playlist.fans}
            title={playlist.title}
            totalSongs={playlist.nb_tracks}
          />
        ))}
      </div>
    </div>
  );
}
