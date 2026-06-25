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

export const getPlaylistTracks = async (id: number): Promise<MFTrack[]> => {
  const res = await fetch(`${API_URL}/search/playlist/${id}/tracks`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch playlist tracks");
  }
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

export const getTrackPreview = async (id: number): Promise<string | null> => {
  try {
    const { data } = await axios(`${API_URL}/search/track/${id}/preview`);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
    return null;
  }
};

export const downloadAlbumSSE = async (
  id: number,
  callbacks: {
    onProgress: (progress: number, message: string) => void;
    onDone: () => void;
    onError: () => void;
  },
): Promise<{ success: boolean; download_url: string }> => {
  return new Promise((resolve, reject) => {
    const eventSource = new EventSource(`${PROXY_URL}/download/album/${id}`);

    eventSource.addEventListener("progress", (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        callbacks.onProgress(data.progress ?? 0, data.message ?? "");
      } catch {}
    });

    eventSource.addEventListener("done", (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        callbacks.onDone();
        eventSource.close();
        resolve({ success: true, download_url: data.downloadUrl });
      } catch {}
    });

    eventSource.addEventListener("error", (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        callbacks.onError();
        eventSource.close();
        reject(new Error(data.message ?? "Download failed"));
      } catch {}
    });

    eventSource.onerror = () => {
      callbacks.onError();
      eventSource.close();
      reject(new Error("SSE connection failed"));
    };
  });
};

export const downloadTrackSSE = async (
  id: number,
  callbacks: {
    onProgress: (progress: number, message: string) => void;
    onDone: () => void;
    onError: () => void;
  },
): Promise<{ success: boolean; download_url: string }> => {
  return new Promise((resolve, reject) => {
    const eventSource = new EventSource(`${PROXY_URL}/download/track/${id}`);

    eventSource.addEventListener("progress", (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        callbacks.onProgress(data.progress ?? 0, data.message ?? "");
      } catch {}
    });

    eventSource.addEventListener("done", (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        callbacks.onDone();
        eventSource.close();
        resolve({ success: true, download_url: data.downloadUrl });
      } catch {}
    });

    eventSource.addEventListener("error", (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        callbacks.onError();
        eventSource.close();
        reject(new Error(data.message ?? "Download failed"));
      } catch {}
    });

    eventSource.onerror = () => {
      callbacks.onError();
      eventSource.close();
      reject(new Error("SSE connection failed"));
    };
  });
};
