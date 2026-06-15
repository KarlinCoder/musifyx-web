"use client";

import { useFavoritesStore } from "../_stores/useFavoriteStore";
import { FavoriteItemInput } from "../_types/favorite";

export default function useFavorites() {
  const { favorites, addFavorite, removeFavorite, isFavorite } =
    useFavoritesStore();

  return {
    favorites,
    addFavorite: (item: FavoriteItemInput) => addFavorite(item),
    removeFavorite: (id: number) => removeFavorite(id),
    isFavorite: (id: number) => isFavorite(id),
  };
}
