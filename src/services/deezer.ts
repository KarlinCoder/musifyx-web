import {
  DeezerAlbum,
  DeezerArtist,
  DeezerCharts,
  DeezerGenre,
  DeezerPlaylist,
  DeezerTrack,
} from "@/types/deezer/types.d";

const DEEZER_API_BASE = "https://api.deezer.com";
const CORS_PROXY = "https://cors-anywhere.com/";

const buildUrl = (path: string): string => {
  return `${CORS_PROXY}${DEEZER_API_BASE}${path}`;
};

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function searchTracks(
  query: string,
  options?: { limit?: number; strict?: boolean }
) {
  let url = `/search?q=${encodeURIComponent(query)}`;
  if (options?.limit) url += `&limit=${options.limit}`;
  if (options?.strict) url += "&strict=on";
  return fetchJson<{ data: DeezerTrack[] }>(buildUrl(url));
}

export async function searchAlbums(
  query: string,
  options?: { limit?: number; strict?: boolean }
) {
  let url = `/search/album?q=${encodeURIComponent(query)}`;
  if (options?.limit) url += `&limit=${options.limit}`;
  if (options?.strict) url += "&strict=on";
  return fetchJson<{ data: DeezerAlbum[] }>(buildUrl(url));
}

export async function searchArtists(
  query: string,
  options?: { limit?: number; strict?: boolean }
) {
  let url = `/search/artist?q=${encodeURIComponent(query)}`;
  if (options?.limit) url += `&limit=${options.limit}`;
  if (options?.strict) url += "&strict=on";
  return fetchJson<{ data: DeezerArtist[] }>(buildUrl(url));
}

export async function searchPlaylists(
  query: string,
  options?: { limit?: number; strict?: boolean }
) {
  let url = `/search/playlist?q=${encodeURIComponent(query)}`;
  if (options?.limit) url += `&limit=${options.limit}`;
  if (options?.strict) url += "&strict=on";
  return fetchJson<{ data: DeezerPlaylist[] }>(buildUrl(url));
}

export async function searchGenres(
  query: string,
  options?: { limit?: number }
) {
  let url = `/search/genre?q=${encodeURIComponent(query)}`;
  if (options?.limit) url += `&limit=${options.limit}`;
  return fetchJson<{ data: DeezerGenre[] }>(buildUrl(url));
}

// === OBTENER POR ID ===

export async function getTrack(id: number): Promise<DeezerTrack> {
  return fetchJson(buildUrl(`/track/${id}`));
}

export async function getAlbum(id: number): Promise<DeezerAlbum> {
  return fetchJson(buildUrl(`/album/${id}`));
}

export async function getArtist(id: number): Promise<DeezerArtist> {
  return fetchJson(buildUrl(`/artist/${id}`));
}

export async function getPlaylist(id: number): Promise<DeezerPlaylist> {
  return fetchJson(buildUrl(`/playlist/${id}`));
}

export async function getGenre(id: number): Promise<DeezerGenre> {
  return fetchJson(buildUrl(`/genre/${id}`));
}

// === CHARTS ===

export async function getCharts(): Promise<DeezerCharts> {
  return fetchJson(buildUrl("/chart"));
}
