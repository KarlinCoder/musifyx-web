import axios from "axios";
import { FavoriteItemInput } from "../_types/favorite";

export const getDatabaseFavorites = async (authToken: string) => {
  const { data } = await axios.get<FavoriteItemInput[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/user/favorite`,
    {
      headers: { Authorization: `Bearer ${authToken}` },
    },
  );

  return data;
};

export const addDatabaseFavorite = async (
  authToken: string,
  data: FavoriteItemInput,
) => {
  const { data: responseData } = await axios.post<FavoriteItemInput[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/user/favorite`,
    data,
    {
      headers: { Authorization: `Bearer ${authToken}` },
    },
  );

  return responseData;
};

export const deleteDatabaseFavorite = async (authToken: string, id: number) => {
  const { data } = await axios.delete<FavoriteItemInput[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/user/favorite/${id}`,
    {
      headers: { Authorization: `Bearer ${authToken}` },
    },
  );

  return data;
};
