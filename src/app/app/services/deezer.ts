import axios from "axios";
import {
  Album,
  AlbumFull,
  Artist,
  ArtistAlbum,
  ArtistFull,
  Playlist,
  PlaylistFull,
  SearchResponse,
  Track,
} from "../_types/deezer";

const API_URL = "https://musify.api.karlincoder.com";

export const searchTracks = async (query: string) => {
  const { data } = await axios.get<SearchResponse<Track>>(
    `${API_URL}/search-gw/track?q=${encodeURIComponent(query)}`,
  );
  return data;
};

export const searchAlbums = async (query: string) => {
  const { data } = await axios.get<SearchResponse<Album>>(
    `${API_URL}/search-gw/album?q=${encodeURIComponent(query)}`,
  );
  return data;
};

export const searchArtist = async (query: string) => {
  const { data } = await axios.get<SearchResponse<Artist>>(
    `${API_URL}/search-gw/artist?q=${encodeURIComponent(query)}`,
  );
  return data;
};

export const searchPlaylists = async (query: string) => {
  const { data } = await axios.get<SearchResponse<Playlist>>(
    `${API_URL}/search-gw/playlist?q=${encodeURIComponent(query)}`,
  );

  return data;
};

export const getAlbum = async (id: number): Promise<AlbumFull> => {
  const res = await fetch(`${API_URL}/search-gw/album/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch album");
  return res.json();
};

export const getPlaylist = async (id: number): Promise<PlaylistFull> => {
  const res = await fetch(`${API_URL}/search-gw/playlist/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch playlist");
  return res.json();
};

export const getArtistInfo = async (id: number): Promise<ArtistFull> => {
  const res = await fetch(`${API_URL}/search-gw/artist/${id}/info`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch artist");
  return res.json();
};

export const getArtistTop = async (id: number): Promise<Track[]> => {
  const res = await fetch(`${API_URL}/search-gw/artist/${id}/top`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch artist top");
  return res.json();
};

export const getArtistDiscography = async (
  id: number,
): Promise<ArtistAlbum[]> => {
  const res = await fetch(`${API_URL}/search-gw/artist/${id}/discography`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch artist discography");
  return res.json();
};

export const getArtistMentions = async (id: number): Promise<Playlist[]> => {
  const res = await fetch(`${API_URL}/search-gw/artist/${id}/mentions`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch artist playlist mentions");
  return res.json();
};

export const getArtistRadio = async (id: number): Promise<Track[]> => {
  const res = await fetch(`${API_URL}/search-gw/artist/${id}/radio`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch artist radio");
  return res.json();
};

export const getArtistSimilar = async (id: number): Promise<Artist[]> => {
  const res = await fetch(`${API_URL}/search-gw/artist/${id}/similar`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch artist similars");
  return res.json();
};

export const getArtistPlaylists = async (id: number): Promise<Playlist[]> => {
  const res = await fetch(`${API_URL}/search-gw/artist/${id}/playlists`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch artist playlists");
  return res.json();
};

export const getPopularNow = async (): Promise<{
  tracks: Track[];
  albums: Album[];
  artists: Artist[];
  playlists: Playlist[];
}> => {
  const res = await fetch(`${API_URL}/search-gw/popular-now`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch popular now");
  return res.json();
};

export const getTrackPreview = async (id: string | number): Promise<string> => {
  const res = await fetch(`${API_URL}/search-gw/track/preview/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch track preview");
  return res.json();
};
