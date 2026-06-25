import { MFLyricsTranslatedResponse } from "../_types/musify";

const API_URL = "https://musify.api.karlincoder.com";

export const getTrackLyrics = async (
  songId: number,
): Promise<MFLyricsTranslatedResponse> => {
  const res = await fetch(`${API_URL}/lyrics/${songId}/sync/translated`, {
    next: { revalidate: 6000 },
  });
  if (!res.ok) throw new Error("Failed to fetch lyrics");
  return res.json();
};
