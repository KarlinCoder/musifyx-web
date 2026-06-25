import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MFTrack, MFAlbum, MFPlaylist, MFArtist } from "../_types/musify";

interface FavoritesState {
  tracks: MFTrack[];
  albums: MFAlbum[];
  playlists: MFPlaylist[];
  artists: MFArtist[];
  toggleTrack: (track: MFTrack) => void;
  toggleAlbum: (album: MFAlbum) => void;
  togglePlaylist: (playlist: MFPlaylist) => void;
  toggleArtist: (artist: MFArtist) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      tracks: [],
      albums: [],
      playlists: [],
      artists: [],

      toggleTrack: (track) =>
        set((state) => ({
          tracks: state.tracks.some((t) => t.id === track.id)
            ? state.tracks.filter((t) => t.id !== track.id)
            : [...state.tracks, track],
        })),

      toggleAlbum: (album) =>
        set((state) => ({
          albums: state.albums.some((a) => a.id === album.id)
            ? state.albums.filter((a) => a.id !== album.id)
            : [...state.albums, album],
        })),

      togglePlaylist: (playlist) =>
        set((state) => ({
          playlists: state.playlists.some((p) => p.id === playlist.id)
            ? state.playlists.filter((p) => p.id !== playlist.id)
            : [...state.playlists, playlist],
        })),

      toggleArtist: (artist) =>
        set((state) => ({
          artists: state.artists.some((a) => a.id === artist.id)
            ? state.artists.filter((a) => a.id !== artist.id)
            : [...state.artists, artist],
        })),
    }),
    {
      name: "musify-favorites",
    },
  ),
);
