import axios from "axios";
import {
  MFAlbum,
  MFAlbumPage,
  MFArtist,
  MFArtistPage,
  MFPlaylist,
  MFPlaylistPage,
  MFSearch,
  MFTrack,
} from "../_types/musify";

const API_URL = "https://musify.api.karlincoder.com";
const PROXY_URL = "/api/musify";

export const searchTracks = async (query: string) => {
  const { data } = await axios.get<MFSearch<MFTrack>>(
    `${PROXY_URL}/search/track?q=${encodeURIComponent(query)}`,
  );
  return data;
};

export const searchAlbums = async (query: string) => {
  const { data } = await axios.get<MFSearch<MFAlbum>>(
    `${PROXY_URL}/search/album?q=${encodeURIComponent(query)}`,
  );
  return data;
};

export const searchArtist = async (query: string) => {
  const { data } = await axios.get<MFSearch<MFArtist>>(
    `${PROXY_URL}/search/artist?q=${encodeURIComponent(query)}`,
  );
  return data;
};

export const searchPlaylists = async (query: string) => {
  const { data } = await axios.get<MFSearch<MFPlaylist>>(
    `${PROXY_URL}/search/playlist?q=${encodeURIComponent(query)}`,
  );

  return data;
};

export const getAlbum = async (id: number): Promise<MFAlbumPage> => {
  const res = await fetch(`${API_URL}/search/album/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch album");
  return res.json();
};

export const getAlbumTracks = async (id: number): Promise<MFTrack[]> => {
  const res = await fetch(`${API_URL}/search/album/${id}/tracks`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch album tracks");
  return res.json();
};

export const getPlaylist = async (id: number): Promise<MFPlaylistPage> => {
  const res = await fetch(`${API_URL}/search/playlist/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch playlist");
  return res.json();
};

export const getArtist = async (id: number): Promise<MFArtistPage> => {
  const res = await fetch(`${API_URL}/search/artist/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch artist");
  return res.json();
};

export const getArtistTop = async (id: number): Promise<MFTrack[]> => {
  const res = await fetch(`${API_URL}/search/artist/${id}/top`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch artist top");
  return res.json();
};

export const getArtistDiscography = async (id: number): Promise<MFAlbum[]> => {
  const res = await fetch(`${API_URL}/search/artist/${id}/albums`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch artist discography");
  return res.json();
};

export const getArtistMentions = async (id: number): Promise<MFPlaylist[]> => {
  const res = await fetch(`${API_URL}/search/artist/${id}/mentions`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch artist playlist mentions");
  return res.json();
};

export const getArtistRadio = async (id: number): Promise<MFTrack[]> => {
  const res = await fetch(`${API_URL}/search/artist/${id}/radio`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch artist radio");
  return res.json();
};

export const getArtistSimilar = async (id: number): Promise<MFArtist[]> => {
  const res = await fetch(`${API_URL}/search/artist/${id}/similar`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch artist similars");
  return res.json();
};

export const getArtistPlaylists = async (id: number): Promise<MFPlaylist[]> => {
  const res = await fetch(`${API_URL}/search/artist/${id}/playlists`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch artist playlists");
  return res.json();
};

export const getPopularNow = async (): Promise<{
  tracks: MFTrack[];
  albums: MFAlbum[];
  artists: MFArtist[];
  playlists: MFPlaylist[];
}> => {
  const res = await fetch(`${API_URL}/search/popular`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch popular now");
  return res.json();
};

export const getTrackPreview = async (id: string | number): Promise<string> => {
  const res = await fetch(`${PROXY_URL}/search//track/${id}/preview`);
  if (!res.ok) throw new Error("Failed to fetch track preview");
  return res.json();
};

export interface DownloadResponse {
  success: boolean;
  download_id: string;
  download_url: string;
}

export interface DownloadTrackSSECallbacks {
  onProgress: (progress: number, message: string) => void;
  onDone: (downloadUrl: string) => void;
  onError: (message: string) => void;
}

export const downloadAlbum = async (
  albumId: number,
  abortSignal: AbortSignal,
) => {
  const { data } = await axios.get<DownloadResponse>(
    `${PROXY_URL}/download/album/${albumId}`,
    { signal: abortSignal },
  );

  return data;
};

export const downloadTrackSSE = async (
  trackId: number,
  callbacks: DownloadTrackSSECallbacks,
  signal?: AbortSignal,
): Promise<{ success: boolean; download_url: string }> => {
  const response = await fetch(`${PROXY_URL}/download/track/${trackId}`, {
    signal,
  });

  if (!response.ok) {
    callbacks.onError(`Error HTTP ${response.status}`);
    return { success: false, download_url: "" };
  }

  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop()!;

      let eventType = "";
      for (const line of lines) {
        if (line.startsWith("event:")) {
          eventType = line.slice(6).trim();
        } else if (line.startsWith("data:")) {
          const raw = line.slice(5).trim();
          if (!raw) continue;
          const data = JSON.parse(raw);

          if (eventType === "initializing" || eventType === "progress") {
            callbacks.onProgress(data.progress ?? 0, data.message ?? "");
          } else if (eventType === "done") {
            callbacks.onDone(data.downloadUrl);
            return { success: true, download_url: data.downloadUrl };
          } else if (eventType === "error") {
            callbacks.onError(data.message ?? "Error desconocido");
            return { success: false, download_url: "" };
          }
        }
      }
    }
  } catch {
    callbacks.onError("Conexión perdida");
    return { success: false, download_url: "" };
  }

  return { success: false, download_url: "" };
};
