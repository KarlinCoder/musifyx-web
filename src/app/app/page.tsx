import { getPopularNow } from "./_services/musify";
import type { MFTrack, MFAlbum, MFArtist, MFPlaylist } from "./_types/musify";
import HomeHeader from "./_components/home-header";
import SectionTitle from "./_components/section-title";
import TrackCard from "./_components/track-card";
import AlbumCard from "./_components/album-card";
import ArtistCard from "./_components/artist-card";
import PlaylistCard from "./_components/playlist-card";

export default async function HomePage() {
  let charts: {
    tracks: MFTrack[];
    albums: MFAlbum[];
    artists: MFArtist[];
    playlists: MFPlaylist[];
  } = { tracks: [], albums: [], artists: [], playlists: [] };

  try {
    charts = await getPopularNow();
  } catch (error) {
    console.error("Error fetching popular now:", error);
  }

  return (
    <div className="size-full p-8 max-w-300 mx-auto scroll-smooth">
      <HomeHeader />

      <div className="flex flex-col gap-8 mt-5 pb-10">
        <div className="mt-8" id="canciones">
          <SectionTitle>Canciones populares</SectionTitle>

          <div className="grid grid-cols-2 w-full styled-scrollbar">
            {charts.tracks.map((track) => {
              return (
                <TrackCard
                  key={track.id}
                  data={{
                    artists: track.artists,
                    id: track.id,
                    duration: track.duration_ms,
                    explicit_lyrics: track.explicit_lyrics,
                    title: track.title,
                    image_url: track.image_url,
                  }}
                />
              );
            })}
          </div>
        </div>

        <div id="albumes">
          <SectionTitle>Álbums populares</SectionTitle>

          <div className="grid grid-cols-5 gap-2 w-full overflow-hidden overflow-x-auto styled-scrollbar">
            {charts.albums.map((item) => {
              return (
                <AlbumCard
                  key={item.id}
                  info={{
                    artistName: item.artist.name,
                    coverUrl: item.image_url,
                    hasExplicitLyrics: item.explicit_lyrics,
                    id: item.id,
                    recordType: item.record_type ?? "RECORD",
                    title: item.title,
                  }}
                />
              );
            })}
          </div>
        </div>

        <div id="artistas">
          <SectionTitle>Artistas populares</SectionTitle>

          <div className="grid grid-cols-5 w-full overflow-hidden overflow-x-auto styled-scrollbar">
            {charts.artists.map((item) => {
              return (
                <ArtistCard
                  key={item.id}
                  info={{
                    id: item.id,
                    name: item.name,
                    coverUrl: item.image_url,
                  }}
                />
              );
            })}
          </div>
        </div>

        <div id="playlists">
          <SectionTitle>Playlists populares</SectionTitle>
          <div className="grid grid-cols-5 w-full overflow-hidden overflow-x-auto styled-scrollbar">
            {charts.playlists.map((item) => {
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
      </div>
    </div>
  );
}
