import axios from "axios";
import {
  MusifyAlbum,
  MusifyAlbumFull,
  MusifyArtist,
  MusifyArtistAlbum,
  MusifyArtistFull,
  MusifyPlaylist,
  MusifyPlaylistFull,
  MusifySearchResponse,
  MusifyTrack,
} from "../_types/musify";

const API_URL = "https://musify.api.karlincoder.com";

export const searchTracks = async (query: string) => {
  const { data } = await axios.get<MusifySearchResponse<MusifyTrack>>(
    `${API_URL}/search/track?q=${encodeURIComponent(query)}`,
  );
  return data;
};

export const searchAlbums = async (query: string) => {
  const { data } = await axios.get<MusifySearchResponse<MusifyAlbum>>(
    `${API_URL}/search/album?q=${encodeURIComponent(query)}`,
  );
  return data;
};

export const searchArtist = async (query: string) => {
  const { data } = await axios.get<MusifySearchResponse<MusifyArtist>>(
    `${API_URL}/search/artist?q=${encodeURIComponent(query)}`,
  );
  return data;
};

export const searchPlaylists = async (query: string) => {
  const { data } = await axios.get<MusifySearchResponse<MusifyPlaylist>>(
    `${API_URL}/search/playlist?q=${encodeURIComponent(query)}`,
  );

  return data;
};

export const getAlbum = async (id: number): Promise<MusifyAlbumFull> => {
  const res = await fetch(`${API_URL}/search/album/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch album");
  return res.json();
};

export const getPlaylist = async (
  id: number,
): Promise<MusifyPlaylistFull> => {
  const res = await fetch(`${API_URL}/search/playlist/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch playlist");
  return res.json();
};

export const getArtistInfo = async (
  id: number,
): Promise<MusifyArtistFull> => {
  const res = await fetch(`${API_URL}/search/artist/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch artist");
  return res.json();
};

export const getArtistTop = async (id: number): Promise<MusifyTrack[]> => {
  const res = await fetch(`${API_URL}/search/artist/${id}/top`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch artist top");
  return res.json();
};

export const getArtistDiscography = async (
  id: number,
): Promise<MusifyArtistAlbum[]> => {
  const res = await fetch(`${API_URL}/search/artist/${id}/albums`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch artist discography");
  return res.json();
};

export const getArtistMentions = async (
  id: number,
): Promise<MusifyPlaylist[]> => {
  const res = await fetch(`${API_URL}/search/artist/${id}/mentions`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch artist playlist mentions");
  return res.json();
};

export const getArtistRadio = async (id: number): Promise<MusifyTrack[]> => {
  const res = await fetch(`${API_URL}/search/artist/${id}/radio`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch artist radio");
  return res.json();
};

export const getArtistSimilar = async (
  id: number,
): Promise<MusifyArtist[]> => {
  const res = await fetch(`${API_URL}/search/artist/${id}/similar`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch artist similars");
  return res.json();
};

export const getArtistPlaylists = async (
  id: number,
): Promise<MusifyPlaylist[]> => {
  const res = await fetch(`${API_URL}/search/artist/${id}/playlists`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch artist playlists");
  return res.json();
};

export const getPopularNow = async (): Promise<{
  tracks: MusifyTrack[];
  albums: MusifyAlbum[];
  artists: MusifyArtist[];
  playlists: MusifyPlaylist[];
}> => {
  const res = await fetch(`${API_URL}/search/popular`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch popular now");
  return res.json();
};

export const getTrackPreview = async (
  id: string | number,
): Promise<string> => {
  const res = await fetch(`${API_URL}/search/track/${id}/preview`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch track preview");
  return res.json();
};
