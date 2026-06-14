import { Tables } from "@/types/database";

type FavoriteItem = Tables<"user_favorites">;
type FavoriteItemInput = { id: number; data: Json; type: string };
