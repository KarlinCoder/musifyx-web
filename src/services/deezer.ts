import {
  DeezerAlbum,
  DeezerArtist,
  DeezerChart,
  DeezerPlaylist,
  DeezerSearchAlbumsResults,
  DeezerSearchArtistsResults,
  DeezerSearchPlaylistsResults,
  DeezerSearchTracksResults,
} from "@/types/deezer";
import axios from "axios";

const API_URL = "https://musify.api.karlincoder.com";

export const searchTracks = async (
  query: string,
  limit?: number,
): Promise<DeezerSearchTracksResults> => {
  const { data } = await axios.get<DeezerSearchTracksResults>(
    `${API_URL}/search/track?q=${encodeURIComponent(query)}${limit && `&limit=${limit}`}`,
  );
  return data;
};

export const searchAlbums = async (
  query: string,
  limit?: number,
): Promise<DeezerSearchAlbumsResults> => {
  const { data } = await axios.get<DeezerSearchAlbumsResults>(
    `${API_URL}/search/album?q=${encodeURIComponent(query)}${limit && `&limit=${limit}`}`,
  );
  return data;
};

export const searchArtist = async (
  query: string,
  limit?: number,
): Promise<DeezerSearchArtistsResults> => {
  const { data } = await axios.get<DeezerSearchArtistsResults>(
    `${API_URL}/search/artist?q=${encodeURIComponent(query)}${limit && `&limit=${limit}`}`,
  );
  return data;
};

export const searchPlaylists = async (
  query: string,
  limit?: number,
): Promise<DeezerSearchPlaylistsResults> => {
  const { data } = await axios.get<DeezerSearchPlaylistsResults>(
    `${API_URL}/search/playlist?q=${encodeURIComponent(query)}${limit && `&limit=${limit}`}`,
  );
  return data;
};

export const getAlbum = async (id: number): Promise<DeezerAlbum> => {
  const res = await fetch(`${API_URL}/search/album/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch album");
  return res.json();
};

export const getArtist = async (id: number): Promise<DeezerArtist> => {
  const res = await fetch(`${API_URL}/search/artist/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch artist");
  return res.json();
};

export const getArtistTop10 = async (
  id: number,
): Promise<DeezerSearchTracksResults> => {
  const res = await fetch(`${API_URL}/search/artist/${id}/top`, {
    // next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch artist top 10");
  return res.json();
};

export const getArtistAlbums = async (
  id: number,
): Promise<DeezerSearchAlbumsResults> => {
  const res = await fetch(`${API_URL}/search/artist/${id}/albums`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch artist albums");
  return res.json();
};

export const getArtistRadio = async (
  id: number,
): Promise<DeezerSearchTracksResults> => {
  const res = await fetch(`${API_URL}/search/artist/${id}/radio`, {
    next: { revalidate: 1800 },
  });
  if (!res.ok) throw new Error("Failed to fetch artist radio");
  return res.json();
};

export const getArtistPlaylists = async (
  id: number,
): Promise<DeezerSearchPlaylistsResults> => {
  const res = await fetch(`${API_URL}/search/artist/${id}/playlists`, {
    next: { revalidate: 1800 },
  });
  if (!res.ok) throw new Error("Failed to fetch artist playlists");
  return res.json();
};

export const getArtistRelated = async (
  id: number,
): Promise<DeezerSearchArtistsResults> => {
  const res = await fetch(`${API_URL}/search/artist/${id}/related`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch related artists");
  return res.json();
};

export const getPlaylist = async (id: number): Promise<DeezerPlaylist> => {
  const res = await fetch(`${API_URL}/search/playlist/${id}`, {
    next: { revalidate: 1800 },
  });
  if (!res.ok) throw new Error("Failed to fetch playlist");
  return res.json();
};

export const getPopular = async (): Promise<DeezerChart> => {
  const res = await fetch(`${API_URL}/search/popular`, {
    next: { revalidate: 600 },
  });
  if (!res.ok) throw new Error("Failed to fetch popular");
  return res.json();
};
