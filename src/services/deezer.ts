import { DeezerSearchTracksResults } from "@/types/deezer";
import axios from "axios";

const API_URL = "https://musifyx.api.karlincoder.com";

export const searchTracks = async (query: string, limit?: number) => {
  const { data } = await axios.get<DeezerSearchTracksResults>(
    `${API_URL}/search/track?q=${encodeURIComponent(query)}${limit && `&limit=${limit}`}`,
  );

  return data;
};

export const searchAlbums = async (query: string, limit?: number) => {
  const { data } = await axios.get<Pagedres>(
    `${API_URL}/search/album?q=${encodeURIComponent(query)}${limit && `&limit=${limit}`}`,
  );

  return data;
};

export const searchArtist = async (query: string, limit?: number) => {
  const { data } = await axios.get<ArtistSearchResponse>(
    `${API_URL}/search/artist?q=${encodeURIComponent(query)}${limit && `&limit=${limit}`}`,
  );

  return data;
};

export const searchPlaylists = async (query: string, limit?: number) => {
  const { data } = await axios.get<PlaylistSearchResponse>(
    `${API_URL}/search/playlist?q=${encodeURIComponent(query)}${limit && `&limit=${limit}`}`,
  );

  return data;
};

export const getAlbum = async (id: number) => {
  const { data } = await axios.get<AlbumResponse>(
    `${API_URL}/search/playlist/${id}`,
  );

  return data;
};

export const getArtist = async (id: number) => {
  const { data } = await axios.get<ArtistResponse>(
    `${API_URL}/search/artist/${id}`,
  );

  return data;
};

export const getArtistTop10 = async (id: number) => {
  const { data } = await axios.get<ArtistResponse>(
    `${API_URL}/search/artist/${id}}/top`,
  );

  return data;
};

export const getPlaylist = async (id: number) => {
  const { data } = await axios.get<PlaylistResponse>(
    `${API_URL}/search/playlist/${id}`,
  );

  return data;
};

export const getPopular = async () => {
  const { data } = await axios.get<PopularResponse>(
    `${API_URL}/search/popular`,
  );

  return data;
};

export const getCharts = async () => {
  const { data } = await axios.get<PopularResponse>(`${API_URL}/search/charts`);

  return data;
};
