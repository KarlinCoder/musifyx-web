const API_URL = "https://musify.api.karlincoder.com";

export interface TrackLyricsResponse {
  lyrics: { line: string; translation: string }[];
}

export const getTrackLyrics = async (
  songId: number,
): Promise<TrackLyricsResponse> => {
  const res = await fetch(`${API_URL}/lyrics/${songId}`, {
    next: { revalidate: 6000 },
  });
  if (!res.ok) throw new Error("Failed to fetch lyrics");
  return res.json();
};
