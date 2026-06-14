const API_URL = "https://musify.api.karlincoder.com";

export interface TrackLyricsResponse {
  lyrics: { line: string; translation: string }[];
}

export const getTrackLyrics = async (
  deezer_song_id: number,
): Promise<TrackLyricsResponse> => {
  const res = await fetch(`${API_URL}/lyrics/${deezer_song_id}`, {
    next: { revalidate: 6000 },
  });
  if (!res.ok) throw new Error("Failed to fetch lyrics");
  return res.json();
};
