import { MFAnalysisResponse } from "../_types/musify";

const API_URL = "https://musify.api.karlincoder.com";

export const getTrackAnalysis = async (
  songId: number,
): Promise<MFAnalysisResponse> => {
  const res = await fetch(`${API_URL}/lyrics/analyze/${songId}`, {
    next: { revalidate: 6000 },
  });
  if (!res.ok) throw new Error("Failed to fetch song analysis");
  return res.json();
};
