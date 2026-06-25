"use client";

import SectionTitle from "@/app/app/_components/section-title";
import TrackCard from "@/app/app/_components/track-card";
import AlbumCard from "@/app/app/_components/album-card";
import ArtistCard from "@/app/app/_components/artist-card";
import PlaylistCard from "@/app/app/_components/playlist-card";
import { useFavoritesStore } from "../../_stores/useFavoriteStore";

export default function FavoritesPageContent() {
  const { tracks, albums, artists, playlists } = useFavoritesStore();

  return (
    <>
      <div className="grid-results">
        {tracks.length > 0 && (
          <>
            <SectionTitle>Canciones favoritas</SectionTitle>
            <div className="relative grid grid-cols-2 p-grid pb-10">
              {tracks.map((track) => (
                <TrackCard
                  key={track.id}
                  data={{
                    id: track.id,
                    artists: track.artists,
                    duration: track.duration_ms,
                    explicit_lyrics: track.explicit_lyrics,
                    image_url: track.image_url,
                    title: track.title,
                  }}
                />
              ))}
            </div>
          </>
        )}

        {albums.length > 0 && (
          <>
            <SectionTitle>Álbumes favoritos</SectionTitle>
            <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-grid pb-10">
              {albums.map((album) => (
                <AlbumCard
                  key={album.id}
                  info={{
                    id: album.id,
                    coverUrl: album.image_url,
                    title: album.title,
                    artistName: album.artist.name,
                    hasExplicitLyrics: album.explicit_lyrics,
                    recordType: "album",
                  }}
                />
              ))}
            </div>
          </>
        )}

        {artists.length > 0 && (
          <>
            <SectionTitle>Artistas favoritos</SectionTitle>
            <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-grid pb-10">
              {artists.map((artist) => (
                <ArtistCard
                  key={artist.id}
                  info={{
                    id: artist.id,
                    name: artist.name,
                    coverUrl: artist.image_url,
                  }}
                />
              ))}
            </div>
          </>
        )}

        {playlists.length > 0 && (
          <>
            <SectionTitle>Playlists favoritas</SectionTitle>
            <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-grid pb-10">
              {playlists.map((playlist) => (
                <PlaylistCard
                  key={playlist.id}
                  info={{
                    id: playlist.id,
                    picture: playlist.image_url,
                    title: playlist.title,
                    isOfficial: playlist.is_official,
                    nb_tracks: playlist.nb_tracks,
                  }}
                />
              ))}
            </div>
          </>
        )}

        {tracks.length === 0 &&
          albums.length === 0 &&
          artists.length === 0 &&
          playlists.length === 0 && (
            <p className="text-text-muted text-center py-20">
              No tienes favoritos aún. Explora y guarda lo que más te guste.
            </p>
          )}
      </div>
    </>
  );
}
