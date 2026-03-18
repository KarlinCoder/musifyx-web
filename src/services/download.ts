import axios from "axios";

export interface DownloadResponse {
  success: boolean;
  download_id: string;
  download_url: string;
}

const API_BASE = "https://musify.api.karlincoder.com";

export const downloadAlbum = async (
  albumId: number,
  abortSignal: AbortSignal,
) => {
  const { data } = await axios.get<DownloadResponse>(
    `${API_BASE}/download/album/${albumId}`,
    { signal: abortSignal },
  );

  return data;
};

export const downloadTrack = async (
  trackId: number,
  abortSignal: AbortSignal,
) => {
  const { data } = await axios.get<DownloadResponse>(
    `${API_BASE}/download/track/${trackId}`,
    { signal: abortSignal },
  );

  return data;
};
