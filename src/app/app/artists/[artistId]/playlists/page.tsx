import { getArtistPlaylists } from "@/app/app/_services/musify";
import PlaylistCard from "@/app/app/_components/playlist-card";

export default async function ArtistPlaylistsPage({
  params,
}: {
  params: Promise<{ artistId: string }>;
}) {
  const { artistId } = await params;
  const artistPlaylists = await getArtistPlaylists(Number(artistId));

  return (
    <div>
      <p className="app-section-title">Playlists seleccionadas</p>

      <div className="grid grid-cols-5">
        {artistPlaylists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            info={{
              id: playlist.id,
              isOfficial: playlist.is_official,
              nb_tracks: playlist.nb_tracks,
              picture: playlist.image_url,
              title: playlist.title,
            }}
          />
        ))}
      </div>
    </div>
  );
}
