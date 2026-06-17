import { getAverageColor as _getAverageColor } from "fast-average-color-node";

export const getAverageColor = async (imgUrl: string) => {
  try {
    const color = await _getAverageColor(imgUrl);
    return color.hex;
  } catch {
    return "#1a1a1a";
  }
};
