import { getArtistMentions } from "@/app/app/_services/musify";
import PlaylistCard from "@/app/app/_components/playlist-card";

export default async function ArtistPlaylistsPage({
  params,
}: {
  params: Promise<{ artistId: string }>;
}) {
  const { artistId } = await params;
  const artistMentions = await getArtistMentions(Number(artistId));

  return (
    <div>
      <p className="app-section-title">Menciones importantes</p>

      <div className="grid grid-cols-5">
        {artistMentions.map((playlist) => (
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
