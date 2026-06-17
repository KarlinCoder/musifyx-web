const API_URL = "https://musify.api.karlincoder.com";

export interface TrackMeaningResponse {
  content: string;
}

export const getTrackMeaning = async (
  songId: number,
): Promise<TrackMeaningResponse> => {
  const res = await fetch(`${API_URL}/song-meaning/${songId}`, {
    next: { revalidate: 6000 },
  });
  if (!res.ok) throw new Error("Failed to fetch song meaning");
  return res.json();
};
