import axios from "axios";

const API = process.env.SERVER_API_URL;

export const searchTracks = async (query: string, limit?: number) => {
  const { data } = await axios.get(API!);
};
