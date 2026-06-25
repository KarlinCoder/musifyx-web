"use client";

import TrackCard from "@/app/app/_components/track-card";
import AlbumCard from "@/app/app/_components/album-card";
import ArtistCard from "@/app/app/_components/artist-card";
import PlaylistCard from "@/app/app/_components/playlist-card";
import SectionTitle from "@/app/app/_components/section-title";
import { RiArrowGoBackFill } from "react-icons/ri";

interface TrackResult {
  id: number;
  title: string;
  artists: { id: number; name: string; image_url: string }[];
  image_url: string;
  explicit_lyrics: boolean;
  duration: number;
}

interface AlbumResult {
  id: number;
  coverUrl: string;
  title: string;
  artistName: string;
  hasExplicitLyrics: boolean;
  recordType: string;
}

interface ArtistResult {
  id: number;
  name: string;
  coverUrl: string;
}

interface PlaylistResult {
  id: number;
  picture: string;
  title: string;
  isOfficial: boolean;
  nb_tracks: number;
}

interface ResponseData {
  response: string;
  results: {
    tracks?: TrackResult[];
    albums?: AlbumResult[];
    artists?: ArtistResult[];
    playlists?: PlaylistResult[];
  };
}

interface Props {
  response: ResponseData;
  onReset: () => void;
}

export default function IAResponse({ response, onReset }: Props) {
  const hasResults = 
    (response.results.tracks?.length ?? 0) > 0 ||
    (response.results.albums?.length ?? 0) > 0 ||
    (response.results.artists?.length ?? 0) > 0 ||
    (response.results.playlists?.length ?? 0) > 0;

  return (
    <div className="size-full p-8 max-w-300 mx-auto">
      <button
        onClick={onReset}
        className="flex items-center gap-2 text-sm text-text-muted hover:text-white mb-6 cursor-pointer transition-colors"
      >
        <RiArrowGoBackFill /> Nueva búsqueda
      </button>

      <div className="bg-background-light rounded-2xl p-5 mb-8">
        <p className="text-sm text-text leading-relaxed font-secondary">
          {response.response}
        </p>
      </div>

      {hasResults ? (
        <div className="flex flex-col gap-8 pb-10">
          {response.results.tracks && response.results.tracks.length > 0 && (
            <div>
              <SectionTitle>Canciones</SectionTitle>
              <div className="grid grid-cols-1 gap-2">
                {response.results.tracks.map((track) => (
                  <TrackCard key={track.id} data={track} />
                ))}
              </div>
            </div>
          )}

          {response.results.albums && response.results.albums.length > 0 && (
            <div>
              <SectionTitle>Álbumes</SectionTitle>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {response.results.albums.map((album) => (
                  <AlbumCard key={album.id} info={album} />
                ))}
              </div>
            </div>
          )}

          {response.results.artists && response.results.artists.length > 0 && (
            <div>
              <SectionTitle>Artistas</SectionTitle>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {response.results.artists.map((artist) => (
                  <ArtistCard key={artist.id} info={artist} />
                ))}
              </div>
            </div>
          )}

          {response.results.playlists && response.results.playlists.length > 0 && (
            <div>
              <SectionTitle>Playlists</SectionTitle>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {response.results.playlists.map((playlist) => (
                  <PlaylistCard key={playlist.id} info={playlist} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-text-muted">No se encontraron resultados para tu búsqueda.</p>
        </div>
      )}
    </div>
  );
}